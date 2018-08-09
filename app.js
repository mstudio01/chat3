var express = require("express"),
bodyParser = require("body-parser"),
path = require("path"),
sessions = require('express-session'),
expressValidator = require('express-validator'),
config = require('./config'),
    indexRouter = require('./routes/index'),
	adminRoutes = require('./routes/admin'),
managerRoutes = require('./routes/manager'),
app = module.exports = express();
var server = require('http').createServer(app);
// var io = require('socket.io').listen(server);
// var sockets = require('./sockets');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(sessions({
    cookieName: 'session',
	secret:'$%2878asd8783yuh3b129x831726375r367*&^%$#',
	resave:false,
	saveUninitialized:true,
	cookie:{maxAge:config.sessionTime},
	rolling: true
}));
//Global Vars
app.use(function(req,res,next){
	res.locals.errors = null
	next();
});
app.use(expressValidator({
	errorFormatter: function(param,msg,value){
		var namespace = param.split('.')
		, root = namespace.shift()
		, formParam = root;

		while(namespace.length){
			formParam+= '['+namespace.shift()+']';
		}
		return {
			param : formParam,
			msg	  : msg,
			value : value
		}

	}
}));

app.use('/', indexRouter);
app.use('/admin', adminRoutes);
app.use('/manager',managerRoutes);

app.use(function(req, res) {
   res.status(404).sendFile(path.resolve( './public', '404.html'));
});

// sockets(io);

server.listen(config.port,function(){
	console.log('server started on port 3000....');
});
