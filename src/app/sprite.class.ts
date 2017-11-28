import { Vector } from "./vector.class";
import { Camera } from "./camera.class";
import { GameObject } from "./game-object.class";

export class Sprite {

  render(obj: GameObject, ctx: CanvasRenderingContext2D, camera: Camera) {
    let _pos: Vector = obj.pos.add(camera.pos).times(camera.zoom)
    // if (_pos.x < 0 || _pos.x > window.innerWidth) return
    // if (_pos.y < 0 || _pos.y > window.innerHeight) return
    let _size: number = obj.size * camera.zoom
    if (_size < 2) _size = 2

    let detailLevel = 4
    // if (camera.zoom >= 0.1) detailLevel = 2
    // else if (camera.zoom >= 0.05) detailLevel = 5
    // else if (camera.zoom >= 0.01) detailLevel = 7
    if (detailLevel) {

      ctx.lineWidth = 4
      // ctx.lineWidth = camera.zoom
      // if (ctx.lineWidth < 1) ctx.lineWidth = 1

    
      // // Trail
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
        // ctx.strokeStyle = 'rgba(100,100,100,' + ((1 / trailLength) * i) + ')'
        ctx.strokeStyle = obj.trailColor.replace('XX', ((1 / trailLength) * i).toString())
        ctx.stroke()
        lastPoint = new Vector(_pointPos.x, _pointPos.y)
        i ++
      }

      // Predictions
      trailLength = obj.predictions.length
      i = 0
      // lastPoint = new Vector(_pos.x, _pos.y)
      lastPoint = undefined

      for (let point of obj.predictions) {
        if (!(i % detailLevel == 0) && i != trailLength - 1) {
          i++
          continue
        }
        let _pointPos: Vector = point.add(camera.pos).times(camera.zoom)
        if (lastPoint) {
          ctx.beginPath()
          // if (_pointPos.x < 0 || _pointPos.x > window.innerWidth) continue
          // if (_pointPos.y < 0 || _pointPos.y > window.innerHeight) continue
          ctx.moveTo(lastPoint.x, lastPoint.y)
          ctx.lineTo(_pointPos.x, _pointPos.y)
          let alpha = 1
          if (i < trailLength/2) {
            alpha = ((1 / trailLength) * i)
          } else {
            alpha = 1 - ((1 / trailLength) * i)
          }
          ctx.strokeStyle = obj.trailColor.replace('XX', alpha.toString())
          // ctx.strokeStyle = 'rgba(255,255,255,1)'
          ctx.stroke()
        }
        lastPoint = new Vector(_pointPos.x, _pointPos.y)
        i++
      }
    }

    ctx.beginPath()
    ctx.arc(_pos.x, _pos.y, _size, 0, 2 * camera.pi)
    ctx.fillStyle = obj.trailColor.replace('XX', '1')
    ctx.fill()

  }
}