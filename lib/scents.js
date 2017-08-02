const data = require('./data.json');
const d3 = require('./d3.js');

// var c10 = d3.scale.category10();
const svg = d3.select("body")
  .append("svg")
  .attr("width", 1200)
  .attr("height", 800);

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

// const links = svg.selectAll("link")
//  .data(data.links)
//  .enter()
//  .append("line")
//  .attr("class", "link")
//  .attr("x1", function(l) {
//    const sourceNode = data.nodes.filter(function(d, i) {
//      return i === l.source;
//    })[0];
//    d3.select(this).attr("y1", sourceNode.y);
//    return sourceNode.x;
//  })
//  .attr("x2", function(l) {
//    const targetNode = data.nodes.filter(function(d, i) {
//      return i === l.target;
//    })[0];
//    d3.select(this).attr("y2", targetNode.y);
//    return targetNode.x;
//  })
//  .attr("fill", "none")
//  .attr("stroke", "white");

const nodes = svg.selectAll("node")
 .data(data.nodes)
 .enter()
 .append("circle")
 .attr("class", "node")
 .attr("cx", function(d) {
   return d.x;
 })
 .attr("cy", function(d) {
   return d.y;
 })
 .attr("r", 15)
 .attr("stroke", "black");
 // .attr("fill", function(d, i) {
 //   return c10(i);
 // })
 // .call(drag);
