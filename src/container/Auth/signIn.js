import React, { Component } from 'react';
import _ from 'lodash';
import { Form, Input, Button } from 'antd';

const FormItem = Form.Item;

class signIn extends Component {
	componentDidUpdate(prevProps) {
		const { error, form } = this.props;

		if (
			!_.isEmpty(error) &&
			error.type === 'form' &&
			prevProps.error.message !== error.message
		) {
			form.setFields({
				[_.get(error, 'formData.fieldName', '')]: {
					value: _.get(error, 'formData.fieldValue', ''),
					errors: [new Error(error.message)],
				},
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
