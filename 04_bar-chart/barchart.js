var table = [
    { name: 'Apha',    value: 10},
    { name: 'Bravo',   value: 20},
    { name: 'Charlie', value: 30}
  ];

var height = 100;
var width = 300;
var leftMargin = 100;
var rightMargin = 10;
var topMargin = 10;
var bottomMargin = 50;
var padding = 4;

var x = d3.scaleLinear()
    .domain([0, 30])
    .range([0, width]);

var y = d3.scaleBand()
    .domain(table.map(function(d) { // WOT is this ???
        return d.name;
    }))
    .rangeRound([0, height], 0.2);  // maps to integers

var chart = d3
    .select('body')
    .append('svg')
    .attr('height', height + topMargin + bottomMargin)
    .attr('width', width + leftMargin + rightMargin);

var bars = chart
    .selectAll('rect')
    .data(table)
    .enter()
    .append('rect')
    .attr('x', x(0) + leftMargin)
    .attr('y', function(d, i) {
        return y(d.name) + topMargin;
    })
    .attr('height', y.bandwidth() - padding)
    .attr('width', function(d, i) {
        return x(d.value);
    });

var xAxis = d3
    .axisBottom(x)
    .ticks(10); // really just a suggestion

chart
    .append('g')
    .classed("axis", true)
    .attr("transform", "translate(" + leftMargin + "," + (height + 15) + ")")
    .call(xAxis);

var yAxis = d3
    .axisLeft(y);

chart
    .append('g')
    .classed("axis", true)
    .attr("transform", "translate(" + (leftMargin - 5) + "," + topMargin + ")")
    .classed("entityLink", true)
    .call(yAxis);

// Interactivity!
d3.selectAll(".entityLink text")
    .on("click", function() {
        alert("hooray for " + this.__data__ + "!");
    });
