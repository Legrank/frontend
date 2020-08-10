import { createSlice } from '@reduxjs/toolkit'
import {getLogin} from '../../api/loginAPI'

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        loading: false,
        error: 0,
        data: {},
    },
    reducers: {
        getLoginStart(state) {
            state.loading = true
            state.error = null
        },
        getLoginSuccess(state, action) {
            state.data = action.payload
            state.loading = false
            state.error = null
        },
        getLoginFailure(state, action) {
            state.loading = false
            state.error = action.payload
        },
    },
})

export const { getLoginStart, getLoginSuccess, getLoginFailure } = loginSlice.actions

export default loginSlice.reducer

export const fetchLogin = () => async dispatch => {
    try {
        dispatch(getLoginStart())
        const comments = await getLogin()
        dispatch(getLoginSuccess(comments))
    } catch (err) {
        dispatch(getLoginFailure(err))
    }
}
