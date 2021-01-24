import React from 'react'
import { useHistory, Link } from 'react-router-dom';


export default function ExplorePage() {

    // route params
    let history = useHistory();

    return (
        <div className="page">
            <div className="container">
            <div className="row ml-2 mb-2">
                    <h1>Topics & Categories</h1>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="jumbotron category-box">
                            <h1>Categories</h1>
                            <hr className="my-4"></hr>
                            <div className="row">
                                <div className="col-4">
                                    <div className="cat-cell">
                                        <div className="nav-link" activeclassname="active" onClick={() => history.push('/category/1')}>  Comedy</div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="cat-cell">
                                        <li className="nav-link" activeclassname="active" onClick={() => history.push('/category/2')}> Horror </li>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="cat-cell">
                                        <li className="nav-link" activeclassname="active" onClick={() => history.push('/category/3')}> Action </li>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <div className="cat-cell">
                                        <li className="nav-link" activeclassname="active" onClick={() => history.push('/category/4')}> Romance </li>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="cat-cell">
                                        <li className="nav-link" activeclassname="active" onClick={() => history.push('/category/5')}> Drama</li>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
