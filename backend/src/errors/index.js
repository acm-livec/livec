const HTTP_STATUS = require('@utils/constants/http-codes.js');


class AppError extends Error {
    constructor({ message, statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR, publicMessage = null, errorCode = 'ERROR' }) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.publicMessage = publicMessage || message;
        this.errorCode = errorCode
        Error.captureStackTrace(this, this.constructor);
    }
}

class PasswordMismatchError extends AppError {
    constructor() {
        super({
            message: "err.password.mismatch", 
            statusCode: HTTP_STATUS.UNAUTHORIZED,
            publicMessage: "Incorrect username or password",
            errorCode: "PASSWORD_MISSMATCH"
        });
    }
}

class UserNotFoundError extends AppError {
    constructor() {
        super({
            message: "err.user.not_found", 
            statusCode: HTTP_STATUS.NOT_FOUND,
            publicMessage: "Incorrect username or password",
            errorCode: "USER_NOT_FOUND"
        });
    }
}

class NoUserWithIdError extends AppError {
    constructor() {
        super({
            message: "err.user_id.not_found",
            statusCode: HTTP_STATUS.NOT_FOUND,
            publicMessage: "Could not get user by id",
            errorCode: "NO_USER_WITH_ID"
        });
    }
}


class NoAssociateEditorsFoundError extends AppError {
    constructor() {
        super({
            message: "err.aes.not_found",
            statusCode: HTTP_STATUS.NOT_FOUND,
            publicMessage: "No Associate Editors found to review suggestion",
            errorCode: "NO_ASSOCIATE_EDITORS_FOUND"
        });
    }
}

class UserAlreadyExistsError extends AppError {
    constructor() {
        super({
            message: "err.user.already_exists", 
            statusCode: HTTP_STATUS.CONFLICT,
            publicMessage: "An account with that email already exists",
            errorCode: "USER_ALREADY_EXISTS"
        });
    }
}

class SuggestionNotFoundError extends AppError {
    constructor() {
        super({
            message: "err.suggestion.not_found",
            statusCode: HTTP_STATUS.NOT_FOUND,
            publicMessage: "Can not update suggestion at this time",
            errorCode: "SUGGESTION_NOT_FOUND"
        });
    }
}

// Export all at once
module.exports = {
    AppError,
    SuggestionNotFoundError,
    NoAssociateEditorsFoundError,
    NoUserWithIdError,
    PasswordMismatchError,
    UserNotFoundError,
    UserAlreadyExistsError
};