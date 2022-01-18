let width = 600;
let height = 600;
let padding = 20;

let yScale = d3
  .scaleLinear()
  .domain(d3.extent(birthData2011, (d) => d.lifeExpectancy))
  .range([height - padding, padding]);

let xScale = d3
  .scaleLinear()
  .domain(d3.extent(birthData2011, (d) => d.births / d.population))
  .range([padding, width - padding]);

let colorScale = d3
  .scaleLinear()
  .domain(d3.extent(birthData2011, (d) => d.population / d.area))
  .range(["lightblue", "black"]);

let radiusScale = d3
  .scaleLinear()
  .domain(d3.extent(birthData2011, (d) => d.births))
  .range([2, 40]);

d3.select("svg")
  .attr("width", width)
  .attr("height", height)
  .selectAll("circle") // Creates an empty selection of circles
  .data(birthData2011) // Joins our data to the empty collection of circles
  .enter()
  .append("circle")
  .attr("cx", (d) => xScale(d.births / d.population))
  .attr("cy", (d) => yScale(d.lifeExpectancy))
  .attr("fill", (d) => colorScale(d.population / d.area))
  .attr("r", (d) => radiusScale(d.births));
