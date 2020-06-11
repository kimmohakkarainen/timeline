import React, { useLayoutEffect, useState } from "react";
import "./styles.css";
import Sankey from "./Sankey2";
import Timeline from "./Timeline";
/* import Sankey from "./ForceGraph"; */
import Exadeci from "./exadeci";
import AtozData from "./data/atozdata";
import AtozData2019 from "./data/atozdata2019";
import KoeData1 from "./data/koedata1";
import KoeData2, { Single } from "./data/koedata2";

import PersonAdminView from "./personadminview";

export default function App() {
  const data4 = AtozData();
  const data5 = AtozData2019();
  const data1 = KoeData1();
  const data2 = KoeData2();
  const data3 = Single();

  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    function updateSize() {
      setSize({
        width: window.innerWidth - 100,
        height: window.innerHeight - 30
      });
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  /*

  return (
    <div className="App">
      
      <Sankey
        data={[data1, data2, data3, data4, data5]}
        width={size.width}
        height={size.height}
      />
    </div>
  );

  */
  return (
    <div className="App">
      <Timeline width={100} height={100} />
    </div>
  );
}
