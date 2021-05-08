const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json()); 


const Post = require('./posts')

app.get('/posts', (req,res) =>{
    let answer = Post.getRandom()
    console.log('running get')
    if (req.query.jsonp) {
        res.send(req.query.jsonp + "(" + JSON.stringify(answer) + ");");
    } else {
        res.json(answer)
    }
})
app.get('/posts/big', (req,res)=>{
    let answer = Post.getBiggest()
    console.log('running get')
    if (req.query.jsonp) {
        res.send(req.query.jsonp + "(" + JSON.stringify(answer) + ");");
    } else {
        res.json(answer)
    }
})
app.post('/posts', (req, res) =>{
    console.log(req.body)
    let {message, sanad} = req.body
    let post = Post.create(message, sanad)
    if(post === undefined){
        res.status(500).send("Server error, post not created");
    } else {
        res.json(post);
    }

})

app.put('/posts/:id', (req,res) => {
    let post = Post.find(req.params.id);
    if (post === undefined) {
        res.status(404).send("No such post with id = " + req.params.id);
    } else {

        let {message, user} = req.body
        post.message = message
        post.sanad.push(user)
        post.size +=1
        Post.update(post)

        res.json(post);
    }
})

app.delete('/posts/:id', (req, res) => {
    Post.delete(req.params.id);
    res.json(true);
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log('Example app listening on port: ' + port);
})