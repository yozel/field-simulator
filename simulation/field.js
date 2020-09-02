import { ArrowDisplay } from './draw/arrow.js'
import { Vector } from './utils/vector.js'

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
    this.shapeFactory = new ArrowDisplay()
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

  render(sketch) {
    for (var fieldArrow of this.fieldArrows) {
      fieldArrow.render(sketch);
    }
  }
}

class FieldArrow {
  constructor(field, x, y) {
    this.field = field;
    this.shapeFactory = this.field.shapeFactory
    this.position = new Vector(x, y);
    this.displayR = this.field.displayR;
    this.displayStrokeWeight = 2;
    this.displayArrowSize = 2;

    this.color = "black";
    this.angle = 3;
  }

  update(){
    let vec = this.field.fieldFunction(this.position, this.field.space.particles)
    let mag600 = Math.min(vec.mag() / 1000, 255);
    this.color = [mag600, 0, 255-mag600];
    this.angle = vec.heading();
  }

  render(sketch){
    let arrow = this.shapeFactory.arrow(sketch, this.displayR, this.color, this.angle)
    sketch.image(arrow, this.position.x, this.position.y);
  }
}
