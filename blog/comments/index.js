const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments' , (req,res) => { 
	
	//if the array item is undefined send an empty array	
	res.status(201).send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments' , (req,res) => { 
	const commentId = randomBytes(4).toString('hex');
	const { content } = req.body;

	//if the array item is undefined give as an empty array
	const comments = commentsByPostId[req.params.id] || [];
	
	comments.push( {id:commentId ,  content});
	commentsByPostId[req.params.id] = comments;

	res.status(201).send(comments);
});


app.listen(4001, ()=> {
	console.log('Running on 4001');
})