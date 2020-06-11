const KoeData2 = () => {
  return {
    nodes: [
      { name: "tase" },
      /* vastattavaa */
      { name: "Oma pääoma" },
      { name: "Osakepääoma" },
      { name: "Edellisten tilikausien voitto" },
      { name: "Tilikauden voitto" }
    ],
    links: [
      { source: 1, target: 0, value: 100000 },

      { source: 2, target: 1, value: 5000 },
      { source: 3, target: 1, value: 90000 },
      { source: 4, target: 1, value: 5000 }
    ]
  };
};

export const Single = () => {
  return {
    nodes: [{ name: "tase" }, { name: "Oma pääoma" }],
    links: [{ source: 1, target: 0, value: 200000 }]
  };
};

export default KoeData2;
