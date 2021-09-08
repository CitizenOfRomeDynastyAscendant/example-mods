// StealingFrom initiator
;(function() {
  const path = '/stealingFrom/stealingFrom'
  let img, img2, img3
  setTimeout(() => {
    img = daapi.requireImage('/stealingFrom/animalPen.svg')
    img2 = daapi.requireImage('/stealingFrom/wounded.svg')
    img3 = daapi.requireImage('/stealingFrom/barredFromSenate.svg')
  }, 0)

  return {
    checkType: 'general',
    checkAndAct() {
      let state = daapi.getState()
      var character = state.characters[state.current.id]
      let age = daapi.calculateAge({
        month: character.birthMonth,
        year: character.birthYear
      })
      var animals = [
        'horse',
        'donkey',
        'pig',
        'goat',
        'sheep',
        'cattle',
        'duck',
        'chicken'
      ]
      var selectedAnimal = animals[Math.floor(Math.random() * animals.length)]
      var mainRngesus = 1 / 13 / 40
      //event trigger
      if (Math.random() < mainRngesus && age > 18) {
        var property = {}
        var animalCount =
          Math.min(
            10 + Math.round(Math.random() * 10),
            Math.floor(
              Math.random() * state.current.propertyDetails[selectedAnimal]
            )
          ) || 1
        property[selectedAnimal] = animalCount
        daapi.pushInteractionModalQueue({
          title: 'Nice ' + selectedAnimal + " you've got there...",
          message:
            'You happen to be walking past the property of a rivaling family when a thought hits you. The property is unusually quiet, the family must be away, and it would be easy for you to take something from them at this moment. You notice that the ' +
            selectedAnimal +
            ' are currently unattended, what do you do?',
          image: img,
          requireChoice: true,
          options: [
            {
              text: "Let's take some, no one will notice!",
              statChanges: {
                property
              },
              action: {
                event: path,
                method: 'steal',
                context: {
                  selectedAnimal: selectedAnimal,
                  animalCount: animalCount
                }
              }
            },
            {
              text: 'Leave them be',
              action: {
                event: path,
                method: 'letItBe',
                context: {
                  selectedAnimal: selectedAnimal
                }
              }
            }
          ]
        })
        return true
      }
    },
    methods: {
      steal({ selectedAnimal, animalCount }) {
        let state = daapi.getState()
        var character = state.characters[state.current.id]
        var message = ''
        var options = []

        var rngesus = Math.random()
        var property = {}
        property[selectedAnimal] = animalCount

        message =
          'The timing couldn’t be any more perfect, you decide to call some of your trusted servants and test your luck! '

        if (rngesus <= 0.5) {
          message +=
            'However… a farmhand manages to catch you in the middle of the act! Rats! You were so close to getting away with it too! You have to act fast if you were to have any chance of escaping, what do you do?'
          options.push({
            text: 'Run for it!',
            action: {
              event: path,
              method: 'run',
              context: {
                selectedAnimal: selectedAnimal,
                animalCount: animalCount
              }
            }
          }),
            options.push({
              text: 'Maybe we can talk this out...',
              action: {
                event: path,
                method: 'letsTalk',
                context: {
                  selectedAnimal: selectedAnimal,
                  animalCount: animalCount
                }
              }
            })
        } else if (
          character.traits.indexOf('greedy') > -1 &&
          Math.random() < rngesus
        ) {
          message +=
            'Not wanting to be outdone by your rivals, you decide to cripple them by taking the entire herd of ' +
            selectedAnimal +
            '.'
          if (rngesus <= 0.9) {
            message +=
              ' With the help of your trusted servants, you manage to smuggle the entire herd of ' +
              selectedAnimal +
              ' back to your property with no trouble'
            options.push({
              text: 'It was risky but your gamble paid off!',
              statChanges: {
                property: 10
              }
            })
          } else {
            message +=
              ' However... Even with the help of your servants, transporting all those animals caused too much of a ruckus. Your attempt has drawn too many eyes to your crime'
            options.push({
              text: 'There is no escaping this one!',
              action: {
                event: path,
                method: 'greed',
                context: {
                  selectedAnimal: selectedAnimal,
                  animalCount: animalCount
                }
              }
            })
          }
        } else {
          if (animalCount >= 5 && rngesus <= 0.8) {
            message +=
              'However… a farmhand manages to catch you in the middle of the act! Rats! You were so close to getting away with it too! You have to act fast if you were to have any chance of escaping, what do you do?'
            options.push({
              text: 'Run for it!',
              action: {
                event: path,
                method: 'run',
                context: {
                  selectedAnimal: selectedAnimal,
                  animalCount: animalCount
                }
              }
            }),
              options.push({
                text: 'Maybe we can talk this out...',
                action: {
                  event: path,
                  method: 'letsTalk',
                  context: {
                    selectedAnimal: selectedAnimal,
                    animalCount: animalCount
                  }
                }
              })
          } else if (rngesus <= 0.5) {
            message +=
              'However… a farmhand manages to catch you in the middle of the act! Rats! You were so close to getting away with it too! You have to act fast if you were to have any chance of escaping, what do you do?'
            options.push({
              text: 'Run for it!',
              action: {
                event: path,
                method: 'run',
                context: {
                  selectedAnimal: selectedAnimal,
                  animalCount: animalCount
                }
              }
            }),
              options.push({
                text: 'Maybe we can talk this out...',
                action: {
                  event: path,
                  method: 'letsTalk',
                  context: {
                    selectedAnimal: selectedAnimal,
                    animalCount: animalCount
                  }
                }
              })
          } else {
            message +=
              'It was risky, but you managed to sneak ' +
              selectedAnimal +
              ' from the rival family’s property back to your own.'
            options.push({
              text: 'The risk was worth it!',
              statChanges: {
                property
              }
            })
          }
        }

        daapi.pushInteractionModalQueue({
          title: 'Nice ' + selectedAnimal + " you've got there...",
          message,
          image: img,
          requireChoice: true,
          options: [...options]
        })
      },
      run({ selectedAnimal, animalCount }) {
        var message
        let state = daapi.getState()
        var options = []
        var icons = []
        var rngesus = Math.random()
        var property = {}
        property[selectedAnimal] = animalCount
        if (rngesus <= 0.5) {
          message =
            'With some quick thinking and help from your accomplices, you manage to get away with ' +
            selectedAnimal +
            ' in tow!'
          options.push({
            text: 'Yes! I knew I could do it!',
            statChanges: {
              property
            }
          })
        } else {
          if (animalCount >= 5 && rngesus <= 0.8) {
            message =
              'You were too slow! The farmhand caught up to you easily and you were forced to return the stolen property'
            daapi.addTrait({ characterId: state.current.id, trait: 'wounded' })
            icons.push(img2)

            options.push({
              text: 'Rats! I was so close!',
              icons,
              tooltip: 'You were injured during the chase',
              statChanges: {
                influence: -5,
                prestige: -10,
                scaleByRevenue: ['influence', 'prestige']
              }
            })
          } else {
            message =
              'You were too slow! The farmhand caught up to you easily and you were forced to return the stolen property'
            daapi.addTrait({ characterId: state.current.id, trait: 'wounded' })
            icons.push(img2)
            options.push({
              text: 'Rats! I was so close!',
              icons,
              tooltip: 'You were injured during the chase',
              statChanges: {
                influence: -5,
                prestige: -10,
                scaleByRevenue: ['influence', 'prestige']
              }
            })
          }
        }

        daapi.pushInteractionModalQueue({
          title: 'Nice ' + selectedAnimal + " you've got there...",
          message,
          image: img,
          options: [...options]
        })
      },
      letsTalk({ selectedAnimal, animalCount }) {
        var message
        var options = []
        var rngesus = Math.random()
        var property = {}
        property[selectedAnimal] = animalCount

        if (rngesus <= 0.5) {
          message =
            'You attempt to convince the farmhand that the ' +
            selectedAnimal +
            ' was yours all along. Luckily the farmhand was gullible enough to believe you and let you go'
          options.push({
            text: 'Phew! That was close!',
            statChanges: {
              property
            }
          })
        } else {
          message =
            'You attempt to convince the farmhand that the ' +
            selectedAnimal +
            ' was yours all along. However, the farmhand, skeptical of your claims alerts the family of your deeds. They plead their case before a judge.'
          options.push({
            text: 'Plead before a judge',
            action: {
              event: path,
              method: 'trial',
              context: {
                selectedAnimal: selectedAnimal,
                animalCount: animalCount
              }
            }
          })
        }
        daapi.pushInteractionModalQueue({
          title: 'Nice ' + selectedAnimal + " you've got there...",
          message,
          image: img,
          options: [...options]
        })
      },
      trial({ selectedAnimal, animalCount }) {
        var message
        let state = daapi.getState()
        var options = []
        var icons = []
        var rngesus = Math.random()
        var property = {}
        property[selectedAnimal] = animalCount

        var character = state.characters[state.current.id]
        var rngesusFactor =
          character.skills.eloquence / 100 + state.current.influence / 30000
        var currentClass = daapi.calculateCurrentClass()

        if (rngesus <= 0 && rngesus <= 0.25 + rngesusFactor) {
          message =
            'You argue your case and managed to convince the judge that the ' +
            selectedAnimal +
            ' was yours all along.'
          if (rngesus <= 0.5) {
            message +=
              ' The judge not only gives the ' +
              selectedAnimal +
              " to you, but also decides to compensate you for any 'damages' that might have been incured"
            options.push({
              text: 'I fooled them!',
              statChanges: {
                cash: Math.random() * 50,
                prestige: 10,
                influence: 15,
                property,
                scaleByRevenue: ['cash', 'influence', 'prestige']
              }
            })
          } else {
            options.push({
              text: ' I fooled them!',
              statChanges: {
                prestige: 10,
                influence: 15,
                property,
                scaleByRevenue: ['influence', 'prestige']
              }
            })
          }
        } else if (rngesus <= 0.25 && rngesus <= 0.5 + rngesusFactor) {
          message =
            'You argue your case however, the judge remains skeptical about your claim. In the end, he offers to give the ' +
            selectedAnimal +
            ' to you as long as you pay a small fee.'
          options.push({
            text: 'Lucky the judge was crooked!',
            statChanges: {
              cash: -Math.random() * 20,
              prestige: 10,
              influence: 15,
              property,
              scaleByRevenue: ['cash', 'influence', 'prestige']
            }
          })
        } else if (rngesus <= 0.5 && rngesus <= 0.75 + rngesusFactor) {
          message =
            'The judge does not believe you at all and decides to return the stolen property to their rightful owners. '
          if (state.current.flagIsSenetorialClass) {
            message +=
              'You have been convicted of furtum and have been barred from the senate for your transgressions'
            daapi.addTrait({
              characterId: state.current.id,
              trait: 'barredFromSenate'
            })
            icons.push(img3)
            options.push({
              text:
                'What an embarrassment to be caught doing such a petty crime! This was a horrible mistake!',
              statChanges: {
                prestige: -20,
                influence: -25,
                scaleByRevenue: ['influence', 'prestige']
              },
              icons
            })
          } else if (currentClass >= 5) {
            options.push({
              text:
                'What an embarrassment to be caught doing such a petty crime! This was a mistake...',
              statChanges: {
                cash: -Math.random() * 60,
                prestige: -15,
                influence: -20,
                scaleByRevenue: ['cash', 'influence', 'prestige']
              }
            })
          } else {
            options.push({
              text:
                "I didn't have the right to steal... I deserve this punishment...",
              statChanges: {
                prestige: -10,
                influence: -15,
                scaleByRevenue: ['influence', 'prestige']
              }
            })
          }
        } else {
          message =
            'The judge does not believe your story at all and not only decides to return the stolen property, but fines you a hefty sum as well! '
          if (state.current.flagIsSenetorialClass) {
            message +=
              'You have been convicted of furtum and have been barred from the senate for your transgressions'
            daapi.addTrait({
              characterId: state.current.id,
              trait: 'barredFromSenate'
            })
            icons.push(img3)
            options.push({
              text:
                'What an embarrassment to be caught doing such a petty crime! This was a horrible mistake!',
              statChanges: {
                cash: -Math.random() * 70,
                prestige: -20,
                influence: -25,
                scaleByRevenue: ['cash', 'influence', 'prestige']
              },
              icons
            })
          } else if (currentClass >= 5) {
            options.push({
              text:
                'What an embarrassment to be caught doing such a petty crime! This was a mistake...',
              statChanges: {
                cash: -Math.random() * 60,
                prestige: -15,
                influence: -20,
                scaleByRevenue: ['cash', 'influence', 'prestige']
              }
            })
          } else {
            options.push({
              text:
                "I didn't have the right to steal... I deserve this punishment...",
              statChanges: {
                cash: -Math.random() * 50,
                prestige: -10,
                influence: -15,
                scaleByRevenue: ['cash', 'influence', 'prestige']
              }
            })
          }
        }

        daapi.pushInteractionModalQueue({
          title: 'Nice ' + selectedAnimal + " you've got there...",
          message,
          image: img,
          options: [...options]
        })
      },
      greed({ selectedAnimal, animalCount }) {
        var message
        var options = []
        var rngesus = Math.random()
        var property = {}
        property[selectedAnimal] = animalCount

        var currentClass = daapi.calculateCurrentClass()

        if (rngesus <= 0.5) {
          message =
            'You return your would be prize to the rivaling family and they mercifully, forgive you for your transgressions. However, due to your blatant display of thievery, nasty rumors about you have begun to circulate around town'

          if (currentClass >= 5) {
            options.push({
              text:
                'This greed has caused nothing but embarrassment! I have made a huge mistake!',
              statChanges: {
                prestige: -15,
                influence: -20,
                scaleByRevenue: ['influence', 'prestige']
              }
            })
          } else {
            options.push({
              text: 'This was an embarrassement',
              tooltip: 'This was due to your greed',
              statChanges: {
                prestige: -10,
                influence: -15,
                scaleByRevenue: ['influence', 'prestige']
              }
            })
          }
        } else {
          message =
            'You return your would be prize to the rivaling family and they fine you a hefty sum for the ruckus that you have caused. As you and your servants are escorted away from the property, you hear the family begin to wickedly gossip against you! You are only thankful that they did not decide to take this matter to court'
          if (currentClass >= 5) {
            options.push({
              text:
                'This greed has caused nothing but embarrassment! I have made a huge mistake!',
              statChanges: {
                cash: -Math.random() * 60,
                prestige: -15,
                influence: -20,
                scaleByRevenue: ['cash', 'influence', 'prestige']
              }
            })
          } else {
            options.push({
              text: 'This was an embarrassement',
              tooltip: 'This was due to your greed',
              statChanges: {
                cash: -Math.random() * 50,
                prestige: -10,
                influence: -15,
                scaleByRevenue: ['influence', 'prestige']
              }
            })
          }
        }

        daapi.pushInteractionModalQueue({
          title: 'Nice ' + selectedAnimal + " you've got there...",
          message,
          image: img,
          options: [...options]
        })
      },
      letItBe({ selectedAnimal }) {
        daapi.pushInteractionModalQueue({
          title: 'Nice ' + selectedAnimal + " you've got there...",
          message:
            'It was an interesting thought however, due to your better judgement, you decide that such actions would be too risky. You continue your walk without any further thought on the matter',
          image: img,
          requireChoice: true,
          options: [
            {
              text: 'No one deserves to be stolen from!'
            }
          ]
        })
      }
    }
  }
})()
