import {Hexagons, Hexagon} from './hexagons.js'
import {Draw} from './draw.js'
import {Player} from './player.js'
import {Interactive} from './interactive.js'

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
    this.player = new Player(this.hexMap, this.hexMap.hexList[71])

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

function initLevel() {
  const mapContainer = Draw.hexagons(app.hexMap.hexList, "0xDCDCDC")
  mapContainer.cacheAsBitmap = true
  mapContainer.x = 20
  mapContainer.y = 20
  mapContainer.interactive = true
  mapContainer.on("pointerdown", e => {
    const targetContainer = Interactive.click(e, app)
    app.stage.addChild(targetContainer)
  });
  app.stage.addChild(mapContainer)
  
  app.stage.addChild(Draw.player(app))
}
