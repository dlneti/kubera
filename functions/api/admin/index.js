const admin = require('firebase-admin');
const serviceAccount = require('../../config/secrets.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://kubera-cf187.firebaseio.com"
  });

const db = admin.firestore();

module.exports = {
    db: db,
    admin: admin
};
