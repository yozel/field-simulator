import { Field } from './field.js';
import { Vector } from './utils/vector.js';
import { Particle } from './particle.js';
import * as motion from './motion.js';

export class Space {
  constructor(w, h, config) {
    this.config = config;
    this.startTime = null;
    this.paused = false;
    this.w = w;
    this.h = h;
    this.particles = [];
    this.fields = [];
  }

  pause() {
    if (this.paused) return;
    this.pauseTime = Date.now();
    this.paused = true;
  }

  play() {
    if (!this.paused) return;
    this.startTime += Date.now() - this.pauseTime
    this.pauseTime = null;
    this.paused = false;
  }

  addField(field) {
    field.initSpace(this);
    this.fields.push(field);
    field.refreshParticles();
    this.particles.forEach(particle => particle.refreshFields());
  }

  addParticle(particle) {
    particle.initSpace(this);
    this.particles.push(particle);
    particle.refreshFields();
    this.fields.forEach(field => field.refreshParticles());
  }

  update() {
    if (this.startTime === null) this.startTime = Date.now();
    if (this.paused) return;
    for (var particle of this.particles) {
      particle.update();
    }
    for (var field of this.fields) {
      field.update();
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
  // constant:    "c" speed of light [currently unused]
  let space = new Space(width, height, {"c": 299792458, "k": 9 * (10**9)});

  // Add electric field
  space.addField(new Field(function(particle, position) {
    // formula:   "E" = (k * Q) / d^2
    // constant:  "k" electric field constant => 9*(10**9)
    // variable:  "q" is charge               => particle.charge
    // variable:  "d^2" is distance squared   => diff.magSq()
    const diff = Vector.sub(particle.position, position);
    return diff.copy().setMag(space.config.k * particle.charge / -diff.magSq());
  }));


  let oscillation = motion.oscillation(new Vector(50, height/2), 0.001);

  // Add positive charged oscillating particle
  space.addParticle(new Particle(oscillation.targetCenter.x, oscillation.targetCenter.y - 100, {charge: 1, mass: 1}, oscillation));

  // Add negative charged oscillating particle
  space.addParticle(new Particle(oscillation.targetCenter.x, oscillation.targetCenter.y + 100, {charge: -1, mass: 1}, oscillation));

  space.addParticle(new Particle(400, oscillation.targetCenter.y, {testCharge: .000001, mass: 1}));

  return space
}
