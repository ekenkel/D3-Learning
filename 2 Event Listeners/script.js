// d3.select("h1").on("click", () => {
//     console.log("event");
// });

// To Remove event listener
// d3.select("h1").on("click", null);

d3.select("#new-note").on("submit", function (event) {
  // This prevents the page reload (which is default for submit)
  event.preventDefault();
  let input = d3.select("input");
  d3.select("#notes")
    .append("p")
    .classed("note", true)
    .text(input.property("value"));

  input.property("value", "");
});
