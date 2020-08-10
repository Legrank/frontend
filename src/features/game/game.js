import React from 'react'
import { useDispatch } from 'react-redux'
import {
  fetchMove
} from './gameSlice'

export function Game() {
  const dispatch = useDispatch();

  return (
    <div>
      <div className="game">
        <button
          onClick={() => dispatch(fetchMove({x:-10})) }
        >
          &#129144;
        </button>
        <button
          onClick={() => dispatch(fetchMove({x:10})) }
        >
          &#129146;
        </button>
        <button
          onClick={() => dispatch(fetchMove({y:-10})) }
        >
          &#129145;
        </button>
        <button
          onClick={() => dispatch(fetchMove({y:10})) }
        >
          &#129147;
        </button>
        <span ></span>
      </div>
    </div>
  );
}
