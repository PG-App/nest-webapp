import React, { Fragment, useState, useEffect } from 'react';
import queryString from 'query-string';
import { CircularProgress, makeStyles } from '@material-ui/core';

import { fetchAllPgs, fetchPgsByLocation } from './apiPg';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));

export const PGs = (props) => {
    const classes = useStyles();

    const [normalPgs, setNormalPgs] = useState('');
    const [pgNormalSize, setNormalPgSize] = useState(0);
    const [pgs, setPgs] = useState('');
    const [pgSize, setPgSize] = useState(0);
    const [loading, setLoading] = useState(false);

    const queriedCity = props.location.search;
    const params = queryString.parse(queriedCity);

    useEffect(() => {
        setLoading(true);
        fetchAllPgs().then(data => {
            setNormalPgSize(data.size);
            setNormalPgs(data.pgs);
            setLoading(false);
        });

        fetchPgsByLocation(params.location).then(data => {
            setPgSize(data.size);
            setPgs(data.pgs);
            setLoading(false);
        });
    }, []);

    const showLoading = () => {
        if (loading) {
            return (
                <div className={classes.root}>
                    <CircularProgress color="secondary" />
                </div>
            )
        }
    };

    return (
        <Fragment>
            <div className="container">
                <h3>PGs page nest</h3>
                {showLoading()}

                {/* {pgs && JSON.stringify(pgs)} */}
                {pgs &&
                    pgs.map(pg => (
                        <Fragment>
                            <Link to={`/pgs/details/${pg._id}`} >To Details Page</Link>
                            <hr />
                        </Fragment>
                    ))
                }

            </div>

        </Fragment >
    )
}