import { Vector } from './utils/vector.js'
import * as utils from './utils/utils.js'

export class Particle {
  space = null;
  constructor(x, y, properties, forceFunction=null) {
    this.forceFunction = forceFunction;
    this.position = new Vector(x, y);
    this.velocity = new Vector(0, 0);
    this.fields = [];
    this.mass = properties.mass;
    this.charge = properties.charge;
    this.testCharge = properties.testCharge;
  }

  initSpace(space){
    this.space = space;
  }

  refreshFields(){
    const fields = [];
    this.space.fields.forEach(field => {field.effectCheck(this) && fields.push(field)});
    this.fields = fields;
  }

  getFieldForces(){
    const charge = this.charge || this.testCharge;
    const forcePerCharge = this.fields.reduce((acc, f) => acc.add(f.getForcePerCharge(this.position)), new Vector(0, 0));
    return forcePerCharge.mult(charge);
  }

  update(){
    // this.velocity.add(acceleration) == this.velocity.add(force.div(this.mass)) ==
    let force;
    if (this.forceFunction) {
      force = this.forceFunction(this)
    } else {
      force = this.getFieldForces(this)
    }
    const acceleration = force.div(this.mass);
    this.velocity.add(acceleration);
    this.position.add(this.velocity);
  }
}

