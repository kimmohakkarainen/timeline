const AtozData2019 = () => {
  return {
    nodes: [
      { name: "tase" },
      /* vastattavaa */
      { name: "Oma päoma" },
      { name: "Osakepäoma" },
      { name: "Edellisten tilikausien voitto" },
      { name: "Tilikauden voitto" },

      { name: "Vieras pääoma" },

      { name: "Pitkäaikainen" },
      { name: "Lainat" },

      { name: "Lyhytaikainen" },
      { name: "Ostovelat" },
      { name: "Muut velat" },
      { name: "Siirtovelat" },

      /* vastaavaa */

      { name: "Pysyvät vastaavat" },
      { name: "Liikearvo" },

      { name: "Vaihtuvat vastaavat" },

      { name: "Saamiset" },
      { name: "Myyntisaamiset" },
      { name: "Muut saamiset" },
      { name: "Siirtosaamiset" },

      { name: "Rahat ja pankkisaamiset" }
    ],
    links: [
      { source: 1, target: 0, value: 299195 },

      { source: 2, target: 1, value: 5029 },
      { source: 3, target: 1, value: 80997 },
      { source: 4, target: 1, value: 213169 },

      { source: 5, target: 0, value: 454991 },

      { source: 6, target: 5, value: 126000 },
      { source: 7, target: 6, value: 126000 },

      { source: 8, target: 5, value: 328991 },
      { source: 9, target: 8, value: 77016 },
      { source: 10, target: 8, value: 98825 },
      { source: 11, target: 8, value: 153149 },

      { source: 0, target: 12, value: 4800 },
      { source: 0, target: 14, value: 749387 },

      { source: 12, target: 13, value: 4800 },

      { source: 14, target: 15, value: 521949 },

      { source: 15, target: 16, value: 514797 },
      { source: 15, target: 17, value: 4997 },
      { source: 15, target: 18, value: 2173 },

      { source: 14, target: 19, value: 227437 }
    ]
  };
};

export default AtozData2019;
