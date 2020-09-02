import { Vector } from './utils/vector.js'
import { sketch } from '../draw/draw.js'

export default class Particle {
  constructor(x, y, charge, positionUpdateFunction) {
    this.positionUpdateFunction = positionUpdateFunction
    this.position = new Vector(x, y);
    this.velocity = new Vector(0, 0);
    this.displayR = 30;
    this.electricCharge = charge;
  }

  initSpace(space){
    this.space = space;
  }

  update(){
    this.positionUpdateFunction(this);
  }

  render(){
    sketch.strokeWeight(2);
    if (this.electricCharge < 0) {
      sketch.stroke("#2f72ad");
      sketch.fill("#42a1f5");
    }
    if (this.electricCharge > 0) {
      sketch.stroke("#f8333c");
      sketch.fill("#fcab10");
    }
    sketch.ellipse(this.position.x, this.position.y, this.displayR, this.displayR);
  }
}

