import axios from 'axios';
import * as actions from './actionTypes';
import createActionThunk from '../actionThunk';

const AuthActions = {};

AuthActions.authCheck = createActionThunk(actions.AUTH_CHECK, () =>
	axios.get(`/api/user`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
	})
);

AuthActions.authRegister = createActionThunk(actions.AUTH_SIGNUP, data =>
	axios.post('/auth/signup', data)
);

AuthActions.authLogin = createActionThunk(actions.AUTH_SIGNIN, data =>
	axios.post('/auth/login', data)
);

AuthActions.authLogout = () => ({ type: actions.AUTH_LOGOUT });

export default AuthActions;
