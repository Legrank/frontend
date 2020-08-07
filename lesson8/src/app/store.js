import { configureStore } from '@reduxjs/toolkit'
import gameReducer from '../features/game/gameSlice'
import loginReduser from '../features/login/loginSlice'

export default configureStore({
  reducer: {
    game: gameReducer,
    login: loginReduser,
  },
});
