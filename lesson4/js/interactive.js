import {Draw} from './draw.js'
export class Interactive {
    static click (e, app) {
        const mx = e.data.global.x-20
        const my = e.data.global.y-20
        const hex = app.hexMap.pixelToHex(mx, my)
        const target = app.hexMap.findHex(hex)
        if ( app.targetContainer) {
            app.targetContainer.destroy()
        }
        if (target.obj) {
            target.click = app.player.areaMove.bind(app.player)
            app.target = target.click(3)
            const targetContainer = Draw.hexagons(app.target, '0xffff00', '0xffff00')
            targetContainer.x = 20
            targetContainer.y = 20
            app.targetContainer = targetContainer
            return targetContainer
        }
        if (target.target) {
            app.target.forEach(element => {
                element.target = false
            })
            const bannyHex = app.hexMap.hexList.find(item => item.obj)
            bannyHex.obj = false
            target.obj = true
        }
    }
}