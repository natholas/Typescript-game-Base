import { GameObject } from './game-object.class'
import { Vector } from './vector.class';
import { Camera } from './camera.class';

export class Canvas {
  canvas: HTMLCanvasElement
  public ctx: CanvasRenderingContext2D
  public gameObjects: GameObject[] = []
  public selectedGameObjects: GameObject[] = []
  public camera: Camera

  constructor() {
    this.canvas = document.getElementsByTagName('canvas')[0]
    this.ctx = this.canvas.getContext('2d')
    this.camera = new Camera(this.canvas)
    window.addEventListener('resize', this.sizeCanvas.bind(this))
    document.addEventListener('keyup', this.spawnRandomCheck.bind(this))
    this.sizeCanvas()
  }

  private sizeCanvas() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }
  
  public addGameObjects(gameObjects: GameObject[]) {
    for (let obj of gameObjects) {
      this.gameObjects.push(obj)
      this.camera.focusableObjects.push(obj)
    }
  }

  public render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.camera.update()
    for (let obj of this.gameObjects) {
      obj.update()
      obj.sprite.render(obj, this.ctx, this.camera)
    }
  }

  rand() {
    return Math.random() - 0.5
  }

  spawnRandomCheck(e: KeyboardEvent) {
    if (e.key != ' ') return
    e.preventDefault()
    this.spawnRandom()
  }

  spawnRandom() {
    const randomPosOffset = 100000
    const randomInertiaOffset = 2000
    const maxMass = 50000

    let _pos = new Vector(this.rand() * randomPosOffset, this.rand() * randomPosOffset)
    let _inertia = new Vector(this.rand() * randomInertiaOffset, this.rand() * randomInertiaOffset)
    let _mass = Math.random() * maxMass

    let newObject = new GameObject(_pos, _inertia, _mass, 'white')

    this.addGameObjects([newObject])
  }
}