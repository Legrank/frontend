import { createSlice } from '@reduxjs/toolkit'

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    x: 100,
    y: 100,
  },
  reducers: {
    right: state => {
      state.x +=10
    },
    left: state => {
      state.x -=10
    },
    top: state => {
      state.y +=10
    },
    down: state => {
      state.y -=10
    },
  },
});

export const { right, left, top, down } = gameSlice.actions

export default gameSlice.reducer
