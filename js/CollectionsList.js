const collections = [
  {
    title: "Accessories",
    url: "./accessories",
  },
  {
    title: "All Products",
    url: "./all",
  },
  {
    title: "ASTROTEC",
    url: "./astrotec",
    image: "./assets/logo-astrotec.png",
  },
  {
    title: "AUDIRECT",
    url: "./audirect",
    image: "./assets/logo-audirect.png",
  },
  {
    title: "AUGLAMOUR",
    url: "./auglamour",
    image: "./assets/logo-AUGLAMOUR.png",
  },
  {
    title: "Best Sellers",
    url: "./best-sellers",
  },
  {
    title: "BGVP",
    url: "./bgvp",
    image: "./assets/logo-BGVP.jpg",
  },
  {
    title: "BLON",
    url: "./blon",
  },
  {
    title: "BRAVO",
    url: "./bravo-audio",
    image: "./assets/logo-BravoAudio.jpg",
  },
  {
    title: "CCA",
    url: "./cca",
    image: "./assets/logo-CCA.jpg",
  },
  {
    title: "CHORD",
    url: "./chord",
    image: "./assets/logo-chord.svg",
  },
  {
    title: "Combo Assembling",
    url: "./combo-assembling",
  },
  {
    title: "COWON",
    url: "./cowon",
    image: "./assets/logo-COWON.svg",
  },
  {
    title: "DARKVOICE",
    url: "./darkvoice",
  },
  {
    title: "DD",
    url: "./dd",
    image: "./assets/logo-ddHIFI.png",
  },
  {
    title: "Desktop DAC",
    url: "./desktop-dac",
  },
  {
    title: "Digital to Analog Convertor (DAC)",
    url: "./dac",
  },
  {
    title: "DUNU",
    url: "./dunu",
    image: "./assets/logo-DUNU.png",
  },
  {
    title: "FANMUSIC",
    url: "./fanmusic",
    image: "./assets/logo-FANMUSIC.jpg",
  },
  {
    title: "FORREST",
    url: "./forrest",
  },
  {
    title: "FX AUDIO",
    url: "./fx-audio",
    image: "./assets/logo-fxaudio.png",
  },
  {
    title: "GOLDENWAVE",
    url: "./goldenwave",
    image: "./assets/logo-GOLDENWAVE.png",
  },
  {
    title: "GUSTARD",
    url: "./gustard",
    image: "./assets/logo-GUSTARD.png",
  },
  {
    title: "Headphone Amplifiers",
    url: "./headphone-amplifiers",
  },
  {
    title: "Headphones",
    url: "./headphones",
  },
  {
    title: "HIEGI",
    url: "./hiegi",
    image: "./assets/logo-HIEGI.png",
  },
  {
    title: "HIVI",
    url: "./hivi",
    image: "./assets/logo-HiVi.jpg",
  },
  {
    title: "HXMELODY",
    url: "./hxmelody",
    image: "./assets/logo-HXMELODY.png",
  },
  {
    title: "In-ear Headphone",
    url: "./in-ear-headphone",
  },
  {
    title: "IRIVER",
    url: "./iriver",
    image: "./assets/logo-IRIVER.svg",
  },
  {
    title: "KINERA",
    url: "./kinera",
    image: "./assets/logo-KINERA.png",
  },
  {
    title: "KZ",
    url: "./kz",
  },
  {
    title: "L.K.S",
    url: "./l-k-s",
  },
  {
    title: "LADDER",
    url: "./ladder",
  },
  {
    title: "LITTLEDOT",
    url: "./littledot",
  },
  {
    title: "LOTOO",
    url: "./lotoo",
  },
  {
    title: "MACAW",
    url: "./macaw",
  },
  {
    title: "MATRIX",
    url: "./matrix",
  },
  {
    title: "MOCHA",
    url: "./mocha",
  },
  {
    title: "MOONDROP",
    url: "./moondrop",
    image: "./assets/logo-MOONDROP.svg",
  },
  {
    title: "MQA SUPPORT",
    url: "./mqa-support",
  },
  {
    title: "New Arrivals",
    url: "./new-arrivals",
  },
  {
    title: "NFAUDIO",
    url: "./nfaudio",
  },
  {
    title: "ORIOLUS",
    url: "./oriolus",
  },
  {
    title: "OSTRY",
    url: "./ostry",
  },
  {
    title: "PEACOCK AUDIO",
    url: "./peacock-audio",
  },
  {
    title: "Portable DAC",
    url: "./portable-dac",
  },
  {
    title: "QDC",
    url: "./qdc",
  },
  {
    title: "QULOOS",
    url: "./quloos",
  },
  {
    title: "S.M.S.L",
    url: "./s-m-s-l",
  },
  {
    title: "Sales",
    url: "./sales",
  },
  {
    title: "SHANLING",
    url: "./shanling",
  },
  {
    title: "SHOZY",
    url: "./shozy",
  },
  {
    title: "SINGXER",
    url: "./singxer",
  },
  {
    title: "SMABAT",
    url: "./smabat",
  },
  {
    title: "SOFTEARS",
    url: "./softears",
  },
  {
    title: "SOUNDAWARE",
    url: "./soundaware",
  },
  {
    title: "Speaker Amplifiers",
    url: "./speaker-amplifiers",
  },
  {
    title: "TANCHJIM",
    url: "./tanchjim",
  },
  {
    title: "TENHZ",
    url: "./tenhz",
  },
  {
    title: "TINHIFI",
    url: "./tinhifi",
  },
  {
    title: "TIPSY",
    url: "./tipsy",
  },
  {
    title: "TOPPING",
    url: "./topping",
    image: "./assets/logo-TOPPING.jpg",
  },
  {
    title: "TRN",
    url: "./trn",
  },
  {
    title: "TRUTHEAR",
    url: "./truthear",
    image: "./assets/logo-TRUTHEAR.jpg",
  },
  {
    title: "Wireless Headphones",
    url: "./wireless-headphones",
  },
  {
    title: "XDUOO",
    url: "./xduoo",
  },
  {
    title: "YAQIN",
    url: "./yaqin",
  },
  {
    title: "YULONG",
    url: "./yulong",
  },
  {
    title: "ZYCABLE",
    url: "./zycable",
  },
];

document.querySelector(".collections-grid").innerHTML = collections
  .map((collection) => {
    return `
      <div class="collections-column">
        <div class="collection-card card--hover-scaling-up">
          <div class="collection-card__inner">
            <a
              href="${collection.url}"
              class="collection-card__image block overflow-hidden w-full p-4 border">
              <div class="card__image" style="--aspect-ratio: 1">
                <img
                  src="${collection.image || "./assets/placeholder.png"}"
                  alt="${collection.title}"
                  width="338"
                  height="338"
                  sizes="338px"
                  class="w-full img-loaded"/>
              </div>
            </a>
            <div
              class="collection-card__info md:mt-5 mt-2.5 text-center">
              <h3>
                <a
                  href="${collection.url}"
                  class="text-lg md:text-xl font-bold block"
                  >${collection.title}</a
                >
              </h3>
            </div>
          </div>
        </div>
      </div>
    `;
  })
  .join("");
