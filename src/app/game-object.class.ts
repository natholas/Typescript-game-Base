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
  trailLength: number = 60
  exploded: boolean = false
  toBeRemoved: boolean = false
  invinsible: boolean = false
  
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
    this.trail.push(this.pos.copy())
    if (this.trail.length > this.trailLength) this.trail.splice(0,1)
  }

  calcSize() {
    this.size = Math.cbrt(this.mass * Math.PI) * 10
  }

  markInvinsible(duration: number) {
    this.invinsible = true
    setTimeout(a => {
      this.invinsible = false
    }, duration)
  }

  randomColor(): string {
    let r = Math.floor(Math.random() * 255)
    let g = Math.floor(Math.random() * 255)
    let b = Math.floor(Math.random() * 255)
    return 'rgba(' + r + ',' + g + ',' + b + ',XX)'
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

    return 'rgba(' + colors[0] + ',' + colors[1] + ',' + colors[2] + ',XX)'
  }
}