let minYear = birthData[0].year;
let maxYear = birthData[birthData.length - 1].year;
let width = 600;
let height = 600;
let numBars = 12;
let barPadding = 10;
// This is so that the bars take up the entire svg
let barWidth = width / numBars - barPadding;

d3.select("input")
  .property("min", minYear)
  .property("max", maxYear)
  .property("value", minYear);

d3.select("svg")
  .attr("width", width)
  .attr("height", height)
  .selectAll("rect")
  .data(birthData.filter((d) => d.year === minYear))
  .enter()
  .append("rect")
  .attr("width", barWidth)
  .attr("height", (d) => (d.births / 2.5e6) * height)
  .attr("y", (d) => height - (d.births / 2.5e6) * height)
  .attr("x", (d, i) => (barWidth + barPadding) * i)
  .attr("fill", "blue");

d3.select("input").on("input", (e) => {
  let year = +e.target.value;
  d3.selectAll("rect")
    .data(birthData.filter((d) => d.year === year))
    .attr("height", (d) => (d.births / 2.5e6) * height)
    .attr("y", (d) => height - (d.births / 2.5e6) * height);
});
