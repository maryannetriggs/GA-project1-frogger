// https://maryannetriggs.github.io/project-01/

window.addEventListener('DOMContentLoaded', () => {


  // Setting board width and height
  const width = 10


  // Variables for creating grid
  const grid = document.querySelector('.grid')
  const cells = []


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
  const car1StartIndex = 0.7 * cells.length
  let car1Index = car1StartIndex

  const slowCar1StartIndex = 3 + 0.7 * cells.length
  let slowCar1Index = slowCar1StartIndex

  const car2StartIndex = (0.6 * cells.length) - 1
  let car2Index = car2StartIndex


  // Logic to create frog, lilypad and car divs
  cells[frogIndex].classList.add('frog')
  cells[lilyIndex].classList.add('lily')
  cells[car1Index].classList.add('car1')
  cells[car2Index].classList.add('car2')
  cells[slowCar1Index].classList.add('car1')


  // Frog controls logic
  document.addEventListener('keyup', e => {
    console.log(e.keyCode)

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

    winOrLose(frogIndex, lilyIndex, car1Index, car2Index)
  })
  


  // Win condition

  const gameEndText = document.createElement('h1')

  function winOrLose(frogIndex, lilyIndex, car1Index, car2Index) {
    if (frogIndex === lilyIndex) {
      gameEndText.innerHTML = 'YOU WON!'
      grid.appendChild(gameEndText)
      cells[frogIndex].classList.remove('frog')
      cells[frogIndex].classList.remove('lily')
      cells[frogIndex].classList.add('winner')
    } else if (frogIndex === car1Index || frogIndex === car2Index) {
      gameEndText.innerHTML = 'YOU LOST!'
      grid.appendChild(gameEndText)
      cells[frogIndex].classList.remove('frog')
      cells[frogIndex].classList.add('splat')
    }
  }


  // Car Animation Trials

  const startGame = document.querySelector('.start')

  startGame.addEventListener(('click'), () => {



    setInterval(() => {

      cells[car1Index].classList.remove('car1')
      cells[slowCar1Index].classList.remove('car1')
      car1Index++
      slowCar1Index++
      winOrLose(frogIndex, lilyIndex, car1Index, car2Index)
      if (car1Index > car1StartIndex + width - 1) {
        car1Index = car1StartIndex
      }
      if (slowCar1Index > slowCar1StartIndex + width - 4) {
        slowCar1Index = slowCar1StartIndex - 3
      }
      cells[car1Index].classList.add('car1')
      cells[slowCar1Index].classList.add('car1')

    }, 1000)


    // setInterval(() => {
    //   console.log('slow car create')
    //   createSlowCar()
    // }, 3000)

    setInterval(() => {
      cells[car2Index].classList.remove('car2')
      car2Index--
      winOrLose(frogIndex, lilyIndex, car1Index, car2Index)
      if (car2Index < car2StartIndex - width + 1) {
        car2Index = car2StartIndex
      }
      cells[car2Index].classList.add('car2')
    }, 500)

    // To timeout car movement
    // setTimeout(() => {
    //   clearInterval(carAcross)
    //   cells[carIndex].classList.remove('car')
    // }, x000)
  })





})