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

  update(x, y) {
    if (this.paused) return;
    let mX = this.sketch.min(this.sketch.max(this.sketch.mouseX - x, 0), this.w);
    let mY = this.sketch.min(this.sketch.max(this.sketch.mouseY - y, 0), this.h);
    this.mousePosition = this.sketch.createVector(mX, mY);
    this.sketch.background(220);
    for (var particle of this.particles) {
      particle.update();
    }
    for (var field of this.fields) {
      field.update();
    }
  }

  render(x, y) {
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
