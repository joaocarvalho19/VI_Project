function readData() {
    if (document.getElementById("input_1_wind").value){
        input_1_wind = document.getElementById("input_1_wind").value.split("-")
    }
    else{
        input_1_wind = [0,10]
    }
    if (document.getElementById("input_1_hum").value){
        input_1_hum = document.getElementById("input_1_hum").value.split("-")
    }
    else{
        input_1_hum = [15,100]
    }
    if (document.getElementById("input_1_temp").value){
        input_1_temp = document.getElementById("input_1_temp").value.split("-")
    }
    else{
        input_1_temp = [2,34]
    }
    if (document.getElementById("input_1_rain").value){
        input_1_rain = document.getElementById("input_1_rain").value.split("-")
    }
    else{
        input_1_rain = [0,7]
    }
    
    //Indices
    if (document.getElementById("input_1_ffnc").value){
        input_1_ffnc = document.getElementById("input_1_ffnc").value.split("-")
    }
    else{
        input_1_ffnc = [18,97]
    }
    if (document.getElementById("input_1_dmc").value){
        input_1_dmc = document.getElementById("input_1_dmc").value.split("-")
    }
    else{
        input_1_dmc = [1,292]
    }
    if (document.getElementById("input_1_dc").value){
        input_1_dc = document.getElementById("input_1_dc").value.split("-")
    }
    else{
        input_1_dc = [7,861]
    }
    if (document.getElementById("input_1_isi").value){
        input_1_isi = document.getElementById("input_1_isi").value.split("-")
    }
    else{
        input_1_isi = [0,57]
    }
    let months = {"jan": 0, "feb": 1, "mar": 2, "apr": 3, "may": 4, "jun": 5, "jul": 6, "aug": 7, "sep": 8, "oct": 9, "nov": 10, "dec": 11}
    let input_1_months;
    if (document.getElementById("input_1_months1").value &&  document.getElementById("input_1_months2").value){
        first_mon = document.getElementById("input_1_months1").value.toLowerCase().substring(0, 3)
        last_mon = document.getElementById("input_1_months2").value.toLowerCase().substring(0, 3)
        if(first_mon in months && last_mon in months){
            first = months[first_mon]
            last = months[last_mon]

            // Ex. jan-may
            if (first <= last){
                input_1_months = Array(last-first+1).fill().map((x,i)=>i+first)
                console.log(input_1_months)
            }
            // Ex. dec-fev
            else{
                input_1_months = Array(Object.keys(months).length-first).fill().map((x,i)=>i+first)
                input_1_months = input_1_months.concat(Array(last+1).fill().map((x,i)=>i))
                console.log(input_1_months)
            }
            
        }
        else{
            alert("Months not allowed!")
            return
        }
    }
    else{
        input_1_months = Array(12).fill().map((x,i)=>i)
    }

    let final_data = [];

    //Filter data
    data = d3.csv("dataset/forestfires.csv", function(data){
        for(var i=0; i<data.length; i++){
            if(parseFloat(data[i].area) > 0) {
                if((parseFloat(input_1_wind[0]) <= parseFloat(data[i].wind) && parseFloat(data[i].wind) <= parseFloat(input_1_wind[1])) && (parseFloat(input_1_hum[0]) <= parseFloat(data[i].RH) && parseFloat(data[i].RH) <= parseFloat(input_1_hum[1])) && (parseFloat(input_1_temp[0]) <= parseFloat(data[i].temp) && parseFloat(data[i].temp) <= parseFloat(input_1_temp[1])) && (parseFloat(input_1_rain[0]) <= parseFloat(data[i].rain) && parseFloat(data[i].rain) <= parseFloat(input_1_rain[1]))){
                
                    if((parseFloat(input_1_ffnc[0]) <= parseFloat(data[i].FFMC) && parseFloat(data[i].FFMC) <= parseFloat(input_1_ffnc[1])) && (parseFloat(input_1_dmc[0]) <= parseFloat(data[i].DMC) && parseFloat(data[i].DMC) <= parseFloat(input_1_dmc[1])) && (parseFloat(input_1_dc[0]) <= parseFloat(data[i].DC) && parseFloat(data[i].DC) <= parseFloat(input_1_dc[1])) && (parseFloat(input_1_isi[0]) <= parseFloat(data[i].ISI) && parseFloat(data[i].ISI) <= parseFloat(input_1_isi[1]))){
                        
                        if(input_1_months.includes(months[data[i].month])){
                            final_data.push(data[i])
                        }

                    }
                }
            }
            
            
        }
        console.log(final_data)
        updatePlot(final_data)
    })
}

