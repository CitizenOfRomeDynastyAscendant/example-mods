// Opens a command console on the Interaction Modal
{
  canTriggerIfUnavailable: true,
  checkType: 'general',
  checkAndAct() {
    // daapi.openDevTools()
    console.log('here')
    daapi.addGlobalAction({
      key: 'command',
      action: {
        title: 'Open a daapi Command Console',
        icon: daapi.requireImage('/command/command.svg'),
        isAvailable: true,
        process: {
          event: '/command/main',
          method: 'process'
        }
      }
    })
  },
  methods: {
    process() {
      daapi.pushInteractionModalQueue({
        title: 'Command Console',
        message: 'Type in the text box and then select the Yes option below that to run. Eg: `daapi.addTrait({characterId:daapi.getState().current.id, trait: \'strong\'})`. Please reach out via the official Discord for help',
        image: daapi.requireImage('/command/command.svg'),
        inputs: [
          {
            type: 'text',
            title: 'Type here',
            value: daapi.getGlobalFlag({ flag: 'command' }) || 'daapi.addTrait({characterId:daapi.getState().current.id, trait: \'strong\'})',
            onChange: {
              event: '/command/main',
              method: 'noteCommand'
            }
          }
        ],
        options: [
          {
            variant: 'info',
            text: 'Run this',
            action:{
              event: '/command/main',
              method: 'run'
            }
          },
          {
            text: 'Nevermind'
          }
        ]
      })
    },
    noteCommand({input, index}) {
      daapi.setGlobalFlag({ flag: 'command', data: input.value || '' })
    },
    run() {
      try {
        new Function('return (' + (daapi.getGlobalFlag({ flag: 'command' })) + ')')()
      } catch(err) {
        command.warn(err)
      }
    }
  }
}