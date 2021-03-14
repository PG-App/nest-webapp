import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated, signout } from '../authentication/authApi';

const Navbar = ({ history }) => {
    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to='/'>Home</Link>
                            </li>






                            {isAuthenticated() && isAuthenticated().role === 0 && (
                                <li className="nav-item">
                                    <Link
                                        className="nav-link"
                                        to="/user/dashboard"
                                    >
                                        Dashboard
                    </Link>
                                </li>
                            )}

                            {isAuthenticated() && isAuthenticated().role === 1 && (
                                <li className="nav-item">
                                    <Link
                                        className="nav-link"
                                        to="/admin/dashboard"
                                    >
                                        Dashboard
                    </Link>
                                </li>
                            )}

                            {!isAuthenticated() && (
                                <Fragment>
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link"
                                            to="/signin"
                                        >
                                            Signin
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link
                                            className="nav-link"
                                            to="/signup"
                                        >
                                            Signup
                                        </Link>
                                    </li>
                                </Fragment>
                            )}

                            {isAuthenticated() && (
                                <li className="nav-item">
                                    <span
                                        className="nav-link"
                                        style={{ cursor: "pointer", color: "#ffffff" }}
                                        onClick={() =>
                                            signout(() => {
                                                history.push("/");
                                            })
                                        }
                                    >
                                        Signout
                                    </span>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </Fragment>
    )
}

export default withRouter(Navbar);