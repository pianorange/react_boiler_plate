import {
    LOGIN_USER, 
    REGISTER_USER
} from '../_actions/types'

//이전 state와 action object로 새로운 state 반환 
export default function(state = { }, action) {
  switch (action.type) {
    case LOGIN_USER:
            return {...state, loginSuccess: action.payload }
            break;
    case REGISTER_USER:
            return {...state, registerSuccess: action.payload }
            break;
    default:
        return state;
  }

}