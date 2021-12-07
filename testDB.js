const express = require('express');
const app = express();

require('dotenv').config({
  path: `.env.${ app.get('env') }`
});

const { MongoClient } = require('mongodb');

const dbURI = 'mongodb+srv://Lorenzo:1Z2x3C4v5B@smarthouse.zy127.mongodb.net/smarthouse?retryWrites=true&w=majority';

const mongoClient = new MongoClient(dbURI);


/**** Database gestito tramite operazioni CRUD ***/

// Create
app.get('/nuovo-profile', (req,res) => {});

// Read
app.get('/load-profile', (req,res) => {});

// Update
app.get('/update-profile', (req,res) => {});

// Delete
app.get('/delete-profile', (req,res) => {});

/**************************************************/


async function run(){
  await mongoClient.connect();
  console.log("Connessione a MongoDB Atlas stabilita");
  app.listen(process.env.SMART_HOUSE_PORT, (err) => console.log(`Server in ascolto sulla porta ${process.env.SMART_HOUSE_PORT}`));
}
run().catch(err => console.log("Errore connessione: "+err));
