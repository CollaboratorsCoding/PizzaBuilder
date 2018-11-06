import * as actionTypes from '../actions/actionTypes';

const initialState = {
	isLoggedIn: false,
	user: {},
	checkedAuth: false,
	errors: [],
	loading: false,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
	case `${actionTypes.AUTH_CHECK}_COMPLETED`:
		return {
			...state,
			isLoggedIn: action.payload.data.isLoggedIn,
			user: action.payload.data.user || {},
			checkedAuth: true,
			errors: [],
		};

	case `${actionTypes.AUTH_LOGOUT}`:
		localStorage.removeItem('token');
		return {
			...state,
			isLoggedIn: false,
			user: {},
			errors: [],
		};

	case `${actionTypes.AUTH_SIGNIN}_START`:
		return {
			...state,
			loading: true,
			errors: [],
		};
	case `${actionTypes.AUTH_SIGNIN}_COMPLETED`:
		localStorage.setItem('token', action.payload.data.token);
		return {
			...state,
			isLoggedIn: true,
			user: action.payload.data.user,
			errors: [],
			loading: false,
		};
	case `${actionTypes.AUTH_SIGNIN}_FAILED`:
		return {
			...state,
			loading: false,
			isLoggedIn: false,
			errors: action.payload.response.data.errors,
		};

	case `${actionTypes.AUTH_SIGNUP}_START`:
		return {
			...state,
			loading: true,
			errors: [],
		};
	case `${actionTypes.AUTH_SIGNUP}_COMPLETED`:
		localStorage.setItem('token', action.payload.data.token);
		return {
			...state,
			isLoggedIn: true,
			user: action.payload.data.user,
			errors: [],
			loading: false,
		};
	case `${actionTypes.AUTH_SIGNUP}_FAILED`:
		return {
			...state,
			loading: false,
			isLoggedIn: false,
			errors: action.payload.response.data.errors,
		};

	case `${actionTypes.ADD_ORDER}_COMPLETED`:
		return {
			...state,
			user: {
				...state.user,
				orders: [
					...(state.user.orders || []),
					action.payload.data.order,
				],
			},
		};

	default:
		return state;
	}
};

export default authReducer;
