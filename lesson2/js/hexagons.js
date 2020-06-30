export class Hexagons {
    constructor (row, cell, size) {
        this.hexagons = []
        this.generateHexagons(row, cell, size)
    }
    generateHexagons(row, cell, size) {
        const width = Math.sqrt(3)/2 * size*2
        for (let j = 0; j<row; j++){
            for (let i = 0; i < cell; i++){
                if (i%2){
                    this.hexagons.push(new Hexagon({x:0+size*2/4*3*i, y:0+width/2+width*j}, i, j))
                } else {
                    this.hexagons.push(new Hexagon({x:0+size*2/4*3*i, y:0+width*j}, i, j))
                }
            }
        } 
        this.hexagons.forEach(item => {
            item.x = item.q   
            item.y = item.r - (item.q - (item.q&1)) / 2
            item.z = -item.x -  item.y
        }) 
        this.hexagons[10].block = true
        this.hexagons[25].block = true
        this.hexagons[40].block = true
        this.hexagons[55].block = true
        this.hexagons[70].block = true
        this.hexagons[71].obj = true
    }
    findHex (hex) {
        return this.hexagons.find(item => item.x === hex.x && item.y === hex.y)
    }
}

export class Hexagon {
    constructor (center, row, cell) {
        this.center = center
        this.q = row
        this.r = cell
        this.block = false
        this.obj = false
        this.target = false
    }
}