import { Game } from './game.class'
import { GameObject } from './game-object.class'
import { Vector } from './vector.class'
import { Physics } from './physics.service'
import { AudioService } from './audio.service'
const audio = new AudioService()
const game = new Game()
const physics = new Physics(audio)

for (let i = 0; i < 250; i++) game.spawnRandom()

const loop = function() {
  physics.applyGravity(game.gameObjects)
  game.camera.target = physics.findCenter(game.gameObjects)
  let newStars = physics.processCritical(game.gameObjects)
  if (newStars.length) {
    game.addGameObjects(newStars)
    audio.doBoom()
  }
  if (audio.willDoTickNextFrame) audio.doTick()
  physics.removeExploded(game.gameObjects)
  window.requestAnimationFrame(a => {
    game.render()
    loop()
  })
}
loop()
// setInterval(loop, 1000 / 60)