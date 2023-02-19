import { Reducer } from 'redux';

interface User {
  id: number;
  name: string;
  email: string;
}

interface UsersState {
  user: User | null;
  loaded:boolean
  error: string | null;
}

interface GetUsersSuccessAction {
  type: 'GET_USER_SUCCESS';
  payload: User;
}

interface GetUsersFailureAction {
  type: 'GET_USER_FAILURE';
  error: string | null;
}

interface SetLoaded {
  type: "LOADED",
  payload:boolean
}

type UsersAction = GetUsersSuccessAction | GetUsersFailureAction | SetLoaded;

const initialState: UsersState = {
  user: null,
  loaded:false,
  error: null,
};

const usersReducer: Reducer<UsersState, UsersAction> = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER_SUCCESS':
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case 'GET_USER_FAILURE':
      return {
        ...state,
        user: null,
        error: action.error,
      };
    case "LOADED":
      return{
        ...state,
        loaded:action.payload
      }
    default:
      return state;
  }
};

export default usersReducer;

export const fetchUser = (payload:number) => ({type:"GET_USER_REQUEST",payload})