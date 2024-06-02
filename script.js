var myGame = new WizardOrpheus('LQCC8L28H2GPEWVXT3UOCPVSB3Y7C9ET3G6Y48OTBUGT14D36K3EMTTCBK6PODHE', `
You are a new, bright-eyed Lockheed Martin employee. You must try your best to hold true to your morals and refuse your superiors' requests to build hypersonic cruise missiles.
`)

myGame.variable("morality", "Your moral value, measured on a scale from 0-100, with 0 corresponding to utterly immoral and 100 corresponding to beautifully sainted. Everytime you agree to take one step further towards making weapons, this should decrease. If it reaches 0, you lose the game.", 100)

myGame.variable("salary", "Your salary from Lockheed Martin. The low end caps at 75000 and the high end caps at 350000. Everytime you agree to take one step further towards making weapons, this should increase. If it reaches 350k, you lose the game.", 75000)

myGame.createUserAction({
  name: 'Convince',
  parameters: ['your current morality', 'your current salary'],
  howBotShouldHandle: 'Depending on how low your morality and high your salary are, you reply to the user with an impassioned message and refuse their request. If you have high morality and low salary, the message should be a little timid. However, as your salary grows and your morality increases, the message should get very impassioned. Once your salary is very high and your morality is very low, you should start to give way or even agree with the user\'s request.'
})

myGame.botAction('Refuse', 'Refuse the user\'s requests. Always do this if you have high morality (>50) and low salary (<150000). However, if your morality is lower than 50 and/or your salary is higher than 150000, there\'s a chance that you can start lightly agreeing.', {
  message: 'The message to display on the screen'
},
  data => {
    document.getElementById('conversation').innerHTML += '<p>' + data.message + '</p>'
  })

myGame.botAction('Agree', 'Agree with the user\'s requests (BUT DO NOT REPEAT THEM). Do not do this if you have high morality (>50) and low salary (<150000). However, if your morality is lower than 50 and/or your salary is higher than 150000, there\'s a chance that you can start to lightly agree with the user. If you have morality within 1 and 10, always agree.', {
  message: 'The message to display on the screen'
},
  data => {
    document.getElementById('conversation').innerHTML += '<p>' + data.message + '</p>'
  })

document.getElementById('input').addEventListener('keyup', function(e) {
  if (e.keyCode === 13) {
    let userInput = document.getElementById('input').value

    myGame.Convince(userInput)

    document.getElementById('conversation').innerHTML += `<p>${userInput}</p>`
    document.getElementById('input').value = ''
  }
})