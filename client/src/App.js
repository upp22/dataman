import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {GetUserContext, SetUserContext, UserProvider} from "./context/UserContext";
import TopNavigation from "./components/TopNavigation";

function App() {



    return (
        <UserProvider>
            <div className="App">
                <TopNavigation></TopNavigation>
            </div>
        </UserProvider>
    );
}

export default App;
