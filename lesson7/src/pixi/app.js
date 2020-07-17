import * as PIXI from 'pixi.js-legacy'

import {Draw} from './draw.js'

export class App {
    constructor(dispatch, store) {
        this.renderer = new PIXI.Renderer({
            width: 1280,
            height: 720,
            backgroundColor: 0x1099bb,
        });
        this.ticker = new PIXI.Ticker()
        this.stage = new PIXI.Container()
        this.loader = new PIXI.Loader()

        this.dispatch = dispatch
        this.store = store
        this.draw = new Draw(this)
        this.banny = this.draw.gameObj()

        this.ticker.add(this.render.bind(this), PIXI.UPDATE_PRIORITY.LOW)
        this.ticker.start()
    }
  
    render() {
        this.renderer.render(this.stage)
    }
  
    get view() {
        return this.renderer.view;
    }

    observeStore(store, select, onChange, arg) {
        let currentState;
      
        function handleChange() {
          let nextState = select(store.getState());
          if (nextState !== currentState) {
            currentState = nextState;
            onChange(currentState, arg);
          }
        }
      
        let unsubscribe = store.subscribe(handleChange);
        handleChange();
        return unsubscribe;
    }
  
    destroy() {
        this.renderer.destroy();
        this.ticker.stop();
    }
  }