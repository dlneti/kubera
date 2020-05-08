const functions = require('firebase-functions');
const admin = require("firebase-admin");
const serviceAccount = require("./secrets.json");

// admin.initializeApp();

const express = require('express');
const api = require('./api');


const db = admin.firestore()

exports.api = functions.https.onRequest(api)

// test firestore connection
// exports.dbConnection = functions.https.onRequest( async (req, res) => {
//     const userRef = db.collection('users').doc('1');
//     const user = await userRef.get()

//     console.log(user.exists);

//     if (user.exists) {
//         res.json(user.data())
//     } else {
//         res.send("User doesn't exist!")
//     }

//     // res.json(user.data())
// })
