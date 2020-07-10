export class App {
    constructor() {
        this.renderer = new PIXI.Renderer({
            width: 1280,
            height: 720,
            backgroundColor: 0x1099bb,
        });
        this.ticker = new PIXI.Ticker();
        this.stage = new PIXI.Container();
        this.loader = new PIXI.Loader();

        this.Hex = Honeycomb.extendHex({ size: 20 })
        this.Grid = Honeycomb.defineGrid(this.Hex)
        this.gameMap = this._createGameMap ()
        this.activeHex = {}
        this.activeHex.pixi = new PIXI.Container()

        this.ticker.add(this.render.bind(this), PIXI.UPDATE_PRIORITY.LOW);
        this.ticker.start();
    }

    _createGameMap () {
        const gameMap = this.Grid.rectangle({ width: 30, height: 20 })
        gameMap.forEach(hex => {
            hex.target = false
        })
        return gameMap
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