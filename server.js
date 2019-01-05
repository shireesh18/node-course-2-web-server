const express = require('express');
const handlebars = require('hbs');
const fs = require('fs');
var app = express();


handlebars.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err)=>{
    if(err){
      console.log('unable to append to server. log.');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'Maintenance Page'
//   });
// });

handlebars.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});

handlebars.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  //res.send('<h1>hello express!</h1>');
  // res.send({
  //   name : 'Shireesh',
  //   age : 38,
  //   likes : [
  //     'watching cricket',
  //     'movies',
  //     'travel'
  //   ]
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeText : 'Welcome to my page, wish you a very happy new year'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    error : 'unable to fulfill the request',
    code : '500'
  });
});
app.listen(3000, ()=>{
  console.log('Server is up on port 3000');
});
