const postDb=require("../posts/postDb")

function validatePostId(){
    postDb.getById(req.params.id)
    .then((post)=>{
        if (post){
            req.post=post
            next()
        }else{
            res.status(400).json({message: "invalid post id"})
        }
    })
}

module.exports = {
    validatePostId,
}