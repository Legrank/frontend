export class Draw {
    constructor (app) {
        this.app = app
        this.hexModel = this.graphicsHexModels ()
        this.hexModelActive = this.graphicsHexModelsActive ()
    }
    graphicsHexModels (style = '0xDCDCDC') {
        const corners = []
        this.app.Hex().corners().forEach(corner => {
            corners.push(corner.x)
            corners.push(corner.y)
        })
        const graphics = new PIXI.Graphics()
        graphics.lineStyle(1, style)
        graphics.drawPolygon(corners)
        graphics.endFill()
        return graphics
    }
    graphicsHexModelsActive () {
        return this.graphicsHexModels('0x3500FA')
    }

    hexMap (hexMap) {
        const pixiMap = new PIXI.Container()
        hexMap.forEach(hex => {
            const geometry = hex.active ? this.hexModelActive.geometry : this.hexModel.geometry
            const graphics = new PIXI.Graphics(geometry)
            graphics.x = hex.toPoint().x
            graphics.y = hex.toPoint().y
            pixiMap.addChild(graphics)
        })
        pixiMap.x = 100
        return pixiMap
    }
    gameObj (gameObj) {
        const pixiObj = gameObj.sprite
        pixiObj.x = gameObj.hex.toPoint().x+100
        pixiObj.y = gameObj.hex.toPoint().y
        gameObj.pixi = pixiObj
        this.app.stage.addChild(pixiObj)
    }
}