import React, {useEffect, useState} from 'react';
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import socket from '../context/SocketModule';

const MapComponent = (props) => {
    const defaultCenter = {lat: -29.777292, lng: 149.203997}
    const defaultPosition = { lat: -27.470504, lng: 153.025955}
    const [currentLocation, setCurrentLocation] = useState(defaultPosition);

    useEffect((x) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                setCurrentLocation({lat: position.coords.latitude, lng: position.coords.longitude});
                console.log("Latitude is :", position.coords.latitude);
                console.log("Longitude is :", position.coords.longitude);
                socket.emit('locationUpdate', {lat: position.coords.latitude, lng: position.coords.longitude});
            });

            // navigator.geolocation.watchPosition(function(position) {
            //     setCurrentLocation({lat: position.coords.latitude, lng: position.coords.longitude});
            //     console.log("Latitude is :", position.coords.latitude);
            //     console.log("Longitude is :", position.coords.longitude);
            //     socket.emit('locationUpdate', {lat: position.coords.latitude, lng: position.coords.longitude});
            // });

        } else {
            console.log("Not Available");
        }
    }, []);

    // updateLocation if location changes
    useEffect((x) => {
        setCurrentLocation(currentLocation);
    }, [currentLocation])

    const mapStyles = {
        height: "70vh",
        width: "100%"
    };

    return (

            <LoadScript
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
                <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={5}
                    center={defaultPosition}>
                    <Marker
                        title={'Your current position'}
                        label={'Me'}
                        position={currentLocation}/>
                    {
                        props.users.map(x => {
                            return (
                                <Marker
                                    key={x.socketId}
                                    title={x.user}
                                    // label={x.user}
                                    position={x.location}/>
                            )
                        })
                    }
                </GoogleMap>
            </LoadScript>
    )
}

export default MapComponent;
