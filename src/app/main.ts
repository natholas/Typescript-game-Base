import { Canvas } from './canvas.class'
import { GameObject } from './game-object.class';
import { Vector } from './vector.class';
import { Gravity } from './gravity.service';
import { Data } from './data'
const canvas = new Canvas()
const gravity = new Gravity()
const data = new Data()

canvas.addGameObjects([
  new GameObject(new Vector(-1000, 0), new Vector(0, 500), 100, 100, 'yellow'),
  new GameObject(new Vector(1000, 0), new Vector(0, -500), 100, 100, 'yellow'),
  new GameObject(new Vector(50, 0), new Vector(0, -50), 10, 10, 'yellow'),
  new GameObject(new Vector(-50, 0), new Vector(0, 50), 10, 10, 'yellow'),
])

for (let i = 0; i < 1000; i++) canvas.spawnRandom()

const loop = function() {
  gravity.applyGravity(canvas.gameObjects)
  gravity.applyExplosions(canvas.gameObjects)
  canvas.camera.focusableObjects = canvas.gameObjects
  // if (canvas.gameObjects.length < 20) {
  //   gravity.predict(canvas.gameObjects, 250)
  // }
  canvas.render()
}

setInterval(loop, 1000 / 30)