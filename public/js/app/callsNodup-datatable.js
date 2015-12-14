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

//	var totalprocessedTime  = ndx.dimension(function(d) { return d.processedTime; });



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

    //Then bind the jquery data table:
	var datatable = $("#callsNodup-datatable").dataTable({
        "bPaginate": true,
        "bLengthChange": false,
        "bFilter": true,
        "bSort": true,
        "bInfo": true,
        "bAutoWidth": true,
        "bDeferRender": true,
        "aaData": call_date.top(Infinity),
        "bDestroy": true,
        "aoColumns": [
            { "mData": "call_id", "sDefaultContent": ""},
            { "mData": "call_date", "sDefaultContent": " " }
        ]
    });	
	
    dc.renderAll();

};