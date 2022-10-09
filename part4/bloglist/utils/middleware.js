const logger = require("./logger");

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

module.exports = {
    errorHandler,
    requestLogger,
    tokenExtractor
}