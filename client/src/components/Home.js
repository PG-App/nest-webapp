import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
// import GooglePlacesAutocomplete from "react-google-places-autocomplete";

import { Search } from './Search';

export const Home = () => {
    const [pgs, setPgs] = useState([]);
    const [query, setQuery] = useState('');
    const [value, setValue] = useState(null);
    const [pgSize, setPgSize] = useState(0);

    const handleChange = e => {
        setQuery(e.target.value);
    };

    const handleCitySearch = () => {
        if (query.length === 0) {
            return '/pgs?';
        }
        return `/pgs?cityName=${query}`
    }

    const fetchAllHostels = () => {
        axios.get(`http://localhost:5000/api/get/all/pgs`)
            .then(res => {
                console.log(res.data);
                setPgSize(res.data.size);
                setPgs(res.data.pgs);
            });
    }

    useEffect(() => {
        fetchAllHostels();
    }, []);

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(showPosition);
        } else {
            console.log('Geolocation is not supported by this browser.');
        }
    }

    const showPosition = position => {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
    }

    const handleValue = e => {
        console.log(e, e.label);
        const result = e.label.split(',');
        console.log(result[0]);
        setQuery(result[0]);
    }

    console.log(value);

    return (
        <Fragment>
            <div className="container">
                <h3>Home page nest</h3>
                <h5>
                    {pgSize}
                </h5>
                {JSON.stringify(pgs)}
                <hr />
                <Search query={query} handleChange={handleChange} city={handleCitySearch} />
            </div>
        </Fragment>
    )
}