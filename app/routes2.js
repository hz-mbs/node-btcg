var request = require("request");

var mysql      = require('mysql');
var http = require('http');
var options = {
		  host: '10.212.2.53',
		  port: '8080',
		  json:true,
		  path: '/tcgdetections'
		};


var connection = mysql.createConnection({
  host     : '10.212.2.143',
  port		: '36053',
  user     : 'mwsadmin',
  password : 'ubi6La5z',
  database : 'fraud_605_3'
});

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
	 connection.query('SELECT * from daily_fraud_summary_report limit 100', function(err, rows, fields) {
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
	
app.get('/api/tcgdetections', function(req, res) {
	 console.log('app.get(/api/tcgdetections:');
	 
	 var url = "http://10.212.2.53:8080/tcgdetections" ;

	request({
	    url: url,
	    json: true
	}, function (error, response, body) {

	    if (!error && response.statusCode === 200) {
	        console.log(body) // Print the json response
	        res.json(body);
	    }
	});

	 


	 // frontend routes =========================================================
	 app.get('*', function(req, res) {
		 console.log('app.get(\'*\', function(req, res):');
	  res.sendfile('./public/login.html');
	 });
	}
