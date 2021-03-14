import React, { Fragment } from 'react';

export const Price = ({ handlePriceMin, handlePriceMax }) => {
    return (
        <Fragment>
            <div className="row">
                <div className="col mb-3">
                    <label className="form-label">Min Budget</label>
                    <select
                        name='price'
                        className="form-select"
                        onChange={handlePriceMin}
                    >
                        <option defaultValue='0'>Min Budget</option>
                        <option value="1000">₹1000</option>
                        <option value="2000">₹2000</option>
                        <option value="3000">₹3000</option>
                    </select>
                </div>
                <div className="col mb-3">
                    <label className="form-label">Max Budget</label>
                    <select
                        name='price'
                        className="form-select"
                        onChange={handlePriceMax}
                    >
                        <option defaultValue='100000'>Max Budget</option>
                        <option value="4000">₹4000</option>
                        <option value="5000">₹5000</option>
                        <option value="6000">₹6000</option>
                    </select>
                </div>
            </div>
        </Fragment>
    )
}