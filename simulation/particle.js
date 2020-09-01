export default class Particle {
  constructor(sketch, x, y, positionUpdateFunction) {
    this.sketch = sketch
    this.positionUpdateFunction = positionUpdateFunction
    this.position = this.sketch.createVector(x, y);
    this.velocity = this.sketch.createVector(0, 0);
    this.displayR = 30;
    this.electricCharge = 1;
  }

  initSpace(space){
    this.space = space;
    this._renderer = space._renderer;
  }

  update(){
    this.positionUpdateFunction(this);
  }

  render(){
    this._renderer.stroke("#f8333c");
    this._renderer.strokeWeight(2);
    this._renderer.fill("#fcab10");
    this._renderer.ellipse(this.position.x, this.position.y, this.displayR, this.displayR);
  }
}

