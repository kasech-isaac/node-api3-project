const userDb= require("../users/userDb")

function validateUserId(){
    return (req, res, next)=>{
        userDb.getById(req.params.id)
        .then((user)=>{
            if(user){
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
    if(!req.body){
        res.status(400).json({message: "missing post data"}) 
    }else if(!req.body.name){
     res.status(400).json({message: "missing required name field"})

    }else{
        next()
    }
}

function validatePost(){
    if (!req.bod){
        res.status(400).json({message: "missing post data"})

    }else if(!req.body.text){
        res.status(400).json({message: "missing required text field"})
    }else{
        next()
    }
}




module.exports={
    validateUser,
    validateUserId,
    validatePost
}