let minYear = d3.min(birthData, (d) => d.year);
let maxYear = d3.max(birthData, (d) => d.year);
let width = 600;
let height = 600;

let continents = [];
for (let i = 0; i < birthData.length; i++) {
  let continent = birthData[i].continent;
  if (continents.indexOf(continent) === -1) {
    continents.push(continent);
  }
}

let colorScale = d3
  .scaleOrdinal()
  .domain(continents)
  .range(d3.schemeCategory10);

d3.select("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", `translate(${width / 2}, ${height / 2})`)
  .classed("chart", true);

d3.select("input")
  .property("min", minYear)
  .property("max", maxYear)
  .property("value", minYear)
  .on("input", (e) => makeGraph(+e.target.value));

makeGraph(minYear);

function makeGraph(year) {
  let yearData = birthData.filter((d) => d.year === year);
  let arcs = d3
    .pie()
    .value((d) => d.births)
    .sort((a, b) => {
      if (a.continent < b.continent) {
        return -1;
      } else if (a.continent > b.continent) {
        return 1;
      } else {
        return a.births - b.births;
      }
    })(yearData);

  let path = d3
    .arc()
    .outerRadius(width / 2 - 10)
    .innerRadius(width / 4) // if you set inner radius to 0, you will get a circle (some positive value == donut)
    .padAngle(0.01);

  let update = d3.select(".chart").selectAll(".arc").data(arcs);
  update.exit().remove();
  update
    .enter()
    .append("path")
    .classed("arc", true)
    .merge(update)
    .attr("fill", (d) => colorScale(d.data.continent))
    .attr("stroke", "black")
    .attr("d", path);
}
