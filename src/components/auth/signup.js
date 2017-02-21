import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

const FIELDS = {
	email : {
		type      : 'input',
		inputType : 'text',
		label     : 'Email :',
		error     : 'Please enter an email.'
	},
	password : {
		type      : 'input',
		inputType : 'password',
		label     : 'Password :',
		error     : 'Please enter a password.'
	},
	passwordConfirm : {
		type      : 'input',
		inputType : 'password',
		label     : 'Confirm Password:',
		error     : 'Please enter a password confirmation.'
	}
}

class Signup extends Component {

	handleFormSubmit ( formProps ) {
		this.props.signupUser( formProps );
	}

	renderAlert () {
		if ( this.props.errorMessage ) {
			return (
				<div className="alert alert-danger">
					<strong>{ this.props.errorMessage }</strong>
				</div>
			);
		}
	}

	renderField ( fieldConfig, field ) {
		const fieldHelper = this.props.fields[ field ];

		return (
			<fieldset className="form-group" key={field}>
				<label>{ fieldConfig.label }</label>
				<fieldConfig.type type={ fieldConfig.inputType } className="form-control" {...fieldHelper}/>
				<div className="text-help">
				{ fieldHelper.touched && fieldHelper.error && <div className="error">{ fieldHelper.error }</div> }
				</div>
			</fieldset>
		);
	}

	render () {
		const { handleSubmit, fields : { email, password, passwordConfirm } } = this.props;
		return (
			<form onSubmit={ handleSubmit( this.handleFormSubmit.bind( this ) ) }>
				{ _.map( FIELDS, this.renderField.bind( this ) ) }
				{ this.renderAlert() }
				<button action="submit" className="btn btn-primary">Sign up</button>
			</form>
		);
	}

}

function validate ( formProps ) {
	const errors = {};

	_.each( FIELDS, ( type, field ) => {
		if ( !formProps[ field ] ) {
			errors[ field ] = type.error;
		}
	} );

	if ( formProps.password !== formProps.passwordConfirm ) {
		errors.password = 'Passwords must match';
	}

	return errors;
}

function mapStateToProps ( state ) {
	return { errorMessage : state.auth.error }
}

export default reduxForm( {
	form   : 'signup',
	fields : [ 'email', 'password', 'passwordConfirm' ],
	validate
}, mapStateToProps, actions )( Signup );
