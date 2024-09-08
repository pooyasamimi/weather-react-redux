import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loading: false,
    data: [],
    error: ''
}

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        sendWeatherRequest: (state,action) => {
            state.loading = true
        },
        receiveWeatherResponse: (state, action) => {  
            console.log(action.payload);
            state.loading = false
            state.data = action.payload
            state.error = ''            
        },
        receiveWeatherError: (state, action) => {
            state.loading = false
            state.data = []
            state.error = action.payload
        },
    }
})


export const { sendWeatherRequest, receiveWeatherResponse, receiveWeatherError } = weatherSlice.actions
export default weatherSlice.reducer