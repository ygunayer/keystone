import React from 'react';
import { Button, Col, Form, FormField, FormInput, Row } from 'elemental';

var RelationshipSelect = React.createClass({
	displayName: 'RelationshipSelect',
	propTypes: {
		availableItems: React.PropTypes.object,
		fieldName: React.PropTypes.string,
		onSelect: React.PropTypes.func
	},
	getInitialState () {
		return {
			fieldIsVisible: false,
			value: 'The value',
		};
	},
	handleBlur () {
		this.setState({
			fieldIsVisible: false,
		});
	},
	handleChange (e) {
		this.setState({
			value: e.target.value
		});
	},
	handleClick () {
		this.setState({
			fieldIsVisible: true,
		}, () => {
			this.refs.target.getDOMNode().select();
		});
	},
	renderField () {
		if (!this.state.fieldIsVisible) return;

		return (
			<FormInput ref="target" onChange={this.handleChange} onBlur={this.handleBlur} value={this.state.value} />
		);
	},
	renderValue () {
		if (this.state.fieldIsVisible) return;

		return (
			<FormInput value={this.state.value} onClick={this.handleClick} noedit />
		);
	},
	render () {
		return (
			<FormField>
				{this.renderField()}
				{this.renderValue()}
			</FormField>
		);
	}
});

module.exports = RelationshipSelect;
