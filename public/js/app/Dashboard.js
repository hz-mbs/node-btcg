queue()
    .defer(d3.json, "/api/data")
    .await(makeGraphs);

function makeGraphs(error, apiData) {
	
//Start Transformations
	var dataSet = apiData;
//	var dataSet;
//	 jQuery.getJSON(apiData, function(dataSet){
//		 console.log('dataSet.length:', dataSet.length);
//	 });
	console.log('makeGraphs():apiData:', apiData.length);
	console.log('makeGraphs():dataSet:', dataSet.length);
	var dateFormat = d3.time.format("%Y-%m-%dT%H:%M:%S.%LZ"); //"2015-07-01T04:00:00.000Z"
	dataSet.forEach(function(d) {
		d. traffic_date = dateFormat.parse(d.traffic_date);
		d. traffic_date.setDate(1);
		d.possible_loss = +d.possible_loss;
	});

	//Create a Crossfilter instance
	var ndx = crossfilter(dataSet);

	//Define Dimensions
	var trafficDate = ndx.dimension(function(d) { return d.traffic_date; });
//	var gradeLevel = ndx.dimension(function(d) { return d.grade_level; });
//	var resourceType = ndx.dimension(function(d) { return d.resource_type; });
//	var fundingStatus = ndx.dimension(function(d) { return d.funding_status; });
//	var povertyLevel = ndx.dimension(function(d) { return d.poverty_level; });
//	var state = ndx.dimension(function(d) { return d.school_state; });
//	var totalDonations  = ndx.dimension(function(d) { return d.total_donations; });

	var totalPossibleLoss  = ndx.dimension(function(d) { return d.possible_loss; });



	//Calculate metrics
	var projectsByDate = trafficDate.group(); 
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
	var netTotalPossibleLoss = ndx.groupAll().reduceSum(function(d) {return d.possible_loss;});
	
	//Define threshold values for data
	var minDate = trafficDate.bottom(1)[0]. traffic_date;
	var maxDate = trafficDate.top(1)[0]. traffic_date;

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
	

	var totalPossibleLoss = dc.numberDisplay("#total-possible-loss");
	var dataTable = dc.dataTable("#dailyFraudSummary-chart");


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

	totalPossibleLoss
	.formatNumber(d3.format("d"))
	.valueAccessor(function(d){return d; })
	.group(all);

	dataTable
	.width(960)
	.height(800)
	.dimension(trafficDate)
	.size(20)
	.columns([
	          'id',
	          'traffic_date',
	          'msisdn',
	          'possible_loss',
	          'illegal_odds_24_hours'
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
        return d.trafficDate;
    })
    .order(d3.ascending)
//	.group(all)
	.group(function(d) { return "Daily Fraud Summary Table"
     })
	;
	
    dc.renderAll();

};