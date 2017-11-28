import { Vector } from './vector.class'
import { GameObject } from './game-object.class';
import { Explosion } from './explosion.class';

export class Gravity {

  G: number = 0.1
  criticalMass: number = 1000000
  minStarMass: number = 30000
  starCreationForce: number = 35000000
  speed: number = 1
  mapSize: Vector = new Vector(50000, 80000)

  applyGravity(objects: GameObject[]) {
    for (let obj of objects) {
      if (!obj.invinsible) {
        if (obj.exploded) continue
        for (let _obj of objects) {
          if (_obj.exploded) continue
          if (obj == _obj) continue
          obj.inertia = this.calcGravity(obj, _obj, obj.pos, _obj.pos)
        }
      }
      let inertia = obj.inertia.devide(obj.mass)
      obj.pos = obj.pos.add(inertia.times(this.speed))
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
    if (obj.invinsible || _obj.invinsible) return
    let dist = obj.pos.minus(_obj.pos).magnitude
    let minDist = (obj.size) + (_obj.size)
    if (dist < minDist) {
      if (obj.mass < _obj.mass) {
        obj.exploded = true
        _obj.mass += obj.mass
        _obj.inertia = _obj.inertia.add(obj.inertia.times(obj.mass / _obj.mass))
        obj.mass = 0
        _obj.calcSize()
      }
      else {
        _obj.exploded = true
        obj.mass += _obj.mass
        obj.inertia = obj.inertia.add(_obj.inertia.times(_obj.mass / obj.mass))
        _obj.mass = 0
        obj.calcSize()
      }
    }
  }

  predict(objects: GameObject[], count: number) {
    let _objects: GameObject[] = []
    for (let obj of objects) {
      obj.predictions = []
      let _obj = obj.copy()
      _objects.push(_obj)
    }

    for (let i = 0; i < count; i++) {
      this.applyGravity(_objects)
      for (let j = 0; j < _objects.length; j++) {
        if (objects[j].invinsible || objects[j].exploded) continue
        objects[j].predictions.push(_objects[j].pos)
        // if (_objects[j].selected) objects[j].predictions.push(_objects[j].pos)
      }
    }
  }

  removeExploded(objects: GameObject[]): void {
    for (let i = 0; i < objects.length; i++) {
      if (objects[i].exploded) {
        objects.splice(i, 1)
        i --
      }
    }
  }

  processCritical(objects: GameObject[]): GameObject[] {
    const newStars: GameObject[] = []

    for (let obj of objects) {
      if (obj.mass > this.criticalMass && !obj.exploded) {
        obj.exploded = true
        let newStarCount = Math.floor(obj.mass / this.minStarMass)
        // let newStarCount = 2

        for (let i = 0; i < newStarCount; i++) {
          let creationForce = this.starCreationForce / this.criticalMass * obj.mass
          let _inertia = new Vector((Math.random() - 0.5) * creationForce, (Math.random() - 0.5) * creationForce)
          let _mass = obj.mass / newStarCount
          let _pos = obj.pos.copy().add(new Vector(Math.random() * 1000, Math.random() * 1000))
          let _obj = new GameObject(_pos, _inertia, _mass, obj.color)
          
          _obj.markInvinsible(200)
          newStars.push(_obj)
        }
      }
    }
    
    return newStars
  }

  findCenter(objects: GameObject[]): Vector {
    let center = new Vector()
    let xs = []
    let ys = []
    for (let obj of objects) {
      xs.push(obj.pos.x)
      ys.push(obj.pos.y)
    }
    xs.sort(function (a, b) { return a < b ? 1 : -1 })
    ys.sort(function (a, b) { return a < b ? 1 : -1 })
    center.x = -xs[Math.floor(objects.length/2)]
    center.y = -ys[Math.floor(objects.length/2)]
    return center
  }
}