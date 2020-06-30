import Hexagons from './hexagons.js'

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
  const graphics = new PIXI.Graphics()
  graphics.lineStyle(1, 0xDCDCDC)
  graphics.drawPolygon(path)
  graphics.endFill()
  graphics.cacheAsBitmap = true
  hexagons.hexagons.forEach(item => {
    const clone = graphics.clone()
    clone.x = item.center.x
    clone.y = item.center.y
    container.addChild(clone)
  })
  container.cacheAsBitmap = true
  container.x = 20
  container.y = 20
  container.interactive = true
  container.on("pointertap", e => {
    bunny(e)
  })
  return container
}

function bunny (e) {
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

      return {rx, ry, rz}
  }
  const hex = pixel_to_hex(mx, my)
  const target = app.hexMap.hexagons.filter(item => item.x === hex.rx && item.y === hex.ry)[0]
  console.log(target)
}

function initLevel() {
  app.stage.addChild(drawHex(app.hexMap))
}
