var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = {
	'article-one':{
		title:'Article One',
		heading:'Article One',
		date:'12/6/17',
		content:'<p>My first article<p>'
	}

};


function createTemplate(data)
{
	//var title = data.title;
	//console.log(title);
	var heading = data.heading;
	var date = data.date;
	var content = data.content;

	var htmlTemplate =
	`<html>
		<head>
			<title>Article One</title>
		</head>
		<body>
			<div>
				<h3>${heading}</h3>
			</div>
			<div>
				${date}
			</div>
			<div>
				${content}
			</div>
		</body>
	</html>`;

	return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/:articleName', function(req,res){
	var articleName = req.params.articleName;
	res.send(createTemplate(articles[articleName]));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
