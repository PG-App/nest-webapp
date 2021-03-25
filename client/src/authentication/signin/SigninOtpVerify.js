import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import { authenticate } from '../authApi';

const SigninOtpVerify = (props) => {
	const [error, setError] = useState({
		error: '',
		success: ''
	});
	const [redirect, setRedirect] = useState(false);
	const { value, handleChange } = props;
	const back = (e) => {
		e.preventDefault();
		props.prevStep();
	};

	const { phone, code } = value;

	const confirmOtp = () => {
		axios.post('http://localhost:5000/api/verifyOTP', {
				phone: `${phone}`,
				code: `${code}`
			})
			.then(res => {
				authenticate(res.data.user, () => {
					console.log(res.data.user);
					setRedirect(true);
					setError({ ...error, success: res.data.user });
				});
			})
			.catch(error => {
				console.log(error.response);
				if (error.response.data.error === 'This phone is already registered!') {
					authenticate(error.response.data.user, () => {
						console.log(error.response.data.user);
						setRedirect(true);
						setError({ ...error, error: error.response.data.error });
					});
				}
			});
	};

	return (
		<Fragment>

			{redirect && (
				<Redirect to='/' />
			)}

			<div className="container">
				<div>
					<input
						type="tel"
						value={value.phone}
						onChange={handleChange('phone')}
						placeholder="Enter phone"
					/>

					<input
						type="text"
						value={value.code}
						onChange={handleChange('code')}
						placeholder="Enter the 6 digits OTP"
					/>
				</div>
				<button onClick={back}>Back</button>
				<button onClick={confirmOtp}>Confirm OTP</button>
			</div>
		</Fragment>

	);
}

export default SigninOtpVerify;
