import Space from './simulation/space.js'
import Field from './simulation/field.js'
import Particle from './simulation/particle.js'
import * as utils from './simulation/utils.js'

export function simulator(width, height, node) {
  let seed = (sketch) => {
    let electricField, space

    sketch.setup = () => {
      sketch.createCanvas(width, height, "WebGL");
      space = new Space(sketch, width, height, {"c": 200});
      electricField = new Field(function(position, particles) {
        let vec = sketch.createVector(0, 0);
        for (const particle of particles) {
          let posDiffVector = p5.Vector.sub(particle.position, position)
          let magnitute = 9 * (10**9) * particle.electricCharge / (posDiffVector.mag() ** 2)
          posDiffVector.setMag(magnitute);
          vec.add(posDiffVector);
        }
        return vec
      });
      space.addField(electricField);

      let particleTargetPosition = sketch.createVector(100, 200);
      let particle = new Particle(sketch, 100, 100, function(particle){
        let acceleration = p5.Vector.sub(particleTargetPosition, particle.position);
        acceleration.mult(0.001);
        particle.velocity.add(acceleration)
        particle.position.add(particle.velocity);
      });

      space.addParticle(particle);
    }

    sketch.draw = () => {
      let currentTime = space.getCurrentTime();
      space.update(0, 0);
      space.render(0, 0);
      if (space.paused) return;
      sketch.textSize(32);
      sketch.text("FPS: " + sketch.frameRate().toFixed(2), 10, height - 10);
      sketch.text(utils.formatTime(currentTime), 10, 30);
    }
  }

  return new p5(seed, node)
}

