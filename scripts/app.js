//GitHub link -  https://maryannetriggs.github.io/GA-project1-frogger/

// *************************************************FROGGER******************************************************

window.addEventListener('DOMContentLoaded', () => {

  // Setting board width and height
  const width = 10


  // Variables for creating grid
  const grid = document.querySelector('.grid')
  const cells = []


  // Logic to create grid
  for (let i = 0; i < width ** 2; i++) {
    const cell = document.createElement('div')
    grid.appendChild(cell)
    cells.push(cell)
  }

  // Sound FX variables
  const soundtrack = new Audio('./audio/dp_frogger.mp3')
  const gameOverSound = new Audio('./audio/sound-frogger-time.wav')
  const youWonSound = new Audio('./audio/sound-frogger-extra.wav')
  const froggerHopSound = new Audio('./audio/sound-frogger-hop.wav')
  froggerHopSound.playbackRate = 3


  // Declaring game variables for use inside click event handler
  let gameTimer, clearTimer, slowItems, fastItems, gameEnding
  

  // Creation and positioning of frog and lilypad
  const frog = document.createElement('div')
  const lily = document.createElement('div')

  cells[cells.length - 1].appendChild(frog)
  frog.classList.add('frog')
  cells[0].appendChild(lily)
  lily.classList.add('lily')


  // Game ended banner logic
  const gameEndText = document.createElement('h2')
  const playAgainText = document.createElement('p')
  playAgainText.innerHTML = 'press the reset button to play again'
  const declareWinner = document.querySelector('.gameEndText')


  // Win/lose function
  function winOrLose(gameEnding) {
    if (gameEnding === 'lose') {
      gameEndText.innerHTML = 'GAME OVER'
      frog.classList.remove('frog')
      gameOverSound.play()
    } else {
      gameEndText.innerHTML = 'YOU WON!!'
      youWonSound.play()
    }
    declareWinner.appendChild(gameEndText)
    declareWinner.appendChild(playAgainText)
    declareWinner.style.border = '10px solid black'
    document.removeEventListener('keyup', keyUpEvent)
    clearInterval(gameTimer)
    clearTimeout(clearTimer)
    clearInterval(slowItems)
    clearInterval(fastItems)
    soundtrack.pause()
  }


  // KeyUp event function, frog move instructions and collision detection
  const keyUpEvent = e => {

    // Frogger hop noise
    froggerHopSound.play()


    // Ensuring frog moves with log
    const parent = frog.parentElement
    let newFrogPosition = 0

    parent.removeChild(frog)
    if (parent.classList.contains('log')) {
      newFrogPosition = cells.indexOf(parent.parentElement)
    } else {
      newFrogPosition = cells.indexOf(parent)
    }


    // Frog keyboard controls
    const x = newFrogPosition % width
    const y = Math.floor(newFrogPosition / width)

    switch (e.keyCode) {
      case 37: if (x > 0) newFrogPosition -= 1
        break
      case 38: if (y > 0) newFrogPosition -= width
        break
      case 39: if (x < width - 1) newFrogPosition += 1
        break
      case 40: if (y < width - 1) newFrogPosition += width
        break
    }


    // Collision detection based on cell frog is moving into
    const newPositionChildren = cells[newFrogPosition].children // Children of the cell frog is about to jump into
    if (newPositionChildren.length === 0) { // if there are no children frog is either jumping onto a safespace or a river
      cells[newFrogPosition].appendChild(frog) // move frog into new cell
      if (cells[newFrogPosition].classList.contains('river1') || cells[newFrogPosition].classList.contains('river2')) { // if frog jumps into either river
        // GAME OVER - frog drowns in river
        gameEnding = 'lose'
        winOrLose(gameEnding)
      } else { // frog is in a safe space or road and game continues
        frog.classList.add('animated', 'pulse')
        // GAME CONTINUES - frog is still safe
      }
    } else { // if there are children in the cell frog is jumping into
      const child = newPositionChildren[0] // getting the first child of new cell
      if (child.classList.contains('car') || child.classList.contains('car2')) { // if first child is a car
        cells[newFrogPosition].appendChild(frog) // move frog and game ends
        // GAME OVER - frog has moved into path of car
        gameEnding = 'lose'
        winOrLose(gameEnding)
      } else { // frog has landed on either lilypad or log
        child.appendChild(frog) // move frog into new cell
        if (child.classList.contains('lily')) { // frog has landed on lilypad
          // YOU WIN - frog has reached lilypad
          gameEnding = 'win'
          winOrLose(gameEnding)
        } else { // frog has landed on a log and game continues
          frog.classList.add('animated', 'pulse')
          // GAME CONTINUES - frog is still safe
        }
      }
    }
  }


  // Frog controls logic
  document.addEventListener('keyup', keyUpEvent)


  // Creation of river arrays
  const river1 = cells.slice(20, 30)
  river1.forEach(element => {
    element.classList.add('river1')
  })
  const river2 = cells.slice(30, 40)
  river2.forEach(element => {
    element.classList.add('river2')
  })


  // Creation of road arrays
  const road1 = cells.slice(50, 60)
  road1.forEach(element => {
    element.classList.add('road')
  })
  const road2 = cells.slice(60, 70)
  road2.forEach(element => {
    element.classList.add('road')
  })
  const road3 = cells.slice(70, 80)
  road3.forEach(element => {
    element.classList.add('road')
  })


  // Creation of safe space arrays
  const safeSpace1 = cells.slice(0, 20)
  safeSpace1.forEach(element => {
    element.classList.add('safespace')
  })
  const safeSpace2 = cells.slice(40, 50)
  safeSpace2.forEach(element => {
    element.classList.add('safespace')
  })
  const safeSpace3 = cells.slice(80, 100)
  safeSpace3.forEach(element => {
    element.classList.add('safespace')
  })


  // Creation and positioning of slow cars
  const slowCar1 = document.createElement('div')
  road3[0].appendChild(slowCar1)
  const slowCar2 = document.createElement('div')
  road3[3].appendChild(slowCar2)
  const slowCar3 = document.createElement('div')
  road3[6].appendChild(slowCar3)


  // Creation and positioning of fast cars
  const fastCar1 = document.createElement('div')
  road1[9].appendChild(fastCar1)
  const fastCar2 = document.createElement('div')
  road1[4].appendChild(fastCar2)


  // Creation and positioning of slow logs
  const slowLog1of2 = document.createElement('div')
  river2[0].appendChild(slowLog1of2)
  const slowLog2of2 = document.createElement('div')
  river2[1].appendChild(slowLog2of2)
  const slowLog1of22 = document.createElement('div')
  river2[6].appendChild(slowLog1of22)
  const slowLog2of22 = document.createElement('div')
  river2[7].appendChild(slowLog2of22)


  // Creation and positioning of fast logs
  const fastLog1of2 = document.createElement('div')
  river1[8].appendChild(fastLog1of2)
  const fastLog2of2 = document.createElement('div')
  river1[9].appendChild(fastLog2of2)
  const fastLog1of22 = document.createElement('div')
  river1[3].appendChild(fastLog1of22)
  const fastLog2of22 = document.createElement('div')
  river1[4].appendChild(fastLog2of22)


  // Car and log array creation and addition of classes
  const slowCars = [slowCar1, slowCar2, slowCar3]
  const fastCars = [fastCar1, fastCar2]
  const slowLogs = [slowLog1of2, slowLog2of2, slowLog1of22, slowLog2of22]
  const fastLogs = [fastLog1of2, fastLog2of2, fastLog1of22, fastLog2of22]

  slowCars.forEach(element => {
    element.classList.add('car')
  })
  fastCars.forEach(element => {
    element.classList.add('car2')
  })
  slowLogs.forEach(element => {
    element.classList.add('log')
  })
  fastLogs.forEach(element => {
    element.classList.add('log')
  })


  // Buttons

  // Reset button action
  const resetButton = document.querySelector('.reset')
  resetButton.addEventListener(('click'), () => {
    location.reload()
  })


  // Start button actions
  const startGame = document.querySelector('.start')
  startGame.addEventListener(('click'), () => {


    // Game timer
    const timer = document.querySelector('#timer')
    const timeRemaining = document.querySelector('.timer')
    let countdown = 12

    gameTimer = setInterval(() => {
      countdown--
      timer.innerHTML = countdown
      if (countdown === 0) {
        timeRemaining.classList.add('animated', 'flash')
      }
    }, 1000)


    // Timer action if player runs out of time
    clearTimer = setTimeout(() => {
      clearInterval(gameTimer)
      // GAME OVER - ran out of time
      gameEnding = 'lose'
      winOrLose(gameEnding)
      
    }, 12000)


    // Playing soundtrack on loop when start button clicked
    soundtrack.loop = true
    soundtrack.play()


    // Logic for movement of slow items and their collision with frog

    // Slow cars
    slowItems = setInterval(() => {

      slowCars.forEach(car => {
        const roadPosition = road3.indexOf(car.parentElement) // move -> 

        road3[roadPosition].removeChild(car)
        if (roadPosition === road3.length - 1) { 
          road3[0].appendChild(car)
        } else {
          road3[roadPosition + 1].appendChild(car)
        }
        if (car.parentElement.childElementCount > 1) { // if there is more than one child element in the cell the car has moved into there must have been a collision with a frog and game over
          // GAME OVER - frog run over by car
          gameEnding = 'lose'
          winOrLose(gameEnding)
        }
      })

      // Slow logs
      slowLogs.forEach(log => {
        const riverPosition = river2.indexOf(log.parentElement) // move ->

        river2[riverPosition].removeChild(log)
        if (riverPosition === river2.length - 1) {
          river2[0].appendChild(log)
          if (log.childElementCount === 1) { // if the log has reached the edge of the board and there is a child element within it, the frog has gone overboard and game over
            // GAME OVER - frog washed away down the river
            frog.parentElement.removeChild(frog)
            gameEnding = 'lose'
            winOrLose(gameEnding)
          }
        } else {
          river2[riverPosition + 1].appendChild(log)
        }
      })

    }, 1000)


    // Logic for movement of fast items and their collision with frog

    // Fast cars
    fastItems = setInterval(() => {

      fastCars.forEach(car => {
        const roadPosition = road1.indexOf(car.parentElement) // move <-

        road1[roadPosition].removeChild(car)
        if (roadPosition === 0) {
          road1[9].appendChild(car)
        } else {
          road1[roadPosition - 1].appendChild(car)
        }
        if (car.parentElement.childElementCount > 1) {
          // GAME OVER - frog run over by car
          gameEnding = 'lose'
          winOrLose(gameEnding)
        }
      })

      // Fast logs
      fastLogs.forEach(log => {
        const riverPosition = river1.indexOf(log.parentElement) // move <-

        river1[riverPosition].removeChild(log)
        if (riverPosition === 0) {
          river1[9].appendChild(log)
          if (log.childElementCount === 1) {
            // GAME OVER - frog washed away down the river
            frog.parentElement.removeChild(frog)
            gameEnding = 'lose'
            winOrLose(gameEnding)
          }
        } else {
          river1[riverPosition - 1].appendChild(log)
        }
      })

    }, 400)

  })

})