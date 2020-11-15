import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware
} from 'redux'

import {connectRouter, routerMiddleware} from "connected-react-router";
import thunk from 'redux-thunk';
import {UsersListReducer} from '../userslist/reducers';
import {UsersReducer} from '../users/reducers';

export default function createStore(history) {
  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
      // products: ProductsReducer,
      users: UsersReducer,
      userslist: UsersListReducer
    }),
    applyMiddleware(
      routerMiddleware(history),
      thunk
    )
  );
}