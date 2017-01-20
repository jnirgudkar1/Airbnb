var MongoClient = require('mongodb').MongoClient;
var db;
var connected = false;
var options = {
		server:{
			poolsize : 1000
		}
}
/**
 * Connects to the MongoDB Database with the provided URL
 */
exports.connect = function(url, callback){
    MongoClient.connect(url, function(err, _db){
      if (err) { throw new Error('Could not connect: '+err); }
      db = _db;
      connected = true;
      //console.log(connected +" is connected?");
      callback(db);
    });
};



exports.getConnection = function(url, callback){
	if(db){
		console.log("we have connections. dont get any more");
		callback(db);
	}
	else{
		MongoClient.connect(url,options, function(err, _db){
		  if (err) { throw new Error('Could not connect: '+err); }
		   	  db = _db;
		      connected = true;
		      console.log(connected +" is connected?");
		      callback(db);
		  });
	}
};


/**
 * Returns the collection on the selected database
 */
exports.collection = function(name){
    if (!connected) {
      throw new Error('Must connect to Mongo before calling "collection"');
    } 
    return db.collection(name);
  
};