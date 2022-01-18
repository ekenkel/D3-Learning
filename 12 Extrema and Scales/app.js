let minYear = d3.min(birthData, (d) => d.year);
let maxYear = d3.max(birthData, (d) => d.year);
let width = 600;
let height = 600;
let barPadding = 10;
let numBars = 12;
let barWidth = width / numBars - barPadding;
let maxBirths = d3.max(birthData, (d) => d.births);
// After scaling, y values increase as you go up (previously down)
let yScale = d3.scaleLinear().domain([0, maxBirths]).range([height, 0]);

d3.select("input")
  .property("min", minYear)
  .property("max", maxYear)
  .property("value", minYear);

d3.select("svg")
  .attr("width", width)
  .attr("height", height)
  .selectAll("rect")
  .data(
    birthData.filter(function (d) {
      return d.year === minYear;
    })
  )
  .enter()
  .append("rect")
  .attr("width", barWidth)
  .attr("height", function (d) {
    return height - yScale(d.births);
  })
  .attr("y", function (d) {
    return yScale(d.births);
  })
  .attr("x", function (d, i) {
    return (barWidth + barPadding) * i;
  })
  .attr("fill", "blue");

d3.select("input").on("input", function (e) {
  let year = +e.target.value;
  d3.selectAll("rect")
    .data(
      birthData.filter(function (d) {
        return d.year === year;
      })
    )
    .attr("height", function (d) {
      return height - yScale(d.births);
    })
    .attr("y", function (d) {
      return yScale(d.births);
    });
});
