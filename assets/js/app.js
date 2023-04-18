// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 50,
  right: 20,
  bottom: 50,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;


var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .attr("class","chart");

const chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.bottom})`);

  d3.csv("./assets/data/data.csv").then(function(data) {
    data.forEach(function(d) {
        d.poverty = Number(d.poverty)
        //console.log(d.poverty)
        d.healthcare= Number(d.healthcare)
    });

    var xLinearScale = d3.scaleLinear()
        .domain([5, d3.max(data, d => d.poverty)+5])
        .range([0, width-100]);

    var yLinearScale = d3.scaleLinear()
        .domain([3, d3.max(data, d => d.healthcare)+2])
        .range([height-2,0]);
    
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    
    chartGroup.append("g").call(bottomAxis)
        .attr("class", "xAxis")
        .attr("transform", "translate(0," + (height) + ")");
        
    chartGroup.append("g")
        .call(leftAxis)
        .attr("class", "yAxis")
        .attr("transform", "translate(0, 0)");


    var circles = chartGroup.selectAll("circle").data(data).enter()

    circles.append("circle")
        .attr("cx", function(d,i) {console.log(xLinearScale(d.poverty),i); return xLinearScale(d.poverty);})
        .attr("cy", function(d,i) {console.log(yLinearScale(d.healthcare),i); return yLinearScale(d.healthcare);})
        .attr("r", "15")
        .attr("class", function(d) {return "stateCircle " + d.abbr;})      
        .attr("fill", "blue")
        .attr("stroke", "black")
        .attr("stroke-width", "3")
        .attr("opacity", ".75");


        
    circles.append("text").attr("x",  d => xLinearScale(d.poverty))
    .attr("y", d => yLinearScale(d.healthcare))
    .attr("font-size", "10px")
    .attr("fill", "black") 
    .attr("font-weight", "bold")
    .attr("text-anchor", "middle")
    .text((d) => { return d.abbr;});   
    

    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - 50)
      .attr("x", 0 - (height-100))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .attr("font-weight", "bold")
      .text("Healthcare Percentage (%)");


      chartGroup.append("text")
      .attr("y", 0+435)
      .attr("x", 0 +350)
      .attr("class", "axisText")
      .attr("font-weight", "bold")
      .text("Poverty (%)");
    
    });

