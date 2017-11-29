import { Vector } from './vector.class';
import { GameObject } from './game-object.class';
  
export class Camera {
  private offset: Vector = new Vector()
  public target: Vector = new Vector()
  private canvas: HTMLCanvasElement
  public zoomTarget: number = this.calcInitialZoom()
  public zoom: number = 0.02
  private keys: any = {}
  private speed: number = 20
  public focus: GameObject
  public focusableObjects: GameObject[] = []
  public centerMode: boolean = true
  pi: number = Math.PI

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
  }

  calcInitialZoom(): number {
    let smallest = window.innerHeight
    if (window.innerWidth < smallest) {
      smallest = window.innerWidth
    }
    
    return 0.01 * smallest / 1000
  }

  update() {
    this.zoomLerp()
    this.movementLerp()
  }

  private movementLerp() {
    let diffX = this.offset.x - this.target.x
    let diffY = this.offset.y - this.target.y

    this.offset.x -= diffX / 200
    this.offset.y -= diffY / 200
  }

  private zoomLerp() {
    if (this.zoomTarget) {
      let diff = this.zoomTarget - this.zoom
      this.zoom += diff / 4
    }
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