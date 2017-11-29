export class AudioService {

  boom: any
  tick: any
  willDoTickNextFrame: boolean = false
  
  doBoom() {
    this.boom = new Audio('/assets/boom.mp3')
    this.boom.playbackRate = 4
    this.boom.play()
  }

  doTick() {
    this.willDoTickNextFrame = false
    this.tick = new Audio('/assets/tick.mp3')
    this.tick.volume = 0.01
    this.tick.play()
  }
}