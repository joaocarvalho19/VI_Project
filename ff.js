function wel() {
    document.getElementById("welcome").style.display = "block";
    for (var i = 1; i<5; i++){
        document.getElementById("vis_"+i).style.display = "none";
    }
}
function show(g_num) {
    let graph = [1,2,3,4];
    const index = graph.indexOf(g_num);
    graph.splice(index, 1);
    document.getElementById("welcome").style.display = "none";
    document.getElementById("vis_"+g_num).style.display = "block";
    for (var i = 0; i<graph.length; i++){
        document.getElementById("vis_"+graph[i]).style.display = "none";
    }
}

function readData() {
    input_vento = document.getElementById("input_vento").value.split("-")
    input_hum = document.getElementById("input_hum").value.split("-")
    input_temp = document.getElementById("input_temp").value.split("-")
    input_chuva = document.getElementById("input_chuva").value.split("-")

    let final_data = [];

    //Filter data
    data = d3.csv("dataset/forestfires.csv").then(function(data){
        for(var i=0; i<data.length; i++){
            if((parseFloat(input_vento[0]) <= parseFloat(data[i].wind) && parseFloat(data[i].wind) <= parseFloat(input_vento[1])) && (parseFloat(input_hum[0]) <= parseFloat(data[i].RH) && parseFloat(data[i].RH) <= parseFloat(input_hum[1])) && (parseFloat(input_temp[0]) <= parseFloat(data[i].temp) && parseFloat(data[i].wind) <= parseFloat(input_temp[1])) && (parseFloat(input_chuva[0]) <= parseFloat(data[i].rain) && parseFloat(data[i].wind) <= parseFloat(input_chuva[1]))){
                final_data.push(data[i])
                console.log("-----------")
                console.log(parseFloat(data[i].wind))
                console.log(parseFloat(input_vento[0]))
                console.log(parseFloat(input_vento[1]))
                console.log(parseFloat(data[i].wind) <= parseFloat(input_vento[1]))
                console.log("-----------")
            }
        }
        console.log(final_data)
        updatePlot(final_data)
    })
}

// set the dimensions and margins of the graph
var margin = {top: 50, right: 50, bottom: 50, left: 50},
width = 700 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#g_2")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");



// A function that update the plot for a given xlim value
function updatePlot(data) {
    //clean circles
    d3.selectAll("circle").remove()

    var data_radius = {};
    // Add X axis
    var x = d3.scaleLinear()
        .domain([1, 9])
        .range([ 0, width ]);
    var xAxis = svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([1, 9])
        .range([ height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));
    
    // Add Dots
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
                if (!data_radius.hasOwnProperty((d.X,d.Y))){
                    data_radius[(d.X,d.Y)] = 1
                }
                else{
                    data_radius[(d.X,d.Y)] += 1
                }
                return data_radius[(d.X,d.Y)] * 2; })
            .style("fill", "steelblue")
        
    }
// All data when page loads
window.onload = function() {
    data = d3.csv("dataset/forestfires.csv").then(function(data){
        updatePlot(data)
    })
};
// Add an event listener to the button created in the html part
d3.select("#updatePlot").on("click", readData )

