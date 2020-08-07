import React, { useEffect } from 'react';

import { initPixi } from '../../pixi'

export function Pixiroot() {
    /* eslint-disable */
    useEffect(() => {
        const app = initPixi()
        return app.destroy.bind(app)
    }, [])
    /* eslint-enable */
    return (
        <div id="pixi">

        </div>
    );
}
