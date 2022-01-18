let width = 800;
let height = 800;
let padding = 50;

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

let yAxis = d3.axisLeft(yScale).tickSize(-width + 2 * padding);
let xAxis = d3.axisBottom(xScale).tickSize(-height + 2 * padding);

d3.select("svg")
  .append("g")
  .attr("transform", `translate(${padding}, 0)`)
  .call(yAxis);

d3.select("svg")
  .append("g")
  .attr("transform", `translate(0, ${height - padding})`)
  .call(xAxis);

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

// Y Axis Title
d3.select("svg")
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("x", -height / 2)
  .attr("y", padding)
  .attr("dy", "-2.5em")
  .style("text-anchor", "middle")
  .text("Life Expectancy");

// X Axis Title
d3.select("svg")
  .append("text")
  .attr("x", width / 2)
  .attr("y", height - padding)
  .attr("dy", "2.5em")
  .style("text-anchor", "middle")
  .text("Births per Capita");

// Plot Title
d3.select("svg")
  .append("text")
  .attr("x", width / 2)
  .attr("y", padding - 8)
  .style("text-anchor", "middle")
  .style("font-size", "1.5em")
  .text("Data on Births by Country in 2011");
