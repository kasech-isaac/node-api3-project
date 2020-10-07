const express = require('express');
const db = require("./userDb")
const post_db = require("../posts/postDb")
const { validateUser,validateUserId,validatePost}=require("../middleware/userMidW")

const router = express.Router();

router.post('/', validateUser,(req, res) => {
  // do your magic!
  db.insert(req.body.id)
  .then(newUser=>{
    if (newUser){
      res.status(201).json(newUser)
    }
  })
  .catch((error) => {
    next(error)
  })
});

router.post('/:id/posts',validatePost, validateUserId,(req, res) => {
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

router.get('/:id',validateUserId, (req, res) => {
  // do your magic!
  db.getById(req.params.id)
  .then(user=>{
    res.status(200).json(user)
  })
  .catch((error) => {
    next(error)
  })
});

router.get('/:id/posts',validateUserId, (req, res) => {
  // do your magic!
db.getUserPosts(req.params.id)
.then(post=>{
 
    return res.status(200).json(post)
  
})
.catch((error) => {
  next(error)
})

});

router.delete('/:id', validateUserId,(req, res) => {
  // do your magic!
  db.remove(req.prames.id)
.then ((removed)=>{
  if (removed){
   return   res.status(200).json({message: "deleted"})
  }
})
.catch((error) => {
  next(error)
})

});

router.put('/:id',validateUserId,validateUser, (req, res) => {
  // do your magic!
  db.update(req.params.id, req.body)
  .then(update=>{
    
      return res.status(200).json(update)
    
  })
  .catch((error) => {
    next(error)
  })

});

module.exports = router;
