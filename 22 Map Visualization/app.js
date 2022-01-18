const importData = Promise.all([
  d3.json("https://unpkg.com/world-atlas@2.0.2/countries-50m.json"),
  d3.csv("./country_data.csv", (row) => {
    return {
      country: row.country,
      countryCode: row.countryCode,
      population: +row.population,
      medianAge: +row.medianAge,
      fertilityRate: +row.fertilityRate,
      populationDensity: +row.population / +row.landArea,
    };
  }),
]);

importData.then((allData) => {
  let geoData = topojson.feature(
    allData[0],
    allData[0].objects.countries
  ).features;

  allData[1].forEach((row) => {
    let countries = geoData.filter((d) => d.id === row.countryCode);
    countries.forEach((country) => (country.properties = row));
  });

  const width = 1000;
  const height = 700;

  let projection = d3
    .geoMercator()
    .scale(125)
    .translate([width / 2, height / 2]);
  let path = d3.geoPath().projection(projection);

  d3.select("svg")
    .attr("width", width)
    .attr("height", height)
    .selectAll(".country")
    .data(geoData)
    .enter()
    .append("path")
    .classed("country", true)
    .attr("d", path);

  let select = d3.select("select");

  select.on("change", (e, d) => setColor(e.target.value));

  setColor(select.property("value"));

  function setColor(val) {
    let colorRanges = {
      population: ["white", "blue"],
      populationDensity: ["white", "red"],
      medianAge: ["white", "black"],
      fertilityRate: ["black", "orange"],
    };

    let scale = d3
      .scaleLinear()
      .domain([0, d3.max(allData[1], (d) => d[val])])
      .range(colorRanges[val]);

    d3.selectAll(".country")
      .transition()
      .duration(400)
      .ease(d3.easeBackIn)
      .attr("fill", (d) => {
        let data = d.properties[val];
        return data ? scale(data) : "lightgrey";
      });
  }
});
