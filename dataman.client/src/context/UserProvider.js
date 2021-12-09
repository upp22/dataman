import React from "react";
import PropTypes from "prop-types";
import userContext from "./userContext";

const UserProvider = props => {
    const [user, setUser] = React.useState({});

    return (
        <userContext.Provider value={{ user }}>
            {props.children}
        </userContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node,
};

export default UserProvider;