var bodyPaser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://chamika:123qwe@cluster0-yxcdg.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });

var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);


//var data = [{ item: 'get milk' }, { item: 'walk dog' }, { item: 'some coding' }]
var urlEncodedParser = bodyPaser.urlencoded({ extended: false });

module.exports = function (app) {
    app.get('/todo', function (req, res) {
        //get data from mongoDB
        Todo.find({}, function (err, data) {
            if (err) throw err;
            res.render('todo', { todos: data });
        });

    });
    app.post('/todo', urlEncodedParser, function (req, res) {
        var newTodo = Todo(req.body).save(function(err,data){
            if(err) throw err;
            res.json(data);
        });
 
    });

    app.delete('/todo/:item', function (req, res) {

        //delete from db
        Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err,data){
            if(err) throw err;
            res.json(data);
        });
    });
}