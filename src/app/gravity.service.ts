import { Vector } from './vector.class'
import { GameObject } from './game-object.class';
import { Explosion } from './explosion.class';

export class Gravity {

  G: number = 0.5

  applyGravity(objects: GameObject[]) {
    for (let obj of objects) {
      for (let _obj of objects) {
        if (obj.id == _obj.id) continue
        obj.inertia = this.calcGravity(obj, _obj, obj.pos, _obj.pos)
      }
      let inertia = obj.inertia.devide(obj.mass)
      obj.pos = obj.pos.add(inertia)
      obj.rotation += obj.rotInertia
    }
  }

  calcGravity(obj: GameObject, _obj: GameObject, pos: Vector, _pos: Vector) {
    let diff: Vector = pos.minus(_pos)
    let dist = diff.magnitude
    this.checkColliding(obj, _obj)
    if (!obj.exploded) {
      let strength = (this.G * obj.mass * _obj.mass) / (dist * dist)
      diff = diff.times(strength)
      return obj.inertia.minus(diff)
    } else {
      return obj.inertia
    }
  }

  checkColliding(obj: GameObject, _obj: GameObject) {
    let dist = obj.pos.minus(_obj.pos).magnitude
    let minDist = (obj.size) + (_obj.size)
    if (dist < minDist) {
      if (obj.mass < _obj.mass) {
        obj.exploded = true
        _obj.mass += obj.mass / 5
        _obj.size += obj.size / 5
      }
      else {
        _obj.exploded = true
        obj.mass += _obj.mass / 5
        obj.size += _obj.size / 5
      }
    }
  }

  predict(objects: GameObject[], count: number) {
    let _objects: GameObject[] = []
    for (let obj of objects) {
      obj.predictions = []
      _objects.push(obj.copy())
    }

    for (let i = 0; i < count; i++) {
      this.applyGravity(_objects)
      for (let j = 0; j < _objects.length; j++) {
        objects[j].predictions.push(_objects[j].pos)
      }
    }
  }

  applyExplosions(objects: GameObject[]): GameObject[] {
    let explosions: Explosion[] = []

    for (let i = 0; i < objects.length; i++) {
      if (objects[i].exploded) {
        explosions.push(new Explosion(objects[i].pos, objects[i].inertia, objects[i].mass, objects[i].size))
        objects.splice(i, 1)
        i --
      }
    }

    let debris: GameObject[] = []
    // for (let explosion of explosions) {
    //   let debrisCount = Math.floor(explosion.mass / 10)
    //   for (let i = 0; i < debrisCount; i++) {
    //     let randomX = (Math.random() - 0.5) * explosion.size
    //     let randomY = (Math.random() - 0.5) * explosion.size
    //     let _pos = explosion.pos.add(new Vector(randomX, randomY))
    //     let _inertia = new Vector(randomX, randomY).times(100)
    //     debris.push(new GameObject(_pos, _inertia, 0, 0, explosion.mass / debrisCount, 10))
    //   }
    // }
    return debris
  }
}