import axios from 'axios';

const express = require('express');
const cors = require('cors');
const app = express();

app.use(function (req,rex,next){
  res.header('Access-Control-Allow-Origin',"*");
  res.header('Access-Control-Allow-Headers',"Origin, X-Request-With,Content-Type,Accepted");
  next()
})

// app.use(cors({ origin: '*' }));

// app.get('https://en.wikipedia.org/w/api.php?action=parse&page=Bruce%20Lee&format=json', (req, res) => {
//   await axios('https://en.wikipedia.org/w/api.php?action=parse&page=Bruce%20Lee&format=json')
//     .then((response) => {
//       console.log(res.json(response.data));
//     })
//     .catch((err) => {
//       res.send('errr!!!');
//     });
// });

app.listen(3000, function () {
  console.log('CORS-enabled web server listening on port 80');
});
