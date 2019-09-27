![ga_cog_large_red_rgb](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png)

# Frogger

Based on the classic arcade game Frogger this is a browser game buit with JavaScript.
This was the first project I completed during the General Assembly Software Engineering Immersive (bootcamp) course.

## Resources

* Frogger arcade game [Youtube](https://www.youtube.com/watch?v=l9fO-YuWPSk)
* Frogger - [Wikipedia](https://en.wikipedia.org/wiki/Frogger)

---

## Built With

1. HTML5
2. CSS
3. Javascript

## Deployment

This game is deployed on GitHub Pages and can be found here: https://maryannetriggs.github.io/project-01/

## Getting Started

Use the clone button to download the game source code. Open the index.html file in your browser and the game will start. The images used in this game are stored in the images folder and the audio files are stored in the audio folder.

## To Play

The goal in Frogger is to get the frog safely to the lily pad on the otherside of the game board. On her journey Frogger encounters numerous obstacles to be overcome, namely crossing a busy road and fast-flowing river. 

The game is started by clicking on the start button, upon which the timer is initiated giving the player 20 second to reach the lily pad.

Frogger must be directed using the keyboard arrow keys across the road, avoiding the cars and then across the river, avoiding the strong currents by hopping from log to log. 

**The win conditions for Frogger are:**
- Getting Frogger to the lily pad

**The lose conditions for Frogger are:**
- Being hit by a car
- Falling into the river
- Being carried downstream on a log
- Running out of time

Once a win/lose condition has been met, the reset button may be pressed to play again.

![readme-one](images/readme/overview.png)

## Game Architecture

The main challenge in writing the game logic was determining if one of the end conditions had been reached. This had to be evaluated in two locations. Firstly in the frog movement logic, to determine if the cell Frogger was moving into would create a win/lose condition. 

First I created a variable to determine if the cell the frog was moving into had any child elements. 

1. If there weren't any child elements this meant Frogger was either jumping into a safesapce or into the river.
- So next I checked the class of parent element.
  - If the parent element had a river class, Frogger dies and game over.
  - If the parent element did not have a class of river Frogger had landed on either road or into a safe space and so Frogger lives and game continues.

2. If there was a child element present this meant Frogger was jumping into either a car, a log or the lily pad.
- So then I checked the class of first child element in that cell.
  - If the child element had a class of car, Frogger dies and game over.
  - If the child element had a class of lily, Frogger wins and game over.
  - If the child element has any other class, Frogger lives and game continues.

```js
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
```

Secondly in the setInterval timers controlling the movement of the game obstacles (cars and logs) to determine if cell the obstacles were moving into would create a win/lose condition.

```js
// Logic for movement of slow obstacles and their collision with Frogger

    slowItems = setInterval(() => {

      slowCars.forEach(car => {
        const roadPosition = road3.indexOf(car.parentElement) // direction of movement -> 

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

    }, 1000)
```

// if there is more than one child element in the cell the car has moved into there must have been a collision with a frog and game over

![readme-two](images/readme/game-board.png)


## Future Improvements

This project was personally quite challenging. Although the end game was quite simple, I believe the code to be robust. 

Advancements that could be made in the future to improve this game include:

- Mobile enabled
  - Size responsive
  - Mobile screen controls
- Auto-generation of game board with different sizes and difficulties
  - Including auto-generation and positioning of game obstacles (cars and logs)
  - With cars and logs of differing sizes/styles
- Multiple frogs and lilypads
- Inclusion of a high score board

## Author

Mary-Anne Triggs

Link to my personal portfolio: www.maryannetriggs.com
