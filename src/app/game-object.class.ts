import { Vector } from './vector.class'
import { BallRenderer } from './ball-renderer.class'

export class GameObject {
  mass: number
  color: string
  pos: Vector
  trail: Vector[] = []
  predictions: Vector[] = []
  inertia: Vector
  size: number
  sprite: BallRenderer = new BallRenderer()
  trailLength: number = 14
  exploded: boolean = false
  toBeRemoved: boolean = false
  invinsible: boolean = false
  trailCounter: number = 0
  invinsibleCounter: number = 0
  
  constructor(pos: Vector = new Vector(), inertia: Vector = new Vector(), mass: number = 100, color: string = '') {
    this.color = color ? color : this.randomColor()
    this.color = this.randomizeColor(this.color)
    this.pos = pos
    this.inertia = inertia
    this.mass = mass
    this.calcSize()
  }

  copy() {
    return new GameObject(this.pos.copy(), this.inertia.copy(), this.mass, this.color)
  }

  update() {
    if (!this.exploded) {
      this.trailCounter += 1
      if (this.trailCounter % 2 == 0) {
        this.trail.push(this.pos.copy())
        if (this.trail.length > this.trailLength) this.trail.splice(0,1)
      }
      if (this.invinsibleCounter) {
        this.invinsibleCounter -= 1
        if (!this.invinsibleCounter) {
          this.invinsible = false
        }
      }
      
    } else {
      if (this.trail.length) {
        this.trail.splice(0, 1)
      } else {
        this.toBeRemoved = true
      }
    }
  }

  calcSize() {
    this.size = Math.cbrt(this.mass * Math.PI) * 10
  }

  markInvinsible(count: number) {
    this.invinsible = true
    this.invinsibleCounter = count
  }

  randomColor(): string {
    let r = Math.floor(Math.random() * 255)
    let g = Math.floor(Math.random() * 255)
    let b = Math.floor(Math.random() * 255)
    return 'rgb(' + r + ',' + g + ',' + b + ')'
  }

  randomizeColor(color: string) {
    let _colors = color.substring(5).split(',')
    
    let colors = [
      parseInt(_colors[0]),
      parseInt(_colors[1]),
      parseInt(_colors[2])
    ]
    
    for (let i in colors) {
      colors[i] += Math.random() > 0.5 ? 25 : -25
      if (colors[i] < 0) colors[i] = 0
      else if (colors[i] > 255) colors[i] = 255
    }

    return 'rgb(' + colors[0] + ',' + colors[1] + ',' + colors[2] + ')'
  }
}