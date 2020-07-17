import {App} from './app.js'

export function initPixi (dispatch, store) {
    function initLevel() {
        document.getElementById('pixi').appendChild(app.view)
    }
    const app = new App(dispatch, store)
    app.loader.load(initLevel)
    app.draw.move()
    return app
}

