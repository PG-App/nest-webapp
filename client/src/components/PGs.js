import React, { Fragment, useState, useEffect } from 'react';
import queryString from 'query-string';
import { Checkbox, CircularProgress, makeStyles } from '@material-ui/core';
import axios from 'axios';

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

    const [checked, setChecked] = useState(false);
    const [gender, setGender] = useState('');
    const [AC, setAC] = useState('');
    const [powerBackup, setPowerBackup] = useState('');

    const queriedCity = props.location.search;
    const params = queryString.parse(queriedCity);

    useEffect(() => {
        setLoading(true);
        // fetchAllPgs().then(data => {
        //     setNormalPgSize(data.size);
        //     setNormalPgs(data.pgs);
        //     setLoading(false);
        // });

        fetchPgsByLocation(params.location).then(data => {
            // console.log(data);
            // setPgSize(data.size);
            // setPgs(data.pgs);
            // setLoading(false);
            setNormalPgSize(data.size);
            setNormalPgs(data.pgs);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        return axios.post(`http://localhost:5000/api/pgs/filter`, { gender })
            .then(res => {
                console.log(res.data);
                setPgSize(res.data.size);
                setPgs(res.data.pgs);
            });
    }, [gender]);

    useEffect(() => {
        return axios.post(`http://localhost:5000/api/pgs/filter`, { gender, amenities_ac: AC })
            .then(res => {
                console.log(res.data);
                setPgSize(res.data.size);
                setPgs(res.data.pgs);
            });
    }, [AC]);

    useEffect(() => {
        return axios.post(`http://localhost:5000/api/pgs/filter`, { gender, amenities_ac: AC, amenities_power_backup: powerBackup })
            .then(res => {
                console.log(res.data);
                setPgSize(res.data.size);
                setPgs(res.data.pgs);
            });
    }, [powerBackup]);

    const showLoading = () => {
        if (loading) {
            return (
                <div className={classes.root}>
                    <CircularProgress color="secondary" />
                </div>
            )
        }
    };

    const handleChange = (event) => {
        console.log(event.target.value);
        // setChecked(event.target.checked);
        setGender(event.target.value);
    };

    const handleAC = (event) => {
        console.log(event.target.value);
        // setChecked(event.target.checked);
        setAC(event.target.value);
    };

    const handlePB = (event) => {
        console.log(event.target.value);
        // setChecked(event.target.checked);
        setPowerBackup(event.target.value);
    };

    return (
        <Fragment>
            <div className="container">
                <h3>PGs page nest</h3>
                {showLoading()}

                <div className="row g-0">
                    <div className="col-sm-6 col-md-4">
                        Filter
                        <div className="form-check">
                            <input
                                name='gender'
                                className="form-check-input"
                                type="radio"
                                value="Boys"
                                onChange={handleChange}
                            />
                            <label className="form-check-label">
                                Boys
                            </label>
                        </div>

                        <div className="form-check">
                            <input
                                name='gender'
                                className="form-check-input"
                                type="radio"
                                value="Girls"
                                onChange={handleChange}
                            />
                            <label className="form-check-label">
                                Girls
                            </label>
                        </div>

                        <hr />

                        <div className="form-check">
                            <input
                                name='ac'
                                className="form-check-input"
                                type="radio"
                                value="Yes"
                                onChange={handleAC}
                            />
                            <label className="form-check-label">
                                AC
                            </label>
                        </div>

                        <div className="form-check">
                            <input
                                name='ac'
                                className="form-check-input"
                                type="radio"
                                value="No"
                                onChange={handleAC}
                            />
                            <label className="form-check-label">
                                Non-Ac
                            </label>
                        </div>

                        <hr />

                        <div className="form-check">
                            <input
                                name='powerBackup'
                                className="form-check-input"
                                type="radio"
                                value="Yes"
                                onChange={handlePB}
                            />
                            <label className="form-check-label">
                                Power Backup
                            </label>
                        </div>

                        <div className="form-check">
                            <input
                                name='powerBackup'
                                className="form-check-input"
                                type="radio"
                                value="No"
                                onChange={handlePB}
                            />
                            <label className="form-check-label">
                                Not Power Backup
                            </label>
                        </div>
                    </div>

                    {/* <div className="col-6 col-md-8">
                        {pgs &&
                            pgs.map(pg => (
                                <Fragment>
                                    <Link to={`/pgs/details/${pg._id}`} >To Details Page</Link>
                                    <hr />
                                </Fragment>
                            ))
                        }
                    </div> */}
                </div>

                {pgs.length < 0 &&
                    <div>
                        <h3>
                            {normalPgs.length}
                        </h3>
                        {JSON.stringify(normalPgs)}
                    </div>
                }

                <h3>{pgs.length}</h3> <br />
                {pgs && JSON.stringify(pgs)}

            </div>

        </Fragment >
    )
}