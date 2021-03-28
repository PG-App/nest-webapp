import axios from 'axios';

export const fetchPgsByLocation = (location) => {
    return fetch(`http://localhost:5000/api/pgs/search?location=${location}`)
        .then(res => {
            return res.json();
        }).catch(err => console.log(err));
}

export const fetchAllPgs = () => {
    return axios.get(`http://localhost:5000/api/get/all/pgs`)
        .then(res => {
            return res.data;
        });
}

export const fetchRecommendedPgs = () => {
    return axios.get(`http://localhost:5000/api/pgs/recommended`)
        .then(res => {
            return res.data;
        });
}
