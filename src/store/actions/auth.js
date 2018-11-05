import axios from 'axios';
import * as actions from './actionTypes';
import createActionThunk from '../actionThunk';

const AuthActions = {};

AuthActions.authCheck = createActionThunk(actions.AUTH_CHECK, () =>
	axios.get(`/check`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
	})
);

AuthActions.authLogin = createActionThunk(actions.AUTH_SIGNUP, data =>
	axios.post('/auth/signup', data)
);

AuthActions.authRegister = createActionThunk(actions.AUTH_SIGNIN, data =>
	axios.post('/auth/login', data)
);

AuthActions.authLogout = () => ({ type: actions.AUTH_LOGOUT });

// export const authCheck = () => {
//     return dispatch => {
//         const token = localStorage.getItem('token');
//         if (token !== null) {
//             return axios
//                 .get('/check', {
//                 headers: {
//                     Authorization: "Bearer " + token
//                 }
//             })
//                 .then((response) => {
//                     dispatch({type: actions.AUTH_CHECK_SUCCESS, user: response.data.user})
//                 })
//                 .catch(error => dispatch({type: actions.AUTH_CHECK_FAIL}))
//         }
//         dispatch({type: actions.AUTH_CHECK_FAIL})
//     };
// };

export default AuthActions;
