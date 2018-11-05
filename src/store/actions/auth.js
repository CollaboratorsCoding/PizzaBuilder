import axios from 'axios';
import * as actions from './actionTypes';

export const authCheck = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token !== null) {
            return axios
                .get('/check', {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
                .then((response) => {
                    dispatch({type: actions.AUTH_CHECK_SUCCESS, user: response.data.user})
                })
                .catch(error => dispatch({type: actions.AUTH_CHECK_FAIL}))
        }
        dispatch({type: actions.AUTH_CHECK_FAIL})
    };
};

export const authLogout = () => {
    return {type: actions.AUTH_LOGOUT}
};

export const authLogin = (token, userData) => {
    return {type: actions.AUTH_LOGIN, token: token, user: userData}
};