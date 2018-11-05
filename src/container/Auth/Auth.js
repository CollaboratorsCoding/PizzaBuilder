import React, {Component} from 'react'
import {connect} from 'react-redux';
import SignUp from './signUp';
import Login from './login';
import axios from 'axios';
import {authLogin} from '../../store/actions/auth'
import {Button} from 'antd'

export class Auth extends Component {
    state = {
        errors: {},
        signUp: true
    }
    signUp = (values) => {
        axios
            .post('/auth/signup', {
            email: values.email,
            password: values.password
        })
            .then((response) => {
                this.setState({signUp: false});
            })
            .catch((error) => {
                this.setState({errors: error.response.data.errors})
            });
    }
    login = (values) => {
        axios
            .post('/auth/login', {
            email: values.email,
            password: values.password
        })
            .then((response) => {

                this
                    .props
                    .onLogin(response.data.token, response.data.user);
                this
                    .props
                    .history
                    .replace('/');
            })
            .catch((error) => {

                this.setState({errors: error.response.data.errors})
            });
    }
    changeForm = () => {
        this.setState((prevState, props) => {
            return {
                signUp: !prevState.signUp
            };
        });
    }

    render() {

        let form = <SignUp errors={this.state.errors} sendForm={(values) => this.signUp(values)}/>
        if (!this.state.signUp) {
            form = <Login errors={this.state.errors} sendForm={(values) => this.login(values)}/>
        }
        return (
            <div className="header">
                <div className="form--signup">
                    {form}
                </div>
                <Button onClick={() => this.changeForm()} type="dashed">{this.state.signUp
                        ? 'Перейти к логированию'
                        : 'Перейти к регистрации'}
                </Button>

            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (token, userData) => dispatch(authLogin(token, userData))
    }
}
export default connect(null, mapDispatchToProps)(Auth)
