var quotes = [
  {
    quote: "I see dead people.",
    movie: "The Sixth Sense",
    year: 1999,
    rating: "PG-13",
  },
  {
    quote: "May the force be with you.",
    movie: "Star Wars: Episode IV - A New Hope",
    year: 1977,
    rating: "PG",
  },
  {
    quote:
      "You've got to ask yourself one question: 'Do I feel lucky?' Well, do ya, punk?",
    movie: "Dirty Harry",
    year: 1971,
    rating: "R",
  },
  {
    quote: "You had me at 'hello.'",
    movie: "Jerry Maguire",
    year: 1996,
    rating: "R",
  },
  {
    quote:
      "Just keep swimming. Just keep swimming. Swimming, swimming, swiming.",
    movie: "Finding Nemo",
    year: 2003,
    rating: "G",
  },
];

const colors = {
  G: "green",
  PG: "yellow",
  "PG-13": "orange",
  R: "red",
};

d3.select("#quotes")
  .style("list-style", "none")
  .selectAll("li")
  .data(quotes)
  .enter()
  .append("li")
  .text((d) => {
    return d.quote + " - " + d.movie + " (" + d.year + ")";
  })
  .style("margin", "20px")
  .style("padding", "20px")
  .style("font-size", (d) => {
    return d.quote.length < 25 ? "2em" : "1em";
  })
  .style("background-color", (d) => colors[d.rating])
  .style("border-radius", "8px");

// Enter
// D3 created placeholder nodes when we provide data
// When we use enter, it creates a d3 selection with those enter nodes

// Append
// Appends each item to a HTML element

// Callback Structure
// function (d, i) {
//   // Code
// }

// d = The data bound to the current element
