import React from 'react';
import Field from '../Field';
import RelationshipSelect from '../../components/RelationshipSelect';
import RelationshipSingle from '../../components/RelationshipSingle';
import ItemsTableCell from '../../../admin/client/components/ItemsTableCell';
import ItemsTableValue from '../../../admin/client/components/ItemsTableValue';
import ListControl from '../../../admin/client/components/ListControl';
import { Button, Checkbox, FormField, FormInput, FormNote, FormRow, Pill, Table } from 'elemental';

function arrToObj(arr) {
	let obj = {};
	arr.forEach(function(item) {
		obj[item.value] = item;
	});
	return obj;
}

const RELATED_ITEMS = [
	{ label: 'Amazon',             value: 'amazon' },
	{ label: 'Ebay',               value: 'ebay' },
	{ label: 'Google',             value: 'google' },
	{ label: 'Jaze',               value: 'jaze' },
	{ label: 'Keystone',           value: 'keystone' },
	{ label: 'Molomby Consulting', value: 'molomby_consulting' },
	{ label: 'Prismatik',          value: 'prismatik' },
	{ label: 'Sweathers',          value: 'sweathers' },
	{ label: 'Team 9',             value: 'team9' },
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
			allRelatedItems: arrToObj(RELATED_ITEMS),
			availableItems: arrToObj(RELATED_ITEMS.slice(5)),
			selectedItems: arrToObj(RELATED_ITEMS.slice(0,5)),
		};
	},

	clearRelationships () {
		if (!confirm('Are you sure?')) return;

		this.setState({
			availableItems: this.state.allRelatedItems,
			selectedItems: {}
		});
	},
	gotoRelationship (rel, event) {
		event.preventDefault();
		console.log('Link to relationship:', rel);
	},
	removeRelationship (rel) {
		let { availableItems, allRelatedItems, selectedItems } = this.state;
		let newAvailableItems = availableItems || {};
		let newSelectedItems = selectedItems || {};

		delete newSelectedItems[rel];
		newAvailableItems[rel] = allRelatedItems[rel];

		this.setState({
			availableItems: newAvailableItems,
			selectedItems: newSelectedItems,
		});
	},
	addRelationship (rel) {
		let { availableItems, allRelatedItems, selectedItems } = this.state;
		let newAvailableItems = availableItems || {};
		let newSelectedItems = selectedItems || {};

		delete newAvailableItems[rel];
		newSelectedItems[rel] = allRelatedItems[rel];

		this.setState({
			availableItems: newAvailableItems,
			selectedItems: newSelectedItems,
		});
	},

	renderPills () {
		let { selectedItems } = this.state;
		if (!selectedItems || !Object.keys(selectedItems).length) return;

		let linkedItems = Object.keys(selectedItems).sort().map((key) => {
			return (
				<Pill label={selectedItems[key].label} type="primary" onClick={this.gotoRelationship.bind(this, selectedItems[key].value)} onClear={this.removeRelationship.bind(this, selectedItems[key].value)} />
			);
		});

		return (
			<div>
				{linkedItems}
				{Object.keys(selectedItems).length > 1 && <Pill label="Clear All" onClick={this.clearRelationships} />}
			</div>
		);
	},
	renderTable () {
		let { selectedItems } = this.state;
		if (!selectedItems || !Object.keys(selectedItems).length) return;
		let linkedItems = Object.keys(selectedItems).sort().map((key) => {
			return (
				<tr>
					<ListControl key="_delete" onClick={this.removeRelationship.bind(this, selectedItems[key].value)} type="delete" />
					<ItemsTableCell title={selectedItems[key].label}>
						<ItemsTableValue href="javascript:;" onClick={this.gotoRelationship.bind(this, selectedItems[key].value)} padded interior field="text">
							{selectedItems[key].label}
						</ItemsTableValue>
					</ItemsTableCell>
				</tr>
			);
		});

		return (
			<Table style={{ lineHeight: 1 }}>
				<colgroup>
					<col width="26" />
				</colgroup>
				<tbody>
					{linkedItems}
				</tbody>
			</Table>
		);
	},
	renderMany () {
		if (!this.props.many) return;

		const { availableItems } = this.state;

		return (
			<div style={{ position: 'relative' }}>
				<RelationshipSelect
					fieldName={this.props.label}
					availableItems={availableItems}
					onSelect={this.addRelationship}
				/>
				{this.props.renderAsLinks ? this.renderPills() : this.renderTable()}
			</div>
		);
	},
	renderSingle () {
		if (this.props.many) return;

		return <RelationshipSingle />;
	},
	renderField () {
		return (
			<div style={{ position: 'relative' }}>
				{this.renderMany()}
				{this.renderSingle()}
			</div>
		);
	}

});
