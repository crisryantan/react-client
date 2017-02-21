import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './types';

const ROOT_URL = 'http://localhost:3000';

export function signinUser( { email, password } ) {
	// return function instead of object to get direct access from dispatch with redux-thunk
	return function ( dispatch ) {
		axios.post( `${ ROOT_URL }/signin`, { email, password } )
			.then( response => {
				// - if request is okay, update state to indicate user is authenticated
				dispatch( { type : AUTH_USER } );
				// - save jwt token
				localStorage.setItem( 'token', response.data.token );
				// - redirect to route
				browserHistory.push( '/feature' );
			} )
			.catch( () => {

				// - if request fails, show an error
				dispatch( authError ( 'Bad Login Info' ) );
			} );
	}
}

export function signupUser ( { email, password } ) {
	return function ( dispatch ) {
		axios.post(`${ROOT_URL}/signup`, { email, password } )
			.then( response => {
				dispatch( { type : AUTH_USER } );
				localStorage.setItem( 'token', response.data.token );
				browserHistory.push( '/feature' );
			} )
			.catch( response => dispatch( authError ( 'Email is in use.' ) ) );
	}
}

export function authError( error ) {
	return {
		type    : AUTH_ERROR,
		payload : error
	};
}

export function signoutUser () {
	localStorage.removeItem( 'token' );
	return {
		type : UNAUTH_USER
	}
}