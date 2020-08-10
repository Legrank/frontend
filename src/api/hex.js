function _generateHexagons(row, cell, size) {
    const width = Math.sqrt(3)/2 * size*2
    for (let j = 0; j<row; j++){
        for (let i = 0; i < cell; i++){
            if (i%2){
                hexList.push(new Hexagon({x:0+size*2/4*3*i, y:0+width/2+width*j}, i, j))
            } else {
                hexList.push(new Hexagon({x:0+size*2/4*3*i, y:0+width*j}, i, j))
            }
        }
    } 
    //TODO Временная заглушка с тест данными
    hexList[10].block = true
    hexList[25].block = true
    hexList[40].block = true
    hexList[55].block = true
    hexList[70].block = true
    hexList[71].obj = true
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
    }
}

const hexList = []
_generateHexagons(10, 10, 20)
export const hexList1 = JSON.parse(JSON.stringify(hexList))
