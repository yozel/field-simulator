import Space from './simulation/space.js'
import Field from './simulation/field.js'
import Particle from './simulation/particle.js'
import { Vector } from './simulation/utils/vector.js'
import * as utils from './simulation/utils/utils.js'


export function simulator(width, height, node) {
  let seed = (sketch) => {
    let electricField, space

    sketch.setup = () => {
      sketch.createCanvas(width, height, "WebGL");
      space = new Space(sketch, width, height, {"c": 200});
      electricField = new Field(function(position, particles) {
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
      let particle1 = new Particle(sketch, sketch.width/2, 100, -1, function(particle){
        let acceleration = Vector.sub(particleTargetPosition1, particle.position);
        acceleration.mult(0.001);
        particle.velocity.add(acceleration)
        particle.position.add(particle.velocity);
      });

      space.addParticle(particle1);

      let particleTargetPosition2 = new Vector(sketch.width/2, 250);
      let particle2 = new Particle(sketch, sketch.width/2, 400, 1, function(particle){
        let acceleration = Vector.sub(particleTargetPosition2, particle.position);
        acceleration.mult(0.001);
        particle.velocity.add(acceleration)
        particle.position.add(particle.velocity);
      });

      space.addParticle(particle2);
    }

    sketch.draw = () => {
      let currentTime = space.getCurrentTime();
      space.update(0, 0);
      space.render(0, 0);
      if (space.paused) return;
      sketch.textSize(32);
      sketch.stroke("black");
      sketch.fill("black");
      sketch.text("FPS: " + sketch.frameRate().toFixed(2), 10, height - 10);
      sketch.text(utils.formatTime(currentTime), 10, 30);
    }
  }

  return new p5(seed, node)
}

