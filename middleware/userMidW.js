const db= require("../users/userDb")

function validateUserId(){
    return (req, res, next)=>{
        db.getById(req.params.id)
        .then((user)=>{
            if(user){
                // attach "user data the request so we could access it inmidw func"
                req.user=user
                next()
            }else{
                res.status(400).json({message: "Invalid user ID"}) 
            }
        })
        .catch((error) => {
			next(error)
		})
    }

}

function validateUser(){
    return (req, res, next)=>{
    if(!req.body){
        res.status(400).json({message: "missing user data"}) 
    }else if(!req.body.name){
     res.status(400).json({message: "missing required name field"})

    }else{
        next()
    }
}
}

function validatePost(){
    return (req, res, next)=>{
    if (!req.bod){
        res.status(400).json({message: "missing post data"})

    }else if(!req.body.text){
        res.status(400).json({message: "missing required text field"})
    }else{
        next()
    }
}
}




module.exports={
    validateUser,
    validateUserId,
    validatePost
}