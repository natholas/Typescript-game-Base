export class Vector {
  x: number
  y: number

  constructor(x: number = 0, y: number = 0) {
    this.x = x
    this.y = y
  }

  add(vec: Vector): Vector {
    return new Vector(
      this.x + vec.x,
      this.y + vec.y
    )
  }
  
  minus(vec: Vector): Vector {
    return new Vector(
      this.x - vec.x,
      this.y - vec.y
    )
  }

  times(amount: number): Vector {
    return new Vector(
      this.x * amount,
      this.y * amount
    )
  }

  devide(amount: number): Vector {
    return new Vector(
      this.x / amount,
      this.y / amount
    )
  }

  get magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  copy() {
    return new Vector(this.x, this.y)
  }
}