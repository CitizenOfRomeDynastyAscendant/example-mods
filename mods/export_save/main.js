// A risky and unsupported hack of a mod to export/import saves
// Will very likely stop working with future releases
{
  canTriggerIfUnavailable: true,
  checkType: 'general',
  checkAndAct() {
    daapi.addGlobalAction({
      key: 'export_save',
      action: {
        title: 'Export or Import a Saved Game',
        icon: daapi.requireImage('/export_save/export.svg'),
        isAvailable: true,
        process: {
          event: '/export_save/main',
          method: 'process'
        }
      }
    })
  },
  methods: {
    process() {
      let stateString = JSON.stringify(daapi.getState())
      console.log(stateString)
      daapi.pushInteractionModalQueue({
        title: 'Export Save',
        message: 'Copy the Save State below and paste it via the same mod on any other device (after editing it if you\'d like). Please note that this is a risky and unsupported hack to export/import saves, it can corrupt your game save irrevocably and will very likely stop working with future releases',
        image: daapi.requireImage('/export_save/export.svg'),
        inputs: [
          {
            type: 'text',
            title: 'Save State',
            value: stateString,
            onChange: {
              event: '/export_save/main',
              method: 'noteSave'
            }
          }
        ],
        options: [
          /* {
            variant: 'danger',
            text: 'Apply changes to Save State',
            icon: daapi.requireImage('/export_save/export.svg'),
            action:{
              event: '/export_save/main',
              method: 'run'
            },
            tooltip: 'DANGER: Any errors here could irrevocable destroy your saved game and require you to clear all game data and start over'
          }, */
          {
            text: 'Okay'
          }
        ]
      })
    },
    noteSave({input, index}) {
      daapi.setGlobalFlag({ flag: 'export_save', data: input.value || '' })
    },
    run() {
      try {
        // window.localStorage.mainStore = daapi.getGlobalFlag({ flag: 'export_save' })
        // window.location.reload()
      } catch(err) {
        console.warn(err)
        daapi.pushInteractionModalQueue({
          title: 'Export/Import Save',
          message: 'Error: ' + err.name + ': ' + err.message,
          image: daapi.requireImage('/export_save/export.svg'),
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