var config = require('./config');
var db = {};
var connection = require("mysql").createConnection({
	host:config.host,
	user:config.db.username,
	password:config.db.pwd,
	database:config.db.dbname
});

db.getConnection = function() {
    connection.connect(function(error){
    	if(error){
    		console.log('Error chat')
    	}else{
    		console.log("connected");
    	}
    });
		return connection;
};

module.exports = db;
