const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

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


const handleEvent = (type, data) => {
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
};

app.get('/posts', (req,res) => {
  res.send(posts);
});


app.post('/events', (req,res) =>{
  console.log('Received Event:', req.body.type );

  const { type, data } = req.body;

  handleEvent(type,data);
  
  res.send({});
});

app.listen(4002 , async () => {
  console.log('Listening on port 4002');

	try {
		const res = await axios.get('http://localhost:4005/events');

		for(let event of res.data) {
			console.log('Processing event: ', event.type);

			handleEvent(event.type, event.data);
		}
	} catch (error) {
    console.log(error.message);
  }
})