// https://maryannetriggs.github.io/project-01/

window.addEventListener('DOMContentLoaded', () => {

  // Setting board width and height
  const width = 10

  // Variables for creating grid
  const grid = document.querySelector('.grid')
  const cells = []

  // WHAT DOES THIS DO?? - something with the below logic for grid creation
  function handleClick(e) {
    e.target.classList.add('frog')
  }

  // Logic to create grid
  for (let i = 0; i < width ** 2; i++) {
    const cell = document.createElement('div')
    cell.addEventListener('dblclick', handleClick)
    grid.appendChild(cell)
    cells.push(cell)
  }

  // Variables for game pieces
  let frogIndex = cells.length - 1
  console.log(cells.length)
  const lilyIndex = 0
  let car1Index = 70
  let car2Index = 50

  // Logic to create frog, lilypad and car divs
  cells[frogIndex].classList.add('frog')
  cells[lilyIndex].classList.add('lily')
  cells[car1Index].classList.add('car1')
  cells[car2Index].classList.add('car2')

  // Frog controls logic
  document.addEventListener('keyup', (e) => {

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
  })

  // Car Animation Trials

  const car1 = document.querySelector('.car1')

  car1.addEventListener(('mouseover'), () => {
  
    const carAcross = setInterval(() => {
      cells[car1Index].classList.remove('car1')
      car1Index++
      cells[car1Index].classList.add('car1')
    }, 1000)

    setTimeout(() => {
      clearInterval(carAcross)
      cells[car1Index].classList.remove('car1')
    }, 10000)
  
  })

  const car2 = document.querySelector('.car2')

  car2.addEventListener(('mouseover'), () => {
  
    const carAcross = setInterval(() => {
      cells[car2Index].classList.remove('car2')
      car2Index++
      cells[car2Index].classList.add('car2')
    }, 500)

    setTimeout(() => {
      clearInterval(carAcross)
      cells[car2Index].classList.remove('car2')
    }, 5000)
  
  })


})