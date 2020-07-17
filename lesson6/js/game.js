export class Game {
    constructor (app) {
        this.app = app
        this.gameMap = this._createGameMap(this.app)
        this.loader.load(initLevel)
        this.ticker.add(updateLevel)
    }

    _createGameMap (app) {
        const gameMap = app.Grid.rectangle({ width: 30, height: 20 })
        gameMap.forEach(hex => {
            hex.target = false
        })
        return gameMap
    }

    updateLevel (delta) {
        
    }

    initLevel() {
        document.body.appendChild(app.view)
        app.stage.addChild(draw.hexMap(app.gameMap))
        draw.gameObj(player)
        draw.gameObj(chest)
    }
}