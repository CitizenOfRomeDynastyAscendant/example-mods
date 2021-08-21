// Opens a command console on the Interaction Modal
{
  canTriggerIfUnavailable: true,
  checkType: 'general',
  checkAndAct() {
    daapi.addGlobalAction({
      key: 'command_console',
      action: {
        title: 'Open a daapi Command Console',
        icon: daapi.requireImage('/command_console/command.svg'),
        isAvailable: true,
        process: {
          event: '/command_console/main',
          method: 'process'
        }
      }
    })
  },
  methods: {
    process() {
      daapi.setGlobalFlag({ flag: 'command_console', data: daapi.getGlobalFlag({ flag: 'command_console' }) || 'daapi.addTrait({characterId:daapi.getState().current.id, trait: \'strong\'})' })
      daapi.pushInteractionModalQueue({
        title: 'Command Console',
        message: 'Type a daapi command in the text box below and then tap the run button. Please reach out via the official Discord for help',
        image: daapi.requireImage('/command_console/command.svg'),
        inputs: [
          {
            type: 'text',
            title: 'Command here',
            value: daapi.getGlobalFlag({ flag: 'command_console' }),
            onChange: {
              event: '/command_console/main',
              method: 'noteCommand'
            }
          }
        ],
        options: [
          {
            variant: 'info',
            text: 'Run this',
            icon: daapi.requireImage('/command_console/command.svg'),
            action:{
              event: '/command_console/main',
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
      daapi.setGlobalFlag({ flag: 'command_console', data: input.value || '' })
    },
    run() {
      try {
        let result = new Function('return (' + (daapi.getGlobalFlag({ flag: 'command_console' })) + ')')()
        if(result) {
          daapi.pushInteractionModalQueue({
            title: 'Command Console',
            message: 'Output: ' + JSON.stringify(result),
            image: daapi.requireImage('/command_console/command.svg'),
            inputs: [
              {
                type: 'text',
                title: 'Output',
                value: JSON.stringify(result)
              }
            ]
          })
        }
      } catch(err) {
        console.warn(err)
        daapi.pushInteractionModalQueue({
          title: 'Command Console',
          message: 'Error: ' + err.name + ': ' + err.message,
          image: daapi.requireImage('/command_console/command.svg'),
          inputs: [
            {
              type: 'text',
              title: 'Error',
              value: err.name + ': ' + err.message
            }
          ]
        })
      }
    }
  }
}