import { Vector } from "./vector.class";
import { Camera } from "./camera.class";
import { GameObject } from "./game-object.class";

export class BallRenderer {

  render(obj: GameObject, ctx: CanvasRenderingContext2D, camera: Camera) {
    let _pos: Vector = obj.pos.add(camera.pos).times(camera.zoom)
    let _size: number = obj.size * camera.zoom
    if (_size < 2) _size = 2
    
    let detailLevel = 5
    
    let lineWidth = camera.zoom * 4
    if (lineWidth < 2) lineWidth = 2
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = obj.color
    ctx.fillStyle = obj.color
  
    // Trail
    let trailLength = obj.trail.length
    let lastPoint: Vector = new Vector(_pos.x, _pos.y)
    ctx.moveTo(~~lastPoint.x, ~~lastPoint.y)
    ctx.beginPath()
    for (let point of obj.trail) {
      let _pointPos: Vector = point.add(camera.pos).times(camera.zoom)
      ctx.lineTo(~~_pointPos.x, ~~_pointPos.y)
      lastPoint = new Vector(_pointPos.x, _pointPos.y)
    }
    ctx.stroke()

    // Drawing ball
    if (obj.exploded) return
    if (_pos.x + _size / 2 < 0) return
    if (_pos.y + _size / 2 < 0) return
    if (_pos.x - _size / 2 > window.innerWidth) return
    if (_pos.y - _size / 2 > window.innerHeight) return
    ctx.beginPath()
    ctx.arc(~~_pos.x, ~~_pos.y, ~~_size, 0, 2 * camera.pi)
    ctx.fill()

  }
}