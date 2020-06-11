import React, { useState } from "react";
import { sankeyLinkHorizontal, sankey, sankeyJustify } from "d3-sankey";
import { interpolateCool, interpolateWarm } from "d3-scale-chromatic";

import Link from "./Link";
import Rect from "./Rect";

function Sankey({ data, width, height }) {
  const colors = interpolateWarm;

  const [index, setIndex] = useState(0);

  const sankeyimpl = sankey()
    .nodeAlign(sankeyJustify)
    .nodeWidth(10)
    .nodePadding(10)
    .extent([[0, 0], [width, height]]);

  const { links, nodes } = sankeyimpl(data[index]);

  function onClick() {
    if (data.length <= index + 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  }

  return (
    <svg width={width} height={height} onClick={onClick}>
      <g>
        {links.map((d, i) => (
          <Link
            key={d.index}
            data={d}
            width={d.width}
            length={nodes.length}
            colors={colors}
          />
        ))}
      </g>
      <g>
        {nodes.map((d, i) => (
          <Rect
            key={d.index}
            index={d.index}
            x0={d.x0}
            x1={d.x1}
            y0={d.y0}
            y1={d.y1}
            name={d.name}
            value={d.value}
            length={nodes.length}
            colors={colors}
          />
        ))}
      </g>
    </svg>
  );
}

export default Sankey;
