const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors);

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
  // const { type, data } = req.body;

  // if(type === 'PostCreated') {
  //   const { id, title } = data;

  //   posts[id] = { id , title, comments: [] };
  // }

  // if(type === 'CommentCreated')  {    
  //   const { id, content, postId } = data;

  //   const post = posts[postId];
  //   post.comments.push({
  //     id, content
  //   });    
  // }

  // console.log(posts);
  console.log('event');
  
  res.send({});
});

app.listen(4002 , () => {
  console.log('Listening on port 4002');
})