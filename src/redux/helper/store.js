import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { rootReducer } from '../reducer'

const loggerMiddleware = createLogger();
export const store = createStore(rootReducer,
    composeWithDevTools(applyMiddleware(
        loggerMiddleware,
        thunkMiddleware
    ))
)