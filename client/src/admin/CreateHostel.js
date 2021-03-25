import React, { Fragment, useState, useEffect } from 'react';
import { Cities } from './Cities';

export const CreateHostel = () => {
    const [cities, setCities] = useState([]);

    const fetchAllCities = () => {
        return fetch(`http://localhost:5000/api/get/cities`)
            .then(res => {
                return res.json();
            }).catch(err => {
                console.log(err);
            });
    }

    useEffect(() => {
        fetchAllCities().then(data => {
            setCities(data.cities);
            console.log(data);
        });
    }, [])

    return (
        <Fragment>
            <div className="container">
                <h2>Create Hostel</h2>
                <Cities cities={cities} />
            </div>
        </Fragment>
    )
}