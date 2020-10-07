const express = require('express');
const db = require("./userDb")
const post_db = require("../posts/postDb")
const { validateUser,validateUserId,validatePost}=require("../middleware/userMidW")

const router = express.Router();

router.post('/', validateUser,(req, res) => {
  // do your magic!
  db.insert(req.body)
  .then((newUser)=>{
    res.status(201).json(newUser)
    
  })
  .catch((error) => {
    next(error)
  })
});

router.post('/:id/posts',validatePost(), validateUserId(),(req, res) => {
    // do your magic!
    post_db.insert(req.params.id, req.body)
  .then(post=>{
    res.status(200).json(post)
   
  })
  .catch((error) => {
    next(error)
  })

});

router.get('/', (req, res) => {
  // do your magic!
  db.get()
  .then(user=>{
 res.status(200).json(user)  
  })
  .catch((error) => {
    next(error)
  })
});

router.get('/:id',validateUserId(), (req, res) => {
  // do your magic!
  // user is attached to the req in validateUserId
    res.status(200).json(req.user)
 
});

router.get('/:id/posts',validateUserId(), (req, res) => {
  // do your magic!
db.getUserPosts(req.params.id)
.then(post=>{
 
    return res.status(200).json(post)
  
})
.catch((error) => {
  next(error)
})

});

router.delete('/:id',(req, res) => {
  // do your magic!
  db.remove(req.prames.id)
.then ((removed)=>{
  if (removed > 0){
   res.status(200).json({message: "user has been deleted"})
  }else{
    res.status(404).json({
      message: "The user could not be found",
    })
  }
})
.catch((error) => {
  next(error)
})

});

router.put('/:id',validateUser(), validateUserId(),(req, res) => {
  // do your magic!
  db.update(req.params.id, req.body)
  .then((update)=>{
    if(update){
      res.status(200).json(update)
    }else {
      res.status(404).json({
        message: "The user could not be found",
      })
    }
  })
  .catch((error) => {
    next(error)
  })

});

module.exports = router;
