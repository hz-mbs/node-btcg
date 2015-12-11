//var Subjects = require('./models/SubjectViews');
console.log('route.js');
var request = require("request");

var mysql      = require('mysql');
var http = require('http');
var options = {
		  host: '10.212.2.53',
		  port: '8080',
		  json:true,
		  path: '/tcgdetections'
		};

callback = function(response) {
	  var str = '';

	  //another chunk of data has been recieved, so append it to `str`
	  response.on('data', function (chunk) {
	    str += chunk;
	  });

	  //the whole response has been recieved, so we just print it out here
	  response.on('end', function () {
	    console.log('str=', str);
	  });
	}


var connection = mysql.createConnection({
  host     : '10.212.2.143',
  port		: '36053',
  user     : 'mwsadmin',
  password : 'ubi6La5z',
  database : 'fraud_605_3'
});


module.exports = function(app) {
	console.log('module.exports=function(app):');
	// server routes ===========================================================
	// handle things like api calls
	// authentication routes	
	// sample api route
 app.get('/api/data', function(req, res) {
//	 console.log('function(req, res):');
//	 
//	 var url = "http://10.212.2.53:8080/tcgdetections" ;
//
//	request({
//	    url: url,
//	    json: true
//	}, function (error, response, body) {
//
//	    if (!error && response.statusCode === 200) {
//	        console.log(body) // Print the json response
//	        res.json(body);
//	    }
//	});
	
//	 http.request(options, callback).end();
//	 console.log('app.get:callback=', callback);
//	 res.json(callback);
	 
	 connection.connect(function(err) {
		    if (err) {
		    console.error('error connecting: ' + err.stack);
		    return;
		}});
	 
	 console.log('query database:');
	 connection.query('SELECT * from daily_fraud_summary_report limit 1', function(err, rows, fields) {
	   if (!err){
	     console.log('The solution is: ', rows.length);
	     console.log('The solution is: ', rows);
	     res.json(rows);
//	     var data;
//		 jQuery.getJSON(apiData, function(data){
//			 console.log('dataSet.length:', data.length);
//		 });
//
//	     res.json(data);
	 	}
	   else {
	     console.log('Error while performing Query.');
	     res.send(err);
	   }
	 });
	 connection.end();	 
	
// app.get('/api/tcgdetections', function(req, res) {
// 	 console.log('app.get(/api/tcgdetections:');
//	 
//	 var url = "http://10.212.2.53:8080/tcgdetections" ;
//
//	request({
//	    url: url,
//	    json: true
//	}, function (error, response, body) {
//
//	    if (!error && response.statusCode === 200) {
//	        console.log(body) // Print the json response
//	        res.json(body);
//	    }
//	});
	
	 console.log('end function(req, res):');
//	 return;
	 // if there is an error retrieving, send the error. 
       // nothing after res.send(err) will execute
//   if (err) 
//   res.send(err);
//    res.json(subjectDetails); // return all nerds in JSON format
//  });
 });

 



 // frontend routes =========================================================
 app.get('*', function(req, res) {
//	 console.log('app.get(\'*\', function(req, res):');
  res.sendfile('./public/login.html');
 });
}