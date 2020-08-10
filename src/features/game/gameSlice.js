import { createSlice } from '@reduxjs/toolkit'
import {getMove} from '../../api/gameAPI'

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    loading: false,
    x: 100,
    y: 100,
    error: {},
  },
  reducers: {
    getMoveStart: state => {
      state.loading = true
    },
    getMoveSuccess: (state, action) => {
      const { x, y } = action.payload
      state.x += x
      state.y += y
      state.loading = false
      state.error = null
    },
    getMoveFailure(state, action) {
      state.loading = false
      state.error = action.payload
    }
  },
});

export const { getMoveStart, getMoveSuccess, getMoveFailure} = gameSlice.actions

export default gameSlice.reducer

export const fetchMove = (napr) => async dispatch => {
  try {
      dispatch(getMoveStart())
      const move = await getMove(napr)
      dispatch(getMoveSuccess(move))
  } catch (err) {
      dispatch(getMoveFailure(err))
  }
}
