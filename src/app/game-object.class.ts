import { Vector } from './vector.class'
import { Sprite } from './sprite.class'

export class GameObject {
  mass: number
  color: string
  pos: Vector
  trail: Vector[] = []
  predictions: Vector[] = []
  inertia: Vector
  size: number
  sprite: Sprite = new Sprite()
  trailLength: number = 200
  exploded: boolean = false
  selected: boolean = false
  invinsible: boolean = false
  trailColor: string = this.randomColor()
  
  constructor(pos: Vector = new Vector(), inertia: Vector = new Vector(), mass: number = 100, color: string, selected: boolean = false) {
    this.color = color
    this.pos = pos
    this.inertia = inertia
    this.mass = mass
    this.calcSize()
    this.selected = selected
  }

  copy() {
    return new GameObject(this.pos.copy(), this.inertia.copy(), this.mass, this.color, this.selected)
  }

  update() {
    this.trail.push(this.pos.copy())
    if (this.trail.length > this.trailLength) this.trail.splice(0,1)
  }

  calcSize() {
    this.size = Math.cbrt(this.mass * Math.PI) * 6
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
}