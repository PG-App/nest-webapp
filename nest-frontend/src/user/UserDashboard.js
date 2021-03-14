import React, { Fragment } from "react";
import { isAuthenticated } from "../authentication/authApi";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const {
        phone, username,
        role
    } = isAuthenticated();

    const userLinks = () => {
        return (
            <Fragment>
                <div className="container">
                    <div className="card">
                        <h4 className="card-header">User Links</h4>
                        <ul className="list-group">
                            <li className="list-group-item">
                                <Link className="nav-link" to={`/profile/${username}`}>
                                    Update Profile
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </Fragment>
        );
    };

    const userInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">User Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">{username}</li>
                    <li className="list-group-item">{phone}</li>
                    <li className="list-group-item">
                        {role === 1 ? "Admin" : "Registered User"}
                    </li>
                </ul>
            </div>
        );
    };

    return (
        <Fragment>
            <div className="row">
                <div className="col-3">{userLinks()}</div>
                <div className="col-9">
                    {userInfo()}
                </div>
            </div>
        </Fragment>
    );
};

export default Dashboard;
