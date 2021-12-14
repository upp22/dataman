import MapComponent from "../components/MapComponent";
import { GetUserContext, SetUserContext } from "../context/UserContext";

export function MapPage() {

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
