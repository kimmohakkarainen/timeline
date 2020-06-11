const KoeData1 = () => {
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
      { source: 1, target: 0, value: 214772 },

      { source: 2, target: 1, value: 5029 },
      { source: 3, target: 1, value: 80997 },
      { source: 4, target: 1, value: 128746 }
    ]
  };
};

export default KoeData1;
