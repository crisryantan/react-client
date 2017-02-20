import axios from 'axios';

const ROOT_URL = 'http://localhost:3000';

export function signinUser( { email, password } ) {
	// return function instead of object to get direct access from dispatch with redux-thunk
	return function ( dispatch ) {
		axios.post( `${ ROOT_URL }/signin`, { email, password } );
	}
	// submit email/password to server
	
	// - if request is okay, update state to indicate user is authenticated
	// - save jwt token
	// - redirect to route
	
	// - if request fails, show an error
}