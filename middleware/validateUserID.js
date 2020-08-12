const users = require("../users/userDb");

function validateUserID(){
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