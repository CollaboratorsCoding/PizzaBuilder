import React, { Component, Fragment } from 'react';
import { Row, Col, Button, Modal, Steps } from 'antd';
import { connect } from 'react-redux';
import axios from 'axios';
import PizzaView from './PizzaView';
import PizzaActions from '../../store/actions/pizzaMaker';

import OrderSummary from '../Order/OrderSummary';

const { addIngredient, removeIngredient, addOrder } = PizzaActions;
const Step = Steps.Step;

class PizzaMaker extends Component {
	state = {
		ingredients: [],
		visible: false,
		step: 0,
	};

	componentWillMount = () => {
		axios
			.get('/api/ingredients')
			.then(response => {
				this.setState({ ingredients: response.data });
			})
			.catch(error => {
				console.log(error);
			});
	};

	showModal = () => {
		if (this.props.ings.length > 0) {
			this.setState({ visible: true, step: 1 });
		}
	};

	handleOk = () => {
		if (this.state.step === 1) {
			if (!this.props.isLoggedIn) {
				this.props.history.push('/auth');
			} else {
				this.setState({ step: 2 });
			}
		} else if (this.state.step === 2) {
			this.props.onOrderAdded({
				ingredients: this.props.ings,
				totalPrice: this.props.totalPrice,
			});
			this.setState({ visible: false, step: 0 });
			this.props.history.push('/profile');
		} else {
			this.setState({ step: 2 });
		}
	};

	handleCancel = () => {
		this.setState({ visible: false });
	};

	render() {
		const listIngredients = this.state.ingredients.map(ingredient => (
			<div
				key={ingredient.label}
				onClick={() => this.props.onIngredientAdded(ingredient)}
				className={
					this.props.ings.findIndex(
						element => element.value === ingredient.value
					) !== -1
						? 'ingredient--full ingredient--active'
						: 'ingredient--full'
				}
			>
				<img
					className="ingredient--image"
					src={`/${ingredient.img}`}
					alt=""
				/>
				<div className="ingredient--caption">{ingredient.value}</div>
			</div>
		));
		return (
			<Fragment>
				<Row>
					<Col xs={24} sm={24} md={12} lg={10} xl={10}>
						<div className="ingredients--wrapper">
							{listIngredients}
						</div>
					</Col>
					<Col xs={24} sm={24} md={12} lg={14} xl={14}>
						<PizzaView ingredients={this.props.ings} />
					</Col>
				</Row>
				<Row>
					<Col xs={24} sm={24} md={6} lg={4} xl={4} />
					<Col xs={24} sm={24} md={12} lg={16} xl={16}>
						<OrderSummary
							ingredients={this.props.ings}
							remove={this.props.onIngredientRemoved}
							totalPrice={this.props.totalPrice}
						/>{' '}
						{this.props.ings.length > 0 ? (
							<Button
								type="primary"
								className="order--btn"
								onClick={this.showModal}
							>
								Make Order
							</Button>
						) : null}
						<Modal
							title="Order confirmation"
							visible={this.state.visible}
							onOk={this.handleOk}
							onCancel={this.handleCancel}
							okText="Next"
							cancelText="Cancel"
							width={800}
						>
							<div>
								<Steps current={this.state.step}>
									<Step title="Pizza Builder" />
									<Step title="Confirmation" />
									<Step title="Payment" />
								</Steps>
								{this.state.step === 1 ? (
									<OrderSummary
										ingredients={this.props.ings}
										remove={this.props.onIngredientRemoved}
										totalPrice={this.props.totalPrice}
										inModal
									/>
								) : null}
								{this.state.step === 2 ? (
									<div>Payment</div>
								) : null}
							</div>
						</Modal>
					</Col>
					<Col xs={24} sm={24} md={6} lg={4} xl={4} />
				</Row>
			</Fragment>
		);
	}
}
const mapStateToProps = state => ({
	ings: state.pizzaMaker.ingredients,
	totalPrice: state.pizzaMaker.totalPrice,
	isLoggedIn: state.auth.isLoggedIn,
});
const mapDispatchToProps = dispatch => ({
	onIngredientAdded: ingredientData =>
		dispatch(addIngredient(ingredientData)),
	onIngredientRemoved: ingredientData =>
		dispatch(removeIngredient(ingredientData)),
	onOrderAdded: (ingredientData, totalPrice) =>
		dispatch(addOrder(ingredientData, totalPrice)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PizzaMaker);
