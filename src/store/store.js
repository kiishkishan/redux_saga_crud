import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import allReducers from "../reducer/index";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/index";

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "root",
  storage
  // blacklist: ["users"]
};

let devtools = composeWithDevTools;

const persistedReducer = persistReducer(persistConfig, allReducers);

let store = createStore(
  persistedReducer,
  devtools(applyMiddleware(sagaMiddleware))
);
let persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
