import React, { Fragment } from "react";
import { isAuthenticated } from "../authentication/authApi";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
    const {
        username, phone, role
    } = isAuthenticated();

    const adminLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">Admin Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/hostel">
                            Create Hostel
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/hostels">
                            View Hostels
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/orders">
                            Manage Hostels
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };

    const adminInfo = () => {
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
            <div className="container">
                <div className="row">
                    <div className="col-3">{adminLinks()}</div>
                    <div className="col-9">{adminInfo()}</div>
                </div>
            </div>
        </Fragment>
    );
};

export default AdminDashboard;