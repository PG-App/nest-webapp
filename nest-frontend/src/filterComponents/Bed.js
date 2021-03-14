import React, { Fragment } from 'react';

export const Bed = ({ handleBed }) => {
    return (
        <Fragment>
            <div class="form-check">
                <input
                    className="form-check-input mt-0"
                    type="checkbox"
                    name='bed'
                    value='Single'
                    onChange={handleBed}
                />
                <label class="form-check-label" for="flexCheckDefault">
                   Single
                </label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input mt-0"
                    type="checkbox"
                    name='bed'
                    value='Double'
                    onChange={handleBed}
                />
                <label class="form-check-label" for="flexCheckDefault">
                    Double
                </label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input mt-0"
                    type="checkbox"
                    name='bed'
                    value='Triple'
                    onChange={handleBed}
                />
                <label class="form-check-label" for="flexCheckDefault">
                    Triple
                </label>
            </div>
        </Fragment >
    )
}