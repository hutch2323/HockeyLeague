import express, { application } from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { MongoClient } from 'mongodb';
import { request } from 'http';
import multer from 'multer';
import mysql from 'mysql2';
import util from 'mysql2';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, '/build')));
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

let scores = undefined;
fs.readFile("./data/scores.json", "utf8", (err, data) => {
    console.log(err)
    console.log(data)
    scores = data;
});

// let standings = undefined;
// fs.readFile("./data/standings.json", "utf8", (err, data) => {
//     // console.log(err)
//     // console.log(data)
//     let metro = data;
//     standings = data;
//     console.log(standings.records);
// });


const user = 'root';
const host = 'localhost';
const password = 'password1!';
const database = 'league';

const db = await mysql.createConnection({
    user: user,
    host: host,
    password: password,
    database: database
});

// app.post('/api/create', async (req, res) => {
//     // let name = "Marcus Hutchings";
//     // let age = 32;
//     // let country = "Canada";
//     // let position = "Software Developer";
//     // let wage = 50000;
//     let name = req.body.name;
//     let age = req.body.age;
//     let country = req.body.country;
//     let position = req.body.position;
//     let wage = req.body.wage

//     try {

//         const result = db.query(
//             "INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)", 
//             [name, age, country, position, wage], 
//             (err, result) => {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     res.send("Values inserted");
//                 }
//             }
//         );
//     } catch (error){

//     }
// });

// app.post('/api/addTeams', async (req, res) => {
//     // let name = "Marcus Hutchings";
//     // let age = 32;
//     // let country = "Canada";
//     // let position = "Software Developer";
//     // let wage = 50000;

//     let teams = [["Anaheim", "Ducks", 1, 2, 4,"#F47A38","#000000"],
//         ["Arizona", "Coyotes", 1, 2, 3,"#8C2633", "#5F259F"],
//         ["Boston", "Bruins", 1, 1, 1, "#000000", "#FFB81C"],
//         ["Buffalo", "Sabres", 1, 1, 1, "#002654", "#FCB514"],
//         ["Calgary", "Flames", 1, 2, 4, "#C8102E", "#F1BE48"],
//         ["Carolina", "Hurricanes", 1, 1, 2, "#CC0000", "#000000"],
//         ["Chicago", "Blackhawks", 1, 2, 3, "#CF0A2C", "#000000"],
//         ["Colorado", "Avalanche", 1, 2, 3, "#6F263D", "#236192"],
//         ["Columbus", "Blue Jackets", 1, 1, 2, "#002654", "#CE1126"],
//         ["Dallas", "Stars", 1, 2, 3, "#006847", "#8F8F8C"],
//         ["Detroit", "Red Wings", 1, 1, 1, "#CE1126", "#FFFFFF" ],
//         ["Edmonton", "Oilers", 1, 2, 4, "#041E42", "#FF4C00" ],
//         ["Florida", "Panthers", 1, 1, 1, "#041E42", "#C8102E"],
//         ["Los Angeles", "Kings", 1, 2, 4, "#111111", "#A2AAAD"],
//         ["Minnesota", "Wild", 1, 2, 3, "#A6192E", "#154734"],
//         ["Montréal", "Canadiens", 1, 1, 1, "#AF1E2D", "#192168"],
//         ["Nashville", "Predators", 1, 2, 3, "#041E42", "#FFB81C"],
//         ["New Jersey", "Devils", 1, 1, 2, "#CE1126", "#000000"],
//         ["New York", "Islanders", 1, 1, 2, "#00539B", "#F47D30"],
//         ["New York", "Rangers", 1, 1, 2, "#0038A8", "#CE1126"],
//         ["Ottawa", "Senators", 1, 1, 1, "#C52032", "#000000"],
//         ["Philadelphia", "Flyers", 1, 1, 2, "#000000", "#FCB514"],
//         ["Pittsburgh", "Penguins", 1, 1, 2, "#000000", "#FCB514"],
//         ["San Jose", "Sharks", 1, 2, 4, "#006D75", "#EA7200"],
//         ["Seattle", "Kraken", 1, 2, 4, "#001628", "#99D9D9"],
//         ["St. Louis", "Blues", 1, 2, 3, "#002F87", "#FCB514"],
//         ["Tampa Bay", "Lightning", 1, 1, 1, "#002868", "#000000"],
//         ["Toronto", "Maple Leafs", 1, 1, 1, "#00205B", "#FFFFFF"],
//         ["Vancouver", "Canucks", 1, 2, 4, "#00205B", "#041C2C"],
//         ["Vegas", "Golden Knights", 1, 2, 4, "#B4975A", "#000000"],
//         ["Washington", "Capitals", 1, 1, 2, "#041E42", "#C8102E"],
//         ["Winnipeg", "Jets", 1, 2, 3, "#041E42", "#AC162C"]
//     ];

//         for(let team of teams){
//             const result = db.query(
//                 "INSERT INTO teams (city, name, leagueId, conferenceId, divisionId, primaryColor, secondaryColor) VALUES (?,?,?,?,?,?,?)", 
//                 [team[0], team[1], team[2], team[3], team[4], team[5], team[6]], 
//                 (err, result) => {
//                     if (err) {
//                         console.log(err);
//                     } else {
                        
