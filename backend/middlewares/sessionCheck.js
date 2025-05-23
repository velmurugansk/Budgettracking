const jwt = require('jsonwebtoken')

const validateUser = async (req, res, next) => {
    let accessToken = req.cookies.accessToken;
    if (!accessToken) {
        return res.status(401).json({ "status": false, "message": 'Unauthorized access!' });
    }

    try {
        const tokendecode = await jwt.verify(accessToken, process.env.SECRET_KEY);
        req.name = tokendecode.name;
        req.id = tokendecode.id;
        next();
    } catch (error) {
        return res.status(401).json({ "status": false, "message": 'Session out!, Login again!' });
    }
}

module.exports = { validateUser }