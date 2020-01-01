import { createStore, applyMiddleware, combineReducers, Store } from "redux";
import thunk from "redux-thunk";
import index from "./index";

const isServer = typeof window === "undefined";
const __NEXT_REDUX_STORE__ = "__NEXT_REDUX_STORE__";

const reducer = combineReducers({
  home: index
});

export function getOrCreateStore(state = {}): Store {
  if (isServer) {
    return createStore(reducer, state, applyMiddleware(thunk));
  }

  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = createStore(
      reducer,
      state,
      applyMiddleware(thunk)
    );
  }
  return window[__NEXT_REDUX_STORE__];
}
