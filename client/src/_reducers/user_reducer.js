import {
    LOGIN_USER, 
    REGISTER_USER,
    AUTH_USER
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
    case AUTH_USER:
            //action.payload 에는 서버에서 돌아온 유저명, 인증여부,운영자여부,유저이미지이름까지 담겨있음
            return {...state, userData: action.payload}

    default:
        return state;
  }

}