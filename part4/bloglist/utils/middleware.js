const logger = require("./logger");
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../utils/config');

const errorHandler = (error, request, response, next) => {
    logger.error(error.message);

    next(error);
};

const requestLogger = (request, response, next) => {
    logger.info("Method: ", request.method);
    logger.info("Path:   ", request.path);
    logger.info("Body:   ", request.body);
    logger.info("---");
    next();
};

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
    }
    else {
        request.token = null
    }
    next();
}

const userExtractor = async (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        const token = authorization.substring(7)
        const decodedToken = jwt.verify(token, config.SECRET)

        if (!decodedToken.id) {     // THIS IS THE ID OF THE USER
            request.user = null;
            next();
        }
    
        const user = await User.findById(decodedToken.id)
        request.user = user;
    }
    else {
        request.user = null
    }
    next();
}

module.exports = {
    errorHandler,
    requestLogger,
    tokenExtractor,
    userExtractor
}