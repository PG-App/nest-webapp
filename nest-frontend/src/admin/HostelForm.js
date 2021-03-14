import React, { Fragment, useState } from 'react';
import axios from 'axios';

export const HostelForm = ({ match }) => {
    const [values, setValues] = useState({
        hostelName: '',
        type: '',
        bed: '',
        ac: '',
        price: '',
        pincode: ''
    });
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const cityId = match.params.cityId;

    const {
        hostelName,
        type,
        bed,
        ac,
        price,
        pincode
    } = values;

    const handleChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    const hostel = {
        hostelName,
        type,
        bed,
        ac,
        price,
        pincode
    }

    const addHostel = (cityId, hostel) => {
        hostel = {
            hostelName,
            type,
            bed,
            ac,
            price,
            pincode
        }
        const data = {
            cityName: cityId,
            hostelName,
            type,
            bed,
            ac,
            price,
            pincode
        }
        return fetch(`http://localhost:5000/api/add/hostel/${cityId}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => {
            return res;
        })
    }

    const handleSubmit = event => {
        event.preventDefault();
        setSuccess(false);
        addHostel(cityId, hostel).then(data => {
            console.log(data.status);
            if (data.status === 200) {
                setValues('');
                setError('');
                setSuccess(true);
            } else {
                setValues('');
                setError(true);
                setSuccess(false);
            }
        });
    }

    const showForm = () => {
        return (
            <Fragment>
                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label className="form-label">PG Name</label>
                        <input
                            name='hostelName'
                            type="text"
                            className="form-control"
                            value={hostelName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Type</label>
                        <select
                            name='type'
                            className="form-select"
                            onChange={handleChange}
                        >
                            <option selected>Select PG Type</option>
                            <option value="Boys">Boys' Pg</option>
                            <option value="Girls">Girls' Pg</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Bed</label>
                        <select
                            name='bed'
                            className="form-select"
                            onChange={handleChange}
                        >
                            <option selected>Select PG Bed</option>
                            <option value="Single">Single</option>
                            <option value="Double">Double</option>
                            <option value="Triple">Triple</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">AC</label>
                        <select
                            name='ac'
                            className="form-select"
                            onChange={handleChange}
                        >
                            <option selected>Select PG AC</option>
                            <option value="AC" onChange={handleChange}>AC</option>
                            <option value="Non-AC">Non-AC</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Pincode</label>
                        <input
                            name='pincode'
                            type="number"
                            className="form-control"
                            value={pincode}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Price</label>
                        <input
                            name='price'
                            type="number"
                            className="form-control"
                            value={price}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </Fragment>
        )
    }

    const showSuccess = () => {
        if (success) {
            return <h3 className="text-light">Hostel is created</h3>;
        }
    };

    const showError = () => {
        if (error) {
            return <h3 className="text-danger">Hostel should be unique</h3>;
        }
    };

    return (
        <Fragment>
            <div className="container">
                <h2>Hostel Form</h2>
                {showSuccess()}
                {showError()}
                {showForm()}
            </div>
        </Fragment>
    )
}