import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: [],
    totalPrice: 0
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            let oldState = {
                ...state,
                ingredients: [...state.ingredients]
            };
            let newIngredients = null;
            const existIngredient = oldState
                .ingredients
                .filter(item => item.value === action.payload.value);
            if (existIngredient.length > 0) {
                const index = oldState
                    .ingredients
                    .indexOf(existIngredient[0]);
                oldState.totalPrice -= oldState.ingredients[index].price
                oldState
                    .ingredients
                    .splice(index, 1);

                return oldState

            } else {
                newIngredients = oldState
                    .ingredients
                    .concat(action.payload);
                oldState.totalPrice += action.payload.price;
            }
            return {
                ...oldState,
                ingredients: newIngredients
            }
            break;
        case actionTypes.REMOVE_INGREDIENT:
            let newState = {
                ...state,
                ingredients: [...state.ingredients]
            };
            console.log(action.payload)
            const isIngredient = newState
                .ingredients
                .filter(item => item.value === action.payload.value);
            const indexIng = newState
                .ingredients
                .indexOf(isIngredient[0]);
            newState.totalPrice -= newState.ingredients[indexIng].price
            newState
                .ingredients
                .splice(indexIng, 1);

            return newState
            break;

        default:
            return state;

    }
};

export default reducer;