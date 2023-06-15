const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};
//POST WILL LIKE THIS
//    posts === {
//      '2d25223d': {
//        id: '2d25223d',
//        title: 'Post Title',
//        comments: [
//          { id: '4h78wfh' , content: 'comment' }
//        ]
//      },
//      ...
//    }

app.get('/posts', (req,res) => {
  res.send(posts);
});

app.post('/events', (req,res) =>{
  console.log('Received Event:', req.body.type );

  const { type, data } = req.body;

  if(type === 'PostCreated') {
    const { id, title } = data;

    posts[id] = { id , title, comments: [] };
  }

  if(type === 'CommentCreated')  {    
    const { id, content, postId , status } = data;

    const post = posts[postId];
    post.comments.push({
      id, content, status
    });    
  }

  if(type === 'CommentUpdated') {
    const { id, content, postId, status } = data;
    const post = posts[postId];

    const comment = post.comments.find( comment => {
      return comment.id === id;
    })

    comment.content = content;
    comment.status = status;
  }

  console.log(posts);  
  
  res.send({});
});

app.listen(4002 , () => {
  console.log('Listening on port 4002');
})