import {App} from './app.js'

export function initPixi () {
    //const offset = {x: 25, y: 25}
    function initLevel() {
        document.getElementById('pixi').appendChild(app.view)
        app.draw.move()
    }
    const app = new App()
    app.loader.load(initLevel)
    return app
}

