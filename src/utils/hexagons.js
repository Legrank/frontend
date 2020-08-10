import * as PIXI from 'pixi.js-legacy'

export class Hexagons {
    constructor (row, cell, size) {
        this.hexList = []
        this._generateHexagons(row, cell, size)
    }
    _generateHexagons(row, cell, size) {
        const width = Math.sqrt(3)/2 * size*2
        for (let j = 0; j<row; j++){
            for (let i = 0; i < cell; i++){
                if (i%2){
                    this.hexList.push(new Hexagon({x:0+size*2/4*3*i, y:0+width/2+width*j}, i, j))
                } else {
                    this.hexList.push(new Hexagon({x:0+size*2/4*3*i, y:0+width*j}, i, j))
                }
            }
        } 
        //TODO Временная заглушка с тест данными
        this.hexList[10].block = true
        this.hexList[25].block = true
        this.hexList[40].block = true
        this.hexList[55].block = true
        this.hexList[70].block = true
        this.hexList[71].obj = true
    }
    findHex (hex) {
        return this.hexList.find(item => item.x === hex.x && item.y === hex.y)
    }
    pixelToHex(x, y){
        const q = x * 2/3 / 20
        const r = (-x / 3 + Math.sqrt(3)/3 * y) / 20
        const s = -q-r
        return this._cubeRound({x:q, y:r, z:s})
    }
    _cubeRound(h){
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
  
        return {x:rx, y:ry, z:rz}
    }
    draw (color, beginFill = false) {
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
        this.hexList.forEach(item => {
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
}

export class Hexagon {
    constructor (center, row, cell) {
        this.center = center
        this.q = row
        this.r = cell
        this.x = this.q   
        this.y = this.r - (this.q - (this.q&1)) / 2
        this.z = -this.x -  this.y
        //Клетка непроходима?
        this.block = false
        //В клетке расположен обьект?
        this.obj = false
        //Клетка выделена?
        this.target = false
    }
}
