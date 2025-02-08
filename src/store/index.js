import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { OpenAiReducer } from "./reducers/OpenAiReducer";
import { thunk } from 'redux-thunk';
import { UtilReducer } from "./reducers/UtilReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({ OpenAiReducer, UtilReducer });

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
