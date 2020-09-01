import ArrowDisplay from './shapes.js'

export default class Field {
  constructor(fieldFunction) {
    this.fieldFunction = fieldFunction;
    this.fieldArrows = [];
    this.arrowDisplayFrequency = 30
  }

  initSpace(space){
    let maxArrow = 9999999;
    let arrowCount = 0;
    this.displayR = 15;
    this.space = space;
    this.sketch = space.sketch
    this.shapeFactory = new ArrowDisplay(this.sketch)
    this._renderer = space._renderer;
    this.shapeFactory.warmup(this.displayR);
    for (var i = 0; i < (this.space.w / this.arrowDisplayFrequency); i++) {
      for (var j = 0; j < (this.space.h / this.arrowDisplayFrequency); j++) {
        if (arrowCount <= maxArrow){
          let fieldArrow = new FieldArrow(this, i*this.arrowDisplayFrequency, j*this.arrowDisplayFrequency);
          this.fieldArrows.push(fieldArrow);
          arrowCount++;
        }
      }
    }
  }

  update() {
    for (var fieldArrow of this.fieldArrows) {
      fieldArrow.update();
    }
  }

  render() {
    for (var fieldArrow of this.fieldArrows) {
      fieldArrow.render();
    }
  }
}

class FieldArrow {
  constructor(field, x, y) {
    this.field = field;
    this._renderer = this.field._renderer;
    this.sketch = this.field.sketch
    this.shapeFactory = this.field.shapeFactory
    this.position = this.sketch.createVector(x, y);
    this.displayR = this.field.displayR;
    this.displayStrokeWeight = 2;
    this.displayArrowSize = 2;

    this.color = "black";
    this.angle = 3;
  }

  update(){
    let vec = this.field.fieldFunction(this.position, this.field.space.particles)
    let mag600 = this.sketch.min(vec.mag() / 1000, 255);
    this.color = [mag600, 0, 255-mag600];
    this.angle = vec.heading();
  }

  render(){
    let arrow = this.shapeFactory.arrow(this.displayR, this.color, this.angle)
    this._renderer.image(arrow, this.position.x, this.position.y);
    // this._renderer.push();
    // this._renderer.stroke(this.color);
    // this._renderer.strokeWeight(this.displayStrokeWeight);
    // this._renderer.fill(this.color);
    // this._renderer.translate(this.position.x, this.position.y);
    // this._renderer.line(0, 0, this.sketch.cos(this.angle)*this.displayR, this.sketch.sin(this.angle)*this.displayR);
    // this._renderer.rotate(this.angle);
    // this._renderer.translate(this.displayR - this.displayArrowSize, 0);
    // this._renderer.triangle(0, this.displayArrowSize / 2, 0, -this.displayArrowSize / 2, this.displayArrowSize, 0);
    // this._renderer.pop();
  }
}
