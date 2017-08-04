const data = require('./data.json');
const d3 = require('./d3.js');

var width = 1000,
    height = 800;

// Force directed
var force = d3.layout.force()
    .charge(-100)
    .linkDistance(310)
    .size([width, height])
    .on("tick", tick);

var drag = force.drag()
    .on("dragstart", dragstart);

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
    .style("stroke", "E3D2C4")
    .style("stroke-width", 1)
    .style("opacity", 0.3);

var node = svg.selectAll(".node")
    .data(data.nodes)
    .enter().append("circle")
    .attr("class", "node")
    .attr("r", function getSize(d) {
      if (d.value > 25) {
        return 24 * 2;
      } else {
        return d.value * 2;
      }
     })
    .style("fill", "FFECDC")
    .style("stroke", "FFC28F")
    .style("opacity", function(d) {
      return d.value * 0.3;
    })
    .call(drag)
    .on("dblclick", connectedNodes);

var label = svg.selectAll(".mytext")
      .data(data.nodes)
      .enter().append("text")
      .text(function(d) { return d.name; })
      .style("text-anchor", "middle")
      .style("fill", "7F6148")
      .style("opacity", 0.8)
      .style("font-size", 13);

function tick() {
  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  node.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });

  label.attr("x", function(d) { return d.x; })
       .attr("y", function(d) { return d.y - 5; });
}

function dragstart(d) {
  d3.select(this).classed("fixed", d.fixed = true);
}

var toggle = 0;
var linkedByIndex = {};
for (let i = 0; i < data.nodes.length; i++) {
  linkedByIndex[i + "," + i] = 1;
}
data.links.forEach(function (d) {
  linkedByIndex[d.source.index + "," + d.target.index] = 1;
});

function neighboring(a, b) {
  return linkedByIndex[a.index + "," + b.index];
}

function connectedNodes() {
  if (toggle === 0) {
    const d = d3.select(this).node().__data__;
    node.style("opacity", function (o) {
      return neighboring(d, o) | neighboring(o, d) ? 1 : 0.1;
    });
    link.style("opacity", function (o) {
      return (d.index === o.source.index || d.index === o.target.index) ? 1 : 0.1;
    });
    label.style("opacity", function (o) {
      return neighboring(d, o) | neighboring(o, d) ? 1 : 0.1;
    });
    toggle = 1;
  } else {
    node.style("opacity", 1);
    link.style("opacity", 0.3);
    label.style("opacity", 0.8);
    toggle = 0;
  }
}
// Force directed


// var force = d3.layout.force()
//     .charge(-120)
//     .linkDistance(300)
//     .size([width, height])
//     .on("tick", tick);
//
// var drag = force.drag()
//     .on("dragstart", dragstart);
//
// var svg = d3.select("div.body-2").append("svg")
//     .attr("width", width)
//     .attr("height", height);
//
// force
//   .nodes(data.nodes)
//   .links(data.links)
//   .start();
//
// var node = svg.selectAll(".node")
//     .data(data.nodes)
//     .enter().append("circle")
//     .attr("class", "node")
//     .attr("r", function getSize(d) {
//        return d.value * 2;
//      })
//     .style("fill", "FFECDC")
//     .call(drag);
//
// var label = svg.selectAll(".mytext")
//       .data(data.nodes)
//       .enter().append("text")
//       .text(function(d) { return d.name; })
//       .style("text-anchor", "middle")
//       .style("font-size", 12);
//
// var fisheye = d3.fisheye.circular()
//       .radius(120);
//
// svg.on("mousemove", function() {
//       force.stop();
//       fisheye.focus(d3.mouse(this));
//       d3.selectAll("circle").each(function(d) { d.fisheye = fisheye(d); })
//           .attr("cx", function(d) { return d.fisheye.x; })
//           .attr("cy", function(d) { return d.fisheye.y; })
//           .attr("r", function(d) { return d.fisheye.z * 8; });
//     });
//
// function tick() {
//   node.attr("cx", function(d) { return d.x; })
//       .attr("cy", function(d) { return d.y; });
//
//   label.attr("x", function(d) { return d.x; })
//        .attr("y", function(d) { return d.y - 10; });
// }
//
// function dragstart(d) {
//   d3.select(this).classed("fixed", d.fixed = true);
// }
