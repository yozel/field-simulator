import { Vector } from './utils/vector.js'

export function oscillation(targetCenter, scalar=0.01){
  const result = particle => Vector.sub(targetCenter, particle.position).mult(scalar);
  result.targetCenter = targetCenter;
  return result;
}

export function still(){
  return _ => new Vector(0, 0);
}
