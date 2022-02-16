import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { MongoClient } from 'mongodb';
import { request } from 'http';
import multer from 'multer';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let scores = undefined;
fs.readFile("./data/scores.json", "utf8", (err, data) => {
    console.log(err)
    console.log(data)
    scores = data;
});

const app = express();
app.use(express.static(path.join(__dirname, '/build')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

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