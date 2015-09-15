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
			menuIsOpen: false,
			searchString: '',
		};
	},
	componentWillUpdate (nextProps, nextState) {
		if (nextState.menuIsOpen) {
			window.addEventListener('keydown', this.handleKeyboardInput);
		} else {
			window.removeEventListener('keydown', this.handleKeyboardInput);
		}
	},

	closeMenu () {
		setTimeout(() => {
			this.setState({ menuIsOpen: false });
		}, 100);
	},
	clearSearch () {
		this.setState({ searchString: '' });
	},
	handleSelect (selectedItem) {
		this.props.onSelect(selectedItem);
		this.clearSearch();
		this.closeMenu();
	},
	handleBlur (event) {
		this.closeMenu();
	},
	handleFocus () {
		this.setState({
			menuIsOpen: true
		});
	},
	handleKeyboardInput (event) {
		if (event.keyCode === 27) {
			this.clearSearch();
		} else {
			return false;
		}
	},
	handleSearch (event) {
		this.setState({ searchString: event.target.value });
	},

	renderMenu () {
		if (!this.state.menuIsOpen) return;

		let { availableItems } = this.props;
		let { searchString } = this.state;
		let searchRegex = new RegExp(searchString);

		function searchFilter (filter) {
			return searchRegex.test(filter.toLowerCase());
		};

		let filteredItems = searchString ? Object.keys(availableItems).filter(searchFilter).sort() : Object.keys(availableItems).sort();

		let menuResults = !filteredItems.length ? (
			<div style={{ color: '#999', padding: '5px 10px', }}>No results...</div>
		) : filteredItems.map((key) => {
			return (
				<button type="button" onClick={this.handleSelect.bind(this, availableItems[key].value)} className="RelationshipSelect__menu__item">
					{availableItems[key].label}
				</button>
			);
		});

		return (
			<div className="RelationshipSelect__menu">
				{menuResults}
			</div>
		);
	},
	render () {
		return (
			<FormField>
				<FormInput value={this.state.searchString} onChange={this.handleSearch} onBlur={this.handleBlur} onFocus={this.handleFocus} placeholder={`+ Add ${this.props.fieldName.toLowerCase()}`} className="RelationshipSelect__input" />
				{this.renderMenu()}
			</FormField>
		);
	}
});

module.exports = RelationshipSelect;
