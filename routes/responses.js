function errorResponse(err, response) {
    if (err === undefined) {
        err = new Error();
    }
    
    if (typeof err == "string") {
        err = new Error(err);
    }
    
    if (err["httpStatus"] === undefined) {
        err["httpStatus"] = 500;
    }

    if(err["httpResponse"] === undefined) {
        err["httpResponse"] = "500 Internal Server Error";
    }

    if (err["friendlyName"] === undefined) {
        if (err.name !== undefined && err.message !== undefined) {
            err["friendlyName"] = err.name + ": "+ err.message;
        } else {
            err["friendlyName"] = "Internal Server Error";
        }
    }

    response.writeHead(err["httpStatus"], {"Content-Type": "text/plain; charset=utf-8"});
    response.write(err["httpResponse"] + "\n");
    response.write(err['friendlyName'] + "\n");
    response.end();

    logger.error("HTTP error response sent", err)
}
exports.errorResponse = errorResponse;
