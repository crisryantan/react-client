import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

const FIELDS = {
	email : {
		type  : 'input',
		label : 'Email :',
		error : 'Please enter an email.'
	},
	password : {
		type  : 'input',
		label : 'Password :',
		error : 'Please enter a password.'
	},
	passwordConfirm : {
		type  : 'input',
		label : 'Confirm Password:',
		error : 'Please enter a password confirmation.'
	}
}

class Signup extends Component {

	renderField ( fieldConfig, field ) {
		const fieldHelper = this.props.fields[ field ];

		return (
			<fieldset className="form-group" key={field}>
				<label>{ fieldConfig.label }</label>
				<fieldConfig.type type="text" className="form-control" {...fieldHelper}/>
				<div className="text-help">
				{ fieldHelper.touched && fieldHelper.error && <div className="error">{ fieldHelper.error }</div> }
				</div>
			</fieldset>
		);
	}

	render () {
		const { handleSubmit, fields : { email, password, passwordConfirm } } = this.props;
		return (
			<form>
				{ _.map( FIELDS, this.renderField.bind( this ) ) }
				<button action="submit" className="btn btn-primary">Sign up</button>
			</form>
		);
	}

}

function validate ( formProps ) {
	const errors = {};

	_.each( FIELDS, ( type, field ) => {
		console.log( type )
		if ( !formProps[ field ] ) {
			errors[ field ] = type.error;
		}
	} );

	if ( formProps.password !== formProps.passwordConfirm ) {
		errors.password = 'Passwords must match';
	}

	return errors;
}

export default reduxForm( {
	form   : 'signup',
	fields : [ 'email', 'password', 'passwordConfirm' ],
	validate
} )( Signup );
