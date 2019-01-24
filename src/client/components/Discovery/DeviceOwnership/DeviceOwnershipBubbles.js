import React, {Component} from 'react';
import * as d3 from "d3";

class DeviceOwnershipBubbles extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};

  }

  componentWillReceiveProps(props) {
    d3.select("#chartX").html('');
    if (props.data) {
      let {data,history} = props;
      this.updateChart(data,history);
    }
  }

  componentWillUnmount() {
    d3.select("#chartX").remove();
  }

  updateChart(categories,history) {
    var diameter = 300;//max size of the bubbles
    var data = {"children": []};
    data.children = JSON.parse(JSON.stringify(categories));

    //console.log('data', JSON.parse(JSON.stringify(categories)), categories);

    var bubble = d3.pack(data)
    .size([diameter, diameter]).padding(1.5);

    var svg = d3.select("#chartX").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");


    var nodes = d3.hierarchy(data)
    .sum(function (d) {
      return d.value;
    });
    //console.log("nodes ",nodes);

    var node = svg.selectAll(".node")
    .data(bubble(nodes).descendants())
    .enter()
    .filter(function (d) {
        //console.log(d);
      return !d.children;
    })
    .append("g")
    .attr("class", "node")
    .attr("transform", function (d) {
      return "translate(" + d.x + "," + d.y + ")";
    });

    node.append("title")
    .text(function (d) {
      return d.data.name + ": " + d.data.count;
    });
    node.append("circle")
    .attr("r", function (d) {
      return d.r;
    })
    .style("fill", function (d) {
      return d.data.color;
    })
    .on("mouseover",function(d) {
      d3.select(this).style("cursor", "pointer");
    })
    .on("click", function(d) {
        //console.log(d.data);
      history.push("/ownership/"+d.data.key);
    });

    node.append("text")
    .attr("dy", ".3em")
    .style("text-anchor", "middle")
    .text(function (d) {
      //console.log(d);
      return d.data.count;
    });

  }


  render() {
    return (
      <div id="chartX"/>
    );
  }
}

export default (DeviceOwnershipBubbles);
