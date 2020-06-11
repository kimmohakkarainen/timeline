import React, { useState, useRef, useEffect } from "react";
import { select } from "d3-selection";
import { transition } from "d3-transition";
import { easeLinear } from "d3";

export default function Exadeci({ width, height }) {
  const svgRef = useRef(null);

  useEffect(() => {
    /* drawText(); */
    drawLogo();
  });

  function drawLogo() {
    if (width > 0 && svgRef.current) {
      select(svgRef.current)
        .selectAll("g.logo")
        .data([1])
        .join(
          enter => {
            const p = enter
              .append("g")
              .attr("class", "logo")
              .attr("fill", "none")
              .attr("stroke", "#000")
              .attr("opacity", 0.6)
              .attr("stroke-width", 2);

            p.append("path")
              .attr(
                "d",
                "m 300 20 l -30 0 c 30 0 30 0 30 0 c -30 0 -30 0 -30 0"
              )
              .transition(easeLinear)
              .delay(250)
              .duration(1000)
              .attr(
                "d",
                "m 300 20 l -30 0 c 0 -20 30 -20 30 0 c 0 20 -25 20 -30 10"
              );
            p.append("path")
              .attr("d", "m 310 0 l 0 35 m 0 -15 l 0 -15 m 0 10 l 0 20")
              .transition(easeLinear)
              .delay(500)
              .duration(1000)
              .attr("d", "m 310 0 l 0 35 m 0 -15 l 15 -15 m -10 10 l 12 20");

            p.append("path")
              .attr(
                "d",
                "m 355 15 s -10 0 -10 0 s 0 0 0 0 s 0 0 0 0 s -10 0 -10 0"
              )
              .transition(easeLinear)
              .delay(750)
              .duration(1000)
              .attr(
                "d",
                "m 355 15 s 0 -10 -10 -10 s -14 10 0 14 s 10 16 0 16 s -10 -9 -10 -9"
              );
          },
          update => {},
          exit => exit.remove()
        );
    }
  }

  function drawText() {
    if (width > 0 && height > 0 && svgRef.current) {
      select(svgRef.current)
        .selectAll("g.text")
        .data([{ text: "© 2017-2020 ɘksɐdɘsɪ" }])
        .join(
          enter => {
            const e = enter
              .append("g")
              .attr("class", "text")
              .append("text");
            e.attr("text-anchor", "end")
              .attr("x", 0)
              .attr("y", 20)
              .attr("fill", "#000")
              .attr("alignment-baseline", "middle")
              .attr("font-size", 9)
              .text(d => d.text);
            e.transition(easeLinear)
              .duration(250)
              .attr("text-anchor", "middle")
              .attr("x", width / 2);
          },
          update => {
            const u = update.select("text");
            u.transition()
              .duration(250)
              .attr("x", width / 2);
          }
        );
    }
  }

  return <svg width={width} height={height} ref={svgRef} />;
}
