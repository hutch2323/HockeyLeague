import React from "react";
import { Link } from "react-router-dom";
import bootstrap from "bootstrap";
import './App.css';
import { Helmet } from 'react-helmet';
import Alert from 'react-bootstrap/Alert';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Table, Tabs, Tab, Container } from 'react-bootstrap'

//Comparer Function    
function GetSortOrderAscending(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
}  

function GetSortOrderDescending(prop) {    
    return function(a, b) {    
        if (a[prop] < b[prop]) {    
            return 1;    
        } else if (a[prop] > b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
}  

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
                                        <Link className="nav-item nav-link active" to="/standings">Standings</Link>
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

export function Standings({standings, scores}){
    const [standingsType, setStandingsType] = useState("league");

    const [conferences, setConferences] = useState(null);
    const [divisions, setDivisions] = useState(null);
    const [conferenceStandings, setConferenceStandings] = useState(null);
    const [divisionStandings, setDivisionStandings] = useState(null);

    useEffect(() => {
        fetch('/api/getConferences')
        .then((response) => response.json())
        .then(setConferences)
    }, []);

    useEffect(() => {
        fetch('/api/getDivisions')
        .then((response) => response.json())
        .then(setDivisions)
    }, []);

    useEffect(() => {
        fetch('/api/getConferenceStandings')
        .then((response) => response.json())
        .then(setConferenceStandings)
    }, []);

    useEffect(() => {
        fetch('/api/getDivisionStandings')
        .then((response) => response.json())
        .then(setDivisionStandings)
    }, []);


    if( conferences == null) return null;
    if( divisions == null) return null;
    if( conferenceStandings == null) return null;
    if( divisionStandings == null) return null;
    
    return(
        <>
        
            <div>
                <Helmet>
                    <title>Team Standings</title>
                </Helmet>
            </div>
            <NavigationBar scores={scores}/>

            <Container>
                <Tabs
                    id="controlled-tab-example"
                    activeKey={standingsType}
                    onSelect={(k) => setStandingsType(k)}
                    className="mb-3"
                >
                    <Tab eventKey="league" title="League" onClick={console.log(standingsType)}>
                        <LeagueStandings standings={standings}/>
                    </Tab>
                    <Tab eventKey="conference" title="Conference" onClick={console.log(standingsType)}>
                        {conferenceStandings.map((conference, i) => {return (
                            <Container key={i}>
                                <ConferenceTable key={i} conference={conference}/> 
                            </Container>
                        )})}
                    </Tab>
                    <Tab eventKey="division" title="Division" onClick={console.log(standingsType)}>
                        {divisionStandings.map((conference, i) => {return (
                            <Container key={i}>
                                <ConferenceTable key={i} conference={conference}/> 
                            </Container>
                        )})}
                    </Tab>
            </Tabs>
            </Container>
        </>
    );
}

export function ConferenceTable({conference}){
    let conferenceStandings = [];

    if (conference.standings == null){
        return(
            <Container>
                <h2>{conference.name} Conference</h2>
                {conference.divisions.map((division, i) => {return (
                    <Container key={i}>
                        <DivisionTable key={i} division={division}/> 
                    </Container>
                )})}
            </Container>
        )
    }

    return(
        <>
            <h2>{conference.name} Conference</h2>
            <LeagueStandings standings={conference.standings} />
        </>
    )
}

export function DivisionTable({division}){
    return(
        <>
            <h3>{division.name}</h3>
            <LeagueStandings standings={division.standings} />
        </>
    )
}

export function StandingsRow({team, standingsView}){
    return(
        <>
            <td style={{color:"white", backgroundColor:team.primaryColor}}>{team.city} {team.name}</td>
            <td className={standingsView==="gp" ? 'sortedColumnData' : null}>{team.GP}</td>
            <td className={standingsView==="wins" ? 'sortedColumnData' : null}>{team.wins}</td>
            <td className={standingsView==="losses" ? 'sortedColumnData' : null}>{team.losses}</td>
            <td className={standingsView==="otl" ? 'sortedColumnData' : null}>{team.overtimeLosses}</td>
            <td className={standingsView==="points" ? 'sortedColumnData' : null}>{team.Points}</td>
            <td className={standingsView==="gf" ? 'sortedColumnData' : null}>{team.goalsFor}</td>
            <td className={standingsView==="ga" ? 'sortedColumnData' : null}>{team.goalsAgainst}</td>
        </>
    )
}

export function LeagueStandings({standings}){
    const [standingsView, setStandingsView] = useState("points")
    const [sortOrderTeam, setSortOrderTeam] = useState("descending");
    const [sortOrderGP, setSortOrderGP] = useState("descending");
    const [sortOrderWins, setSortOrderWins] = useState("descending");
    const [sortOrderLosses, setSortOrderLosses] = useState("descending");
    const [sortOrderOTL, setSortOrderOTL] = useState("descending");
    const [sortOrderPoints, setSortOrderPoints] = useState("descending");
    const [sortOrderGF, setSortOrderGF] = useState("descending");
    const [sortOrderGA, setSortOrderGA] = useState("descending");
    const [teamStandings, setTeamStandings] = useState([...standings]);

    return(
        <Table striped bordered hover>
        {/* <tr><th>Team</th><th>GP</th><th>W</th><th>L</th><th>OTL</th><th>PTS</th><th>GF</th><th>GA</th></tr> */}
        <tbody>
            <tr>
                <th></th>
                <th onClick={() => {
                    setStandingsView("team");
                    if (sortOrderTeam === "descending"){
                        setTeamStandings(teamStandings.sort(GetSortOrderDescending("city")));
                        setSortOrderTeam("ascending")
                    } else {
                        setTeamStandings(teamStandings.sort(GetSortOrderAscending("city")));
                        setSortOrderTeam("descending")
                    }
                }}
                className={standingsView==="team" ? "sortedColumn" : null}
                >
                    Team
                </th>
                <th onClick={() => {
                    setStandingsView("gp");
                    if (sortOrderGP === "descending"){
                        setTeamStandings(teamStandings.sort(GetSortOrderDescending("GP")));
                        setSortOrderGP("ascending")
                    } else {
                        setTeamStandings(teamStandings.sort(GetSortOrderAscending("GP")));
                        setSortOrderGP("descending")
                    }
                }}
                className={standingsView==="gp" ? 'sortedColumn' : null}
                >
                    GP
                </th>
                <th onClick={() => {
                    setStandingsView("wins");
                    if (sortOrderWins === "descending"){
                        setTeamStandings(teamStandings.sort(GetSortOrderDescending("wins")));
                        setSortOrderWins("ascending")
                    } else {
                        setTeamStandings(teamStandings.sort(GetSortOrderAscending("wins")));
                        setSortOrderWins("descending")
                    }
                }}
                className={standingsView==="wins" ? 'sortedColumn' : null}
                >
                    W
                </th>
                <th onClick={() => {
                    setStandingsView("losses");
                    if (sortOrderLosses === "descending"){
                        setTeamStandings(teamStandings.sort(GetSortOrderDescending("losses")));
                        setSortOrderLosses("ascending")
                    } else {
                        setTeamStandings(teamStandings.sort(GetSortOrderAscending("losses")));
                        setSortOrderLosses("descending")
                    }
                }}
                className={standingsView==="losses" ? 'sortedColumn' : null}
                >
                    L
                </th>
                <th onClick={() => {
                    setStandingsView("otl");
                    if (sortOrderOTL === "descending"){
                        setTeamStandings(teamStandings.sort(GetSortOrderDescending("overtimeLosses")));
                        setSortOrderOTL("ascending")
                    } else {
                        setTeamStandings(teamStandings.sort(GetSortOrderAscending("overtimeLosses")));
                        setSortOrderOTL("descending")
                    }
                }}
                className={standingsView==="otl" ? 'sortedColumn' : null}
                >
                    OTL
                </th>
                <th 
                onClick={() => {
                    setStandingsView("points");
                    if (sortOrderPoints === "descending"){
                        setTeamStandings(teamStandings.sort(GetSortOrderDescending("Points")));
                        setSortOrderPoints("ascending")
                    } else {
                        setTeamStandings(teamStandings.sort(GetSortOrderAscending("Points")));
                        setSortOrderPoints("descending")
                    }
                }}
                className={standingsView==="points" ? 'sortedColumn' : null}
                >
                    PTS
                </th>
                <th onClick={() => {
                    setStandingsView("gf");
                    if (sortOrderGF === "descending"){
                        setTeamStandings(teamStandings.sort(GetSortOrderDescending("goalsFor")));
                        setSortOrderGF("ascending")
                    } else {
                        setTeamStandings(teamStandings.sort(GetSortOrderAscending("goalsFor")));
                        setSortOrderGF("descending")
                    }
                }}
                className={standingsView==="gf" ? 'sortedColumn' : null}
                >
                    GF
                </th>
                <th onClick={() => {
                    setStandingsView("ga");
                    if (sortOrderGA === "descending"){
                        setTeamStandings(teamStandings.sort(GetSortOrderDescending("goalsAgainst")));
                        setSortOrderGA("ascending")
                    } else {
                        setTeamStandings(teamStandings.sort(GetSortOrderAscending("goalsAgainst")));
                        setSortOrderGA("descending")
                    }
                }}
                className={standingsView==="ga" ? 'sortedColumn' : null}
                >
                    GA
                </th>
            </tr>
            {teamStandings.map((team, i) => {return (
                <tr key={i}>
                    <td>{i + 1}</td>
                    <StandingsRow key={i} team={team} standingsView={standingsView}/>
                </tr>                        
            )})}
            </tbody>
        </Table>
    )
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