import React, {Component} from 'react'

import {Form, Input, Checkbox, Button, Alert} from 'antd';
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
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({
            confirmDirty: this.state.confirmDirty || !!value
        });
    }
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value.length < 8) {
            callback('Минимум 8 символов')
        } else if (value && value.length > 26) {
            callback('Максимум 26 символов')
        } else if (value && value !== form.getFieldValue('password')) {
            callback('Пароли не совпадают');
        } else {
            callback();
        }
    }

    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    }

    render() {
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {};
        const tailFormItemLayout = {};
        const {errors} = this.props
        let errorAlert = null;
        if (errors.email) {
            errorAlert = <Alert message={errors.email} type="error" showIcon/>
        }
        return (

            <Form onSubmit={this.handleSubmit}>

                <FormItem {...formItemLayout} label="E-mail" hasFeedback>
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                type: 'email',
                                message: 'Введи валидный E-mail'
                            }, {
                                required: true,
                                message: 'Введи E-mail!'
                            }
                        ]
                    })(<Input/>)}
                    {errorAlert}

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
                            }, {
                                validator: this.checkConfirm
                            }
                        ]
                    })(<Input type="password"/>)}
                </FormItem>
                <FormItem {...formItemLayout} label="Подтверждение пароля" hasFeedback>
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: 'Введи пароль'
                            }, {
                                validator: this.checkPassword
                            }
                        ]
                    })(<Input type="password" onBlur={this.handleConfirmBlur}/>)}
                </FormItem>

                <FormItem
                    {...tailFormItemLayout}
                    style={{
                    marginBottom: 8
                }}>
                    {getFieldDecorator('agreement', {valuePropName: 'checked'})(
                        <Checkbox>Прочитал условия

                        </Checkbox>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Регистрация</Button>
                </FormItem>
            </Form>
        );
    }
}

export default Form.create()(RegistrationForm);