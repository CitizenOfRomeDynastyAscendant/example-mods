{
  canTriggerIfUnavailable: true,
  checkType: 'general',
  checkAndAct() {
    if(!window.modMultiplayerData || !window.modMultiplayerData.peer || !window.modMultiplayerData.peerID || window.modMultiplayerData.peer.destroyed || window.modMultiplayerData.peer.disconnected) {
      window.modMultiplayerData = window.modMultiplayerData || {}
      try {
        fetch("https://corda.metered.live/api/v1/turn/credentials?apiKey=53be4cf3bdd3feabc084d392f4fb4c1f0f25")
          .then((response) => { return response.json() })
          .then((iceServers) => { 
            window.modMultiplayerData.baseOptions = { secure: true, config: { iceServers } }
            daapi.invokeMethod({
              event: '/multiplayer/setup',
              method: 'setup'
            })
          })
      } catch (err) {
        console.warn(err)
      }
      daapi.invokeMethod({
        event: '/multiplayer/setup',
        method: 'setup'
      })
    }
    daapi.addGlobalAction({
      key: 'multiplayer',
      action: {
        title: 'Multiplayer',
        icon: daapi.requireImage('/multiplayer/connect.svg'),
        isAvailable: true,
        process: {
          event: '/multiplayer/main',
          method: 'process'
        }
      }
    })
  },
  methods: {
    process() {
      daapi.pushInteractionModalQueue({
        title: 'Multiplayer',
        message: 'Multiplayer Setup',
        image: daapi.requireImage('/multiplayer/connect.svg'),
        inputs: [
          {
            type: 'text',
            title: 'Your Peer ID',
            description: 'Share this ID with your friends for them to connect',
            value: daapi.getGlobalFlag({ flag: 'modMultiplayerPeerId' }),
            onChange: {
              event: '/multiplayer/main',
              method: 'updatePeerID'
            },
            onRandomize: {
              event: '/multiplayer/main',
              method: 'randomizePeerID'
            }
          },
          {
            type: 'textarea',
            title: 'PeerJS options',
            description: 'Optional & Advanced: Enter https://peerjs.com/docs/#peer-options as a JSON string here, useful for custom TURN servers, etc. Use `{}` for no TURN server',
            value: daapi.getGlobalFlag({ flag: 'modMultiplayerPeerJsOptions' }) || JSON.stringify(window.modMultiplayerData.baseOptions) || '{}',
            onChange: {
              event: '/multiplayer/main',
              method: 'updatePeerJSOptions'
            },
            onRandomize: {
              event: '/multiplayer/main',
              method: 'resetPeerJSOptions'
            }
          }
        ],
        options: [
          {
            text: 'Refresh our Peer connection',
            action:{
              event: '/multiplayer/setup',
              method: 'setup'
            }
          },
          {
            text: '+ New connection',
            action:{
              event: '/multiplayer/main',
              method: 'newOutgoingConnection'
            }
          },
          {
            text: 'Close'
          }
        ]
      })
    },
    updatePeerID({input, index}) {
      let newPeerID = (input.value || daapi.getGlobalFlag({ flag: 'modMultiplayerPeerId' })).replace(/[^a-zA-Z0-9]/gi, '_')
      input.value = newPeerID
      window.modMultiplayerData.peerID = newPeerID
      daapi.setGlobalFlag({ flag: 'modMultiplayerPeerId', data: newPeerID })
      daapi.invokeMethod({
        event: '/multiplayer/setup',
        method: 'setup'
      })
    },
    randomizePeerID({input, index}) {
      window.modMultiplayerData.peerID = false
      daapi.setGlobalFlag({ flag: 'modMultiplayerPeerId', data: false })
      daapi.invokeMethod({
        event: '/multiplayer/setup',
        method: 'setup'
      })
      setTimeout(() => {
        input.value = window.modMultiplayerData.peerID
      }, 50)
    },
    updatePeerJSOptions({input, index}) {
      let peerJSOptions = (input.value || '{}')
      input.value = peerJSOptions
      daapi.setGlobalFlag({ flag: 'modMultiplayerPeerJSOptions', data: peerJSOptions })
      daapi.invokeMethod({
        event: '/multiplayer/setup',
        method: 'setup'
      })
    },
    resetPeerJSOptions({input, index}) {
      input.value = JSON.stringify(window.modMultiplayerData.baseOptions)
      daapi.setGlobalFlag({ flag: 'modMultiplayerPeerJSOptions', data: false })
      daapi.invokeMethod({
        event: '/multiplayer/setup',
        method: 'setup'
      })
    },
    newOutgoingConnection() {
      daapi.pushInteractionModalQueue({
        title: 'Multiplayer: Connect?',
        message: 'Please enter the peer ID of the frined you\'d like to connect to:',
        image: daapi.requireImage('/multiplayer/connect.svg'),
        inputs: [
          {
            type: 'text',
            title: 'Friend\'s Peer ID',
            onChange: {
              event: '/multiplayer/main',
              method: 'newOutgoingConnectionNoteFiendsPeerID'
            }
          }
        ],
        options: [
          {
            text: 'Connect',
            action:{
              event: '/multiplayer/main',
              method: 'newOutgoingConnectionMakeConnection'
            }
          },
          {
            text: 'Nevermind'
          }
        ]
      })
    },
    newOutgoingConnectionNoteFiendsPeerID({input, index}) {
      input.value = (input.value || '').replace(/[^a-zA-Z0-9]/gi, '_')
      daapi.setGlobalFlag({ flag: 'modMultiplayerNewOutgoingConnectionFiendPeerID', data: input.value })
    },
    newOutgoingConnectionMakeConnection() {
      daapi.invokeMethod({
        event: '/multiplayer/setup',
        method: 'connectAndSendData',
        context: {
          type: 'newConnection',
          friendPeerID: daapi.getGlobalFlag({ flag: 'modMultiplayerNewOutgoingConnectionFiendPeerID' })
        }
      })
    }
  }
}
