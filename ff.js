function wel() {
    document.getElementById("welcome").style.display = "block";
    for (var i = 1; i<4; i++){
        document.getElementById("vis_"+i).style.display = "none";
    }
}
function show(g_num) {
    let graph = [1,2,3];
    const index = graph.indexOf(g_num);
    graph.splice(index, 1);
    document.getElementById("welcome").style.display = "none";
    document.getElementById("vis_"+g_num).style.display = "block";
    for (var i = 0; i<graph.length; i++){
        document.getElementById("vis_"+graph[i]).style.display = "none";
    }
}