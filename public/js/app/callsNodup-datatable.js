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
	var callDate = ndx.dimension(function(d) { return d.call_date; });

//	var totalprocessedTime  = ndx.dimension(function(d) { return d.processedTime; });



	//Calculate metrics
	var projectsByDate = callDate.group(); 
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
	var minDate = callDate.bottom(1)[0]. callDate;
	var maxDate = callDate.top(1)[0]. callDate;

	console.log(minDate);
	console.log(maxDate);

    //Then bind the jquery data table:
	var datatable = $("#callsNodup-datatable").dataTable({
        "bPaginate": true,
        "bLengthChange": true,
        "bFilter": true,
        "bSort": true,
        "bInfo": true,
        "bAutoWidth": true,
        "bDeferRender": true,
        "aaData": callDate.top(Infinity),
        "bDestroy": true,
//        "data": dataSet,
/*        columns: [
                  { title: "call_id" },
                  { title: "call_date" },
                  { title: "Office" },
                  { title: "Extn." },
                  { title: "Start date" },
                  { title: "Salary" }
              ]*/
        "aoColumns": [
            { "mData": "call_id", "sDefaultContent": "call_id"}
            ,{ "mData": "call_date", "sDefaultContent": "call_date " }
            ,{ "mData": "s_imsi", "sDefaultContent": "s_imsi"}
            ,{ "mData": "s_imei", "sDefaultContent": "s_imei"}
            ,{ "mData": "duration", "sDefaultContent": "duration"}
            /*             
            { "mData": "call_id", "sDefaultContent": ""},
            { "mData": "call_id", "sDefaultContent": ""},
            { "mData": "call_id", "sDefaultContent": ""},
            { "mData": "call_id", "sDefaultContent": ""},
            { "mData": "call_id", "sDefaultContent": ""},
            { "mData": "call_id", "sDefaultContent": ""},
            { "mData": "call_id", "sDefaultContent": ""},
            { "mData": "call_id", "sDefaultContent": ""},
            { "mData": "call_id", "sDefaultContent": ""},
            { "mData": "call_id", "sDefaultContent": ""},
            { "mData": "call_id", "sDefaultContent": ""},
            { "mData": "call_id", "sDefaultContent": ""},
*/           

        ]
    
//        "columnDefs": [ {
//            "targets": [ 0 ],
//            "data":	call_id,
//            "defaultContent": "Click to edit",
//            "visible": true,
//            "searchable": true
//          } ]    
//    "columns": [ {
//        "targets": [ 0 ],
//        "data":	callDate,
//        "defaultContent": "Click to edit",
//        "visible": true,
//        "searchable": true
//      } ]    
	});	
	
	
    dc.renderAll();

};

//Finally, hook it into dc.js if you want the table to reflect the filters of your other charts:
function RefreshTable() {
    dc.events.trigger(function () {
        alldata = callDate.top(Infinity);
        datatable.fnClearTable();
        datatable.fnAddData(alldata);
        datatable.fnDraw();
    });
}

for (var i = 0; i < dc.chartRegistry.list().length; i++) {
    var chartI = dc.chartRegistry.list()[i];
    chartI.on("filtered", RefreshTable);
}