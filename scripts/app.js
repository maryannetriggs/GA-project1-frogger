// https://maryannetriggs.github.io/project-01/

window.addEventListener('DOMContentLoaded', () => {


  // Setting board width and height
  const width = 10


  // Variables for creating grid
  const grid = document.querySelector('.grid')
  const cells = []

  // KeyUp event function
  const keyUpEvent = e => {
    // console.log(getDirection)
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

    winOrLose(frogIndex, lilyIndex, slowCar1Index, slowCar2Index, slowCar3Index, fastCar1Index, fastCar2Index)
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


  // Variables for game pieces
  let frogIndex = cells.length - 1
  const lilyIndex = 0

  // Slow cars 
  const slowCar1StartIndex = 0.7 * cells.length
  let slowCar1Index = slowCar1StartIndex
  const slowCar2StartIndex = 3 + 0.7 * cells.length
  let slowCar2Index = slowCar2StartIndex
  const slowCar3StartIndex = 6 + 0.7 * cells.length
  let slowCar3Index = slowCar3StartIndex

  // Fast cars
  const fastCar1StartIndex = (0.6 * cells.length) - 1
  let fastCar1Index = fastCar1StartIndex
  const fastCar2StartIndex = (0.6 * cells.length) - 6
  let fastCar2Index = fastCar2StartIndex


  // Creating river 1 array
  const river1 = cells.slice(30, 40)
  river1.forEach(element => {
    element.classList.add('river1')
  })


  // Logic to create frog, lilypad and car divs
  cells[frogIndex].classList.add('frog')
  cells[lilyIndex].classList.add('lily')
  cells[slowCar1Index].classList.add('car1')
  cells[slowCar2Index].classList.add('car1')
  cells[slowCar3Index].classList.add('car1')
  cells[fastCar1Index].classList.add('car2')
  cells[fastCar2Index].classList.add('car2')
  
  // Frog controls logic
  document.addEventListener('keyup', keyUpEvent)


  // Win condition

  const gameEndText = document.createElement('h1')

  function winOrLose(frogIndex, lilyIndex, slowCar1Index, slowCar2Index, slowCar3Index, fastCar1Index, fastCar2Index) {
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

      cells[slowCar1Index].classList.remove('car1')
      cells[slowCar2Index].classList.remove('car1')
      cells[slowCar3Index].classList.remove('car1')
      slowCar1Index++
      slowCar2Index++
      slowCar3Index++
      winOrLose(frogIndex, lilyIndex, slowCar1Index, slowCar2Index, slowCar3Index, fastCar1Index, fastCar2Index)
      if (slowCar1Index > slowCar1StartIndex + width - 1) {
        slowCar1Index = slowCar1StartIndex
      } else if (slowCar2Index > slowCar2StartIndex + width - 4) {
        slowCar2Index = slowCar2StartIndex - 3
      } else if (slowCar3Index > slowCar3StartIndex + width - 7) {
        slowCar3Index = slowCar3StartIndex - 6
      }
      cells[slowCar1Index].classList.add('car1')
      cells[slowCar2Index].classList.add('car1')
      cells[slowCar3Index].classList.add('car1')

    }, 1000)

    // Fast cars
    setInterval(() => {
      cells[fastCar1Index].classList.remove('car2')
      cells[fastCar2Index].classList.remove('car2')
      fastCar1Index--
      fastCar2Index--
      winOrLose(frogIndex, lilyIndex, slowCar1Index, slowCar2Index, slowCar3Index, fastCar1Index, fastCar2Index)
      if (fastCar1Index < fastCar1StartIndex - width + 1) {
        fastCar1Index = fastCar1StartIndex
      } else if (fastCar2Index < fastCar2StartIndex - width + 6) {
        fastCar2Index = fastCar2StartIndex + 5
      }
      cells[fastCar1Index].classList.add('car2')
      cells[fastCar2Index].classList.add('car2')

    }, 400)

  })





})