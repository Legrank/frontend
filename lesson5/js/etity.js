export class Entity {
    constructor (hex) {
        this.hex = hex
        hex.obj = this
        this.sprite = PIXI.Sprite.from('../asset/chest-preview.gif')
    }
}