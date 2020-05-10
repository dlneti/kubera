const { admin } = require("../admin");

// validation of auth header coming from client
const validateFirebaseIdToken = async (req, res, next) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        res.status(403).send('Unauthorized! Missing or wrong auth header');
        return;
    }

    const idToken = req.headers.authorization.split('Bearer ')[1];

    try {
        const decodedIdToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedIdToken;
        next();
        return;
    } catch (error) {
        console.error('Error while verifying Firebase ID token:', error);
        res.status(403).send('Unauthorized! Bad token');
        return;
    }
};

module.exports = validateFirebaseIdToken;