import React from 'react'
import { NavLink } from 'react-router-dom';
import logo from '../images/logo.png';


export default function FrontPage() {

    // site logo
    const sitelogo = logo
  

    return (
        <div className="container">
            <div className="landing-content">
                <div className="row">
                    <div className="col">
                        <div id="title">
                            <div className="row justify-content-center">
                                <img src={sitelogo} width="75" height="50" className="d-inline-block align-top" alt="Site logo" loading="lazy"></img>
                                <h1>MovieForum</h1>
                            </div>
                        </div>
                        <div id="solgan">
                            <div className="row justify-content-center">
                                <h2>The best movie forum on the planet!</h2>
                            </div>
                            <div className="row justify-content-center">
                     
                            </div><br></br>
                            <div className="row justify-content-center">
                                <h5>Discuss Reviews, Ratings, Cast, Quotes & News</h5>
                            </div>
                        </div>
                        <div id="landing-nav">
                            <div className="row justify-content-center">
                                <div className="col-6">
                                    <ul className="nav nav-pills nav-fill">
                                        <li className="nav-item login">
                                            <NavLink className="nav-link" style={{ textDecoration: 'none' }} to="/login">Login</NavLink>
                                        </li>
                                        <li className="nav-item register">
                                            <NavLink className="nav-link" style={{ textDecoration: 'none' }} to="/register">Register</NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
