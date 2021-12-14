import React, {useEffect, useState} from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapComponent = () => {
    const defaultCenter = { lat: -27.4705, lng: 153.0260 }
    const [currentLocation, setCurrentLocation] = useState(defaultCenter);

    useEffect((x) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                setCurrentLocation({ lat: position.coords.latitude, lng: position.coords.longitude});
                console.log("Latitude is :", position.coords.latitude);
                console.log("Longitude is :", position.coords.longitude);
                // socket.emit('clientLocationUpdate', position.coords);
            });
        } else {
            console.log("Not Available");
        }
    }, []);

    // updateLocation if location changes
    useEffect((x) => {
        console.log('Current Location has changed');
        setCurrentLocation(currentLocation);
    }, [currentLocation])

    const mapStyles = {
        height: "50vh",
        width: "100%"};

    return (
        <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={13}
                center={currentLocation}>
                <Marker
                    title={'The marker`s title will appear as a tooltip.'}
                    name={'SOMA'}
                    position={currentLocation} />
            </GoogleMap>

        </LoadScript>
    )
}

export default MapComponent;
