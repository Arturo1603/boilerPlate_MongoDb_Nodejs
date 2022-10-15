class UserNotFoundException{
    constructor(){
        this.message = 'User not Found'
        this.code= 404
    }
}
class UserDisabledException{
    cosntructor(){
        this.message = 'User disabled'
        this.code = 500
    }
}

export {UserNotFoundException, UserDisabledException}