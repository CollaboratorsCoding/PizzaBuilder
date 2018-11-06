import axios from 'axios';
import * as actions from './actionTypes';
import createActionThunk from '../actionThunk';

const PizzaActions = {};

PizzaActions.addIngredient = ingredient => dispatch =>
	dispatch({
		type: actions.ADD_INGREDIENT,
		payload: ingredient,
	});

PizzaActions.removeIngredient = ingredient => ({
	type: actions.REMOVE_INGREDIENT,
	payload: ingredient,
});

PizzaActions.addOrder = createActionThunk(actions.ADD_ORDER, data =>
	axios.post(
		'/api/order',
		{
			order: data,
		},
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		}
	)
);

export default PizzaActions;
