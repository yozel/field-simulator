import * as utils from '../simulation/utils/utils.js'
import { sketch } from './draw.js'

function changePalette(color, palette) {
  return Math.round(Math.round((color / 255) * palette) * ( 255 / palette ))
}

class ArrowDisplay {
  constructor(){
    this.minAngle = 999
    this.maxAngle = -999

    this.arrowMask.cache = {}
    this.arrowColored.cache = {}
    this.arrow.cache = {}
  }

  arrowMask(r) {
    r = Math.round(r)
    if (this.arrowMask.cache[r]) return this.arrowMask.cache[r];
    let arrowSize = 8
    let lineWidth = 2
    let triangleSideLen = arrowSize * 2 / Math.sqrt(3)
    let color = [0,0,0]
    let pg = sketch.createGraphics(r, triangleSideLen)
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
    color = [Math.round(color[0]), Math.round(color[1]), Math.round(color[2]), Math.round(color[3])]
    if (this.arrowColored.cache[[r, color]]) return this.arrowColored.cache[[r, color]];
    let arrowMask = this.arrowMask(r)
    let colorImage = sketch.createGraphics(arrowMask.width, arrowMask.height).background(color);
    colorImage.background(color);
    let image = colorImage.get()
    image.mask(arrowMask)
    return (this.arrowColored.cache[[r, color]] = image)
  }

  arrow(r, color, angle) {
    r = Math.round(r)
    let colorPalette = 16
    color = [changePalette(color[0], colorPalette), changePalette(color[1], colorPalette), changePalette(color[2], colorPalette), color[3]]
    angle = utils.round(angle, 1) * 10
    if (angle % 2 != 0) angle -= 1
    angle /= 10
    if (this.arrow.cache[[r, color, angle]]) return this.arrow.cache[[r, color, angle]];
    let image = this.arrowColored(r, color)
    let pg = sketch.createGraphics(image.width, image.width)
    pg.translate(pg.width/2, pg.height/2)
    pg.rotate(angle)
    pg.image(image, -image.width/2, -image.height/2)
    return ( this.arrow.cache[[r, color, angle]] = pg);
  }
}

export let arrowDisplayFactory = new ArrowDisplay()
