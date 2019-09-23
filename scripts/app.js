// https://maryannetriggs.github.io/project-01/

window.addEventListener('DOMContentLoaded', () => {


  // Setting board width and height
  const width = 10


  // Variables for creating grid
  const grid = document.querySelector('.grid')
  const cells = []

  // KeyUp event function
  const keyUpEvent = e => {

    const x = frogIndex % width
    const y = Math.floor(frogIndex / width)

    cells[frogIndex].classList.remove('frog')

    switch (e.keyCode) {
      case 37: if (x > 0) frogIndex -= 1
        break
      case 38: if (y > 0) frogIndex -= width
        break
      case 39: if (x < width - 1) frogIndex += 1
        break
      case 40: if (y < width - 1) frogIndex += width
        break
    }

    cells[frogIndex].classList.add('frog')

    winOrLose()
  }

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

  // Creating road array
  const road = cells.slice(50, 80)
  road.forEach(element => {
    element.classList.add('road')
  })

  // Variables for game pieces
  let frogIndex = cells.length - 1
  const lilyIndex = 0

  // Slow cars 
  const slowCar1StartIndex = 20
  let slowCar1Index = slowCar1StartIndex
  const slowCar2StartIndex = 23
  let slowCar2Index = slowCar2StartIndex
  const slowCar3StartIndex = 26
  let slowCar3Index = slowCar3StartIndex

  // Fast cars
  const fastCar1StartIndex = 9
  let fastCar1Index = fastCar1StartIndex
  const fastCar2StartIndex = 4
  let fastCar2Index = fastCar2StartIndex

  // Slow logs 
  const slowLog1Of2StartIndex = 1
  let slowLog1Of2Index = slowLog1Of2StartIndex
  const slowLog2Of2StartIndex = 0
  let slowLog2Of2Index = slowLog2Of2StartIndex
  const slow2Log1Of2StartIndex = 7
  let slow2Log1Of2Index = slow2Log1Of2StartIndex
  const slow2Log2Of2StartIndex = 6
  let slow2Log2Of2Index = slow2Log2Of2StartIndex

  // Fast logs 
  const fastLog1Of2StartIndex = 8
  let fastLog1Of2Index = fastLog1Of2StartIndex
  const fastLog2Of2StartIndex = 9
  let fastLog2Of2Index = fastLog2Of2StartIndex
  const fast2Log1Of2StartIndex = 2
  let fast2Log1Of2Index = fast2Log1Of2StartIndex
  const fast2Log2Of2StartIndex = 3
  let fast2Log2Of2Index = fast2Log2Of2StartIndex

  

  // Logic to create frog, lilypad and car divs
  cells[frogIndex].classList.add('frog')
  cells[lilyIndex].classList.add('lily')
  road[slowCar1Index].classList.add('car1')
  road[slowCar2Index].classList.add('car1')
  road[slowCar3Index].classList.add('car1')
  road[fastCar1Index].classList.add('car2')
  road[fastCar2Index].classList.add('car2')

  // Logic to create log divs
  river1[slowLog1Of2Index].classList.add('log1')
  river1[slowLog2Of2Index].classList.add('log1')
  river1[slow2Log1Of2Index].classList.add('log1')
  river1[slow2Log2Of2Index].classList.add('log1')

  river2[fastLog1Of2Index].classList.add('log1')
  river2[fastLog2Of2Index].classList.add('log1')
  river2[fast2Log1Of2Index].classList.add('log1')
  river2[fast2Log2Of2Index].classList.add('log1')
  
  // Frog controls logic

  document.addEventListener('keyup', keyUpEvent)


  // Win/lose condition

  const gameEndText = document.createElement('h1')

  function winOrLose() {
    if (frogIndex === lilyIndex) {
      gameEndText.innerHTML = 'YOU WON!'
      grid.appendChild(gameEndText)
      cells[frogIndex].classList.remove('frog')
      cells[frogIndex].classList.remove('lily')
      cells[frogIndex].classList.add('winner')
      document.removeEventListener('keyup', keyUpEvent)
    } else if (frogIndex === slowCar1Index || frogIndex === slowCar2Index || frogIndex === slowCar3Index || frogIndex === fastCar1Index || frogIndex === fastCar2Index) {
      gameEndText.innerHTML = 'YOU LOST!'
      grid.appendChild(gameEndText)
      cells[frogIndex].classList.remove('frog')
      cells[frogIndex].classList.add('splat')
      document.removeEventListener('keyup', keyUpEvent)
    }
  }


  // Car Animation

  const startGame = document.querySelector('.start')

  startGame.addEventListener(('click'), () => {

    // Slow cars
    setInterval(() => {

      road[slowCar1Index].classList.remove('car1')
      road[slowCar2Index].classList.remove('car1')
      road[slowCar3Index].classList.remove('car1')
      slowCar1Index++
      slowCar2Index++
      slowCar3Index++
      winOrLose()
      if (slowCar1Index > slowCar1StartIndex + 9) {
        slowCar1Index = slowCar1StartIndex
      } else if (slowCar2Index > slowCar2StartIndex + 6) {
        slowCar2Index = slowCar2StartIndex - 3
      } else if (slowCar3Index > slowCar3StartIndex + 3) {
        slowCar3Index = slowCar3StartIndex - 6
      }
      road[slowCar1Index].classList.add('car1')
      road[slowCar2Index].classList.add('car1')
      road[slowCar3Index].classList.add('car1')

    }, 1000)

    // Fast cars
    setInterval(() => {
      road[fastCar1Index].classList.remove('car2')
      road[fastCar2Index].classList.remove('car2')
      fastCar1Index--
      fastCar2Index--
      winOrLose()
      if (fastCar1Index < fastCar1StartIndex - 9) {
        fastCar1Index = fastCar1StartIndex
      } else if (fastCar2Index < fastCar2StartIndex - 4) {
        fastCar2Index = fastCar2StartIndex + 5
      }
      road[fastCar1Index].classList.add('car2')
      road[fastCar2Index].classList.add('car2')

    }, 400)

    // Slow log 1 - part 1 of 2
    setInterval(() => {

      river1[slowLog1Of2Index].classList.remove('log1')
      slowLog1Of2Index++
      if (slowLog1Of2Index > slowLog1Of2StartIndex + 8) {
        slowLog1Of2Index = slowLog1Of2StartIndex - 1
      }
      river1[slowLog1Of2Index].classList.add('log1')

    }, 1000)

    // Slow log 1 - part 2 of 2
    setInterval(() => {

      river1[slowLog2Of2Index].classList.remove('log1')
      slowLog2Of2Index++
      if (slowLog2Of2Index > slowLog2Of2StartIndex + 9) {
        slowLog2Of2Index = slowLog2Of2StartIndex
      }
      river1[slowLog2Of2Index].classList.add('log1')

    }, 1000)

    // Slow log 2 - part 1 of 2
    setInterval(() => {

      river1[slow2Log1Of2Index].classList.remove('log1')
      slow2Log1Of2Index++
      if (slow2Log1Of2Index > slow2Log1Of2StartIndex + 2) {
        slow2Log1Of2Index = slow2Log1Of2StartIndex - 7
      }
      river1[slow2Log1Of2Index].classList.add('log1')

    }, 1000)

    // Slow log 2 - part 2 of 2
    setInterval(() => {

      river1[slow2Log2Of2Index].classList.remove('log1')
      slow2Log2Of2Index++
      if (slow2Log2Of2Index > slow2Log2Of2StartIndex + 3) {
        slow2Log2Of2Index = slow2Log2Of2StartIndex - 6
      }
      river1[slow2Log2Of2Index].classList.add('log1')

    }, 1000)

    // Fast log 1 - part 1 of 2
    setInterval(() => {

      river2[fastLog1Of2Index].classList.remove('log1')
      fastLog1Of2Index--
      if (fastLog1Of2Index < fastLog1Of2StartIndex - 8) {
        fastLog1Of2Index = fastLog1Of2StartIndex + 1
      }
      river2[fastLog1Of2Index].classList.add('log1')

    }, 700)

    // Fast log 1 - part 2 of 2
    setInterval(() => {

      river2[fastLog2Of2Index].classList.remove('log1')
      fastLog2Of2Index--
      if (fastLog2Of2Index < fastLog2Of2StartIndex - 9) {
        fastLog2Of2Index = fastLog2Of2StartIndex
      }
      river2[fastLog2Of2Index].classList.add('log1')

    }, 700)

    // Fast log 2 - part 1 of 2
    setInterval(() => {

      river2[fast2Log1Of2Index].classList.remove('log1')
      fast2Log1Of2Index--
      if (fast2Log1Of2Index < fast2Log1Of2StartIndex - 2) {
        fast2Log1Of2Index = fast2Log1Of2StartIndex + 7
      }
      river2[fast2Log1Of2Index].classList.add('log1')

    }, 700)

    // Fast log 2 - part 2 of 2
    setInterval(() => {

      river2[fast2Log2Of2Index].classList.remove('log1')
      fast2Log2Of2Index--
      if (fast2Log2Of2Index < fast2Log2Of2StartIndex - 3) {
        fast2Log2Of2Index = fast2Log2Of2StartIndex + 6
      }
      river2[fast2Log2Of2Index].classList.add('log1')

    }, 700)


  })





})