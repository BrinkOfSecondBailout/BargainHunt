import React from 'react'
import { GoogleMap, useLoadScript, Marker} from "@react-google-maps/api";
import Css from './Map.module.css';

const Map = (props) => {
    const {coordinates} = props;
    const {isLoaded} = useLoadScript({googleMapsApiKey: "AIzaSyChY5OMAgnpUDQG1CCgHqO0ez9s6p-kYU4"});

    return (
        <div>
            {
                isLoaded && coordinates.lat !== null && coordinates.lng !== null && (
                    <GoogleMap zoom={12} center={coordinates} mapContainerClassName={Css.map}>
                        <Marker position={coordinates}/>
                    </GoogleMap>
                    )
            }
        </div>
    )
}

export default Map