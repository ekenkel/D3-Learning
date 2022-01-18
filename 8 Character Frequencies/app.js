d3.select("#reset").on("click", function () {
  d3.selectAll(".letter").remove();

  d3.select("#phrase").text("");

  d3.select("#count").text("");
});

d3.select("form").on("submit", function (e) {
  e.preventDefault();
  let input = d3.select("input");
  let text = input.property("value");

  let letters = d3
    .select("#letters")
    .selectAll(".letter")
    .data(getFrequencies(text), function (d) {
      return d.character;
    });

  letters.classed("new", false).exit().remove();

  letters
    .enter()
    .append("div")
    .classed("letter", true)
    .classed("new", true)
    .merge(letters)
    .style("width", "20px")
    .style("line-height", "20px")
    .style("margin-right", "5px")
    .style("height", function (d) {
      return d.count * 20 + "px";
    })
    .text(function (d) {
      return d.character;
    });

  d3.select("#phrase").text("Analysis of: " + text);

  d3.select("#count").text(
    "(New characters: " + letters.enter().nodes().length + ")"
  );

  input.property("value", "");
});

function getFrequencies(str) {
  let sorted = str.split("").sort();
  let data = [];
  for (let i = 0; i < sorted.length; i++) {
    let last = data[data.length - 1];
    if (last && last.character === sorted[i]) last.count++;
    else data.push({ character: sorted[i], count: 1 });
  }
  return data;
}
