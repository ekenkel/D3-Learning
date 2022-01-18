let input = d3.select("input");
let preview = d3.select(".preview");

d3.select("#new-note").on("submit", function (e) {
  e.preventDefault();
  d3.select("#notes")
    .append("p")
    .classed("note", true)
    .text(input.property("value"));
  input.property("value", "");
  setPreview("");
});

d3.select("#removeAllNotes").on("click", function (e) {
  d3.selectAll(".note").remove();
});

d3.select("#lucky").on("click", function (e) {
  d3.selectAll(".note").style("font-size", () => Math.random() * 100 + "px");
});

input.on("input", (e) => {
  let note = e.target.value;
  setPreview(note);
});

function setPreview(val) {
  preview.text(val).classed("hide", val === "");
}
