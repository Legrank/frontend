export class Draw {
    static hexagons (hexList, color, beginFill = false) {
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
        hexList.forEach(item => {
            const graphics = new PIXI.Graphics()
            graphics.lineStyle(1, color)
            if (beginFill) {
                graphics.beginFill(beginFill, 1)
            }
            if (item.block) {
                graphics.beginFill(0x3500FA, 1)
            }
            graphics.drawPolygon(path)
            graphics.x = item.center.x
            graphics.y = item.center.y
            graphics.endFill()
            container.addChild(graphics)
        })
        return container
    }
    static player (app) {
        const bunny = PIXI.Sprite.from('https://pixijs.io/examples/examples/assets/bunny.png')
        const bannyHex = app.hexMap.hexList.find(item => item.obj)
        // center the sprite's anchor point
        bunny.anchor.set(0.5);
        // move the sprite to the center of the screen
        bunny.x = bannyHex.center.x+20
        bunny.y = bannyHex.center.y+20
        return bunny
    }
}

