export class Vector extends Array{
  constructor(x, y) {
    super()
    this[0] = x || 0
    this[1] = y || 0;
  }

  static equals(v1, v2) {
    return v1.x === v2.x && v1.y === v2.y;
  }

  get x() { return this[0]; }
  get y() { return this[1]; }
  set x(x) { this[0] = x; }
  set y(y) { this[1] = y; }

  heading() {
    return Math.atan2(this[1], this[0]);
  }

  setHeading(direction) {
    var magnitude = this.mag();
    this[0] = Math.cos(direction) * magnitude;
    this[1] = Math.sin(direction) * magnitude;
  }

  magSq() {
    return this[0] * this[0] + this[1] * this[1];
  }

  mag() {
    return Math.sqrt(this.magSq());
  }

  setMag(magnitude) {
    var direction = this.heading();
    this[0] = Math.cos(direction) * magnitude;
    this[1] = Math.sin(direction) * magnitude;
    return this;
  }

  static add(v1, v2) {
    return new Vector(v1[0] + v2[0], v1[1] + v2[1]);
  }

  add(v2) {
    this[0] += v2[0];
    this[1] += v2[1];
    return this;
  }

  static sub(v1, v2) {
    return new Vector(v1[0] - v2[0], v1[1] - v2[1]);
  }

  sub(v2) {
    this[0] -= v2[0];
    this[1] -= v2[1];
    return this;
  }

  static mult(v1, scalar){
    return new Vector(v1[0] * scalar, v1[1] * scalar);
  }

  mult(scalar) {
    this[0] *= scalar;
    this[1] *= scalar;
    return this;
  }

  static div(v1, scalar) {
    return new Vector(v1[0] / scalar, v1[1] / scalar);
  }

  div(scalar) {
    this[0] /= scalar;
    this[1] /= scalar;
    return this;
  }

  copy() {
    return new Vector(this[0], this[1]);
  }
}

// // Aliases
// Vector.prototype.getLength = Vector.prototype.mag;
// Vector.prototype.setLength = Vector.prototype.setMag;

// Vector.prototype.getAngle = Vector.prototype.heading;
// Vector.prototype.setAngle = Vector.prototype.setHeading;




