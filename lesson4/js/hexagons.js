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
        //Действие при клике
        this.click = null
    }
    add (hex) {
        return new Hex(this.x+hex.x, this.y+hex.y, this.z+hex.z)
    }
}

export class Hex {
    constructor (x, y, z) {
        this.x = x,
        this.y = y,
        this.z = z
    }
}