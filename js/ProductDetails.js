document.querySelector(".accordion-item[data-desc] .prose").innerHTML =
  product.description.replace(
    /<img/g,
    '<img loading="lazy" width="auto" height="auto"',
  );
metafields &&
  metafields.length &&
  metafields.forEach((metafield, index) => {
    const tabTitles =
      metafieldsTitle.length > 0
        ? metafieldsTitle
        : ["SPECIFICATIONS", "WHAT'S IN THE BOX?"];
    const tabsWrap = document.querySelector(".tabs-adds-wrap");
    const reviewTab = document.querySelector(".review-tab");
    const tabBlock = document.createElement("div");
    tabBlock.classList.add("tabs-adds-blocks");
    tabBlock.innerHTML = `
    <div class="tabs-adds-header border-color-border border-b">${tabTitles[index]}</div>
    <p>
      <span class="metafield">${metafield}</span>
    </p>
    `;
    tabsWrap.insertBefore(tabBlock, reviewTab);
  });

const tabHeaders = document.querySelectorAll(".tab-header");
const tabContents = document.querySelectorAll(".tab-content");

tabHeaders.forEach((tabHeader, index) => {
  tabHeader.addEventListener("click", () => {
    tabHeaders.forEach((tabHeader) => tabHeader.classList.remove("active"));
    tabContents.forEach((tabContent) => tabContent.classList.remove("active"));
    tabHeader.classList.add("active");
    tabContents[index].classList.add("active");
  });
});

const accordionItems = document.querySelectorAll(".accordion-item");
const accordionButtons = document.querySelectorAll(".accordion-button");
const accordionContents = document.querySelectorAll(".accordion-content");

accordionButtons.forEach((accordionButton, index) => {
  accordionButton.addEventListener("click", () => {
    accordionItems[index].classList.toggle("open");
    accordionContents[index].classList.toggle("open");
    accordionContents[index].classList[
      accordionContents[index].classList.contains("open") ? "add" : "remove"
    ]("overflow-hidden");
  });
});
