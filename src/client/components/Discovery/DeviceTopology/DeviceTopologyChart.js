import React, { Component } from 'react';
import * as d3 from "d3";



class DeviceTopologyChart extends React.Component {

  constructor(props) {
    super(props);
    this.state={};

  }
componentDidMount(props)  {
    console.log("component mount",this.props.data)
    if(this.props.data){
      d3.select(".nodes").remove();
      d3.select(".links").remove();
    if(this.props.data.nodes.length>0 && this.props.data.links.length>0)
     this.updateChart(this.props.data);
    }
  }

  componentWillReceiveProps(props) {
    if(props.data){
      d3.select(".nodes").remove();
      d3.select(".links").remove();
    if(props.data.nodes.length>0 && props.data.links.length>0)
     this.updateChart(props.data);
    }
  //  d3.select("#chartX").remove();
  }


  updateChart(graph){
    const colors=['#2A92A6','#8D9A9F','#0F655F','#00C0E0','#446F81','#9A88A2','#1AD7CA','#17A59B','#C99D6E','#38484E'];
    var clientHeight = document.getElementById('topo').clientHeight;
      var clientWidth = document.getElementById('topo').clientWidth;



var svg = d3.select("#topo"),
  width = +document.getElementById('topo').clientHeight,
  height = +document.getElementById('topo').clientWidth;

  var color = d3.scaleOrdinal(d3.schemeCategory20);
  var radius=graph.levels*5

  console.log("heightW",clientHeight,clientWidth);

console.log("topologyCharData",graph);
  /*var simulation = d3.forceSimulation()
      .force("link", d3.forceLink().distance(200).strength(3))
      .force("charge", d3.forceManyBody().distanceMin(100).distanceMax(600))
      .force("center", d3.forceCenter(width / 2, height / 2));*/

     var simulation = d3.forceSimulation()
        .force("link", d3.forceLink())
          .force("charge", d3.forceManyBody().distanceMin(10).distanceMax(100))
        .force("center", d3.forceCenter(width/2 , height/4 ));

    var link = svg.append("g")
        .attr("class", "links")
      .selectAll("line")
      .data(graph.links)
      .enter().append("line")
        .attr("stroke-width", "1")
        .attr("stroke",function(d){return "#000"});

    var node = svg.append("g")
        .attr("class", "nodes")
      .selectAll("circle")
      .data(graph.nodes)
      .enter().append("circle")
        .attr("r",10)
        .attr("fill", function(d) {return colors[d.cluster]; })
        .attr("stroke",function(d){ return "#000";})
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    node.append("title")
        .text(function(d) { return JSON.stringify(d.properties) + " "+ d.clusterName +" "+d.id + " "+JSON.stringify(d.filter); });

    simulation
        .nodes(graph.nodes)
        .on("tick", ticked);

    simulation.force("link")
        .links(graph.links);

    function ticked() {
      link
          .attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });

      node
          .attr("cx", function(d) { return d.x; })
          .attr("cy", function(d) { return d.y; });
    }
  //});

    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }



  }


  render(){
    return (
    <svg id="topo" style={{width:100+'%',height:800+'px'}}></svg>
    );
  }
}

export default (DeviceTopologyChart);
