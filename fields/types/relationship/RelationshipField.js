import React from 'react';
import Field from '../Field';
import { Button, Checkbox, FormField, FormInput, FormNote, FormRow, Pill } from 'elemental';

const RELATED_ITEMS = [
	{ label: 'Amazon',             value: 'amazon' },
	{ label: 'Arnold',             value: 'arnold' },
	{ label: 'Disrupt',            value: 'disrupt' },
	{ label: 'Ebay',               value: 'ebay' },
	{ label: 'Google',             value: 'google' },
	{ label: 'Jaze',               value: 'jaze' },
	{ label: 'Keystone',           value: 'keystone' },
	{ label: 'Molomby Consulting', value: 'molomby_consulting' },
	{ label: 'Prismatik',          value: 'prismatik' },
	{ label: 'Sweathers',          value: 'sweathers' },
	{ label: 'Team9',              value: 'team9' },
	{ label: 'The Means',          value: 'the_means' },
	{ label: 'Thinkmill',          value: 'thinkmill' },
	{ label: 'Twitter',            value: 'twitter' },
	{ label: 'Yahoo',              value: 'yahoo' },
];

module.exports = Field.create({
	displayName: 'RelationshipField',
	shouldCollapse () {
		// many:true relationships have an Array for a value
		// so need to check length instead
		if (this.props.many) {
			return this.props.collapse && !this.props.value.length;
		}
		return this.props.collapse && !this.props.value;
	},
	getInitialState () {
		return {
			expandedValues: RELATED_ITEMS
		};
	},

	clearRelationships () {
		if (!confirm('Are you sure?')) return;

		console.log('Clear all relationships');
	},
	gotoRelationship (rel) {
		console.log('Link to relationship:', rel);
	},
	removeRelationship (rel) {
		console.log('Remove relationship:', rel);
	},

	renderPills () {
		console.log('renderPills');
		return this.state.expandedValues.map((rel) => {
			return (
				<Pill label={rel.label} type="primary" onClick={this.gotoRelationship.bind(this, rel.value)} onClear={this.removeRelationship.bind(this, rel.value)} />
			);
		});
	},
	renderField () {
		console.log(this.props);

		return (
			<div style={{ position: 'relative' }}>
				<FormField>
					<FormInput placeholder={`+ Add ${this.props.label.toLowerCase()}`} />
				</FormField>
				<div>
					{this.renderPills()}
					<Pill label="Clear All" onClick={this.clearRelationships} />
				</div>
			</div>
		);
	}

});
