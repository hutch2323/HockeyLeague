import React from "react";
import { Link } from "react-router-dom";
import bootstrap from "bootstrap";
import './App.css';
import { Helmet } from 'react-helmet';
import Alert from 'react-bootstrap/Alert';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function NavigationBar({scores}){
    return(
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div id="navContainer" className="container-fluid">
                    {/* <img id="logo" src="images/movieReviews.png" height="100px" width="600px"/> */}
                    <div className="col-12">
                        <div className="row m-auto">
                            <div className="col-2">
                                <img id="logo" src="images/bananaLeague.png" height="100px" width="100px"/>
                            </div>
                            <div className="col-10 m-auto">
                                <ul className="navbar-nav d-flex justify-content-center mb-0 nav-fill" style={{listStyleType:"none"}}>
                                    {scores.map((score, i) => {return <Score key={i} score={score}/>})}
                                </ul>
                            </div>
                        </div>
                        <div className="row">
                            <div className="navbar-nav" style={{width:"100%", position:"relative",float:"right"}}>
                                <ul className="navbar-nav w-100 nav-fill mx-auto order-0">
                                    <li id="firstLink" className="nav-item fs-5" >
                                        <Link className="nav-item nav-link active" to="/">Home</Link>
                                    </li>
                                    <li className="nav-item fs-5">
                                        <Link className="nav-item nav-link active" to="/">Scores</Link>
                                    </li>
                                    <li className="nav-item fs-5">
                                        <Link className="nav-item nav-link active" to="/">Standings</Link>
                                    </li>
                                    <li className="nav-item fs-5">
                                        <Link className="nav-item nav-link active" to="/">Stats</Link>
                                    </li>
                                    <li className="nav-item fs-5">
                                        <Link className="nav-item nav-link active" to="/about">About</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

        </>
    )
}

export function Home({scores}){
    return(
        <>
            <div>
                <Helmet>
                    <title>Movie Reviews</title>
                </Helmet>
            </div>
            <NavigationBar scores={scores}/>
        </>
    );
}

export function About({scores}){
    return(
        <>
            <div>
                <Helmet>
                    <title>About</title>
                </Helmet>
            </div>
            <NavigationBar scores={scores}/>
            <h2>Hello</h2>
        </>
    );
}

function Score(props){
    console.log(props);
    return(
        <>
        <li className="text-white p-3 nav-item fs-6 border border-white m-2">
            <div className="p-10">
                <div className="d-flex">
                    <img src={`images/${props.score.awayTeamLogo}`} height="19px" width="23px"/>
                    <p className="m-auto">{props.score.awayTeam}</p> 
                    <p className="m-auto ps-3">{props.score.awayScore}</p>
                </div>
                <div className="d-flex">
                    <img src={`images/${props.score.homeTeamLogo}`} height="19px" width="23px"/>
                    <p className="m-auto">{props.score.homeTeam}</p>
                    <p className="m-auto ps-3">{props.score.homeScore}</p> 
                </div>
            </div>
        </li>
        
        </>
    )
}