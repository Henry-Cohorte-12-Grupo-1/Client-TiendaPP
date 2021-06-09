import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
//import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
)

//export const store = createStore(rootReducer, composeWithDevTools());

// export const store = createStore(
//     rootReducer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );
