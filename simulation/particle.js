import { Vector } from './vector.js'

export default class Particle {
  constructor(sketch, x, y, charge, positionUpdateFunction) {
    this.sketch = sketch
    this.positionUpdateFunction = positionUpdateFunction
    this.position = this.sketch.createVector(x, y);
    this.velocity = this.sketch.createVector(0, 0);
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
    this.sketch.strokeWeight(2);
    if (this.electricCharge < 0) {
      this.sketch.stroke("#2f72ad");
      this.sketch.fill("#42a1f5");
    }
    if (this.electricCharge > 0) {
      this.sketch.stroke("#f8333c");
      this.sketch.fill("#fcab10");
    }
    this.sketch.ellipse(this.position.x, this.position.y, this.displayR, this.displayR);
  }
}

