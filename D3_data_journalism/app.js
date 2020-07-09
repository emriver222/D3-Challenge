// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3.select("body")
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


// Retrieve data from the CSV file and execute everything below
d3.csv("data.csv").then(function(healthData, err) {
  if (err) throw err;
  console.log(healthData)

  // parse data
  healthData.forEach(function(data) {
    data.healthcare = +data.healthcare;
    data.obesity = +data.obesity;
  
  });


  var xLinearScale = d3.scaleLinear().range([0, width]);
  var yLinearScale = d3.scaleLinear().range([height, 0]);

  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  var xMin;
  var xMax;
  var yMin;
  var yMax;
  
  xMin = d3.min(healthData, function(data) {
      return data.healthcare;
  });
  
  xMax = d3.max(healthData, function(data) {
      return data.healthcare;
  });
  
  yMin = d3.min(healthData, function(data) {
      return data.obesity;
  });
  
  yMax = d3.max(healthData, function(data) {
      return data.obesity;
  });
  
  xLinearScale.domain([xMin, xMax]);
  yLinearScale.domain([yMin, yMax]);
  console.log(xMin);
  console.log(yMax);


  // append x axis
  chartGroup.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(bottomAxis);

  chartGroup.append("g")
  .call(leftAxis);

  // append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(healthData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.healthcare +1))
    .attr("cy", d => yLinearScale(d.obesity +1))
    .attr("r", 20)
    .attr("fill", "pink")
    .attr("opacity", ".5");



    chartGroup.append("text")
    .style("font-size", "12px")
    .selectAll("tspan")
    .data(healthData)
    .enter()
    .append("tspan")
        .attr("x", function(data) {
            return xLinearScale(data.healthcare +1);
        })
        .attr("y", function(data) {
            return yLinearScale(data.obesity +1);
        })
        .text(function(data) {
            return data.abbr
        });
  
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Healthcare");
  
    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, 470)`)
      .attr("class", "axisText")
      .text("Obesity");

 
}).catch(function(error) {
  console.log(error);
});
