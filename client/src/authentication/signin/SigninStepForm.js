import React, { useState } from 'react';

import SigninOtpVerify from './SigninOtpVerify';
import SigninPhoneInput from './SigninPhoneInput';
import './style.css';

const SigninStepForm = () => {
	const [state, setState] = useState({
		phone: '',
		code: ''
	});

	const [step, setStep] = useState(1);

	const handleChange = (input) => (e) => {
		setState({ ...state, [input]: e.target.value });
	};

	const nextStep = () => {
		setStep(prevStep => prevStep + 1);
	};

	const prevStep = () => {
		setStep(prevStep => prevStep - 1);
	};

	const { phone, code } = state;
	const value = { phone, code };

	switch (step) {
		case 1:
			return <SigninPhoneInput nextStep={nextStep} handleChange={handleChange} value={value} />;
		case 2:
			return <SigninOtpVerify nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} value={value} />;
		default:
			return <SigninPhoneInput nextStep={nextStep} handleChange={handleChange} value={value} />

	}
};

export default SigninStepForm;