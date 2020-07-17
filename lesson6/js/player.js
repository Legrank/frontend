export class Player {
    constructor (hex) {
        this.hex = hex
        hex.obj = this
        this.sprite = PIXI.Sprite.from('https://pixijs.io/examples/examples/assets/bunny.png')
    }

    move (newHex) {
        this.hex.obj = false //удаляем ссылку на объект их старых координат
        this.hex = newHex
        newHex.obj = this
        this.pixi.x = newHex.toPoint().x+100
        this.pixi.y = newHex.toPoint().y
    }
}