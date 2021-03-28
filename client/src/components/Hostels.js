import React, { Fragment, useState, useEffect } from 'react';
import queryString from 'query-string';
import { FormControlLabel, Radio, RadioGroup, Checkbox, Button, FormControl, FormLabel } from '@material-ui/core';

import { fetchAllPgs, pgByAC, pgByGender } from './apiPg';

export const Hostels = (props) => {
    const [pgs, setPgs] = useState('');
    const [pgSize, setPgSize] = useState(0);
    const [gender, setGender] = useState('');
    const [ac, setAc] = useState('');
    const [Checked, setChecked] = useState([]);
    const [loading, setLoading] = useState(false);

    const queriedCity = props.location.search;
    const params = queryString.parse(queriedCity);

    useEffect(() => {
        fetchAllPgs(params.location).then(data => {
            setPgSize(data.size);
            setPgs(data.pgs);
        });
    }, []);

    const showLoading = () => {
        if (loading) {
            return (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border text-warning" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )
        }
    };

    const handleChange = (gender) => {
        console.log(gender);
        setGender(gender);
        setChecked(gender);
    }

    console.log(gender);

    const handleAc = (ac) => {
        console.log(ac);
        setChecked(ac);
        setAc(ac);
    }

    const clearFilter = () => {
        setChecked('');
        setGender('');
        setAc('');
        setPgs(pgs);
    }

    return (
        <Fragment>
            <div className="container">
                <h3>Hostels page nest</h3>
                {showLoading()}

                <div>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={Checked === 'Boys'}
                                value={gender}
                                onChange={() => handleChange('Boys')}
                                name="gender"
                            />
                        }
                        label="Boys"
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={Checked === 'Girls'}
                                value={gender}
                                onChange={() => handleChange('Girls')}
                                name="gender"
                            />
                        }
                        label="Girls"
                    />
                </div>

                <div>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={Checked === 'Yes'}
                                value={ac}
                                onChange={() => handleAc('Yes')}
                                name="ac"
                            />
                        }
                        label="AC"
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={Checked === 'No'}
                                value={ac}
                                onChange={() => handleAc('No')}
                                name="ac"
                            />
                        }
                        label="Non-AC"
                    />
                </div>

                {/* <h4>{pgs.length}</h4> */}
                {/* {JSON.stringify(pgs)} */}
                {
                    gender === '' && ac === '' && (
                        <div>
                            <h4>{pgs.length}</h4>
                            {JSON.stringify(pgs)}
                        </div>
                    )
                }

                {gender !== '' && ac === '' && (
                    <div>
                        <Button variant="contained" color="secondary" onClick={clearFilter}>
                            Clear filters
                        </Button>
                        {
                            pgs.length > 0 && pgs.filter(pg =>
                                pg.gender === gender
                            ).map(filteredProduct => (
                                <p>
                                    {JSON.stringify(filteredProduct)}
                                </p>
                            ))
                        }
                    </div>
                )}

                {gender !== '' && ac !== '' && (
                    <div>
                        <Button variant="contained" color='textPrimary' onClick={clearFilter}>
                            Clear filters
                        </Button>
                        {
                            pgs.length > 0 && pgs.filter(pg =>
                                pg.gender === gender
                                && pg.amenties.ac === ac
                            ).map(filteredProduct => (
                                <p>
                                    {JSON.stringify(filteredProduct)}
                                </p>
                            ))
                        }
                    </div>
                )}

                {
                    gender === '' && ac !== '' && (
                        <div>
                            <Button variant="contained" color="secondary" onClick={clearFilter}>
                                Clear filters
                            </Button>
                            {
                                pgs.length > 0 && pgs.filter(pg =>
                                    pg.amenties.ac === ac
                                ).map(filteredProduct => {
                                    // setPgs(filteredProduct);
                                    return (
                                        <p>
                                            {JSON.stringify(filteredProduct)}
                                        </p>
                                    )
                                }

                                )
                            }
                        </div>
                    )
                }

            </div>

        </Fragment >
    )
}