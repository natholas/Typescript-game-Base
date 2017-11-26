import { Vector } from './vector.class';
import { GameObject } from './game-object.class';
  
export class Camera {
  private offset: Vector = new Vector(0,0)
  private canvas: HTMLCanvasElement
  public zoomTarget: number = 0.5
  public zoom: number = 0.5
  private keys: any = {}
  private speed: number = 20
  public focus: GameObject
  public focusableObjects: GameObject[] = []
  pi: number = Math.PI

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    window.addEventListener('wheel', this.wheel.bind(this))
    document.addEventListener('keydown', this.keyDown.bind(this))
    document.addEventListener('keyup', this.keyUp.bind(this))
  }

  wheel(e: WheelEvent) {
    let amount = e.deltaY < 0 ? 1.2 : 0.8
    this.zoomTarget = this.zoomTarget * amount
  }

  private switchFocus() {
    let index
    if (this.focus !== undefined) {
      index = this.focusableObjects.indexOf(this.focus) + 1
      if (index >= this.focusableObjects.length) index = undefined
    } else {
      index = 0
    }
     if (index !== undefined) this.focus = this.focusableObjects[index]
     else this.focus = undefined
  }

  private keyDown(e: KeyboardEvent) {
    this.keys[e.key] = true

    if (e.key == 'Tab') {
      e.preventDefault()
      this.switchFocus()
    }
  }

  private keyUp(e: KeyboardEvent) {
    delete this.keys[e.key]
  }

  update() {
    this.processCameraMovement()
    this.zoomLerp()
  }

  private zoomLerp() {
    if (this.zoomTarget) {
      let diff = this.zoomTarget - this.zoom
      this.zoom += diff / 10
    }
  }

  private processCameraMovement() {
    if (this.keys['w']) this.offset.y += this.movementSpeed
    if (this.keys['s']) this.offset.y -= this.movementSpeed
    if (this.keys['d']) this.offset.x -= this.movementSpeed
    if (this.keys['a']) this.offset.x += this.movementSpeed

    if (!this.keys['w'] && !this.keys['a'] && !this.keys['s'] && !this.keys['d']) {
      if (this.focus) {
        this.offset.x = -this.focus.pos.x
        this.offset.y = -this.focus.pos.y
      }
    } else this.focus = undefined
    
  }

  get pos(): Vector {
    let x = this.offset.x + this.canvas.width / this.zoom / 2
    let y = this.offset.y + this.canvas.height / this.zoom / 2
    return new Vector(x, y)
  }

  get movementSpeed () {
    return this.speed / this.zoom
  }

}