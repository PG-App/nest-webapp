import React, { Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function SigninPhoneInput(props) {
	const { value, handleChange } = props;

	const Continue = (e) => {
		axios.post('http://localhost:5000/api/signin', {
				phone: `${value.phone}`
			})
			.then(function (res) {
				console.log(res);
			});

		e.preventDefault();
		props.nextStep();
	};
	return (
		<Fragment>
			<div class="bodyContainer">

				<div className="signUpContainer">
					<div className="header">NEST</div>
					<div className="signUpLine">Sign In to your account</div>
					<form className="signUpForm">
						<input
							type="tel"
							value={value.phone}
							onChange={handleChange('phone')}
							className="inputPhoneNumber"
							required="required"
							placeholder="Enter phone number" />

						<button onClick={Continue} className="btnSignUp">
							Sign In
						</button>
					</form>
					
					<p class="loginLink"><Link to="/signup">Don't have have an account yet? Sign Up</Link></p>
				</div>

			</div>
		</Fragment>

	);
}

export default SigninPhoneInput;