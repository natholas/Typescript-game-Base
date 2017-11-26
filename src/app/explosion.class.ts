import { Vector } from "./vector.class";

export class Explosion {
  pos: Vector
  inertia: Vector
  mass: number
  size: number
  constructor(pos: Vector, inertia: Vector, mass: number, size: number) {
    this.pos = pos
    this.inertia = inertia
    this.mass = mass
    this.size = size
  }
}