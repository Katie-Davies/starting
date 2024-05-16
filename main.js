const prompt = require('prompt-sync')({ sigint: true })

const hat = '^'
const hole = 'O'
const fieldCharacter = '░'
const pathCharacter = '*'

class Field {
  constructor(field = [[]]) {
    this.field = field
    this.locationX = 0
    this.locationY = 0
  }
  print() {
    this.field.forEach((element) => {
      console.log(element.join(''))
    })
  }
  runGame() {
    let playing = true
    while (playing) {
      this.print()
      this.askQuestion()
    }
  }
  //prompt questions
  askQuestion() {
    const answer = prompt('Which direction?(u, d, l, r)').toUpperCase()
    switch (answer) {
      case 'U':
        this.locationY -= 1
        break
      case 'D':
        this.locationY += 1
        break
      case 'L':
        this.locationX -= 1
        break
      case 'R':
        this.locationX += 1
        break
      default:
        console.log('Enter U,D, L, R')
        this.askQuestion()
        break
    }
  }
  // if player is on the board
  isInBounds() {
    return (
      this.locationY >= 0 &&
      this.locationX >= 0 &&
      this.locationY < this.field.length &&
      this.locationX < this.field[0].length
    )
  }

  //if a hat
  isHat() {
    return this.field[this.locationX][this.locationY] === hat
  }

  //if hole
  isHole() {
    return this.field[this.locationX][this.locationY] === hole
  }
}

const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
])

console.log(myField.print())
let userMove = prompt('which direction would you like to move?')
if (userMove) {
  myField.updateLocation(userMove)
}
