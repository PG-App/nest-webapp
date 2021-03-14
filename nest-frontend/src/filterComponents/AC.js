import React, { Fragment } from 'react';

export const AC = ({ handleAC }) => {
    return (
        <Fragment>
            <div class="form-check">
                <input
                    className="form-check-input mt-0"
                    type="radio"
                    name='bed'
                    value='AC'
                    onChange={handleAC}
                />
                <label class="form-check-label" for="flexRadioDefault1">
                    AC
                    </label>
            </div>

            <div class="form-check">
                <input
                    className="form-check-input mt-0"
                    type="radio"
                    name='bed'
                    value='Non-AC'
                    onChange={handleAC}
                />
                <label class="form-check-label" for="flexRadioDefault1">
                    Non-AC
                    </label>
            </div>

        </Fragment>
    )
}