import React, { Fragment } from 'react';

export const PGCard = ({ pgs }) => {
    return (
        <Fragment>
            <h2>You are searching in {pgs.city}...</h2>
            <h4>
                Found {pgs.size} for you...
            </h4>
            {
                pgs.hostels.map((pg, i) => (
                    <div className="card mb-5 ml-5" style={{ width: '25rem' }} key={i}>
                        <div className="card-header">
                            {pg.hostelName}
                        </div>
                        <div className="card-body">
                            <Fragment>
                                <img src={`${pg.feature_image}`} className='card-img-top' alt="feature_image" />
                                <p className="card-p  mt-2">{pg.type}</p>
                                <p className="card-p  mt-2">{pg.bed}</p>
                                <p className="card-p  mt-2">{pg.ac}</p>
                                <p className="card-p  mt-2">₹{pg.price}</p>
                            </Fragment>

                        </div>
                    </div>
                ))
            }
        </Fragment>
    )
}