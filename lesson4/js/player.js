import { Hex } from "./hexagons.js"

export class Player {
    constructor (map, startPos) {
        this.map = map,
        this.pos = startPos
    }
    areaMove (dist) {
        let visited = []
        const hexList = []
        let visitedNext = []
        const sosed = [new Hex(1, 0, -1),new Hex(1, -1, 0),new Hex(-1, 1, 0),new Hex(0, 1, -1),new Hex(-1, 0, 1),new Hex(0, -1, 1),]
        visited.push(this.pos)
        this.pos.target = true
        for (let i = 0; i < dist; i++) {
            visited.forEach(vis => {
                sosed.forEach(item => {               
                    const hex = this.map.findHex(vis.add(item))
                    if (hex && !hex.block && !hex.target) {                   
                        hex.target = true
                        hexList.push(hex)
                        visitedNext.push(hex)
                    }                  
                })
            })
            visited = visitedNext
            visitedNext = []
        }
        return hexList
    }
}

