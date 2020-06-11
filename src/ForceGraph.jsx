import React, { useState, useRef, useEffect } from "react";
import { sankeyLinkHorizontal, sankey, sankeyJustify } from "d3-sankey";
import { select } from "d3-selection";
import { interpolateCool, interpolateWarm } from "d3-scale-chromatic";
import { rgb } from "d3-color";
import { transition } from "d3-transition";
import { easeLinear } from "d3";
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter
} from "d3-force";

export default function Sankey({ data, width, height }) {
  const colors = interpolateWarm;

  const svgRef = useRef(null);
  const indexRef = useRef(0);

  function calculateSankey(data, width, height) {
    const sankeyimpl = sankey()
      .nodeAlign(sankeyJustify)
      .nodeWidth(10)
      .nodePadding(10)
      .extent([[0, 0], [width, height]]);

    return sankeyimpl(data);
  }

  function onClick() {
    if (indexRef.current + 1 < data.length) {
      indexRef.current = indexRef.current + 1;
    } else {
      indexRef.current = 0;
    }
    console.log("onClick");
    drawForceGraph();
    drawSankey();
  }

  useEffect(() => {
    drawForceGraph();
    drawSankey();
  });

  function drawForceGraph() {
    const nodes = [
      { id: "Workday", group: 1 },
      { id: "INT0052 Outbound", group: 2 },
      { id: "INT0053 Inbound", group: 2 },
      { id: "INT0054 Inbound", group: 2 },
      { id: "INT0055 Inbound", group: 2 },
      { id: "INT0056 Inbound", group: 2 },
      { id: "Boomi", group: 3 },
      { id: "CGI0001", group: 2 },
      { id: "CGI0002", group: 2 },
      { id: "CGI0003", group: 2 },
      { id: "CGI0004", group: 2 },
      { id: "CGI0005", group: 2 },
      { id: "CGI0006", group: 2 },
      { id: "Payroll", group: 1 }
    ];

    const links = [
      { source: "Workday", target: "INT0052 Outbound", value: 30 },
      { source: "INT0052 Outbound", target: "Boomi", value: 50 },
      { source: "Boomi", target: "CGI0001", value: 50 },
      { source: "CGI0001", target: "Payroll", value: 30 }
    ];

    const simulation = forceSimulation(nodes)
      .force(
        "link",
        forceLink(links)
          .id(d => d.id)
          .distance(d => d.value)
      )
      .force("charge", forceManyBody().strength(d => -100))
      .force("center", forceCenter(width / 2, height / 2));

    console.log(links);
    console.log(nodes);

    const link = select(svgRef.current)
      .select("g.links")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", d => 2);

    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
    });
  }

  function drawSankey() {
    const { links, nodes } = calculateSankey(
      data[indexRef.current],
      width,
      height
    );

    select(svgRef.current)
      .select("g.nodes")
      .selectAll("rect")
      .data(nodes)
      .join(
        enter => {
          const e = enter.append("rect");

          e.attr("x", d => d.x0).attr("y", d => d.y0);

          e.transition(easeLinear)
            .delay(1000)
            .duration(500)
            .attr("height", d => d.y1 - d.y0)
            .attr("width", d => d.x1 - d.x0)
            .attr("dataIndex", d => d.index)
            .attr("fill", d => colors(d.index / nodes.length));
          e.append("title").text(d => `${d.name}\n${d.value}`);
        },
        update =>
          update
            .transition(easeLinear)
            .delay(500)
            .duration(500)
            .attr("x", d => d.x0)
            .attr("y", d => d.y0)
            .attr("height", d => d.y1 - d.y0)
            .attr("width", d => d.x1 - d.x0)
            .attr("dataIndex", d => d.index)
            .attr("fill", d => colors(d.index / nodes.length))
            .select("title")
            .text(d => `${d.name}\n${d.value}`),
        exit =>
          exit
            .transition(easeLinear)
            .duration(500)
            .style("opacity", 0)
            .remove()
      );

    select(svgRef.current)
      .select("g.texts")
      .selectAll("text")
      .data(nodes)
      .join(
        enter => {
          const e = enter.append("text");

          e.transition(easeLinear)
            .delay(1000)
            .duration(500)
            .attr("x", d => (d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6))
            .attr("y", d => (d.y1 + d.y0) / 2)
            .attr("fill", d => rgb(colors(d.index / nodes.length)).darker())
            .attr("alignment-baseline", "middle")
            .attr("text-anchor", d => (d.x0 < width / 2 ? "start" : "end"))
            .attr("font-size", 9)
            .text(d => d.name);
        },
        update =>
          update
            .transition(easeLinear)
            .delay(500)
            .duration(500)
            .attr("x", d => (d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6))
            .attr("y", d => (d.y1 + d.y0) / 2)
            .attr("fill", d => rgb(colors(d.index / nodes.length)).darker())
            .attr("text-anchor", d => (d.x0 < width / 2 ? "start" : "end"))
            .attr("font-size", 9)
            .text(d => d.name),
        exit =>
          exit
            .transition(easeLinear)
            /* .delay(500) */
            .duration(500)
            .style("opacity", 0)
            .remove()
      );

    select(svgRef.current)
      .select("defs")
      .selectAll("linearGradient")
      .data(links)
      .join(
        enter => {
          const lg = enter.append("linearGradient");

          lg.attr("id", d => `gradient-${d.index}`)
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", d => d.source.x1)
            .attr("x2", d => d.target.x0);

          lg.append("stop")
            .attr("offset", "0")
            .attr("stop-color", d => colors(d.source.index / nodes.length));

          lg.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", d => colors(d.target.index / nodes.length));
        },
        update => {
          update
            .attr("id", d => `gradient-${d.index}`)
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", d => d.source.x1)
            .attr("x2", d => d.target.x0);
          update.selectAll("stop").remove();
          update
            .append("stop")
            .attr("offset", "0")
            .attr("stop-color", d => colors(d.source.index / nodes.length));

          update
            .append("stop")
            .attr("offset", "100%")
            .attr("stop-color", d => colors(d.target.index / nodes.length));
        },
        exit => exit.remove()
      );

    /*
    select(svgRef.current)
      .select("g.links")
      .selectAll("path")
      .data(links)
      .join(
        enter => {
          const e = enter.append("path");
          e.transition(easeLinear)
            .delay(1000)
            .duration(500)
            .attr("d", sankeyLinkHorizontal())
            .attr("stroke", d => `url(#gradient-${d.index}`)
            .attr("stroke-width", d => d.width);
        },
        update =>
          update
            .transition(easeLinear)
            .delay(500)
            .duration(500)
            .attr("d", sankeyLinkHorizontal())
            .attr("stroke", d => `url(#gradient-${d.index}`)
            .attr("stroke-width", d => d.width),
        exit =>
          exit
            .transition(easeLinear)
            .duration(500)
            .style("opacity", 0)
            .remove()
      );
      */

    console.log(svgRef.current);
  }

  return (
    <svg
      width={width}
      height={height}
      onClick={onClick}
      ref={svgRef}
      style={{
        userSelect: "none"
      }}
    >
      <defs />
      <g className="nodes" style={{ stroke: "#000", strokeOpacity: 0.5 }} />
      <g
        className="links"
        style={{ fill: "none", stroke: "#000", strokeOpacity: 0.3 }}
      />
      <g className="texts" />
    </svg>
  );
}
