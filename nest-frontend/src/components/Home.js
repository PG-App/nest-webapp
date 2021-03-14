import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { Hostels } from './Hostels';
import { Search } from './Search';

export const Home = () => {
    const [hostels, setHostels] = useState([]);
    const [query, setQuery] = useState('');

    const handleChange = e => {
        setQuery(e.target.value);
    };

    const handleCitySearch = () => {
        if (query.length === 0) {
            return '/hostels?';
        }
        return `/hostels?cityName=${query}`
    }

    const fetchAllHostels = () => {
        axios.get(`http://localhost:5000/api/get/all/hostels`)
            .then(res => {
                setHostels(res.data.hostels);
            });
    }

    useEffect(() => {
        fetchAllHostels();
    }, []);
    return (
        <Fragment>
            <div className="container">
                <h3>Home page nest</h3>
                <Search query={query} handleChange={handleChange} city={handleCitySearch} />
            </div>
        </Fragment>
    )
}