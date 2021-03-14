import React, { Fragment, useState, useEffect } from 'react';
import queryString from 'query-string';

import { Type } from '../filterComponents/Type';
import { Bed } from '../filterComponents/Bed';
import { AC } from '../filterComponents/AC';
import { HostelCard } from './HostelCard';

export const Hostels = (props) => {
    const [pgs, setPgs] = useState('');
    const [type, setType] = useState('');
    const [bed, setBed] = useState('');
    const [ac, setAc] = useState('');
    const [loading, setLoading] = useState(false)

    const queriedCity = props.location.search;
    const params = queryString.parse(queriedCity);
    console.log(params);

    const hostelByCity = (city) => {
        const fetchableData = {
            cityName: city
        }
        return fetch(`http://localhost:5000/api/hostels/search`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fetchableData)
        }).then(res => {
            return res.json();
        }).catch(err => {
            console.log(err);
        });
    }

    const hostelByType = (type, bed) => {
        const fetchableData = {
            type,
            bed: bed ? bed : '',
            cityName: params.cityName
        }
        return fetch(`http://localhost:5000/api/hostels/search`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fetchableData)
        }).then(res => {
            return res.json();
        }).catch(err => {
            console.log(err);
        });
    }

    const hostelByBed = (type, bed) => {
        const fetchableData = {
            type: type ? type : '',
            bed,
            cityName: params.cityName
        }
        return fetch(`http://localhost:5000/api/hostels/search`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fetchableData)
        }).then(res => {
            return res.json();
        }).catch(err => {
            console.log(err);
        });
    }

    const hostelByAC = (type, bed, ac) => {
        const fetchableData = {
            type: type ? type : '',
            bed: bed ? bed : '',
            ac,
            cityName: params.cityName
        }
        return fetch(`http://localhost:5000/api/hostels/search`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fetchableData)
        }).then(res => {
            return res.json();
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        setLoading(true);
        if (!type || !bed || !ac) {
            hostelByCity(params.cityName).then(data => {
                setLoading(false);
                console.log(data);
                setPgs(data.hostels);
            }).catch(err => {
                console.log(err);
            })
        }
    }, []);

    useEffect(() => {
        setLoading(true);
        hostelByType(type, bed).then(data => {
            setLoading(false);
            console.log(data);
            setPgs(data);
        }).catch(err => {
            console.log(err);
        });
    }, [type, bed]);

    useEffect(() => {
        setLoading(true);
        hostelByBed(type, bed).then(data => {
            setLoading(false);
            console.log(data);
            setPgs(data);
        }).catch(err => {
            console.log(err);
        })
    }, [type, bed]);

    useEffect(() => {
        setLoading(true);
        hostelByAC(type, bed, ac).then(data => {
            setLoading(false);
            console.log(data);
            setPgs(data);
        }).catch(err => {
            console.log(err);
        })
    }, [type, bed, ac]);

    const handleType = e => {
        console.log(e.target.value);
        setType(e.target.value);
    }

    const handleBed = e => {
        console.log(e.target.value);
        if (e.target.checked) {
            setBed(e.target.value);
        } else {
            setBed('');
        }
    }

    const handleAC = e => {
        console.log(e.target.value);
        if (e.target.checked) {
            setAc(e.target.value);
        } else {
            setAc('');
        }
    }

    const showLoading = () => {
        if (loading) {
            return (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )
        }
    };

    return (
        <Fragment>
            <div className="container">
                <h3>Hostels page nest</h3>
                {showLoading()}
                <div class="container">
                    <div class="row">
                        <div class="col-sm">
                            <Type handleType={handleType} />
                        </div>
                        <div class="col-sm">
                            <Bed handleBed={handleBed} />
                        </div>
                        <div class="col-sm">
                            <AC handleAC={handleAC} />
                        </div>
                    </div>
                </div>
                <hr/><hr/>

                <div className="row">
                    <div className="col-4">
                        <h4>Related pgs</h4>
                    </div>


                    <div className="col-8">
                        {pgs.size > 0 ?
                            <HostelCard pgs={pgs} /> :
                            <h2>No Pgs found!</h2>
                        }
                    </div>

                </div>
            </div>
        </Fragment >
    )
}