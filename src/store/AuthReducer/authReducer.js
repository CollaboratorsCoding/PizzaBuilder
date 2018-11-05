import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: undefined,
    email: null,
    isAdmin: false,
    loaded: undefined,
    orders: []
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_CHECK_SUCCESS:

            return {isLoggedIn: true, email: action.user.email, isAdmin: action.user.isAdmin, loaded: true, orders: action.user.orders}
            break;
        case actionTypes.AUTH_CHECK_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                loaded: true,
                orders: []
            }
            break;
        case actionTypes.AUTH_LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                isLoggedIn: false,
                loaded: true,
                orders: []
            }
            break;
        case actionTypes.AUTH_LOGIN:
            localStorage.setItem('token', action.token);
            return {
                ...state,
                loaded: true,
                isLoggedIn: true,
                email: action.user.email,
                isAdmin: action.user.isAdmin,
                orders: action.user.orders
            }
            break;
        case actionTypes.ADD_ORDER:
            return {
                ...state,
                orders: [
                    ...state.orders,
                    action.order
                ]
            }
            break;
        default:
            return state;
    }
};

export default authReducer;