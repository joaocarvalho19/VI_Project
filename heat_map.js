function readDataHeat() {
  let months = {"jan": 0, "feb": 1, "mar": 2, "apr": 3, "may": 4, "jun": 5, "jul": 6, "aug": 7, "sep": 8, "oct": 9, "nov": 10, "dec": 11}
  let input_2_months;
  if (document.getElementById("input_2_months1").value &&  document.getElementById("input_2_months2").value){
      first_mon = document.getElementById("input_2_months1").value.toLowerCase().substring(0, 3)
      last_mon = document.getElementById("input_2_months2").value.toLowerCase().substring(0, 3)
      if(first_mon in months && last_mon in months){
          first = months[first_mon]
          last = months[last_mon]

          // Ex. jan-may
          if (first <= last){
              input_2_months = Array(last-first+1).fill().map((x,i)=>i+first)
              console.log(input_2_months)
          }
          // Ex. dec-fev
          else{
              input_2_months = Array(Object.keys(months).length-first).fill().map((x,i)=>i+first)
              input_2_months = input_2_months.concat(Array(last+1).fill().map((x,i)=>i))
              console.log(input_2_months)
          }
          
      }
      else{
          alert("Months not allowed!")
          return
      }
  }
  else{
      input_2_months = Array(12).fill().map((x,i)=>i)
  }

  let final_data = [];

  //Filter data
  data = d3.csv("dataset/forestfires.csv", function(data){
      for(var i=0; i<data.length; i++){
          if(input_2_months.includes(months[data[i].month])){
              final_data.push(data[i])
          }
      }
      console.log(final_data)
      updateHeat(final_data)
  })
}



// set the dimensions and margins of the graph
var margin = {top: 30, right: 70, bottom: 20, left: 20},
width = 770 - margin.left - margin.right,
height = 460 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svgHeat = d3.select("#g_2")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

svgHeat.append('svg:image')
        .attr('xlink:href', 'images/new_park.png')
        .attr("width", width)
        .attr("height", height)
        .attr("x", 0)
        .attr("y", 0);

//Read the data  
function updateHeat(data){
  d3.selectAll("rect").remove()
  // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
  var myGroups = [1,2,3,4,5,6,7,8,9]
  var myVars = [1,2,3,4,5,6,7,8,9]
  

  var areas = {};
  var fires_number = {};
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
    .interpolator(d3.interpolateYlOrRd)
    .domain([0,100])

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
      .style("background-color", "steelblue")
      .style("color", "white")
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 0.4)
  }
  var mousemove = function(d) {
    tooltip
      .html("Burned area: " + areas[d.X.toString() + d.Y.toString()] / fires_number[d.X.toString() + d.Y.toString()])
      .style("left", (d3.mouse(this)[0]+70) + "px")
      .style("top", (d3.mouse(this)[1]) + "px")
  }
  var mouseleave = function(d) {
    tooltip
      .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 0.1)
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
        if (parseFloat(d.area) > 0){
          if (!fires_number.hasOwnProperty(key)){
              fires_number[key] = 1
          }
          else{
                fires_number[key] += 1
          }
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
            return myColor(areas[key]/fires_number[key])
        } )
      .style("stroke-width", 4)
      .style("stroke", "none")
      .style("opacity", 0.1)
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
}


d3.csv("dataset/forestfires.csv", function(data){
	updateHeat(data)
})
        
d3.select("#readHeat").on("click", readDataHeat )