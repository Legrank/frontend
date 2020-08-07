import React from 'react'
import { useDispatch } from 'react-redux'
import {fetchLogin} from './loginSlice'

export function Login() {
  const dispatch = useDispatch();

  return (
    <div>
        <button
          onClick={() => {
            dispatch(fetchLogin())
            } }
        >
          &#129144;
        </button>
    </div>
  );
}
