import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from "react-places-autocomplete";
import { useHistory } from 'react-router-dom';

export const Search = ({ query, handleChange, city }) => {
    const history = useHistory();
    const [location, setLocation] = useState('');
    const [coordinates, setCoordinates] = React.useState({
        lat: null,
        lng: null
    });

    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setCoordinates(latLng);
        setLocation(value);
    };

    const search = () => {
        return history.push(`/hostels?location=${location}&latLng=${coordinates.lat},${coordinates.lng}`)
    }

    return (
        <Fragment>
            <h3>Search page nest</h3>
            <form>
                <div className="mb-3">
                    <label className="form-label">Search Hostels by City...</label>
                    <PlacesAutocomplete
                        value={location}
                        onChange={setLocation}
                        onSelect={handleSelect}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>

                                <input className='form-control' {...getInputProps({ placeholder: "Type address" })} />

                                <div>
                                    {loading ? <div>...loading</div> : null}

                                    {suggestions.map(suggestion => {
                                        const style = {
                                            backgroundColor: suggestion.active ? "#e60000" : "#fff"
                                        };

                                        return (
                                            <div {...getSuggestionItemProps(suggestion, { style })}>
                                                {suggestion.description}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </PlacesAutocomplete>
                </div>
                <button onClick={search} className="btn btn-warning">
                    Search
                </button>
            </form>
        </Fragment>
    )
}