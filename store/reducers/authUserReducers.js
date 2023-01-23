import {SET_ACCOUNT, LOGOUT, SET_LIST} from "../actions/authUser";

initialStateAuthentication = {
    username: false,
    lista: false,
} 

const authReducer = (state = initialStateAuthentication, action) => {
    switch(action.type) {
        case SET_ACCOUNT:
            return {
                ...state,
                username: action.username,
            }
        case SET_LIST:
            return {
                ...state,
                lista: action.lista,
            }
        case LOGOUT:
            return {
                ...state,
                username: action.username,
            }
        default:
            return state;
    }
}

export default authReducer;
