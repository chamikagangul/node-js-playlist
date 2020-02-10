var express = require('express');
var todoController = require('./controllers/todoContoller');

var app = express();

//set setup template engine
app.set('view engine','ejs');


//static files
app.use(express.static('./public'));

//fire controllers
todoController(app);

//listen to the port
app.listen(process.env.PORT);
console.log('Listning to the port: 3000');