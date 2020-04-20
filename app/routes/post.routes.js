module.exports = app =>{
    const posts = require('../controllers/post.controller');
    
    let router = require('express').Router();
    
    //create new post
    router.post('/', posts.create);
    
    //*select posts
    router.get('/', posts.findAll);
    
    //* Get By Published
    router.get('/published', posts.findAllPublished);
    
    //* select By Id
    router.get('/:id', posts.findOne);

    //*update Post
    router.put('/:id', posts.update);

    //*delete by id
    router.delete('/:id', posts.delete);
    
    //*delete all
    router.delete('/', posts.deleteAll);

    
    app.use('/api/posts', router);
}