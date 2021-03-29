import React, { Fragment, useState, useEffect } from 'react';
import { fecthPgDetailsById } from './apiPg';

export const PGDetail = ({ match }) => {
    const [pgDetails, setPgDetails] = useState([]);

    useEffect(() => {
        fecthPgDetailsById(match.params.pg_id).then(data => {
            setPgDetails(data.pg);
            console.log(data);
        })
    });
    return (
        <Fragment>
            <h2>PG Details Page of {match.params.pg_id}</h2>
            {pgDetails && JSON.stringify(pgDetails)}
        </Fragment>
    )
}