import React, {useMemo, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import PlacesAutocomplete, {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
} from 'react-places-autocomplete';


import Css from './EditLocation.module.css';
import axios from 'axios';
import ping from '../assets/ping.png';
import Map from './Map';

const EditLocation = (props) => {
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();
    const {location} = props;
    const [address, setAddress] = useState("")
    const [coordinates, setCoordinates] = useState({
        lat: null,
        lng: null
    })


    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const ll = await getLatLng(results[0])
        console.log(ll)
        setAddress(value)
        setCoordinates(ll)
    }

    const updateLocation = async (e) => {
        try {
            e.preventDefault();
            await axios.patch("http://localhost:8000/api/users/location/update/" + userId, {
                location: address,
                coordinates: coordinates 
            })
                .then(response => {
                    console.log(response);
                    navigate('/')
                })
                .catch(err => {
                    const errorReponse = err.response.data.errors;
                    console.log(err.response.data.errors);
                })
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            
            <img src={ping} className={Css.pingIcon}/>
            <h5>Location:</h5>
            <PlacesAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={handleSelect}
            >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <input 
                    {...getInputProps({
                        placeholder: 'Search Places ...',
                        className: 'location-search-input',
                    })}
                    placeHolder={location}
                    className={Css.inputField} />
                    <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map(suggestion => {
                        const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                        // inline style for demonstration purpose
                        const style = suggestion.active
                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                        return (
                        <div
                            {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                            })}
                        >
                            <span>{suggestion.description}</span>
                        </div>
                        );
                    })}
                    </div>
                <button onClick={(e) => {updateLocation(e)}} className={Css.updateButton}><h4>Set Location</h4></button>
                </div>
                )}
            </PlacesAutocomplete>
            <Map coordinates={coordinates}/>
        </div>
    )
}

export default EditLocation