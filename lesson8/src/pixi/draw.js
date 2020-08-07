import * as PIXI from 'pixi.js-legacy'

export class Draw {   
    constructor (app) {
        this.app = app
    }
    gameObj () {
        const pixiObj = PIXI.Sprite.from('https://pixijs.io/examples/examples/assets/bunny.png')
        this.app.stage.addChild(pixiObj)
        return pixiObj
    }
    move () {
        function select(state) {
            return state.game
        }
        this.app.observeStore(this.app.store, select, this.move1, this.app.banny)
    }
    move1({x, y}, obj) {
        obj.x = x
        obj.y = y
    }
    drawMap(offset) {
        const container = this.app.map.draw("0xDCDCDC")
        container.x = offset.x
        container.y = offset.y
        this.app.stage.addChild(container)
    }
}