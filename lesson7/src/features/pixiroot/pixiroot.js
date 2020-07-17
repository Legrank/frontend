import React, { useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

import { initPixi } from '../../pixi'

export function Pixiroot() {
    const dispatch = useDispatch()
    const store = useStore()
    useEffect(() => {
        const app = initPixi(dispatch, store)
        return app.destroy
    }, [])
    return (
        <div id="pixi">

        </div>
    );
}
