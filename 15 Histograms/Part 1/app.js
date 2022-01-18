let width = 600;
let height = 600;
let barPadding = 1;

let minYear = d3.min(birthData, (d) => d.year);
let maxYear = d3.max(birthData, (d) => d.year);
let yearData = birthData.filter((d) => d.year === maxYear);

let xScale = d3
  .scaleLinear()
  .domain([0, d3.max(yearData, (d) => d.births)])
  .rangeRound([0, width]);

let histogram = d3
  .histogram()
  .domain(xScale.domain())
  .thresholds(xScale.ticks())
  .value((d) => d.births);

let bins = histogram(yearData);

let yScale = d3
  .scaleLinear()
  .domain([0, d3.max(bins, (d) => d.length)])
  .range([height, 0]);

let bars = d3
  .select("svg")
  .attr("width", width)
  .attr("height", height)
  .selectAll(".bar")
  .data(bins)
  .enter()
  .append("g")
  .classed("bar", true);

bars
  .append("rect")
  .attr("x", (d, i) => xScale(d.x0))
  .attr("y", (d) => yScale(d.length))
  .attr("height", (d) => height - yScale(d.length))
  .attr("width", (d) => xScale(d.x1) - xScale(d.x0) - barPadding)
  .attr("fill", "blue");

bars
  .append("text")
  .text((d) => `${d.x0} - ${d.x1} (bar height: ${d.length})`)
  .attr("transform", "rotate(-90)")
  .attr("y", (d) => (xScale(d.x1) + xScale(d.x0)) / 2)
  .attr("x", -height + 10)
  .style("alignment-baseline", "middle");

d3.select("input")
  .property("min", minYear)
  .property("max", maxYear)
  .property("value", minYear)
  .on("input", (e) => {
    let year = +e.target.value;
    yearData = birthData.filter((d) => d.year === year); // Filter data set by the new year
    xScale.domain([0, d3.max(yearData, (d) => d.births)]); // Update domain of xScale based on the new data
    histogram.domain(xScale.domain()).thresholds(xScale.ticks()); // Update the histogram generator
    bins = histogram(yearData); // Then update the bins
    yScale.domain([0, d3.max(bins, (d) => d.length)]); //Then update the yScale

    bars = d3.select("svg").selectAll(".bar").data(bins); // Grab the update selection and begin to update
    bars.exit().remove(); // First remove any elements in the exit selection
    let g = bars.enter().append("g").classed("bar", true);
    /*
      NOTE: To avoid writing:
      1. bars.enter().append("g").append("rect")
      2. bars.enter().append("g").append("text")
      we are assigning g
    */
    g.append("rect");
    g.append("text");

    /*
      NOTE: Why do we do merge(bars) twice?
      A: We have to merge the changes so we have to do it twice
    */
    let enterAndUpdate = g.merge(bars);

    enterAndUpdate
      .select("rect")
      .attr("x", (d, i) => xScale(d.x0))
      .attr("y", (d) => yScale(d.length))
      .attr("height", (d) => height - yScale(d.length))
      .attr("width", (d) => {
        let width = xScale(d.x1) - xScale(d.x0) - barPadding;
        return width < 0 ? 0 : width;
      })
      .attr("fill", "blue");

    enterAndUpdate
      .select("text")
      .text((d) => `${d.x0} - ${d.x1} (bar height: ${d.length})`)
      .attr("transform", "rotate(-90)")
      .attr("y", (d) => (xScale(d.x1) + xScale(d.x0)) / 2)
      .attr("x", -height + 10)
      .style("alignment-baseline", "middle");
  });
