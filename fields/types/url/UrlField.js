var Field = require('../Field');
var React = require('react');

module.exports = Field.create({
	displayName: 'UrlField',

    renderValue: function() {
        return <a href={this.props.value} target='_blank'>{this.props.value}</a>;
    }
});
