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
    this.field[0][0] = pathCharacter
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
      if (!this.isInBounds) {
        console.log('out of bounds')
        playing = false
        break
      } else if (this.isHole()) {
        console.log('You fell down a hole')
        playing = false
        break
      } else if (this.isHat()) {
        console.log('Yay you found your hat!')
        playing = false
        break
      }
      //update current location on map
      this.field[this.locationY][this.locationX] = pathCharacter
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
    return this.field[this.locationY][this.locationX] === hat
  }

  //if hole
  isHole() {
    return this.field[this.locationY][this.locationX] === hole
  }

  static generateField(height, width, percentage = 0.1) {
    const field = new Array(height).fill(0).map((el) => new Array(width))
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const prob = Math.random()
        field[y][x] = prob > percentage ? fieldCharacter : hole
      }
    }
    // Set the "hat" location
    const hatLocation = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
    }
    // Make sure the "hat" is not at the starting point
    while (hatLocation.x === 0 && hatLocation.y === 0) {
      hatLocation.x = Math.floor(Math.random() * width)
      hatLocation.y = Math.floor(Math.random() * height)
    }
    field[hatLocation.y][hatLocation.x] = hat
    return field
  }
}

// const myField = new Field([
//   ['*', '░', 'O'],
//   ['░', 'O', '░'],
//   ['░', '^', '░'],
// ])

const myField = new Field(Field.generateField(10, 10, 0.3))
myField.runGame()
