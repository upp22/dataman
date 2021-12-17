import MapComponent from "../components/MapComponent";
import { GetUserContext, SetUserContext } from "../context/UserContext";
import MapUsers from "../components/MapUsers";
import socket from "../context/SocketModule";
import {useEffect} from "react";
import { useState } from "react";
import '../styles/mappage.css';

export function MapPage() {

    const [collectionState, setCollectionState] = useState([]);
    const [username, setUsername] = useState("anonymous");

    socket.on('locationUpdate', connectedUsers => {
        console.log(`locationUpdate Received:`);
        console.log(connectedUsers);
        setCollectionState(connectedUsers);
    });

    socket.on('initialConnect', connectedUsers => {
        console.log(`initialConnect Received:`);
        setCollectionState(connectedUsers);
    });

    // debug purposes
    useEffect(x => {
    }, [collectionState]);

    return (
        <div>
            <h1>Map Page</h1>
            <p>Your current location</p>
            <div className={'map-main-content-wrapper'}>
                <MapComponent users={collectionState}/>
                <MapUsers  collection={collectionState}/>
            </div>
        </div>
    )
}
