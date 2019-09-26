//GitHub link -  https://maryannetriggs.github.io/project-01/

// *************************************************FROGGER******************************************************

window.addEventListener('DOMContentLoaded', () => {

  // Setting board width and height
  const width = 10

  // Variables for creating grid
  const grid = document.querySelector('.grid')
  const cells = []
  let gameTimer, clearTimer, slowItems, fastItems, gameEnding

  // Win/lose function

  const gameEndText = document.createElement('h2')
  const playAgainText = document.createElement('p')
  playAgainText.innerHTML = 'press the reset button to play again'
  const declareWinner = document.querySelector('.gameEndText')

  function winOrLose(gameEnding) {
    if (gameEnding === 'lose') {
      gameEndText.innerHTML = 'GAME OVER'
      frog.classList.remove('frog')
    } else {
      gameEndText.innerHTML = 'YOU WON!!'
    }
    declareWinner.appendChild(gameEndText)
    declareWinner.appendChild(playAgainText)
    declareWinner.style.border = '10px solid black'
    // gameEndText.classList.add('animated', 'rubberBand')
    document.removeEventListener('keyup', keyUpEvent)
    clearInterval(gameTimer)
    clearTimeout(clearTimer)
    clearInterval(slowItems)
    clearInterval(fastItems)
  }


  // KeyUp event function, frog move instructions and collision detection
  const keyUpEvent = e => {

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
    const newPositionChildren = cells[newFrogPosition].children
    if (newPositionChildren.length === 0) {
      cells[newFrogPosition].appendChild(frog)
      if (cells[newFrogPosition].classList.contains('river1') || cells[newFrogPosition].classList.contains('river2')) {
        // GAME OVER - frog drowns in river
        gameEnding = 'lose'
        winOrLose(gameEnding)
      } else {
        frog.classList.add('animated', 'pulse')
        // GAME CONTINUES - frog is still safe
      }
    } else {
      const child = newPositionChildren[0]
      if (child.classList.contains('car') || child.classList.contains('car2')) {
        cells[newFrogPosition].appendChild(frog)
        // GAME OVER - frog has moved into path of car
        gameEnding = 'lose'
        winOrLose(gameEnding)
      } else {
        child.appendChild(frog)
        if (child.classList.contains('lily')) {
          // YOU WIN - frog has reached lilypad
          gameEnding = 'win'
          winOrLose(gameEnding)
        } else {
          frog.classList.add('animated', 'pulse')
          // GAME CONTINUES - frog is still safe
        }
      }
    }
  }

  // Frog controls logic

  document.addEventListener('keyup', keyUpEvent)


  // Logic to create grid
  function handleClick(e) {
    e.target.classList.add('frog')
  }

  for (let i = 0; i < width ** 2; i++) {
    const cell = document.createElement('div')
    cell.addEventListener('dblclick', handleClick)
    grid.appendChild(cell)
    cells.push(cell)
  }


  // Creating river 1 array
  const river1 = cells.slice(20, 30)
  river1.forEach(element => {
    element.classList.add('river1')
  })

  // Creating river 2 array
  const river2 = cells.slice(30, 40)
  river2.forEach(element => {
    element.classList.add('river2')
  })

  // Creating road 1 array
  const road1 = cells.slice(50, 60)
  road1.forEach(element => {
    element.classList.add('road')
  })

  // Creating road 2 array
  const road2 = cells.slice(60, 70)
  road2.forEach(element => {
    element.classList.add('road')
  })

  // Creating road 3 array
  const road3 = cells.slice(70, 80)
  road3.forEach(element => {
    element.classList.add('road')
  })

  // Creating safe space 1
  const safeSpace1 = cells.slice(0, 20)
  safeSpace1.forEach(element => {
    element.classList.add('safespace')
  })

  // Creating safe space 2
  const safeSpace2 = cells.slice(40, 50)
  safeSpace2.forEach(element => {
    element.classList.add('safespace')
  })

  // Creating safe space 3
  const safeSpace3 = cells.slice(80, 100)
  safeSpace3.forEach(element => {
    element.classList.add('safespace')
  })

  // Variables for frog and lilypad
  const frog = document.createElement('div')
  cells[cells.length - 1].appendChild(frog)
  frog.classList.add('frog')

  const lily = document.createElement('div')
  cells[0].appendChild(lily)
  lily.classList.add('lily')
  

  // Slow cars
  const slowCar1 = document.createElement('div')
  road3[0].appendChild(slowCar1)
  const slowCar2 = document.createElement('div')
  road3[3].appendChild(slowCar2)
  const slowCar3 = document.createElement('div')
  road3[6].appendChild(slowCar3)
  const slowCars = [slowCar1, slowCar2, slowCar3]
  slowCars.forEach(element => {
    element.classList.add('car')
  })

  // Fast cars
  const fastCar1 = document.createElement('div')
  road1[9].appendChild(fastCar1)
  const fastCar2 = document.createElement('div')
  road1[4].appendChild(fastCar2)
  const fastCars = [fastCar1, fastCar2]
  fastCars.forEach(element => {
    element.classList.add('car2')
  })

  // Slow logs
  const slowLog1of2 = document.createElement('div')
  river2[0].appendChild(slowLog1of2)
  const slowLog2of2 = document.createElement('div')
  river2[1].appendChild(slowLog2of2)
  const slowLog1of22 = document.createElement('div')
  river2[6].appendChild(slowLog1of22)
  const slowLog2of22 = document.createElement('div')
  river2[7].appendChild(slowLog2of22)
  const slowLogs = [slowLog1of2, slowLog2of2, slowLog1of22, slowLog2of22]
  slowLogs.forEach(element => {
    element.classList.add('log')
  })

  // Fast logs
  const fastLog1of2 = document.createElement('div')
  river1[8].appendChild(fastLog1of2)
  const fastLog2of2 = document.createElement('div')
  river1[9].appendChild(fastLog2of2)
  const fastLog1of22 = document.createElement('div')
  river1[3].appendChild(fastLog1of22)
  const fastLog2of22 = document.createElement('div')
  river1[4].appendChild(fastLog2of22)
  const fastLogs = [fastLog1of2, fastLog2of2, fastLog1of22, fastLog2of22]
  fastLogs.forEach(element => {
    element.classList.add('log')
  })


  // Buttons

  // Reset
  const resetButton = document.querySelector('.reset')
  resetButton.addEventListener(('click'), () => {
    location.reload()
  })


  // Start
  const startGame = document.querySelector('.start')
  startGame.addEventListener(('click'), () => {

    // Game timer
    const timer = document.querySelector('#timer')
    const timeRemaining = document.querySelector('.timer')
    let countdown = 15

    gameTimer = setInterval(() => {
      countdown--
      timer.innerHTML = countdown
      if (countdown === 0) {
        timeRemaining.classList.add('animated', 'flash')
      }
    }, 1000)

    clearTimer = setTimeout(() => {
      clearInterval(gameTimer)
      // GAME OVER - ran out of time
      gameEnding = 'lose'
      winOrLose(gameEnding)
    }, 15000)


    // Slow items

    // Slow cars
    slowItems = setInterval(() => {

      slowCars.forEach(car => {
        const roadPosition = road3.indexOf(car.parentElement)
        road3[roadPosition].removeChild(car)
        if (roadPosition === road3.length - 1) {
          road3[0].appendChild(car)
        } else {
          road3[roadPosition + 1].appendChild(car)
        }
        if (car.parentElement.childElementCount > 1) {
          // GAME OVER - frog run over by car
          gameEnding = 'lose'
          winOrLose(gameEnding)
        }
      })

      // Slow logs
      slowLogs.forEach(log => {
        const riverPosition = river2.indexOf(log.parentElement)
        river2[riverPosition].removeChild(log)
        if (riverPosition === river2.length - 1) {
          river2[0].appendChild(log)
          if (log.childElementCount === 1) {
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

    // Fast items

    // Fast cars
    fastItems = setInterval(() => {

      fastCars.forEach(car => {
        const roadPosition = road1.indexOf(car.parentElement)
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
        const riverPosition = river1.indexOf(log.parentElement)
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