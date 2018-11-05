import * as actionTypes from './actionTypes';
import axios from 'axios';

export const addIngredient = (ingredient) => {
    return dispatch => {

        return dispatch({type: actionTypes.ADD_INGREDIENT, payload: ingredient})
    };
};

export const removeIngredient = (ingredient) => {
    return {type: actionTypes.REMOVE_INGREDIENT, payload: ingredient};
};

export const addOrder = (ingredients, totalPrice) => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token !== null) {
            return axios.post('/api/neworder', {
                order: {
                    ingredients: ingredients,
                    totalPrice: totalPrice
                }
            }, {
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then((response) => {
                dispatch({
                    type: actionTypes.ADD_ORDER,
                    order: {
                        ingredients: ingredients,
                        totalPrice: totalPrice
                    }
                })
            }).catch(error => console.log(error))
        }

    };

};
