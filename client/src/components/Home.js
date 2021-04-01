import React, { Fragment, useState, useEffect } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

import { Search } from './Search';
import { RecommendedPg } from './RecommendedPgs';
import { fetchAllPgs, fetchRecommendedPgs, fetchPopularLocalitiesPgs } from './apiPg';
import { PopularLocalities } from './PopularLocalities';

export const Home = () => {
    const [pgs, setPgs] = useState([]);
    const [recommendedPgs, setRecommendedPgs] = useState([]);
    const [popularLocalitiesPgs, setPopularLocalitiesPgs] = useState([]);
    const [query, setQuery] = useState('');
    const [pgSize, setPgSize] = useState(0);
    const [recommendedPgSize, setRecommendedPgSize] = useState(0);
    const [popularLocalitiesPgSize, setPopularLocalitiesSize] = useState(0);

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
        fetchPopularLocalitiesPgs().then(data => {
            console.log(data);
            setPopularLocalitiesPgs(data.popularLocalitiesPgs);
            setPopularLocalitiesSize(data.size);
        });
    }, []);

    const handleInput = e => {
        console.log(e.target.max);
    }

    return (
        <Fragment>
            <div className="container">
                <h3>Home page nest</h3>

                <Search query={query} handleChange={handleChange} city={handleCitySearch} />
                <hr />
                <RecommendedPg recommendedPgs={recommendedPgs} />
                <hr />
                <PopularLocalities popularLocalitiesPgs={popularLocalitiesPgs} />
                <hr />
                <h5>
                    Overall PGs from various cities counting to {pgSize}
                </h5>
                {JSON.stringify(pgs)}
                <hr />
            </div>
        </Fragment>
    )
}