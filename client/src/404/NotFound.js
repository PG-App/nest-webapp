import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import './NotFound.css';

export const NotFound = ({ query, handleChange, city }) => {
    return (
        <Fragment>
            <div class="mainbox">
                <div class="err">4</div>
                <i class="far fa-question-circle fa-spin"></i>
                <div class="err2">4</div>
                <div class="msg">
                    <p className='text-danger'>
                        Maybe this page moved?
                        Never existed in the first place?
                    </p>
                    <p>
                        Go back to <Link className='text-primary' id="btn_search" to="/">home</Link>
                    </p>
                </div>
            </div>
        </Fragment>
    )
}