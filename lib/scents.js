const data = require('./data.json');
const d3 = require('./d3.js');

// EXAMPLE 1
// const svg = d3.select("div.body-2")
//   .append("svg")
//   .attr("width", 700)
//   .attr("height", 700);
//
// const drag = d3.behavior.drag()
//  .on("drag", function(d, i) {
//    d.x += d3.event.dx;
//    d.y += d3.event.dy;
//    d3.select(this).attr("cx", d.x).attr("cy", d.y);
//    links.each(function(l, li) {
//      if (l.source === i) {
//        d3.select(this).attr("x1", d.x).attr("y1", d.y);
//      } else if (l.target === i) {
//        d3.select(this).attr("x2", d.x).attr("y2", d.y);
//      }
//    });
//  });
//
// const links = svg.selectAll("link")
//  .data(data.links)
//  .enter()
//  .append("line")
//  .attr("class", "link")
//  .attr("x1", function(link) {
//    const sourceNode = data.nodes.filter(function(d, i) {
//      return i === link.source;
//    })[0];
//    d3.select(this).attr("y1", sourceNode.y);
//    return sourceNode.x;
//  })
//  .attr("x2", function(link) {
//    const targetNode = data.nodes.filter(function(d, i) {
//      return i === link.target;
//    })[0];
//    d3.select(this).attr("y2", targetNode.y);
//    return targetNode.x;
//  })
//  .attr("fill", "none")
//  .attr("stroke", "gray");
//
// const nodes = svg.selectAll("node")
//  .data(data.nodes)
//  .enter()
//  .append("circle")
//  .attr("class", "node")
//  .attr("cx", function getRandomInt() {
//     return Math.floor(Math.random() * (600 - 10)) + 10;
//   })
//  .attr("cy", function getRandomInt() {
//     return Math.floor(Math.random() * (600 - 10)) + 10;
//   })
//  .attr("r", function getSize(d) {
//    return d.value * 2;
//  })
//  .attr("fill", "white")
//  .attr("stroke", "orange");
//  // .call(drag);
// END OF EXAMPLE 1

// EXAMPLE 2
var width = 1100,
    height = 800;

// var color = d3.scale.category20();
var force = d3.layout.force()
    .charge(-120)
    .linkDistance(150)
    .size([width, height]);

var svg = d3.select("div.body-2").append("svg")
    .attr("width", width)
    .attr("height", height);

force
  .nodes(data.nodes)
  .links(data.links)
  .start();

var link = svg.selectAll(".link")
    .data(data.links)
    .enter().append("line")
    .attr("class", "link")
    .style("stroke", "gray")
    .style("stroke-width", 1);

var node = svg.selectAll(".node")
    .data(data.nodes)
    .enter().append("circle")
    .attr("class", "node")
    // .attr("r", function getSize(d) {
    //    return d.value * 2;
    //  })
    .attr("r", 10)
    .style("fill", "orange")
    .call(force.drag);

node.append("title")
    .text(function(d) { return d.name; });


force.on("tick", function() {
  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  node.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
});
