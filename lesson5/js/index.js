import {App} from './app.js'
import {Draw} from './draw.js'
import {Player} from './player.js'

const app = new App()
const draw = new Draw(app)
const player = new Player(app.gameMap[70])

document.addEventListener('click', ({ offsetX, offsetY }) => {
    function clear () {
        app.activeHex.pixi.destroy()
        if (app.activeHex.hex) {
            app.activeHex.hex.forEach(hex => {
                hex.active = false
            })
            app.activeHex.hex = null
        }
    }
    const hexCoordinates = app.Grid.pointToHex(offsetX-100, offsetY)
    const hex = app.gameMap.find(item => item.x === hexCoordinates.x && item.y === hexCoordinates.y )
    if (hex.active) {
        player.move(hex)   
        clear() 
        return  
    } else {
        clear()
    }
    if (hex.obj) {
        clear()
        const activeHex = app.gameMap.hexesInRange(hexCoordinates ,  2 , false)
        activeHex.forEach(hex => {
            hex.active = true
        })
        app.activeHex.hex = activeHex
        app.activeHex.pixi = draw.hexMap(activeHex)
        app.stage.addChild(app.activeHex.pixi)
    }
    
})

app.loader.load(initLevel)
app.ticker.add(updateLevel)
function updateLevel (delta) {
    
}

function initLevel() {
    document.body.appendChild(app.view)
    app.stage.addChild(draw.hexMap(app.gameMap))
    draw.gameObj(player)
}
