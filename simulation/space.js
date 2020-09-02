export default class Space {
  constructor(sketch, w, h, config) {
    this.sketch = sketch
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
    this.sketch.background(220);
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
      field.render(this.sketch);
    }
    for (var particle of this.particles) {
      particle.render(this.sketch);
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
