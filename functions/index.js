const functions = require('firebase-functions');
const express = require('express');
const api = require('./api');

exports.api = functions.https.onRequest(api)    // express api server
