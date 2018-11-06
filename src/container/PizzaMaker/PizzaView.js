import React from 'react';

const PizzaView = ({ ingredients }) => {
	const renderIngredients = ingredients.map(ingredient => {
		ingredient = ingredient.class;
		return (
			<span
				key={ingredient}
				style={{
					animation: 'scaling 500ms ease-in-out',
				}}
				className={`${ingredient}--wrapper`}
			>
				<span className={ingredient} />
				<span className={ingredient} />
				<span className={ingredient} />
				<span className={ingredient} />
				<span className={ingredient} />
			</span>
		);
	});
	return (
		<div className="pizza--wrapper">
			<div className="pizza--placeholder">
				<img src="/pizzaBase.svg" alt="" /> {renderIngredients}
			</div>
		</div>
	);
};

export default PizzaView;
