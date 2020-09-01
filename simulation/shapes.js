import * as utils from './utils.js'

class ArrowDisplay {
  constructor(sketch){
    this.sketch = sketch
    this.minAngle = 999
    this.maxAngle = -999

    this.arrowMask.cache = {}
    this.arrowColored.cache = {}
    this.arrow.cache = {}
  }

  warmup(r) {
    // for (var i=0; i <= 255; i++){
    //   this.arrowColored(r, [255-i, 0, i])
    // }
  }

  arrowMask(r) {
    r = Math.round(r)
    if (this.arrowMask.cache[r]) return this.arrowMask.cache[r];
    let arrowSize = 8
    let lineWidth = 2
    let triangleSideLen = arrowSize * 2 / this.sketch.sqrt(3)
    let color = [0,0,0]
    let pg = this.sketch.createGraphics(r, triangleSideLen)
    pg.stroke(color)
    pg.strokeWeight(lineWidth)
    pg.fill(color)
    pg.translate(0, pg.height / 2)
    pg.line(0, 0, r-arrowSize, 0)
    pg.translate(r-arrowSize, 0)
    pg.strokeWeight(0)
    pg.triangle(0, triangleSideLen / 2, 0, -triangleSideLen / 2, arrowSize, 0)
    return (this.arrowMask.cache[r] = pg)
  }

  arrowColored(r, color){
    r = Math.round(r)
    color = [Math.round(color[0]), Math.round(color[1]), Math.round(color[2])]
    if (color[0] % 2 != 0) color[0]+=1;
    if (color[1] % 2 != 0) color[1]+=1;
    if (color[2] % 2 != 0) color[2]+=1;
    if (this.arrowColored.cache[[r, color]]) return this.arrowColored.cache[[r, color]];
    let arrowMask = this.arrowMask(r)
    let colorImage = this.sketch.createGraphics(arrowMask.width, arrowMask.height).background(color);
    colorImage.background(color);
    let image = colorImage.get()
    image.mask(arrowMask)
    return (this.arrowColored.cache[[r, color]] = image)
  }


  arrow(r, color, angle) {
    r = Math.round(r)
    color = [Math.round(color[0]), Math.round(color[1]), Math.round(color[2])]
    angle = utils.round(angle, 2)
    if (this.arrow.cache[[r, color, angle]]) return this.arrow.cache[[r, color, angle]];
    let image = this.arrowColored(r, color)
    let pg = this.sketch.createGraphics(image.width, image.width)
    pg.translate(pg.width/2, pg.height/2)
    pg.rotate(angle)
    pg.image(image, -image.width/2, -image.height/2)
    return ( this.arrow.cache[[r, color, angle]] = pg);
  }
}



// ArrowDisplay.prototype.arrowMask = memoize(ArrowDisplay.prototype.arrowMask)
// ArrowDisplay.prototype.arrowColored = memoize(ArrowDisplay.prototype.arrowColored)
// ArrowDisplay.prototype.arrow = memoize(ArrowDisplay.prototype.arrow)

export default ArrowDisplay
