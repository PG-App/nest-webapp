export const fetchAllPgs = (location) => {
    return fetch(`http://localhost:5000/api/pgs/search?location=${location}`)
        .then(res => {
            return res.json();
        }).catch(err => console.log(err));
}