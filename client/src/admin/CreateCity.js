import React, { Fragment, useState } from 'react';

import { addCity } from './apiAdmin';

export const CreateCity = () => {
    const [cityName, setCityName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = e => {
        setError('');
        setCityName(e.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        setError('');
        setSuccess(false);
        addCity(cityName).then(data => {
            if (data.status === 200) {
                setError('');
                setSuccess(true);
            } else {
                setError(true);
                setSuccess(false);
            }
        });
    }

    const showSuccess = () => {
        if (success) {
            return <h3 className="text-light">City {cityName} is created</h3>;
        }
    };

    const showError = () => {
        if (error) {
            return <h3 className="text-danger">City should be unique</h3>;
        }
    };

    return (
        <Fragment>
            <div className="container">
                <h2>Create City</h2>
                {showSuccess()}
                {showError()}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">City</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="e.g. Guwahati, Dibrugarh..."
                            value={cityName}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

            </div>
        </Fragment>
    )
}