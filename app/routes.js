//var Subjects = require('./models/SubjectViews');
console.log('route.js');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '10.214.3.16',
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
  // use mongoose to get all nerds in the database
//  Subjects.find({}, {'_id': 0, 'school_state': 1, 'resource_type': 1, 'poverty_level': 1, 'date_posted': 1, 'total_donations': 1, 'funding_status': 1, 'grade_level': 1}, function(err, subjectDetails) {
	 //mysql
	 console.log('function(req, res):');
	 connection.connect(function(err) {
		    if (err) {
		    console.error('error connecting: ' + err.stack);
		    return;
		}});
	 
	 console.log('query database:');
	 connection.query('SELECT * from daily_fraud_summary_report limit 1000', function(err, rows, fields) {
	   if (!err){
//	 	 console.log('The fileds: ', fields);
	     console.log('The solution is: ', rows.length);
	     res.json(rows);
	 	}
	   else {
	     console.log('Error while performing Query.');
	     res.send(err);
	   }
	 });
	 connection.end();	 
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