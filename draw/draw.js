import { arrowDisplayFactory } from './arrow.js'
import * as utils from '../simulation/utils/utils.js'

export let sketch;
export function createCanvas(_sketch, width, height) {
  sketch = _sketch;
  sketch.createCanvas(width, height, "WebGL");
}

export function background() {
  sketch.background(220)
}

export function fieldArrow(fieldArrow) {
  let mag600 = Math.min(fieldArrow.force.mag() / 5000, 255);
  let color = [mag600, 0, 255-mag600, 50];
  let angle = fieldArrow.force.heading();
  let arrow = arrowDisplayFactory.arrow(15, color, angle)
  sketch.image(arrow, fieldArrow.position.x, fieldArrow.position.y);
}

const base = 10000000000;
const logBase = Math.log(base);
export function particle(particle) {
  if (particle.position.x > sketch.width || particle.position.y > sketch.height) return;
  const charge = particle.charge || particle.testCharge;
  const r = 30 * Math.log(1 + (base - 1) * Math.abs(charge)) / logBase;

  sketch.strokeWeight(2);
  if (charge < 0) {
    sketch.stroke("#2f72ad");
    sketch.fill("#42a1f5");
  }
  if (charge > 0) {
    sketch.stroke("#f8333c");
    sketch.fill("#fcab10");
  }
  sketch.ellipse(particle.position.x, particle.position.y, r, r);
}

export function info(currentTime){
  sketch.textSize(32);
  sketch.noStroke();
  sketch.fill([255, 255, 255, 230]);
  sketch.rect(5, 3, 195, 34)
  sketch.rect(5, sketch.height - 39, 170, 34)
  sketch.stroke("black");
  sketch.fill("black");
  sketch.text(utils.formatTime(currentTime), 10, 30);
  sketch.text("FPS: " + sketch.frameRate().toFixed(2), 10, sketch.height - 10);
}
