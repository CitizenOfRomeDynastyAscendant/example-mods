{
  methods: {
    setup() {
      window.modMultiplayerData = window.modMultiplayerData || {}
      let state = daapi.getState()
      let timestamp = +Date.now()
      if(!window.modMultiplayerData.peerID) {
        if(!daapi.getGlobalFlag({ flag: 'modMultiplayerPeerId' })) {
          let dynasty = state.dynasties[state.characters[state.current.id].dynastyId]
          let peerID = (dynasty.nomen + '_' + dynasty.cognomen + '_' + Math.round(Math.random() * 10000)).replace(/[^a-zA-Z0-9]/gi, '_')
          daapi.setGlobalFlag({ flag: 'modMultiplayerPeerId', data: peerID })
        }
        window.modMultiplayerData.peerID = daapi.getGlobalFlag({ flag: 'modMultiplayerPeerId' })
      }
      if(window.modMultiplayerData.peer) {
        try {
          window.modMultiplayerData.peer.destroy()
        } catch(err) {
          console.warn(err)
        }
      }
      let peerJSOptions = daapi.getGlobalFlag({ flag: 'modMultiplayerPeerJSOptions' }) || '{}'
      try {
        peerJSOptions = JSON.parse(peerJSOptions) || window.modMultiplayerData.baseOptions || {}
      } catch(err) {
        console.warn(err)
        peerJSOptions = window.modMultiplayerData.baseOptions || {}
      }
      window.modMultiplayerData.peer = new Peer('CoRDA_multiplayer_mod_' + window.modMultiplayerData.peerID + '_peer', { debug: 3, ...peerJSOptions })
      window.modMultiplayerData.peer.on('connection', (conn) => {
        console.log('Received connection')
        conn.on('open', function() {
          // Receive messages
          console.log('Received connection: open')
        })
        conn.on('error', (err) => {
          daapi.pushInteractionModalQueue({
            title: 'Multiplayer: Peer Connection Error',
            message: 'An error occured with your peer connection: ' + JSON.stringify(err),
            image: daapi.requireImage('/multiplayer/connect.svg')
          })
        })
        conn.on('data', function(data) {
          console.log('Received', data)
          if(data.type === 'newConnection') {
            daapi.pushInteractionModalQueue({
              title: 'Multiplayer: Connection Request',
              message: data.originPeerID + ' wants to connect',
              image: daapi.requireImage('/multiplayer/connect.svg'),
              inputs: [
                {
                  type: 'readOnly',
                  title: 'Incoming Peer ID',
                  value: data.originPeerID
                }
              ],
              options: [
                {
                  text: 'Connect',
                  action:{
                    event: '/multiplayer/setup',
                    method: 'acceptIncomingConnection',
                    context: {
                      friendPeerID: data.originPeerID
                    }
                  }
                },
                {
                  text: 'No thank you',
                  action:{
                    event: '/multiplayer/setup',
                    method: 'rejectIncomingConnection',
                    context: {
                      friendPeerID: data.originPeerID
                    }
                  }
                }
              ]
            })
          } else if(data.type === 'acceptedConnection') {
            daapi.pushInteractionModalQueue({
              title: 'Multiplayer: Connection Accepted',
              message: 'You are now connected to ' + data.originPeerID,
              image: daapi.requireImage('/multiplayer/connect.svg')
            })
            window.modMultiplayerData = window.modMultiplayerData || {}
            window.modMultiplayerData.acceptedPeers = window.modMultiplayerData.acceptedPeers || []
            window.modMultiplayerData.acceptedPeers.push(data.originPeerID)
          } else if(data.type === 'rejectedConnection') {
            daapi.pushInteractionModalQueue({
              title: 'Multiplayer: Connection Declined',
              message: data.originPeerID + ' has refused your connection request.',
              image: daapi.requireImage('/multiplayer/connect.svg')
            })
          }
        })
      })
      window.modMultiplayerData.peer.on('error', (err) => {
        daapi.pushInteractionModalQueue({
          title: 'Multiplayer: Peer Connection Error',
          message: 'An error occured with your peer connection setup: ' + JSON.stringify(err),
          image: daapi.requireImage('/multiplayer/connect.svg')
        })
      })
      window.modMultiplayerData.peer.on('disconnected', (err) => {
        try {
          if(+Date.now() - timestamp > 120000) {
            console.log('reconnecting', +Date.now() - timestamp)
            window.modMultiplayerData.peer.reconnect()
          }
        } catch(err) {
          console.warn(err)
        }
      })
    },
    connectAndSendData({ type, friendPeerID, data }) {
      data = data || {}
      const conn = window.modMultiplayerData.peer.connect('CoRDA_multiplayer_mod_' + friendPeerID.replace(/[^a-zA-Z0-9]/gi, '_') + '_peer')
      let sent = false
      conn.on('open', () => {
        conn.send({
          type,
          originPeerID: window.modMultiplayerData.peerID,
          data
        })
        sent = true
        // conn.close()
      })
      conn.on('error', (err) => {
        console.warn(err)
        daapi.pushInteractionModalQueue({
          title: 'Multiplayer: Connection Error',
          message: 'An error occured when connecting with ' + friendPeerID + ': ' + JSON.stringify(err),
          image: daapi.requireImage('/multiplayer/connect.svg')
        })
      })
      conn.on('close', () => {
        if(!sent) {
          daapi.pushInteractionModalQueue({
            title: 'Multiplayer: Connection Closed',
            message: 'The connection to ' + friendPeerID + ' has closed/failed',
            image: daapi.requireImage('/multiplayer/connect.svg')
          })
        }
      })
    },
    acceptIncomingConnection({ friendPeerID }) {
      daapi.invokeMethod({
        event: '/multiplayer/setup',
        method: 'connectAndSendData',
        context: {
          type: 'acceptedConnection',
          friendPeerID
        }
      })
      window.modMultiplayerData = window.modMultiplayerData || {}
      window.modMultiplayerData.acceptedPeers = window.modMultiplayerData.acceptedPeers || []
      window.modMultiplayerData.acceptedPeers.push(friendPeerID)
    },
    rejectIncomingConnection({ friendPeerID }) {
      daapi.invokeMethod({
        event: '/multiplayer/setup',
        method: 'connectAndSendData',
        context: {
          type: 'rejectedConnection',
          friendPeerID
        }
      })
    }
  }
}