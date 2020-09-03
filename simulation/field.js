import { Vector } from './utils/vector.js'

export class Field {
  constructor(fieldFunction) {
    this.fieldFunction = fieldFunction;
    this.fieldArrows = [];
    this.particles = [];
    this.arrowDisplayFrequency = 30;
  }

  initSpace(space){
    let maxArrow = 9999999;
    let arrowCount = 0;
    this.displayR = 15;
    this.space = space;
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

  getForcePerCharge(position){
    return this.particles.reduce((acc, particle) => acc.add(this.fieldFunction(particle, position)), new Vector(0, 0));
  }

  effectCheck(particle){
    return Boolean(particle.charge || particle.testCharge);
  }

  refreshParticles(){
    let particles = []
    this.space.particles.filter(particle => particle.charge).forEach(particle => particles.push(particle))
    this.particles = particles
  }

  update() {
    for (var fieldArrow of this.fieldArrows) {
      fieldArrow.update();
    }
  }
}

class FieldArrow {
  force = new Vector(0, 0);
  constructor(field, x, y) {
    this.field = field;
    this.position = new Vector(x, y);
  }

  update(){
    this.force = this.field.getForcePerCharge(this.position)
  }

}
