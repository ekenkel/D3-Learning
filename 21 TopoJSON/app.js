const topoData = d3.json("./sample_topo.json");
topoData.then((data) => {
  let path = d3.geoPath();
  let width = 600;
  let height = 600;

  d3.select("svg")
    .attr("width", width)
    .attr("height", height)
    .selectAll("path")
    .data(topojson.feature(data, data.objects.collection).features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("fill", (d) => d.properties.color);
});
