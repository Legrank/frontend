import {Draw} from './draw.js'
import {Player} from './player.js'
import {Entity} from './etity.js'
import { Game } from './game.js';

export class App {
    constructor() {
        this.renderer = new PIXI.CanvasRenderer({
            width: 1280,
            height: 720,
            backgroundColor: 0x1099bb,
        });
        this.ticker = new PIXI.Ticker()
        this.stage = new PIXI.Container()
        this.loader = new PIXI.Loader()

        this.Hex = Honeycomb.extendHex({ size: 20 })
        this.Grid = Honeycomb.defineGrid(this.Hex)
        this.activeHex = {}
        this.activeHex.pixi = new PIXI.Container()

        this.game = new Game(this)
        this.draw = new Draw(this)
        this.player = new Player(this.gameMap[70])

        this.ticker.add(this.render.bind(this), PIXI.UPDATE_PRIORITY.LOW);
        this.ticker.start();
    }
  
    render() {
        this.renderer.render(this.stage)
    }
  
    get view() {
        return this.renderer.view
    }

    get gameMap() {
        return this.game.gameMap
    }
  
    destroy() {
        this.renderer.destroy()
        this.ticker.stop()
    }
  }