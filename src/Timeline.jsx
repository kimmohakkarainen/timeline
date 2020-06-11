import React, { useState, useRef } from "react";
import * as d3 from "d3";

const data = [
  {
    civilization: "Greek age",
    start: -1200,
    end: 0,
    region: "Middle East",
    timeline: "ANCIENT"
  },
  {
    civilization: "Ancient Andean region",
    start: -1000,
    end: 500,
    region: "Middle East",
    timeline: "ANCIENT"
  }
];

const margin = { top: 30, right: 30, bottom: 30, left: 30 };

const formatDate = d => (d < 0 ? `${-d}BC` : `${d}AD`);

const axisBottom = d3
  .axisBottom(x)
  .tickPadding(2)
  .tickFormat(formatDate);

const axisTop = d3
  .axisTop(x)
  .tickPadding(2)
  .tickFormat(formatDate);

export default function Timeline({ width, height }) {
  const svgRef = useRef(null);

  const timelines = ["ANCIENT", "MEDIAVAL", "MODERN"];

  const color = d3.scaleOrdinal(d3.schemeSet2).domain(regions);

  const y = d3
    .scaleBand()
    .domain(d3.range(data.length))
    .range([0, height - margin.bottom - margin.top])
    .padding(0.2);

  const x = d3
    .scaleLinear()
    .domain([d3.min(data, d => d.start), d3.max(data, d => d.end)])
    .range([0, width - margin.left - margin.right]);

  const regions = d3
    .nest()
    .key(d => d.region)
    .entries(data)
    .map(d => d.key);

  const timelines = dataByTimeline.map(d => d.key);

  const dataByTimeline = d3
    .nest()
    .key(d => d.timeline)
    .entries(data);

  const dataByRegion = d3
    .nest()
    .key(d => d.region)
    .entries(data);

  function getRect(d) {
    const el = d3.select(svgRef.current);
    const sx = x(d.start);
    const w = x(d.end) - x(d.start);
    const isLabelRight = sx > width / 2 ? sx + w < width : sx - w > 0;

    el.style("cursor", "pointer");

    el.append("rect")
      .attr("x", sx)
      .attr("height", y.bandwidth())
      .attr("width", w)
      .attr("fill", d.color);

    el.append("text")
      .text(d.civilization)
      .attr("x", isLabelRight ? sx - 5 : sx + w + 5)
      .attr("y", 2.5)
      .attr("fill", "black")
      .style("text-anchor", isLabelRight ? "end" : "start")
      .style("dominant-baseline", "hanging");
  }

  console.log(y);
  console.log(x);

  return (
    <svg width={width} height={height} ref={svgRef}>
      <g />
    </svg>
  );
}
