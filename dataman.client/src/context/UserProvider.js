import React from "react";
import PropTypes from "prop-types";
import userContext from "./userContext";

const UserProvider = props => {
    const [userContext, setUser] = React.useState({});

    return (
        <userContext.Provider value={{ userContext }}>
            {props.children}
        </userContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node,
};

export default UserProvider;