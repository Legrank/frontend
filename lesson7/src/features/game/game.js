import React from 'react';
import { useDispatch } from 'react-redux'
import {
  right, left, top, down
} from './gameSlice'

export function Game() {
  const dispatch = useDispatch();

  return (
    <div>
      <div className="game">
        <button
          onClick={() => dispatch(left()) }
        >
          &#129144;
        </button>
        <button
          onClick={() => dispatch(right()) }
        >
          &#129146;
        </button>
        <button
          onClick={() => dispatch(down()) }
        >
          &#129145;
        </button>
        <button
          onClick={() => dispatch(top()) }
        >
          &#129147;
        </button>
        <span ></span>
      </div>
    </div>
  );
}
