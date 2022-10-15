
class AuthorizeNotFoundException {
    constructor(){
        this.message = 'Authentication is required'
        this.code = 403
    }
}

class PasswordIncorrectException{
    cosntructor(){
        this.message = 'credentials is incorrect'
        this.code = 501
    }
}

export {AuthorizeNotFoundException, PasswordIncorrectException}