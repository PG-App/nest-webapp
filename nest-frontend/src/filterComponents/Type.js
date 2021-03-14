import React, { Fragment } from 'react';

export const Type = ({ handleType }) => {
    return (
        <Fragment>
            
            <div class="form-check">
                <input
                    className="form-check-input mt-0"
                    type="radio"
                    name='type'
                    value='Boys'
                    onChange={handleType}
                />

                <label class="form-check-label" for="flexRadioDefault1">
                    Boys
                    </label>
            </div>

            <div class="form-check">
                <input
                    className="form-check-input mt-0"
                    type="radio"
                    name='type'
                    value='Girls'
                    onChange={handleType}
                />

                <label class="form-check-label" for="flexRadioDefault1">
                    Girls
                </label>
            </div>
        </Fragment >
    )
}