import { createSpace } from './simulation/space.js'
import { setSketch } from './draw/draw.js'
import * as utils from './simulation/utils/utils.js'


export function simulator(width, height, node) {
  let seed = (sketch) => {
    setSketch(sketch)
    let space

    sketch.setup = () => {
      sketch.createCanvas(width, height, "WebGL");
      space = createSpace(width, height)

    }

    sketch.draw = () => {
      let currentTime = space.getCurrentTime();
      space.update(0, 0);
      space.render(0, 0);
      if (space.paused) return;
      sketch.textSize(32);
      sketch.stroke("black");
      sketch.fill("black");
      sketch.text("FPS: " + sketch.frameRate().toFixed(2), 10, height - 10);
      sketch.text(utils.formatTime(currentTime), 10, 30);
    }
  }
  return new p5(seed, node)
}

