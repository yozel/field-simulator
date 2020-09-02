export class Vector{
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = 0;
    this[2] = 0;
  }

  heading() {
    return Math.atan2(this.y, this.x);
  }

  setHeading(direction) {
    var magnitude = this.mag();
    this.x = Math.cos(direction) * magnitude;
    this.y = Math.sin(direction) * magnitude;
  }

  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  setMag(magnitude) {
    var direction = this.heading();
    this.x = Math.cos(direction) * magnitude;
    this.y = Math.sin(direction) * magnitude;
  }

  static add(v1, v2) {
    return new Vector(v1.x + v2.x, v1.y + v2.y);
  }

  add(v2) {
    this.x += v2.x;
    this.y += v2.y;
    return this;
  }

  static sub(v1, v2) {
    return new Vector(v1.x - v2.x, v1.y - v2.y);
  }

  sub(v2) {
    this.x -= v2.x;
    this.y -= v2.y;
    return this;
  }

  static mult(v1, scalar){
    return new Vector(v1.x * scalar, v1.y * scalar);
  }

  mult(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }

  static div(v1, scalar) {
    return new Vector(v1.x / scalar, v1.y / scalar);
  }

  div(scalar) {
    this.x /= scalar;
    this.y /= scalar;
    return this;
  }

  copy() {
    return new Vector(this.x, this.y);
  }
}

// // Aliases
// Vector.prototype.getLength = Vector.prototype.mag;
// Vector.prototype.setLength = Vector.prototype.setMag;

// Vector.prototype.getAngle = Vector.prototype.heading;
// Vector.prototype.setAngle = Vector.prototype.setHeading;




