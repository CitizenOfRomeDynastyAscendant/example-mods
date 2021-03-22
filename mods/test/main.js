{
  checkType: 'general',
  checkAndAct() {
    if(!Math.random < 1/13/100) {
      return
    }
  	daapi.playSound('/test/bling.flac')
    daapi.pushInteractionModalQueue({
      title: 'Bonanza',
      message:
        'Public taxes consisted of modest assessments on owned wealth and property. The tax rate under normal circumstances was 1% and sometimes would climb as high as 3% in situations such as war. These modest taxes were levied against land, homes and other real estate, slaves, animals, personal items and monetary wealth. The time has come for you to pay your annual taxes',
      image: daapi.requireImage('/test/bonanza.svg'),
      requireChoice: true,
      options: [
        {
          text: "Render unto me that which is mine",
          icon: daapi.requireImage('/test/logo.png'),
          statChanges: {
            cash: 999 / daapi.calculateScaleByClassFactor()
          }
        },

        {
          text: "Moar",
          action:{
          	event: '/test/main',
          	method: 'yay',
          	context: {aa:'googurl'}
          }
        }
      ]
    })
  },
  methods: {
  	yay({aa}) {
    daapi.pushInteractionModalQueue({
      title: 'Bonanza - Yay',
      message:
        'Big yaya ' + aa,
      image: daapi.requireImage('/test/bonanza.svg'),
      requireChoice: true,
      options: [
        {
          text: "Render unto me that which is mine - yay",
          icons: [daapi.requireImage('/test/logo.png')],
          statChanges: {
            cash: 999
          }
        }
      ]
    })
  	}
  }
}