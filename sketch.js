import { createSpace } from './simulation/space.js'
import * as draw from './draw/draw.js'

export function simulator(width, height, node) {
  let space = createSpace(width, height)
  return new p5((sketch) => {
    sketch.setup = () => {
      draw.createCanvas(sketch, width, height)
    }

    sketch.draw = () => {
      space.update();
      let currentTime = space.getCurrentTime();
      if (!space.paused){
        draw.background()

        for (var field of space.fields) {
          for (var fieldArrow of field.fieldArrows) draw.fieldArrow(fieldArrow)
        }

        for (var particle of space.particles) draw.particle(particle)
        draw.info(currentTime)
      }
    }
  }, node)
}

