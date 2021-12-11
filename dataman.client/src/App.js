import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Col, Container, Nav, Navbar} from "react-bootstrap";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {HomePage} from "./pages/HomePage";
import {AboutPage} from "./pages/AboutPage";
import {LoginPage} from "./pages/LoginPage";
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import userContext from "./context/UserContext";
import UserContext from "./context/UserContext";
import {toast} from "react-toastify";
import {MapPage} from "./pages/MapPage";

function App() {

    const [userContext, setUserContext] = useState({})
    const [routes, setRoutes] = useState((
        <Routes>
            <Route path={'/'} element={<HomePage/>}/>
            <Route path={'/Maps'} element={<MapPage/>}/>
            <Route path={'/Login'} element={<LoginPage/>}/>
            <Route path={'*'} element={<p>Not Found here</p>}/>
        </Routes>
    ))
    const value = {userContext, setUserContext};
    const [authState, setAuthState] = useState(false);

    axios.get(`${process.env.REACT_APP_API_URL}/sessions/user`, {withCredentials: true}).then(res => {
        setAuthState(!!res.data.email);
    })

    const handleLogout = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/sessions/logout`, {withCredentials: true}).then(res => {
            res.data.email ? setAuthState(true) : setAuthState(false);
            setAuthState(!!res.data.email);
        })
    }

    // When auth state changes protect the routes
    useEffect((x) => {
        determineRoutes();
    }, [authState])


    const determineRoutes = () => {
        // Set authenticated routes here
        if (authState) {
            setRoutes((
                <Routes>
                    <Route path={'/'} element={<HomePage/>}/>
                    <Route path={'/About'} element={<AboutPage/>}/>
                    <Route path={'/Maps'} element={<MapPage/>}/>
                    <Route path={'/Login'} element={<LoginPage/>}/>
                    <Route path={'*'} element={<p>Not Found</p>}/>
                </Routes>
            ))
        }
    }

    return (
        <UserContext.Provider value={value}>
            <div className="App">
                <BrowserRouter>
                    <Navbar bg="light" expand="lg">
                        <Container>
                            <Navbar.Brand href="#home">Dataman</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link as={Link} to={'/'}>Home</Nav.Link>
                                    <Nav.Link as={Link} to={'/about'}>About</Nav.Link>
                                    <Nav.Link as={Link} to={'/maps'}>Maps</Nav.Link>
                                </Nav>
                                {
                                    authState
                                        ?
                                        <Nav><Nav.Link onClick={handleLogout} as={Link} to={'/login'}>Logout</Nav.Link></Nav>
                                        : <Nav><Nav.Link as={Link} to={'/login'}>Login</Nav.Link></Nav>
                                }
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    {
                        routes
                    }
                </BrowserRouter>
            </div>

        </UserContext.Provider>
    );
}

export default App;
