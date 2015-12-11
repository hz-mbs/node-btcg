var mysql      = require('mysql');
 var connection = mysql.createConnection({
   host     : '10.214.3.16',
   port		: '36053',
   user     : 'mwsadmin',
   password : 'ubi6La5z',
   database : 'fraud_605_3'
 });
 
 connection.connect();
 
 connection.query('SELECT * from daily_fraud_summary_report limit 1', function(err, rows, fields) {
   if (!err){
	 console.log('The fileds: ', fields);
     console.log('The solution is: ', rows);
 	}
   else
     console.log('Error while performing Query.');
 });
 
 connection.end();