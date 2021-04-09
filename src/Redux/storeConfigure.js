import { createStore, compose, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../index_Reducer';
import rootSaga from '../index_Saga';
import { createLogger } from 'redux-logger';
const composeEnhandcers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        shouldHotReload: false,
      })
    : compose;
const sagaMiddleware = createSagaMiddleware();
const logger = createLogger({
  // ...options
});
const configureStore = () => {
  const middleware = [sagaMiddleware, logger];
  const enhancers = [applyMiddleware(...middleware)];
  const store = createStore(rootReducer, composeEnhandcers(...enhancers));
  sagaMiddleware.run(rootSaga);
  return store;
};
export default configureStore;
