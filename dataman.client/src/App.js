import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {GetUserContext, SetUserContext, UserProvider} from "./context/UserContext";
import TopNavigation from "./components/TopNavigation";
import io from 'socket.io-client';
import {useEffect} from "react";
import socket from './context/SocketModule';

function App() {

    socket.on('newClient', x => {
        console.log(x);
    })

    return (
        <UserProvider>
            <div className="App">
                <TopNavigation></TopNavigation>
            </div>
        </UserProvider>
    );
}

export default App;
