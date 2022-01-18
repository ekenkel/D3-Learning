// http://data.un.org/Data.aspx?d=POP&f=tableCode%3a22

let width = 600;
let height = 600;
let minYear = d3.min(birthData, (d) => d.year);
let maxYear = d3.max(birthData, (d) => d.year);
const orderedMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const colors = [
  "#aec7e8",
  "#a7cfc9",
  "#9fd7a9",
  "#98df8a",
  "#bac78e",
  "#ddb092",
  "#ff9896",
  "#ffa48c",
  "#ffaf82",
  "#ffbb78",
  "#e4bf9d",
  "#c9c3c3",
];

const quarterColors = ["#1f77b4", "#2ca02c", "#d62728", "#ff7f0e"];

let colorScale = d3.scaleOrdinal().domain(orderedMonths).range(colors);

let svg = d3.select("svg").attr("width", width).attr("height", height);

svg
  .append("g")
  .attr("transform", "translate(" + width / 2 + ", " + height / 2 + ")")
  .classed("chart", true);

svg
  .append("g")
  .attr("transform", "translate(" + width / 2 + ", " + height / 2 + ")")
  .classed("inner-chart", true);

svg
  .append("text")
  .classed("title", true)
  .attr("x", width / 2)
  .attr("y", 30)
  .style("font-size", "2em")
  .style("text-anchor", "middle");

drawGraph(minYear);

d3.select("input")
  .property("min", minYear)
  .property("max", maxYear)
  .property("value", minYear)
  .on("input", (e) => drawGraph(+e.target.value));

function drawGraph(year) {
  let yearData = birthData.filter((d) => d.year === year);
  let arcs = d3
    .pie()
    .value((d) => d.births)
    .sort(
      (a, b) => orderedMonths.indexOf(a.month) - orderedMonths.indexOf(b.month)
    );

  let innerArcs = d3
    .pie()
    .value((d) => d.births)
    .sort((a, b) => a.quarter - b.quarter);

  let path = d3
    .arc()
    .innerRadius(width / 4)
    .outerRadius(width / 2 - 40);

  let innerPath = d3
    .arc()
    .innerRadius(0)
    .outerRadius(width / 4);

  let outer = d3.select(".chart").selectAll(".arc").data(arcs(yearData));

  let inner = d3
    .select(".inner-chart")
    .selectAll(".arc")
    .data(innerArcs(getDataByQuarter(yearData)));

  outer
    .enter()
    .append("path")
    .classed("arc", true)
    .attr("fill", (d) => colorScale(d.data.month))
    .merge(outer)
    .attr("d", path);

  inner
    .enter()
    .append("path")
    .classed("arc", true)
    .attr("fill", (d, i) => quarterColors[i])
    .merge(inner)
    .attr("d", innerPath);

  d3.select(".title").text("Births by months and quarter for " + year);
}

function getDataByQuarter(data) {
  let quarterTallies = [0, 1, 2, 3].map((n) => ({ quarter: n, births: 0 }));
  for (let i = 0; i < data.length; i++) {
    let row = data[i];
    let quarter = Math.floor(orderedMonths.indexOf(row.month) / 3);
    quarterTallies[quarter].births += row.births;
  }
  return quarterTallies;
}
