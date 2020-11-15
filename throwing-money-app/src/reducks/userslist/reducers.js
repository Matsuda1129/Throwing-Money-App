import * as Actions from './actions'
import initialState from '../store/initialState'

export const UsersListReducer = (state = initialState.userslist, action) => {
  switch (action.type) {
    case Actions.FETCH_USERSLIST:
      return {
        ...state,
       list:[...action.payload]
      };
      default:
        return state
  }
}