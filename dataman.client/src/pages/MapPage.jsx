import { Map, GoogleApiWrapper, Marker  } from 'google-maps-react';
import {useContext, useEffect, useState} from "react";
import UserContext from "../context/UserContext";
import MapComponent from "../components/MapComponent";

export function MapPage() {

    const { userContext, setUserContext } = useContext(UserContext);
    console.log(userContext);

    return (
        <div>
            <h1>Map Page</h1>
            <p>Your current location</p>
            <div>
                <MapComponent></MapComponent>
            </div>
        </div>
    )
}
