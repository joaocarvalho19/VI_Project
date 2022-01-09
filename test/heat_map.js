// set the dimensions and margins of the graph
var margin = {top: 80, right: 25, bottom: 30, left: 40},
  width = 450 - margin.left - margin.right,
  height = 450 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svgHeat = d3.select("#g_2")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

//Read the data
//d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/heatmap_data.csv", function(data) {

function updateHeat(data){
  // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
  var myGroups = d3.map(data, function(d){return d.X;}).keys().sort()
  var myVars = d3.map(data, function(d){return d.Y;}).keys().sort()
  

  var areas = {};
  // Build X scales and axis:
  var xHeat = d3.scaleBand()
    .range([ 0, width ])
    .domain(myGroups)
    .padding(0.05);
  svgHeat.append("g")
    .style("font-size", 15)
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xHeat).tickSize(0))
    .select(".domain").remove()

  // Build Y scales and axis:
  var yHeat = d3.scaleBand()
    .range([ height, 0 ])
    .domain(myVars)
    .padding(0.05);
    svgHeat.append("g")
    .style("font-size", 15)
    .call(d3.axisLeft(yHeat).tickSize(0))
    .select(".domain").remove()

  // Build color scale
  var myColor = d3.scaleSequential()
    .interpolator(d3.interpolateInferno)
    .domain([0,1300])

  // create a tooltip
  var tooltip = d3.select("#g_2")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    tooltip
      .style("opacity", 1)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
  }
  var mousemove = function(d) {
    tooltip
      .html("Burned area: " + areas[d.X.toString() + d.Y.toString()])
      .style("left", (d3.mouse(this)[0]+70) + "px")
      .style("top", (d3.mouse(this)[1]) + "px")
  }
  var mouseleave = function(d) {
    tooltip
      .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 0.8)
  }

  // add the squares
  svgHeat.selectAll()
    .data(data, function(d) {
        key = d.X.toString() + d.Y.toString()
        if (!areas.hasOwnProperty(key)){
            areas[key] = parseFloat(d.area)
        }
        else{
            areas[key] += parseFloat(d.area)
        }
        return d.X+':'+d.Y;
    })
    .enter()
    .append("rect")
      .attr("x", function(d) { return xHeat(d.X) })
      .attr("y", function(d) { return yHeat(d.Y) })
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("width", xHeat.bandwidth() )
      .attr("height", yHeat.bandwidth() )
      .style("fill", function(d) { 
            key = d.X.toString() + d.Y.toString()  
            return myColor(areas[key])
        } )
      .style("stroke-width", 4)
      .style("stroke", "none")
      .style("opacity", 0.8)
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
}


d3.csv("../dataset/forestfires.csv", function(data){
	updateHeat(data)
})

// Add title to graph
/*svgHeat.append("text")
        .attr("x", 0)
        .attr("y", -50)
        .attr("text-anchor", "left")
        .style("font-size", "22px")
        .text("A d3.js heatmap");

// Add subtitle to graph
svgHeat.append("text")
        .attr("x", 0)
        .attr("y", -20)
        .attr("text-anchor", "left")
        .style("font-size", "14px")
        .style("fill", "grey")
        .style("max-width", 400)
        .text("A short description of the take-away message of this chart.");*/