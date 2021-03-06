queue()
    .defer(d3.json, "/api/listcallsnodup")
    .await(makeGraphs);

function makeGraphs(error, apiData) {
	
//Start Transformations
	var dataSet = apiData;
	console.log('callsNodup.js:makeGraphs():apiData:', apiData.length);
	console.log('makeGraphs():dataSet:', dataSet.length);
//	var dateFormat = d3.time.format("%Y-%m-%d %H:%M:%S"); //"2015-11-27 06:53:15"
	var dateFormat = d3.time.format("%Y-%m-%d"); //"2015-11-27"
	dataSet.forEach(function(d) {
		d. call_date = dateFormat.parse(d.call_date);
		d. call_date.setDate(1);
	});

	//Create a Crossfilter instance
	var ndx = crossfilter(dataSet);

	//Define Dimensions
	var call_date = ndx.dimension(function(d) { return d.call_date; });



	//Calculate metrics
	var projectsByDate = call_date.group(); 
//	var projectsByGrade = gradeLevel.group(); 
//	var projectsByResourceType = resourceType.group();
//	var projectsByFundingStatus = fundingStatus.group();
//	var projectsByPovertyLevel = povertyLevel.group();
//	var stateGroup = state.group();

	var all = ndx.groupAll();

	//Calculate Groups
	//total loss
//	var netTotalprocessedTime = ndx.groupAll().reduceSum(function(d) {return d.processedTime;});
	
	//Define threshold values for data
	var minDate = call_date.bottom(1)[0]. call_date;
	var maxDate = call_date.top(1)[0]. call_date;

console.log(minDate);
console.log(maxDate);

    //Charts
//	var dateChart = dc.lineChart("#date-chart");
//	var gradeLevelChart = dc.rowChart("#grade-chart");
//	var resourceTypeChart = dc.rowChart("#resource-chart");
//	var fundingStatusChart = dc.pieChart("#funding-chart");
//	var povertyLevelChart = dc.rowChart("#poverty-chart");
//	var totalProjects = dc.numberDisplay("#total-projects");
//	var netDonations = dc.numberDisplay("#net-donations");
//	var stateDonations = dc.barChart("#state-donations");

//	var totalRecords = dc.numberDisplay("#total-records");
	

//	var totalprocessedTime = dc.numberDisplay("#total-processedTime");
	var dataTable = dc.dataTable("#callsNodup-chart");


	dataTable
	.width(960)
	.height(800)
	.dimension(call_date)
	.size(20)
	.columns([
	          'call_id',
	          'call_date'
//	          'type',
//	          'callTime',
//	          'duration',
//	          'sMsisdn',
//	          'oMsisdn',
//	          'processedTime',
//	          'calls_no_dup.call_type'
    ])
    .sortBy(function(d) {
        return d.call_date;
    })
    .order(d3.ascending)
//	.group(all)
	.group(function(d) { return "Calls-nodup"
     })
	;
	
    dc.renderAll();

};