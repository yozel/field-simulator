import { sketch } from '../draw/draw.js'
import { Field } from './field.js'
import { Vector } from './utils/vector.js'
import Particle from './particle.js'

export class Space {
  constructor(w, h, config) {
    this.config = config

    this.startTime = Date.now();
    this.pauseTime = null;
    this.paused = false;
    this.w = w;
    this.h = h;
    this.particles = [];
    this.fields = [];
  }

  pause() {
    this.pauseTime = Date.now();
    this.paused = true;
  }

  play() {
    this.startTime += Date.now() - this.pauseTime
    this.pauseTime = null;
    this.paused = false;
  }

  addField(field) {
    field.initSpace(this);
    this.fields.push(field);
  }

  addParticle(particle) {
    particle.initSpace(this);
    this.particles.push(particle);
  }

  update() {
    if (this.paused) return;
    sketch.background(220);
    for (var particle of this.particles) {
      particle.update();
    }
    for (var field of this.fields) {
      field.update();
    }
  }

  render() {
    if (this.paused) return;
    for (var field of this.fields) {
      field.render();
    }
    for (var particle of this.particles) {
      particle.render();
    }
  }

  getCurrentTime() {
    let currentTime;
    if (this.paused) {
      currentTime = this.pauseTime;
    } else {
      currentTime = Date.now();
    }
    return currentTime - this.startTime;
  }
}

export function createSpace(width, height){
  let space = new Space(width, height, {"c": 200});
  let electricField = new Field(function(position, particles) {
    let vec = new Vector(0, 0);
    for (const particle of particles) {
      let posDiffVector = Vector.sub(particle.position, position)
      let magnitute = 9 * (10**9) * particle.electricCharge / (posDiffVector.mag() ** 2)
      posDiffVector.setMag(magnitute);
      vec.add(posDiffVector);
    }
    return vec
  });
  space.addField(electricField);



  let particleTargetPosition1 = new Vector(sketch.width/2, 250);
  let particle1 = new Particle(sketch.width/2, 100, -1, function(particle){
    let acceleration = Vector.sub(particleTargetPosition1, particle.position);
    acceleration.mult(0.001);
    particle.velocity.add(acceleration)
    particle.position.add(particle.velocity);
  });

  space.addParticle(particle1);

  let particleTargetPosition2 = new Vector(sketch.width/2, 250);
  let particle2 = new Particle(sketch.width/2, 400, 1, function(particle){
    let acceleration = Vector.sub(particleTargetPosition2, particle.position);
    acceleration.mult(0.001);
    particle.velocity.add(acceleration)
    particle.position.add(particle.velocity);
  });

  space.addParticle(particle2);
  return space
}
