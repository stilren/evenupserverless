import { createStore, applyMiddleware, compose  } from 'redux';
import reducers from './reducers/reducers';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas/sagas'

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
  applyMiddleware(sagaMiddleware)
));


sagaMiddleware.run(rootSaga)

export default store;