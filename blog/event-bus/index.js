const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events', (req,res)=> {
  const event = req.body;
	console.log('Event emmited');
	
  //We must add the catch because from Node 15+ it returning Error and not Warning and our app will crash
  //Unhandled Promise
  axios.post('http://localhost:4000/events', event ).catch((err) => {
    console.log('POSTS : '+err.message);
  });
  axios.post('http://localhost:4001/events', event ).catch((err) => {
    console.log('COMMENTS : '+err.message);
  });
  axios.post('http://localhost:4002/events', event ).catch((err) => {
    console.log('QUERY SERVICE : '+err.message);
  });

  res.send({ status: 'OK' });
})

app.listen(4005, () => {
  console.log ('Listening on port 4005');
});