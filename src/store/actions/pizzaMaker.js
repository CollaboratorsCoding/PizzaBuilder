import axios from 'axios';
import * as actionTypes from './actionTypes';

export const addIngredient = ingredient => dispatch =>
	dispatch({
		type: actionTypes.ADD_INGREDIENT,
		payload: ingredient,
	});

export const removeIngredient = ingredient => ({
	type: actionTypes.REMOVE_INGREDIENT,
	payload: ingredient,
});

export const addOrder = (ingredients, totalPrice) => dispatch => {
	const token = localStorage.getItem('token');
	if (token !== null) {
		return axios
			.post(
				'/api/neworder',
				{
					order: {
						ingredients,
						totalPrice,
					},
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then(() => {
				dispatch({
					type: actionTypes.ADD_ORDER,
					order: {
						ingredients,
						totalPrice,
					},
				});
			})
			.catch(error => console.log(error));
	}
	return {};
};