//                     }
//                 }
//             );
//         }
//         res.send("Values inserted");
// });


app.get('/api/getTeams', async (req, res) => {
    let resultSet = null;
    const query = db.query("Select * from teams",
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.status(200).json(result)
            }
        }
    );
    // console.log(result);
    // res.send(resultSet);
});

app.get('/api/getConferences', async (req, res) => {
    let resultSet = null;
    const query = db.query(
        "Select * from conferences;",
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.status(200).json(result)
            }
        }
    );
});

app.get('/api/getDivisions', async (req, res) => {
    let resultSet = null;
    const query = db.query(
        "Select * from divisions;",
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.status(200).json(result)
            }
        }
    );
    // db.close();
});

const getConferences = async () => {
    return new Promise((resolve, reject) => {
        db.query(
            "Select * from conferences;",
            (err, result) => {
                if (err) {
                    return reject(err)
                } else {
                   return resolve(result)
                }
            }
        );
    });
};

const getDivisions = async () => {
    return new Promise((resolve, reject) => {
        db.query(
            "Select * from divisions;",
            (err, result) => {
                if (err) {
                    return reject(err)
                } else {
                   return resolve(result)
                }
            }
        );
    });
};

const sortedStandings = async (sortParameter="", value=0) => {
    // parameter = "t." + parameter;
    // console.log("parameter: " + parameter);
    let queryString = "";
    if (sortParameter === "conference"){
        queryString = "Select distinct t.city, t.name, t.primaryColor, t.secondaryColor, (s.wins + s.losses + s.overtimeLosses) As GP, s.wins, s.losses, s.overtimeLosses, (s.wins * 2 + s.overtimeLosses) As Points, s.goalsFor, s.goalsAgainst "+
            "from teams t join standings s " +
            "where t.teamId = s.teamId " +
            "AND t.conferenceId = ? " +
            "order by Points desc;";
    } else if (sortParameter === "division") { // sorting by division
        queryString = "Select distinct t.city, t.name, t.primaryColor, t.secondaryColor, (s.wins + s.losses + s.overtimeLosses) As GP, s.wins, s.losses, s.overtimeLosses, (s.wins * 2 + s.overtimeLosses) As Points, s.goalsFor, s.goalsAgainst "+
            "from teams t join standings s " +
            "where t.teamId = s.teamId " +
            "AND t.divisionId = ? " +
            "order by Points desc;";
    } else {
        queryString = "Select distinct t.city, t.name, t.primaryColor, t.secondaryColor, (s.wins + s.losses + s.overtimeLosses) As GP, s.wins, s.losses, s.overtimeLosses, (s.wins * 2 + s.overtimeLosses) As Points, s.goalsFor, s.goalsAgainst "+
            "from teams t join standings s " +
            "where t.teamId = s.teamId " +
            "order by Points desc;";
    }
    
    console.log("value: " + value);
    return new Promise((resolve, reject) => {
        db.query(
            queryString,
            [value],
            (err, result) => {
                if (err) {
                    return reject(err)
                } else {
                    console.log(result);
                   return resolve(result)
                }
            }
        );
    });
};

app.get('/api/getStandings', async (req, res) => {
    const result = await sortedStandings()
    res.status(200).json(result)
    // db.close();
});

app.get('/api/getConferenceStandings', async (req, res) => {
    const conferences = await getConferences();  
    let conferenceStandings = [];
    
    for (let conference of conferences){
        console.log(conference.name);
        let teamStandings = await sortedStandings("conference", conference.conferenceId);
        conferenceStandings.push({
            conferenceId: conference.conferenceId,
            name: conference.name,
            league: conference.leagueId,
            standings: [...teamStandings]
        });
    }

    console.log(conferenceStandings)
    res.status(200).json(conferenceStandings);
});

app.get('/api/getDivisionStandings', async (req, res) => {
    const conferences = await getConferences();
    const divisions = await getDivisions();
    let divisionByConference = [];  
    
    for (let conference of conferences){
        let divisionStandings = [];
        for (let division of divisions){
            if (division.conferenceId === conference.conferenceId){
                let teamStandings = await sortedStandings("division", division.divisionId);
                divisionStandings.push({
                    divisionId: division.divisionId,
                    name: division.name,
                    standings: [...teamStandings]
                });
            }
        }
        divisionByConference.push({
            conferenceId: conference.conferenceId,
            name: conference.name,
            league: conference.leagueId,
            divisions: [...divisionStandings]
        })
    }

    console.log(divisionByConference)
    res.status(200).json(divisionByConference);
});

app.get('/api/scores', async (req, res) => {
    res.send(scores);
    // try{
    //     const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true})
    //     const db = client.db("movies");

    //     const movieInfo = await db.collection('movies').find({}).toArray();
    //     console.log(movieInfo);
    //     res.status(200).json(movieInfo);
    //     client.close();
    // }
    // catch (error) {
    //     res.status(500).json({message: "Error connceting to db", error});
    // }
});

app.get('*', (req, res) => { res.sendFile(path.join(__dirname + '/build/index.html'))})
app.listen(8000, () => console.log("listening on port 8000"));