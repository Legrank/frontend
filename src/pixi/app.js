import * as PIXI from 'pixi.js-legacy'

import store from '../app/store';
import {Draw} from './draw.js'
import {Hexagons} from '../utils/hexagons'

export class App {
    constructor() {
        this.renderer = new PIXI.Renderer({
            width: 800,
            height: 400,
            backgroundColor: 0x1099bb,
        });
        this.ticker = new PIXI.Ticker()
        this.stage = new PIXI.Container()
        this.loader = new PIXI.Loader()

        this.dispatch = store.dispatch
        this.store = store
        this.map = new Hexagons(10, 10, 20)
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