queue()
    .defer(d3.json, "/api/tcgDetections")
    .await(makeGraphs);

function makeGraphs(error, apiData) {
	
//Start Transformations
	var dataSet = apiData;
	console.log('makeGraphs():apiData:', apiData.length);
	console.log('makeGraphs():dataSet:', dataSet.length);
	var dateFormat = d3.time.format("%Y-%m-%d %H:%M:%S.%L"); //"2015-06-15 14:22:20.0"
	dataSet.forEach(function(d) {
		d. callTime = dateFormat.parse(d.callTime);
		d. callTime.setDate(1);
		d.duration = +d.duration;
	});

	//Create a Crossfilter instance
	var ndx = crossfilter(dataSet);

	//Define Dimensions
	var callTime = ndx.dimension(function(d) { return d.callTime; });
//	var gradeLevel = ndx.dimension(function(d) { return d.grade_level; });
//	var resourceType = ndx.dimension(function(d) { return d.resource_type; });
//	var fundingStatus = ndx.dimension(function(d) { return d.funding_status; });
//	var povertyLevel = ndx.dimension(function(d) { return d.poverty_level; });
//	var state = ndx.dimension(function(d) { return d.school_state; });
//	var totalDonations  = ndx.dimension(function(d) { return d.total_donations; });

	var totalprocessedTime  = ndx.dimension(function(d) { return d.processedTime; });



	//Calculate metrics
	var projectsByDate = callTime.group(); 
//	var projectsByGrade = gradeLevel.group(); 
//	var projectsByResourceType = resourceType.group();
//	var projectsByFundingStatus = fundingStatus.group();
//	var projectsByPovertyLevel = povertyLevel.group();
//	var stateGroup = state.group();

	var all = ndx.groupAll();

	//Calculate Groups
//	var totalDonationsState = state.group().reduceSum(function(d) {
//		return d.total_donations;
//	});
//
//	var totalDonationsGrade = gradeLevel.group().reduceSum(function(d) {
//		return d.grade_level;
//	});
//
//	var totalDonationsFundingStatus = fundingStatus.group().reduceSum(function(d) {
//		return d.funding_status;
//	});
//
//
//	var netTotalDonations = ndx.groupAll().reduceSum(function(d) {return d.total_donations;});
	//total loss
	var netTotalprocessedTime = ndx.groupAll().reduceSum(function(d) {return d.processedTime;});
	
	//Define threshold values for data
	var minDate = callTime.bottom(1)[0]. callTime;
	var maxDate = callTime.top(1)[0]. callTime;

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
	var dataTable = dc.dataTable("#tcgdetections-chart");


//  selectField = dc.selectMenu('#menuselect')
//        .dimension(state)
//        .group(stateGroup); 
//
//       dc.dataCount("#row-selection")
//        .dimension(ndx)
//        .group(all);
//
//
//	totalProjects
//		.formatNumber(d3.format("d"))
//		.valueAccessor(function(d){return d; })
//		.group(all);
//
//	netDonations
//		.formatNumber(d3.format("d"))
//		.valueAccessor(function(d){return d; })
//		.group(netTotalDonations)
//		.formatNumber(d3.format(".3s"));
//
//	dateChart
//		//.width(600)
//		.height(220)
//		.margins({top: 10, right: 50, bottom: 30, left: 50})
//		.dimension(trafficDate)
//		.group(projectsByDate)
//		.renderArea(true)
//		.transitionDuration(500)
//		.x(d3.time.scale().domain([minDate, maxDate]))
//		.elasticY(true)
//		.renderHorizontalGridLines(true)
//    	.renderVerticalGridLines(true)
//		.xAxisLabel("Year")
//		.yAxis().ticks(6);
//
//	resourceTypeChart
//        //.width(300)
//        .height(220)
//        .dimension(resourceType)
//        .group(projectsByResourceType)
//        .elasticX(true)
//        .xAxis().ticks(5);
//
//	povertyLevelChart
//		//.width(300)
//		.height(220)
//        .dimension(povertyLevel)
//        .group(projectsByPovertyLevel)
//        .xAxis().ticks(4);
//
//	gradeLevelChart
//		//.width(300)
//		.height(220)
//        .dimension(gradeLevel)
//        .group(projectsByGrade)
//        .xAxis().ticks(4);
//
//  
//          fundingStatusChart
//            .height(220)
//            //.width(350)
//            .radius(90)
//            .innerRadius(40)
//            .transitionDuration(1000)
//            .dimension(fundingStatus)
//            .group(projectsByFundingStatus);
//
//
//    stateDonations
//    	//.width(800)
//        .height(220)
//        .transitionDuration(1000)
//        .dimension(state)
//        .group(totalDonationsState)
//        .margins({top: 10, right: 50, bottom: 30, left: 50})
//        .centerBar(false)
//        .gap(5)
//        .elasticY(true)
//        .x(d3.scale.ordinal().domain(state))
//        .xUnits(dc.units.ordinal)
//        .renderHorizontalGridLines(true)
//        .renderVerticalGridLines(true)
//        .ordering(function(d){return d.value;})
//        .yAxis().tickFormat(d3.format("s"));
//
//	totalRecords
//	.formatNumber(d3.format("d"))
//	.valueAccessor(function(d){return d; })
//	.group(all);

//	totalProcessedTime
//	.formatNumber(d3.format("d"))
//	.valueAccessor(function(d){return d; })
//	.group(all);

	dataTable
	.width(960)
	.height(800)
	.dimension(callTime)
	.size(20)
	.columns([
	          'id',
	          'source',
	          'type',
	          'callTime',
	          'duration',
	          'sMsisdn',
	          'oMsisdn',
	          'processedTime',
	          'sourceFileName'
//	    function(d) {
//	              return d.id;
//	          },
//        function(d) {
//            return d.traffic_date;
//        },
//        function(d) {
//            return d.msisdn;
//        },
//
//        function(d) {
//            return d.possible_loss;
//        },
//        function(d) {
//            return d.illegal_odds_24_hours;
//        }
    ])
    .sortBy(function(d) {
        return d.callTime;
    })
    .order(d3.ascending)
//	.group(all)
	.group(function(d) { return "Calls Nodup"
     })
	;
	
    dc.renderAll();

};