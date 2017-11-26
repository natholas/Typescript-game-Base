import { Vector } from './vector.class'
import { Sprite } from './sprite.class'
import { Id } from './id-generator'

export class GameObject {
  id: number = new Id().id
  color: string
  pos: Vector
  trail: Vector[] = []
  predictions: Vector[] = []
  inertia: Vector
  mass: number
  size: number
  rotation: number
  rotInertia: number
  sprite: Sprite = new Sprite()
  trailLength: number = 0
  exploded: boolean = false

  constructor(pos: Vector = new Vector(), inertia: Vector = new Vector(), mass: number = 100, size: number, color: string, rotation: number = 0, rotInertia: number = 0) {
    this.color = color
    this.pos = pos
    this.inertia = inertia
    this.rotation = rotation
    this.rotInertia = rotInertia
    this.mass = mass
    this.size = size
  }

  update() {
    this.trail.push(this.pos)
    if (this.trail.length > this.trailLength) this.trail.splice(0, 1)
  }

  copy() {
    return new GameObject(this.pos.copy(), this.inertia.copy(), this.mass, this.size, this.color)
  }
}