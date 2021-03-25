import React, { Fragment, useState, useEffect } from 'react';
import queryString from 'query-string';

import { Type } from '../filterComponents/Type';
import { Bed } from '../filterComponents/Bed';
import { AC } from '../filterComponents/AC';
import { HostelCard } from './HostelCard';
import { Price } from '../filterComponents/Price';

export const Hostels = (props) => {
    const [pgs, setPgs] = useState('');
    const [pgSize, setPgSize] = useState(0);
    const [data, setData] = useState('');
    const [type, setType] = useState('');
    const [bed, setBed] = useState('');
    const [ac, setAc] = useState('');
    const [price, setPrice] = useState({
        min: '',
        max: ''
    });
    const [loading, setLoading] = useState(false)

    const queriedCity = props.location.search;
    // console.log(queriedCity);
    const params = queryString.parse(queriedCity);
    console.log(params);

    const fetchAllPgs = (location) => {
        return fetch(`http://localhost:5000/api/pgs/search?location=${location}`)
            .then(res => {
                console.log(res);
                return res.json();
            }).catch(err => console.log(err));
    }

    // const hostelByType = (type, bed) => {
    //     const fetchableData = {
    //         type,
    //         bed: bed ? bed : '',
    //         cityName: params.cityName
    //     }
    //     return fetch(`http://localhost:5000/api/hostels/search`, {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(fetchableData)
    //     }).then(res => {
    //         return res.json();
    //     }).catch(err => {
    //         console.log(err);
    //     });
    // }

    // const hostelByBed = (type, bed) => {
    //     const fetchableData = {
    //         type: type ? type : '',
    //         bed,
    //         cityName: params.cityName
    //     }
    //     return fetch(`http://localhost:5000/api/hostels/search`, {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(fetchableData)
    //     }).then(res => {
    //         return res.json();
    //     }).catch(err => {
    //         console.log(err);
    //     });
    // }

    // const hostelByAC = (type, bed, ac) => {
    //     const fetchableData = {
    //         type: type ? type : '',
    //         bed: bed ? bed : '',
    //         ac,
    //         cityName: params.cityName
    //     }
    //     return fetch(`http://localhost:5000/api/hostels/search`, {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(fetchableData)
    //     }).then(res => {
    //         return res.json();
    //     }).catch(err => {
    //         console.log(err);
    //     });
    // }

    // const hostelByPrice = (type, bed, ac, price) => {
    //     const fetchableData = {
    //         type: type ? type : '',
    //         bed: bed ? bed : '',
    //         ac: ac ? ac : '',
    //         min: price.min,
    //         max: price.max,
    //         cityName: params.cityName
    //     }
    //     return fetch(`http://localhost:5000/api/hostels/search`, {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(fetchableData)
    //     }).then(res => {
    //         console.log(res);
    //         return res.json();
    //     }).catch(err => {
    //         console.log(err);
    //     });
    // }

    useEffect(() => {
        fetchAllPgs(params.location).then(data => {
            console.log(data);
            setPgSize(data.size);
            setData(data.pgs);
        });
    }, []);

    // useEffect(() => {
    //     setLoading(true);
    //     hostelByType(type, bed).then(data => {
    //         setLoading(false);
    //         console.log(data);
    //         setPgs(data);
    //     }).catch(err => {
    //         console.log(err);
    //     });
    // }, [type, bed]);

    // useEffect(() => {
    //     setLoading(true);
    //     hostelByBed(type, bed).then(data => {
    //         setLoading(false);
    //         console.log(data);
    //         setPgs(data);
    //     }).catch(err => {
    //         console.log(err);
    //     })
    // }, [type, bed]);

    // useEffect(() => {
    //     setLoading(true);
    //     hostelByAC(type, bed, ac).then(data => {
    //         setLoading(false);
    //         setPgs(data);
    //     }).catch(err => {
    //         console.log(err);
    //     })
    // }, [type, bed, ac]);

    // useEffect(() => {
    //     setLoading(true);
    //     hostelByPrice(type, bed, ac, price).then(data => {
    //         setLoading(false);
    //         console.log(data);
    //         setPgs(data);
    //     }).catch(err => {
    //         console.log(err);
    //     })
    // }, [type, bed, ac, price]);

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

    const handlePriceMin = e => {
        console.log('min', e.target.value);
        setPrice({
            ...price,
            min: e.target.value
        });
    }

    const handlePriceMax = e => {
        console.log('max', e.target.value);
        setPrice({
            ...price,
            max: e.target.value
        });
    }

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
                        <div class="col-sm">
                            <Price handlePriceMin={handlePriceMin}
                                handlePriceMax={handlePriceMax}
                            />
                        </div>
                    </div>
                </div>
                <hr className='new5' />

                <h4>{pgSize}</h4>
                {JSON.stringify(data)}

            </div>

        </Fragment >
    )
}