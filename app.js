var express = require('express');

var app = express();

// set up handlebars view engine
var handlebars = require('express-handlebars').create({
    defaultLayout:'main'
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));


// middleware to add list data to context (if you want your story info in a partial)
app.use(function(req, res, next){
	if(!res.locals.partials) res.locals.partials = {};
  // 	res.locals.partials.story = story;
 	next();
});


app.get('/', function(req, res) {
  res.render('home');
});

let moreInfo = ['Horror | Fantasy', 'Inspired by Monsters, Inc. but with a darker ending', 'Original story by Yoselin']

app.get('/about', function(req,res){
	res.render('about', {
    moreInfo: moreInfo
  });
});


let story = [{'page': 1, 'image': '/img/cale.jpg', 'text': 'Everynight at 10:30PM Cale would cover his ears and mouth.'}, {'page': 2, 'image': '/img/parentsleeping.jpg', 'text': 'His parents would be asleep in their room and he was too scared to make any noise.'},
{'page': 3, 'image': '/img/house.jpg', 'text': 'This had begun a week after they moved into their new house.'}, {'page': 4, 'image': '/img/thecloset.jpg', 'text': 'There were noises coming from inside the closet.'},
{'page': 5, 'image': '/img/closet.gif', 'text': 'Nails scratching the door, whimpers of an animal, someone laughing, the worst was when he heard a woman humming.', 'audio': ' '}, {'page': 6, 'image': '/img/thecloset.jpg', 'text': 'This would last for a few minutes, stop and then continue again. He tried to stay strong.'},
{'page': 7, 'image': '/img/doorsopen.jpg', 'text': 'Until the night the closet door opened.'}]

app.get('/page/:number', function(req, res) {
 let pageIndex = parseInt(req.params.number)
  console.log('page index', pageIndex)
  let nextPage = pageIndex + 1< story.length ? pageIndex + 1 : false
  console.log('next page: ', nextPage)
  let prevPage = pageIndex - 1< story.length ? pageIndex - 1 : false
  res.render('page', {
    page: story[pageIndex],
    prevPage: prevPage,
    nextPage: nextPage,
  })

})


// 404 catch-all handler (middleware)
app.use(function(req, res, next, prev){
	res.status(404);
	res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next, prev){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.' );
});
