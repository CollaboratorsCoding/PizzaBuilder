import React, { Component } from 'react';
import _ from 'lodash';
import { Form, Input, Button } from 'antd';

const FormItem = Form.Item;

class signIn extends Component {
	componentDidUpdate(prevProps) {
		const { errors, form } = this.props;
		if (
			errors.length &&
			_.get(prevProps, 'errors[0].message', '') !== errors[0].message
		) {
			_.each(errors, err => {
				form.setFields({
					[_.get(err, 'fieldName', '')]: {
						value: _.get(err, 'fieldValue', ''),
						errors: [new Error(err.message)],
					},
				});
			});
		}
	}

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				this.props.sendForm(values);
			}
		});
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Form onSubmit={this.handleSubmit}>
				<FormItem label="E-mail" hasFeedback>
					{getFieldDecorator('email', {
						rules: [
							{
								type: 'email',
								message: 'Enter Valid Email',
							},
							{
								required: true,
								message: 'Enter Email',
							},
						],
					})(<Input />)}
				</FormItem>
				<FormItem label="Пароль" hasFeedback>
					{getFieldDecorator('password', {
						rules: [
							{
								max: 26,
								message: 'Max 26 chars',
							},
							{
								min: 8,
								message: 'Min 8 chars',
							},
							{
								required: true,
								message: 'Enter password',
							},
						],
					})(<Input type="password" />)}
				</FormItem>

				<FormItem>
					<Button type="primary" htmlType="submit">
						Sign In
					</Button>
				</FormItem>
			</Form>
		);
	}
}

export default Form.create()(signIn);
