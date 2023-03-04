import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { appreducer } from "./AppReducer/reducer";
import { authreducer } from "./AuthReducer/reducer";
import {contactreducer} from "./ContactReducer/reducer"


const combineReducer = combineReducers({authreducer , contactreducer , appreducer })

export const store = legacy_createStore(combineReducer , applyMiddleware(thunk))