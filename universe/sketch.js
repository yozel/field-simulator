function divmod(x, y) {
  var div = Math.trunc(x/y);
  var rem = x % y;
  return [div, rem];
}

function formatTime(timestamp) {
  [seconds, milliseconds] = divmod(timestamp, 1000);
  [minutes, seconds] = divmod(seconds, 60);
  [hours, minutes] = divmod(minutes, 60);
  seconds = seconds.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');
  hours = hours.toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

class Space {
  constructor(w, h) {
    this._renderer = createGraphics(w, h);
    this.startTime = Date.now();
    this.w = w;
    this.h = h;
    this.particles = [];
    this.fields = [];
  }

  addField(field) {
    field.initSpace(this);
    this.fields.push(field);
  }

  addParticle(particle) {
    particle.initSpace(this);
    this.particles.push(particle);
  }

  display(x, y) {
    this.mousePosition = createVector(mouseX - x, mouseY - y)
    this._renderer.background(220);
    for (var field of this.fields) {
      field.display();
    }
    for (var particle of this.particles) {
      particle.display();
    }
    image(this._renderer, x, y);
  }

  getCurrentTime() {
    return Date.now() - this.startTime;
  }
}

class Field {
  constructor(chargeFunction) {
    this.getCharge = chargeFunction;
    this.fieldArrows = [];
    this.arrowDisplayFrequency = 30
  }

  initSpace(space){
    this.space = space;
    this._renderer = space._renderer;

    for (var i = 0; i < (this.space.w / this.arrowDisplayFrequency); i++) {
      for (var j = 0; j < (this.space.h / this.arrowDisplayFrequency); j++) {
        let fieldArrow = new FieldArrow(this, i*this.arrowDisplayFrequency, j*this.arrowDisplayFrequency);
        this.fieldArrows.push(fieldArrow);
      }
    }
  }

  display() {
    for (var fieldArrow of this.fieldArrows) {
      fieldArrow.display();
    }
  }
}

class Particle {
  constructor(x, y, positionFunction) {
    this.positionFunction = positionFunction
    this.position = createVector(x, y);
    this.displayR = 30;
  }

  initSpace(space){
    this.space = space;
    this._renderer = space._renderer;
  }

  display(){
    if (this.positionFunction != undefined) {
      this.position = positionFunction(this);
    }
    this._renderer.stroke("#f8333c");
    this._renderer.strokeWeight(2);
    this._renderer.fill("#fcab10");
    this._renderer.ellipse(this.position.x, this.position.y, this.displayR, this.displayR);
  }
}

let debugMode = false;
function mousePressed() {
  debugMode = true;
}

function mouseReleased() {
  debugMode = false;
}

class FieldArrow {
  constructor(field, x, y) {
    this.field = field;
    this._renderer = this.field._renderer;
    this.position = createVector(x, y);
    this.displayR = 13;
    this.displayStrokeWeight = 2;
    this.displayArrowSize = 2;
  }

  display(){
    if (debugMode) {
      console.log(`Mouse position: ${this.field.space.mousePosition}\nFieldArrow position: ${this.position}`)
    }
    let vec = p5.Vector.sub(this.field.space.particles[0].position, this.position);
    let arrowSize = this.displayArrowSize;
    let mag600 = min(vec.mag(), 600) / 600 * 255;
    let color = [255-mag600, 0, mag600];
    let angle = vec.heading();
    this._renderer.push();
    this._renderer.stroke(color);
    this._renderer.strokeWeight(this.displayStrokeWeight);
    this._renderer.fill(color);
    this._renderer.translate(this.position.x, this.position.y);
    this._renderer.line(0, 0, cos(angle)*this.displayR, sin(angle)*this.displayR);
    this._renderer.rotate(vec.heading());
    this._renderer.translate(this.displayR - arrowSize, 0);
    this._renderer.triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    this._renderer.pop();
  }
}

let space;
function setup() {
  createCanvas(1600, 700);
  space = new Space(1600, 600);
  electricField = new Field(chargeFunction=(particle => particle.electricCharge));
  space.addField(electricField);
  particle = new Particle(100, 100, positionFunction=(particle => particle.space.mousePosition))
  space.addParticle(particle);
}

function draw() {
  currentTime = space.getCurrentTime();
  background(240);
  textSize(32);
  text(formatTime(currentTime), 10, 30);
  space.display(10, 50);
}
