import React, {Component} from 'react'

import {Form, Input, Button, Alert} from 'antd';
const FormItem = Form.Item;

class RegistrationForm extends Component {
    state = {
        confirmDirty: false
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this
            .props
            .form
            .validateFieldsAndScroll((err, values) => {
                if (!err) {
                    this
                        .props
                        .sendForm(values)
                }
            });
    }

    render() {
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {};
        const tailFormItemLayout = {};
        const {errors} = this.props
        let errorAlert = null;
        if (errors.loginEmail) {
            errorAlert = <Alert message={errors.loginEmail} type="error" showIcon/>
        }
        return (
            <Form onSubmit={this.handleSubmit}>
                {errorAlert}
                <FormItem {...formItemLayout} label="E-mail" hasFeedback>
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                type: 'email',
                                message: 'Введи валидный email'
                            }, {
                                required: true,
                                message: 'Введи  email!'
                            }
                        ]
                    })(<Input/>)}
                </FormItem>
                <FormItem {...formItemLayout} label="Пароль" hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                max: 26,
                                message: 'Максимум 26 символов'
                            }, {
                                min: 8,
                                message: 'Минимум 8 символов'
                            }, {
                                required: true,
                                message: 'Введи пароль'
                            }
                        ]
                    })(<Input type="password"/>)}
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Логин</Button>
                </FormItem>
            </Form>
        );
    }
}

export default Form.create()(RegistrationForm);