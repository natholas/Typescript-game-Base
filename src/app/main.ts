import { Canvas } from './canvas.class'
import { GameObject } from './game-object.class';
import { Vector } from './vector.class';
import { Gravity } from './gravity.service';
import { Data } from './data'
const canvas = new Canvas()
const gravity = new Gravity()
const data = new Data()

for (let i = 0; i < 120; i++) canvas.spawnRandom()

// canvas.addGameObjects([new GameObject(new Vector(), new Vector(100,-100), 5000000, 'white')])

let i = 0
const loop = function() {
  gravity.applyGravity(canvas.gameObjects)
  canvas.camera.target = gravity.findCenter(canvas.gameObjects)
  let newStars = gravity.processCritical(canvas.gameObjects)
  if (newStars.length) canvas.addGameObjects(newStars)
  gravity.removeExploded(canvas.gameObjects)
  // if (i % 2 == 0) gravity.predict(canvas.gameObjects, 100)
  
  canvas.render()
  i ++
}

setInterval(loop, 1000 / 60)