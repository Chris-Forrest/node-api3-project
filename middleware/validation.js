const users = require("../users/userDb");

function checkUserID(){
    return (req, res, next ) => {
        users.getById(req.params.id)
            .then((user) => {
                if(user){
                    req.user = user
                    next()
                }else{
                    res.status(404).json({ message: "User not found"})
                }
            })
        .catch(next)
    }
}

function checkUser(){
    return(req, res, next) => {
        if(!req.body.name){
            return res.status(400).json({ message: "Missing required name field."});
        }
        if(!Object.keys(req.body).length) {
            return res.status(400).json({ message: "Missing user data."})
        }
        next();
    }
}

function checkPost() {
    return(req, res, next) => {
        if(!Object.keys(req.body).length){
            return res.status(400).json({ message: "Missing post data."})
        }
        if(!req.body.text){
            return res.status(400).json({ message: "Missing required text field"})
        }
        next();
    }
}

module.exports = {
    checkUserID,
    checkUser,
    checkPost
}