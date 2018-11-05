import React, {Component} from 'react';
import {Row, Col, Button, Modal, Steps} from 'antd';
import PizzaView from './PizzaView';
import {addIngredient, removeIngredient, addOrder} from '../../store/actions/pizzaMaker';
import {connect} from 'react-redux';
import OneRoot from '../../hoc/OneRoot'
import OrderSummary from '../Order/OrderSummary'
import axios from 'axios';
const Step = Steps.Step;

export class PizzaMaker extends Component {
    state = {
        ingredients: [],
        visible: false,
        step: 0
    }
    componentWillMount = () => {
        axios
            .get('/api/ingredients')
            .then((response) => {
                this.setState({ingredients: response.data})
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    showModal = () => {

        if (this.props.ings.length > 0) {
            this.setState({visible: true, step: 1});
        }

    }

    handleOk = (e) => {

        if (this.state.step === 1) {
            if (!this.props.isLoggedIn) {
                this
                    .props
                    .history
                    .push('/auth')
            } else {
                this.setState({step: 2});
            }

        } else if (this.state.step === 2) {
            this
                .props
                .onOrderAdded(this.props.ings, this.props.totalPrice)
            this.setState({visible: false, step: 0});
            this
                .props
                .history
                .push('/profile');
        } else {
            this.setState({step: 2});
        }

    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({visible: false});
    }

    // this     .props     .ings     .indexOf(ingredient.value) !== -1     ?
    // 'ingredient--full ingredient--active'     :
    render() {

        let listIngredients = this
            .state
            .ingredients
            .map(ingredient => {

                return <div
                    key={ingredient.label}
                    onClick={() => this.props.onIngredientAdded(ingredient)}
                    className={this
                    .props
                    .ings
                    .findIndex((element) => element.value === ingredient.value) !== -1
                    ? 'ingredient--full ingredient--active'
                    : 'ingredient--full'}><img className='ingredient--image' src={'/' + ingredient.img} alt=""/>
                    <div className='ingredient--caption'>{ingredient.value}</div>
                </div>

            })
        return (
            <OneRoot>
                <Row>
                    <Col xs={24} sm={24} md={12} lg={10} xl={10}>
                        <div className='ingredients--wrapper'>{listIngredients}
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={14} xl={14}>
                        <PizzaView ingredients={this.props.ings}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={24} md={6} lg={4} xl={4}></Col>
                    <Col xs={24} sm={24} md={12} lg={16} xl={16}><OrderSummary
                        ingredients={this.props.ings}
                        remove={this.props.onIngredientRemoved}
                        totalPrice={this.props.totalPrice}/> {this.props.ings.length > 0
                            ? <Button type="primary" className='order--btn' onClick={this.showModal}>Заказать</Button>
                            : null}

                        <Modal
                            title="Подтверждение заказа"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            okText="Дальше"
                            cancelText="Отменить"
                            width={800}>

                            <div>
                                <Steps current={this.state.step}>
                                    <Step title="Конструктор Пиццы"/>
                                    <Step title="Подтверждение"/>
                                    <Step title="Оплата"/>
                                </Steps>
                                {this.state.step === 1
                                    ? <OrderSummary
                                            ingredients={this.props.ings}
                                            remove={this.props.onIngredientRemoved}
                                            totalPrice={this.props.totalPrice}
                                            inModal={true}/>
                                    : null}

                            </div>
                        </Modal>

                    </Col>
                    <Col xs={24} sm={24} md={6} lg={4} xl={4}></Col>
                </Row>

            </OneRoot>

        )
    }
}
const mapStateToProps = state => {
    return {ings: state.pizzaMaker.ingredients, totalPrice: state.pizzaMaker.totalPrice, isLoggedIn: state.auth.isLoggedIn};
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredientData) => dispatch(addIngredient(ingredientData)),
        onIngredientRemoved: (ingredientData) => dispatch(removeIngredient(ingredientData)),
        onOrderAdded: (ingredientData, totalPrice) => dispatch(addOrder(ingredientData, totalPrice))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PizzaMaker)