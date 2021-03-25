import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export const Cities = ({ cities }) => {
    return (
        <Fragment>
            <div className="container">
                <h2>All Cities</h2>
                {
                    cities.length > 0 && cities.map((city) => (
                        <ul key={city._id} className="list-group">
                            <li className="list-group-item">
                                <Link id="btn_search" to={`/create/hostel/${city._id}`}>
                                    {city.cityName}
                                </Link>
                            </li>
                        </ul>
                    ))
                }
            </div>
        </Fragment>
    )
}