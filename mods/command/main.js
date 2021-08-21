// Opens a command console on the Interaction Modal
{
  canTriggerIfUnavailable: true,
  checkType: 'general',
  checkAndAct() {
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
        message: 'Type a daapi command in the text box below and then tap the run button. Please reach out via the official Discord for help',
        image: daapi.requireImage('/command/command.svg'),
        inputs: [
          {
            type: 'text',
            title: 'Command here',
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
            icon: daapi.requireImage('/command/command.svg'),
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
        let result = new Function('return (' + (daapi.getGlobalFlag({ flag: 'command' })) + ')')()
        if(result) {
          daapi.pushInteractionModalQueue({
            title: 'Command Console',
            message: 'Output: ' + JSON.stringify(result),
            image: daapi.requireImage('/command/command.svg')
          })
        }
      } catch(err) {
        console.warn(err)
      }
    }
  }
}