import axios from "axios";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { receiveWeatherError, receiveWeatherResponse, sendWeatherRequest } from "./weatherSlice";







function getWeatherReq(query) {    
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=119d12c738e0c50abf2cde3c573e6fc5`, { timeout: 5000 })
}

export function* handlerWatcherSaga(action) {    
    try {
        const weather = yield call(getWeatherReq, action.payload)
        yield put(receiveWeatherResponse(weather.data))
    } catch (error) {
        yield put(receiveWeatherError(error))
    }

}




function* watcherSaga() {
    yield takeEvery(sendWeatherRequest, handlerWatcherSaga)
}

export default watcherSaga