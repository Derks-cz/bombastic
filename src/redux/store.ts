import {createStore,applyMiddleware,combineReducers, compose } from 'redux'
import createSagaMiddleware from 'redux-saga';
import listReducer from './reducers/listReducer'
import usersReducer from './reducers/userReducer';
import watchGetUser from './sagaRequest';
declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }


const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({list:listReducer,user:usersReducer})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,composeEnhancers(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(watchGetUser)

export default store

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>