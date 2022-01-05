var w = 400,
	h = 400;

var colorscale = d3.scaleOrdinal(d3.schemeCategory10);

//Data
function readDataSpider() {
	coord = true
    let months = {"jan": 0, "fev": 1, "mar": 2, "apr": 3, "may": 4, "jun": 5, "jul": 6, "aug": 7, "sep": 8, "oct": 9, "nov": 10, "dec": 11}
    if (document.getElementById("input_3_months").value){
        input_3_months = document.getElementById("input_3_months").value.split("-")
        if(input_3_months[0] in months && input_3_months[1] in months){
            first = months[input_3_months[0]]
            second = months[input_3_months[1]]

            // Ex. jan-may
            if (first <= second){
                input_3_months = Array(second-first+1).fill().map((x,i)=>i+first)
                console.log(input_3_months)
            }
            // Ex. dec-fev
            else{
                input_3_months = Array(Object.keys(months).length-first).fill().map((x,i)=>i+first)
                input_3_months = input_3_months.concat(Array(second+1).fill().map((x,i)=>i))
                console.log(input_3_months)
            }
            
        }
        else{
            alert("Months not allowed!")
            return
        }
    }
    else{
        input_3_months = Array(12).fill().map((x,i)=>i)
        console.log(input_3_months)
    }
	if (document.getElementById("input_3_area").value){
        input_3_area = document.getElementById("input_3_area").value.split("-")
		
    }
    else{
		input_3_area = [0,1091]
    }
	if (document.getElementById("input_3_X").value){
        input_3_X = document.getElementById("input_3_X").value
		
    }
    else{
		coord = false
    }
	if (document.getElementById("input_3_Y").value){
        input_3_Y = document.getElementById("input_3_Y").value
		
    }
    else{
		coord = false
    }

    dataSpider = []
	temp_data = []
    //Filter data
    data = d3.csv("dataset/forestfires.csv").then(function(data){
		means = {"FFMC": [0,0], "DMC": [0,0], "DC": [0,0], "ISI": [0,0], "temp": [0,0], "RH": [0,0], "wind": [0,0], "rain": [0,0]}
		highest_value = {"FFMC": 96.20, "DMC": 291.3, "DC": 860.6, "ISI": 56.10, "temp": 33.30, "RH": 100, "wind": 9.40, "rain": 6.4}
        for(var i=0; i<data.length; i++){
			if(input_3_area[0] <= parseFloat(data[i].area) && parseFloat(data[i].area) <= input_3_area[1]) {
				if (coord){
					if(input_3_X == parseFloat(data[i].X) && input_3_Y == data[i].Y && (input_3_months.includes(months[data[i].month])) ){
						for(j in means){
							means[j][0] += parseFloat(data[i][j])
							means[j][1] += 1
						}
					}
				}
				else{
					if(input_3_months.includes(months[data[i].month])){
						for(j in means){
							means[j][0] += parseFloat(data[i][j])
							means[j][1] += 1
						}
					}
				}
			}
        }
		
        for(j in means){
			if (means[j][1] != 0){
				per_mean = (means[j][0] / means[j][1]) / highest_value[j]
				temp_data.push({axis: j, value: per_mean})
			}
			else{
				temp_data.push({axis: j, value: 0})
			}
		}
	
		dataSpider.push(temp_data)
		console.log(dataSpider)
		updateSpider(dataSpider)
    })
}
dataSpider = []
temp_data = []
d3.csv("dataset/forestfires.csv").then(function(data){
	readDataSpider(data)
})

function updateSpider(d){
	//Options for the Radar chart, other than default
	var mycfg = {
	w: w,
	h: h,
	maxValue: 0.6,
	levels: 6,
	ExtraWidthX: 300
	}

	//Call function to draw the Radar chart
	//Will expect that data is in %'s
	RadarChart.draw("#g_3", d, mycfg);
			
}
// Add an event listener to the button created in the html part
d3.select("#updateSpider").on("click", readDataSpider )