import { Vector } from "./vector.class";
import { Camera } from "./camera.class";
import { GameObject } from "./game-object.class";

export class BallRenderer {

  render(obj: GameObject, ctx: CanvasRenderingContext2D, camera: Camera) {
    let _pos: Vector = obj.pos.add(camera.pos).times(camera.zoom)
    let _size: number = obj.size * camera.zoom
    if (_size < 2) _size = 2

    let detailLevel = 5

    ctx.lineWidth = camera.zoom * 4
    if (ctx.lineWidth < 2) ctx.lineWidth = 2
  
    // Trail
    let trailLength = obj.trail.length
    let i = 0
    let lastPoint: Vector = new Vector(_pos.x, _pos.y)
    for (let point of obj.trail) {
      if (!(i % detailLevel == 0) && i != trailLength - 1) {
        i ++
        continue
      }
      let _pointPos: Vector = point.add(camera.pos).times(camera.zoom)
      ctx.beginPath()
      ctx.moveTo(lastPoint.x, lastPoint.y);
      ctx.lineTo(_pointPos.x, _pointPos.y)
      ctx.strokeStyle = obj.color.replace('XX', ((1 / trailLength) * i).toString())
      ctx.stroke()
      lastPoint = new Vector(_pointPos.x, _pointPos.y)
      i ++
    }

    // Drawing ball
    if (!obj.exploded) {
      ctx.beginPath()
      ctx.arc(_pos.x, _pos.y, _size, 0, 2 * camera.pi)
      ctx.fillStyle = obj.color.replace('XX', '1')
      ctx.fill()
    }

  }
}