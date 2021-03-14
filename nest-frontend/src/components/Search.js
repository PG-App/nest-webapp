import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export const Search = ({ query, handleChange, city }) => {
    return (
        <Fragment>
            <h3>Search page nest</h3>
            <form>
                <div className="mb-3">
                    <label className="form-label">Search Hostels by City...</label>
                    <input
                        type="text"
                        className="form-control"
                        value={query}
                        onChange={e => handleChange(e)}
                    />
                </div>
                <Link to={city} id="btn_search">Search</Link>
            </form>
        </Fragment>
    )
}