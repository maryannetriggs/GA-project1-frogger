// https://maryannetriggs.github.io/project-01/


window.addEventListener('DOMContentLoaded', () => {

  // Setting board width and height
  const width = 10


  // Variables for creating grid
  const grid = document.querySelector('.grid')
  const cells = []

  // KeyUp event function
  const keyUpEvent = e => {

    const x = frogPosition % width
    const y = Math.floor(frogPosition / width)

    cells[frogPosition].removeChild(frog)

    switch (e.keyCode) {
      case 37: if (x > 0) frogPosition -= 1
        break
      case 38: if (y > 0) frogPosition -= width
        break
      case 39: if (x < width - 1) frogPosition += 1
        break
      case 40: if (y < width - 1) frogPosition += width
        break
    }

    console.log(frogPosition)

    const childrenOfCell = cells[frogPosition].querySelector('.log')
    console.log(childrenOfCell)
    if (childrenOfCell) {
      console.log('frog on a log')
      childrenOfCell.appendChild(frogPosition)
    }

    const childrenOfCell = cells[frogPosition].children[0]
    console.log(childrenOfCell)




    cells[frogPosition].appendChild(frog)

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

  // Variables for game pieces
  const frog = document.createElement('div')
  cells[cells.length - 1].appendChild(frog)
  frog.classList.add('frog')

  let frogPosition = cells.indexOf(frog.parentElement)
  const lilyIndex = 0
  
  // Slow Cars
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

  // Fast Cars
  const fastCar1 = document.createElement('div')
  road1[9].appendChild(fastCar1)
  const fastCar2 = document.createElement('div')
  road1[4].appendChild(fastCar2)
  const fastCars = [fastCar1, fastCar2]
  fastCars.forEach(element => {
    element.classList.add('car')
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

  // Logic to create frog, lilypad and car divs
 
  cells[lilyIndex].classList.add('lily')

  
  // Frog controls logic

  document.addEventListener('keyup', keyUpEvent)

  // Win/lose condition

  const gameEndText = document.createElement('h2')
  const declareWinner = document.querySelector('.gameEndText')

  function winOrLose() {
    // if (frogIndex === lilyIndex) {
    //   gameEndText.innerHTML = 'YOU WON!'
    //   declareWinner.appendChild(gameEndText)
    //   cells[frogIndex].classList.remove('frog')
    //   cells[frogIndex].classList.remove('lily')
    //   cells[frogIndex].classList.add('winner')
    //   document.removeEventListener('keyup', keyUpEvent)
    // } else if (element.classList.contains('car1') && element.classList.contains('frog')) {
    //   gameEndText.innerHTML = 'YOU LOST!'
    //   grid.appendChild(gameEndText)
    //   cells[frogIndex].classList.remove('frog')
    //   cells[frogIndex].classList.add('splat')
    //   document.removeEventListener('keyup', keyUpEvent)
    // }
  }

  // Car Animation

  const startGame = document.querySelector('.start')

  startGame.addEventListener(('click'), () => {

    // Slow cars
    setInterval(() => {

      slowCars.forEach(car => {
        const roadPosition = road3.indexOf(car.parentElement)
        road3[roadPosition].removeChild(car)
        if (roadPosition === road3.length - 1) {
          road3[0].appendChild(car)
        } else {
          road3[roadPosition + 1].appendChild(car)
        }
      })

      // Slow logs
      slowLogs.forEach(log => {
        const riverPosition = river2.indexOf(log.parentElement)
        river2[riverPosition].removeChild(log)
        console.log(riverPosition)
        if (riverPosition === river2.length - 1) {
          river2[0].appendChild(log)
        } else {
          river2[riverPosition + 1].appendChild(log)
        }
      })

    }, 1000)

    // Fast cars
    setInterval(() => {

      fastCars.forEach(car => {
        const roadPosition = road1.indexOf(car.parentElement)
        road1[roadPosition].removeChild(car)
        if (roadPosition === 0) {
          road1[9].appendChild(car)
        } else {
          road1[roadPosition - 1].appendChild(car)
        }
      })
    }, 400)

    // Fast logs
    setInterval(() => {
      fastLogs.forEach(log => {
        const riverPosition = river1.indexOf(log.parentElement)
        river1[riverPosition].removeChild(log)
        if (riverPosition === 0) {
          river1[9].appendChild(log)
        } else {
          river1[riverPosition - 1].appendChild(log)
        }
      })

    }, 400)

  })





})