// set the dimensions and margins of the graph
var marginSca = {top: 10, right: 70, bottom: 20, left: 20},
widthSca = 800 - marginSca.left - marginSca.right,
heightSca = 460 - marginSca.top - marginSca.bottom;

// append the svg object to the body of the page
var svg = d3.select("#g_1")
.append("svg")
  .attr("width", widthSca + marginSca.left + marginSca.right)
  .attr("height", heightSca + marginSca.top + marginSca.bottom)
  .style("background", "park.png")
.append("g")
  .attr("transform",
        "translate(" + marginSca.left + "," + marginSca.top + ")");

svg.append('svg:image')
.attr('xlink:href', 'images/new_park.png')
.attr("width", widthSca)
.attr("height", heightSca)
.attr("x", 0)
.attr("y", 0);

// A function that update the plot for a given xlim value
function updatePlot(data) {
    //clean circles
    d3.selectAll("circle").remove()
    var data_radius = {};

    // -1- Create a tooltip div that is hidden by default:
  var tooltip = d3.select("body")
  .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "steelblue")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .style("color", "white")

// -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
var showTooltip = function(d) {
  tooltip
    .transition()
    .duration(100)
  tooltip
    .style("opacity", 1)
    .html("Quantity: " + data_radius[d.X.toString() + d.Y.toString()])
    .style("left", (d3.event.pageX) + "px")
    .style("top", (d3.event.pageY) + "px")
}
var moveTooltip = function(d) {
  tooltip
    .style("left", (d3.event.pageX) + "px")
    .style("top", (d3.event.pageY) + "px")
}
var hideTooltip = function(d) {
  tooltip
    .transition()
    .duration(200)
    .style("opacity", 0)
}

    // Add X axis
    var x = d3.scaleLinear()
        .domain([1, 9])
        .range([ 0, widthSca ]);
    var xAxis = svg.append("g")
        .attr("transform", "translate(0," + heightSca + ")")
        .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([1, 9])
        .range([ heightSca, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));
    
    // Add Dots
    var div = d3.select("body").append("div")
     .attr("class", "tooltip-donut")
     .style("opacity", 0);

    svg.append("g")
        .call(d3.axisLeft(y));
        svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", function (d) {return x(parseInt(d.X)); } )
            .attr("cy", function (d) { return y(parseInt(d.Y)); } )
            .attr("r", function (d) {
                key = d.X.toString() + d.Y.toString()
                if (!data_radius.hasOwnProperty(key)){
                    data_radius[key] = 1
                }
                else{
                    data_radius[key] += 1
                }
                return (data_radius[key]*1.2); })
            .style("fill", "orange")
            .style("stroke", "red")
            // -3- Trigger the functions
    .on("mouseover", showTooltip )
    .on("mousemove", moveTooltip )
    .on("mouseleave", hideTooltip )
            

                
    }
// All data when page loads
//window.onload = function() {
    let final_data = [];
    d3.csv("dataset/forestfires.csv", function(data){
        for(var i=0; i<data.length; i++){
            if(parseFloat(data[i].area) > 0) {
                final_data.push(data[i])
            }
        }
        console.log(final_data)
        updatePlot(final_data)
    })
//};
d3.select("#updatePlot").on("click", readData )