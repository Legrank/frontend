import {Hexagons, Hexagon} from './hexagons.js'

class App {
  constructor() {
    this.renderer = new PIXI.Renderer({
      width: 1280,
      height: 720,
      backgroundColor: 0x1099bb,
    });
    this.ticker = new PIXI.Ticker();
    this.stage = new PIXI.Container();
    this.loader = new PIXI.Loader();
    this.hexMap = new Hexagons(10,15,20)

    this.ticker.add(this.render.bind(this), PIXI.UPDATE_PRIORITY.LOW);
    this.ticker.start();
  }

  render() {
    this.renderer.render(this.stage);
  }

  get view() {
    return this.renderer.view;
  }

  destroy() {
    this.renderer.destroy();
    this.ticker.stop();
  }
}

const app = new App()
document.getElementById("root").appendChild(app.view)

app.loader.baseUrl = "../assets"

// CROSS ORIGIN
// RITUAL SACRIFICE

const options = { crossOrigin: "*" }

app.loader.load(initLevel)

function drawHex (hexagons) {
  const path = []
  const container = new PIXI.Container()
  function hex_corner (center, size, i){
      const angle_deg = 60 * i   + 30
      const angle_rad = Math.PI / 180 * angle_deg
      return [center.x + size *  Math.sin(angle_rad), center.y + size * Math.cos(angle_rad)]
  }
  for( let i = 0; i < 6; i++) {
    const point = hex_corner({x: 0, y: 0}, 20, i)
    path.push(...point)
  }
  hexagons.hexagons.forEach(item => {
    const graphics = new PIXI.Graphics()
    graphics.lineStyle(1, 0xDCDCDC)
    if (item.block) {
      graphics.beginFill(0x3500FA, 1)
    }
    graphics.drawPolygon(path)
    graphics.x = item.center.x
    graphics.y = item.center.y
    graphics.endFill()
    graphics.cacheAsBitmap = true
    container.addChild(graphics)
  })
  container.cacheAsBitmap = true
  container.x = 20
  container.y = 20
  container.interactive = true
  container.on("pointertap", e => {
    if (app.targets){
      app.targets.destroy()
    }
    app.targets = app.stage.addChild(target(e))
  })
  return container
}

function target (e) {
  app.hexMap.hexagons.forEach(item => item.target = false)
  const mx = e.data.global.x-20
  const my = e.data.global.y-20
  function pixel_to_hex(x, y){
      const q = x * 2/3 / 20
      const r = (-x / 3 + Math.sqrt(3)/3 * y) / 20
      const s = -q-r
      return cube_round({x:q, y:r, z:s})
  }
  function cube_round(h){
      var rx = Math.round(h.x)
      var ry = Math.round(h.y)
      var rz = Math.round(h.z)

      var x_diff = Math.abs(rx - h.x)
      var y_diff = Math.abs(ry - h.y)
      var z_diff = Math.abs(rz - h.z)

      if (x_diff > y_diff && x_diff > z_diff){
          rx = -ry-rz
      } else if (y_diff > z_diff) {
          ry = -rx-rz
      } else {
          rz = -rx-ry
      }

      return {x:rx, y:ry, z:rz}
  }
  const hex = pixel_to_hex(mx, my)
  const target = app.hexMap.findHex(hex)
  const container = new PIXI.Container()
  if (target.obj) {
    const sosed = [{x:1, y:-1, z:0},{x:1, y:0, z:-1},{x:-1, y:1, z:0},{x:0, y:1, z:-1},{x:0, y:-1, z:1},{x:-1, y:0, z:1}]
    function add (hex1, hex2) {
      return {x:hex1.x+hex2.x,y:hex1.y+hex2.y,z:hex1.z+hex2.z}
    }
    const targets = []
    const proverit = []
    targets.push(target)
    for (let i = 0; i < 3; i++){
      sosed.forEach(item => {
        const hex = app.hexMap.findHex(add(target, item))
        if (hex && !hex.block && !hex.target) {
          hex.target = true
          targets.push(hex)
        }
      })
    }
    const path = []
    function hex_corner (center, size, i){
        const angle_deg = 60 * i   + 30
        const angle_rad = Math.PI / 180 * angle_deg
        return [center.x + size *  Math.sin(angle_rad), center.y + size * Math.cos(angle_rad)]
    }
    for( let i = 0; i < 6; i++) {
      const point = hex_corner({x: 0, y: 0}, 20, i)
      path.push(...point)
    }
    targets.forEach(item => {
      if (!item || item.block) {
        return
      }
      const graphics = new PIXI.Graphics()
      graphics.lineStyle(3, 0xffff00)
      //graphics.beginFill(0x990099, 1)
      graphics.drawPolygon(path)
      graphics.x = item.center.x
      graphics.y = item.center.y
      graphics.endFill()
      graphics.cacheAsBitmap = true
      container.addChild(graphics)
    })
    container.x = 20
    container.y = 20
  }
  return container
}

function moveObj () {

}

function initLevel() {
  app.stage.addChild(drawHex(app.hexMap))
  const bunny = PIXI.Sprite.from('https://pixijs.io/examples/examples/assets/bunny.png')
  const bannyHex = app.hexMap.hexagons.find(item => item.obj)
  // center the sprite's anchor point
  bunny.anchor.set(0.5);
  // move the sprite to the center of the screen
  bunny.x = bannyHex.center.x+20
  bunny.y = bannyHex.center.y+20
  app.stage.addChild(bunny)
}
