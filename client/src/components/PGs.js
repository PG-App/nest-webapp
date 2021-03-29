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

    const [checked, setChecked] = useState({
        boy: false,
        girl: false,
    });
    const [gender, setGender] = useState('');
    const [AC, setAC] = useState('');
    const [powerBackup, setPowerBackup] = useState('');
    const [singleBed, setSingleBed] = useState('0');
    const [doubleBed, setDoubleBed] = useState('0');
    const [tripleBed, setTripleBed] = useState('0');

    const queriedCity = props.location.search;
    const params = queryString.parse(queriedCity);
    console.log(params.location);

    useEffect(() => {
        return axios.post(`http://localhost:5000/api/pgs/filter?location=${params.location}`, { gender })
            .then(res => {
                console.log(res.data);
                setPgSize(res.data.size);
                setPgs(res.data.pgs);
            });
    }, [gender]);

    useEffect(() => {
        return axios.post(`http://localhost:5000/api/pgs/filter?location=${params.location}`, { gender, amenities_ac: AC })
            .then(res => {
                console.log(res.data);
                setPgSize(res.data.size);
                setPgs(res.data.pgs);
            });
    }, [AC]);

    useEffect(() => {
        return axios.post(`http://localhost:5000/api/pgs/filter?location=${params.location}`, { gender, amenities_ac: AC, amenities_power_backup: powerBackup })
            .then(res => {
                console.log(res.data);
                setPgSize(res.data.size);
                setPgs(res.data.pgs);
            });
    }, [powerBackup]);

    useEffect(() => {
        return axios.post(`http://localhost:5000/api/pgs/filter?location=${params.location}`, { gender, amenities_ac: AC, amenities_power_backup: powerBackup, single_bed: singleBed })
            .then(res => {
                console.log(res.data);
                setPgSize(res.data.size);
                setPgs(res.data.pgs);
            });
    }, [singleBed]);

    useEffect(() => {
        return axios.post(`http://localhost:5000/api/pgs/filter?location=${params.location}`, {
            gender,
            amenities_ac: AC,
            amenities_power_backup: powerBackup,
            single_bed: singleBed,
            double_bed: doubleBed
        })
            .then(res => {
                console.log(res.data);
                setPgSize(res.data.size);
                setPgs(res.data.pgs);
            });
    }, [doubleBed]);

    useEffect(() => {
        return axios.post(`http://localhost:5000/api/pgs/filter?location=${params.location}`, {
            gender,
            amenities_ac: AC,
            amenities_power_backup: powerBackup,
            single_bed: singleBed,
            double_bed: doubleBed,
            triple_bed: tripleBed
        })
            .then(res => {
                console.log(res.data);
                setPgSize(res.data.size);
                setPgs(res.data.pgs);
            });
    }, [tripleBed]);

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
            // setNormalPgSize(data.size);
            // setNormalPgs(data.pgs);
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

    const handleChange = (event) => {
        console.log(event.target.checked);
        setChecked({ ...checked, boy: event.target.checked, girl: event.target.checked });
        setGender(event.target.value);
    };

    const handleAC = (event) => {
        console.log(event.target.value);
        // setChecked(event.target.checked);
        setAC(event.target.value);
    };

    const handlePB = (event) => {
        console.log(event.target.value);
        setPowerBackup(event.target.value);
    };

    const handleSBed = event => {
        // console.log(event.target);
        if (event.target.checked) {
            setSingleBed(event.target.value);
        }
    }

    const handleDBed = event => {
        if (event.target.checked) {
            setDoubleBed(event.target.value);
        }
    }

    const handleTBed = event => {
        if (event.target.checked) {
            setTripleBed(event.target.value);
        }
    }

    const clearFilter = e => {
        e.preventDefault();
        setChecked({ ...checked, boy: false, girl: false });
        setGender('');
        setAC('');
        setPowerBackup('');
        setSingleBed('0');
        setDoubleBed('0');
        setTripleBed('0');
        // console.log(e.target);
    }

    const checkAvailability = e => {
        if (e.target.checked && !checked.boy) {
            console.log(e.target.checked)
            setChecked({ ...gender, boy: true });
        } else if (e.target.checked && !checked.boy) {
            setChecked({ ...gender, boy: false });
        }
    }

    return (
        <Fragment>
            <div className="container">
                <h3>PGs page nest</h3>
                {showLoading()}

                <div className="row g-0">
                    <div className="col-sm-6 col-md-4">
                        Filter
                        <button className="btn btn-warning"
                            onClick={clearFilter}
                        >
                            Clear filter
                        </button>
                        <div className="form-check">
                            <input
                                name='gender'
                                className="form-check-input"
                                type="radio"
                                value="Boys"
                                onChange={handleChange}
                                onClick={checkAvailability}
                            // checked={checked.boy}
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
                            // checked={checked.girl}
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

                    <hr />

                    <div className="form-check">
                        <input
                            // name='powerBackup'
                            className="form-check-input"
                            type="checkbox"
                            value="Yes"
                            onChange={handleSBed}
                        />
                        <label className="form-check-label">
                            Single Bed
                            </label>
                    </div>

                    <hr />
                    <div className="form-check">
                        <input
                            // name='powerBackup'
                            className="form-check-input"
                            type="checkbox"
                            value="Yes"
                            onChange={handleDBed}
                        />
                        <label className="form-check-label">
                            Double Bed
                            </label>
                    </div>

                    <hr />

                    <div className="form-check">
                        <input
                            name='powerBackup'
                            className="form-check-input"
                            type="checkbox"
                            value="Yes"
                            onChange={handleTBed}
                        />
                        <label className="form-check-label">
                            Triple Bed
                            </label>
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

                {gender === '' && AC === '' && powerBackup === '' && singleBed === 0 ?
                    <div>
                        <h3>
                            {pgs.length}
                        </h3>
                        {JSON.stringify(pgs)}
                    </div>
                    :
                    <div>
                        <h3>{pgs.length}</h3> <br />
                        {pgs && JSON.stringify(pgs)}
                    </div>
                }


            </div>

        </Fragment >
    )
}