import React, { Component } from 'react';
import _ from 'lodash';
import { Form, Input, Checkbox, Button } from 'antd';

const FormItem = Form.Item;

class RegistrationForm extends Component {
	state = {
		confirmDirty: false,
	};

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

	compareToFirstPassword = (rule, value, cb) => {
		const form = this.props.form;
		if (value && value !== form.getFieldValue('password')) {
			cb('Two passwords not match!');
		} else {
			this.checkPassword(value, cb);
		}
	};

	validateToNextPassword = (rule, value, cb) => {
		const form = this.props.form;
		if (value && this.state.confirmDirty) {
			form.validateFields(['password_confirm'], { force: true });
		}
		this.checkPassword(value, cb);
	};

	handleConfirmBlur = e => {
		const value = e.target.value;
		this.setState(prevState => ({
			confirmDirty: prevState.confirmDirty || !!value,
		}));
	};

	checkPassword = (value, callback) => {
		if (value && value.length < 8) {
			callback('Min 8 chars');
		} else if (value && value.length > 26) {
			callback('Max 26 chars');
		} else {
			callback();
		}
	};

	checkConfirm = (rule, value, callback) => {
		const form = this.props.form;
		if (value && this.state.confirmDirty) {
			form.validateFields(['confirm'], { force: true });
		}
		callback();
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
								message: 'Not valid E-mail',
							},
							{
								required: true,
								message: 'Enter E-mail!',
							},
						],
					})(<Input />)}
				</FormItem>
				<FormItem label="Password" hasFeedback>
					{getFieldDecorator('password', {
						rules: [
							{
								validator: this.validateToNextPassword,
							},
						],
					})(<Input type="password" />)}
				</FormItem>
				<FormItem label="Confirm password" hasFeedback>
					{getFieldDecorator('confirm', {
						rules: [
							{
								validator: this.compareToFirstPassword,
							},
						],
					})(
						<Input
							type="password"
							onBlur={this.handleConfirmBlur}
						/>
					)}
				</FormItem>

				<FormItem
					style={{
						marginBottom: 8,
					}}
				>
					{getFieldDecorator('agreement', {
						valuePropName: 'checked',
					})(<Checkbox>Accept</Checkbox>)}
				</FormItem>
				<FormItem>
					<Button type="primary" htmlType="submit">
						Sign Up
					</Button>
				</FormItem>
			</Form>
		);
	}
}

export default Form.create()(RegistrationForm);
