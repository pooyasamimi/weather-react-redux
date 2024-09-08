import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weather/weatherSlice";
import createSagaMiddleware from "redux-saga";
import watcherSaga from "./weather/weatherSaga";



const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
    reducer: {
        weather: weatherReducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({ thunk: false }).prepend(sagaMiddleware);
    },
})
sagaMiddleware.run(watcherSaga)