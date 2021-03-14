import axios from 'axios';

export const addCity = cityName => {
    return axios.post(`http://localhost:5000/api/add/city`, { cityName })
        .then(res => {
            return res;
        });
}