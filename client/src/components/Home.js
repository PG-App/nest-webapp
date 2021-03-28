import React, { Fragment, useState, useEffect } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

import { Search } from './Search';
import { RecommendedPg } from './RecommendedPgs';
import { fetchAllPgs, fetchRecommendedPgs } from './apiPg';

export const Home = () => {
    const [pgs, setPgs] = useState([]);
    const [recommendedPgs, setRecommendedPgs] = useState([]);
    const [query, setQuery] = useState('');
    const [pgSize, setPgSize] = useState(0);
    const [recommendedPgSize, setRecommendedPgSize] = useState(0);

    const handleChange = e => {
        setQuery(e.target.value);
    };

    const handleCitySearch = () => {
        if (query.length === 0) {
            return '/pgs?';
        }
        return `/pgs?cityName=${query}`
    }

    useEffect(() => {
        fetchAllPgs().then(data => {
            console.log(data);
            setPgs(data.pgs);
            setPgSize(data.size);
        });
        fetchRecommendedPgs().then(data => {
            console.log(data);
            setRecommendedPgs(data.recommendedPgs);
            setRecommendedPgSize(data.size);
        });
    }, []);

    return (
        <Fragment>
            <div className="container">
                <h3>Home page nest</h3>
                <RecommendedPg recommendedPgs={recommendedPgs} />
                <hr /> 
                <h5>
                    Overall PGs from various cities counting to {pgSize}
                </h5>
                {JSON.stringify(pgs)}
                <hr />
                <Search query={query} handleChange={handleChange} city={handleCitySearch} />
            </div>
        </Fragment>
    )
}