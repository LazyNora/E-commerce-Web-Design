import {
	getNewArrivals,
	getBestSellers,
	getComboAssembling,
	getMQASupport,
} from "./searchProduct.js";
const tabs = [
	{
		title: "New Arrivals",
		link: "/collections/new-arrivals",
		getFunc: getNewArrivals,
		numberOfItems: 10,
	},
	{
		title: "Best Sellers",
		link: "/collections/best-sellers",
		getFunc: getBestSellers,
		numberOfItems: 15,
	},
	{
		title: "Combo Assembling",
		link: "/collections/combo-assembling",
		getFunc: getComboAssembling,
		numberOfItems: 10,
	},
	{
		title: "MQA Support",
		link: "/collections/mqa-support",
		getFunc: getMQASupport,
		numberOfItems: 10,
	},
];
const customSelect = document.querySelector(".custom-select");
const select = customSelect.querySelector("select[data-tab-select]");
const selectItems = customSelect.querySelector(".select-items");
const selectSelected = customSelect.querySelector(".select-selected");
const selectSelectedText = selectSelected.querySelector(
	".select-selected__text"
);
const productTabs = document.querySelector(".product-tabs__content");

tabs.forEach((tab, index) => {
	const option = document.createElement("option");
	option.value = index;
	option.textContent = tab.title;
	select.appendChild(option);

	const tabContent = document.createElement("div");
	tabContent.classList.add("tab-content", "opacity-0");
	tabContent.dataset.tabContent = index;
	tabContent.innerHTML = `
    <div class="ib">
      <div class="ib-grid ib-wrapper grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"></div>
    </div>
    <div class="mt-8 md:mt-10 xl:mt-15 flex justify-center">
      <a class="btn-link" href=".${tab.link}">
        <span>Shop All Products</span>
      </a>
    </div>
	`;
	productTabs.appendChild(tabContent);

	const item = document.createElement("div");
	item.textContent = tab.title;
	item.addEventListener("click", () => {
		const sameAsSelected = selectItems.querySelector(".same-as-selected");
		if (sameAsSelected) {
			sameAsSelected.classList.remove("same-as-selected");
		}
		const tabContent = productTabs.querySelector(
			`.tab-content[data-tab-content="${index}"]`
		);
		const activeTab = productTabs.querySelector(".tab-content.active");
		if (activeTab) {
			activeTab.classList.remove("active");
		}
		tabContent.classList.add("active");
		item.classList.add("same-as-selected");
		selectSelectedText.textContent = tab.title;
		selectItems.classList.add("select-hide");
		select.value = index;
	});
	selectItems.appendChild(item);
});

selectSelectedText.textContent = tabs[0].title;
productTabs.querySelector(".tab-content").classList.add("active");

selectSelected.addEventListener("click", () => {
	selectItems.classList.toggle("select-hide");
});

select.addEventListener("change", () => {
	selectSelectedText.textContent = tabs[select.value].title;
});

document.addEventListener("click", (event) => {
	if (
		!customSelect.contains(event.target) &&
		!selectItems.contains(event.target)
	) {
		selectItems.classList.add("select-hide");
	}
});

document
	.querySelectorAll(".tab-content[data-tab-content]")
	.forEach((tab, index) => {
		const items = tabs[index].getFunc(0, tabs[index].numberOfItems);
		items.forEach((item, index) => {
			const ib = document.createElement("div");
			ib.classList.add("ib-column");
			ib.innerHTML = `
        <div class="pcard cursor-pointer prod__block">
          <div class="pcard__img">
            <div class="image-box | overflow-hidden cursor-pointer relative">
              <div class="flex justify-center items-center">
                <a href=".${item.url}" class="block w-full">
                  <div class="main-img">
                    <div class="p-img ib-image">
                      <img
                        src="${item.media[0].src}"
                        alt="${item.media[0].alt}"
                        class="img-loaded w-full h-full"
                        sizes="244px"
                        width="244"
                        height="163"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  ${
						item.media[1].src
							? `<div class="hover-img">
                      <div class="p-img ib-image">
                        <img
                        src="${item.media[1].src}"
                        alt="${item.media[1].alt}"
                        class="img-loaded w-full h-full"
                        sizes="244px"
                        width="244"
                        height="163"
                        loading="lazy"
                        />
                      </div>
                    </div>`
							: ""
					}
                </a>
              </div>
            </div>
          </div>
          <div class="pcard__content text-left relative">
            <div class="mt-3 lg:mt-5">
              <div class="w-full max-w-full">
                <h3 class="block text-base">
                  <a href=".${
						item.url
					}" class="block mb-[5px] leading-normal pcard__name font-bold truncate-lines hover:text-color-secondary">
                    ${item.title}
                  </a>
                </h3>
                <div class="pcard__reviews"></div>
              </div>
              <div class="pcard__price leading-normal">
                <div class="price inline-flex items-center flex-wrap">
                  <div class="price__regular">
                    <span class="visually-hidden visually-hidden--inline">
                      Regular price
                    </span>
                    <span class="price-item price-item--regular">
                      <span class="money"
                      data-product-price="${item.price}"></span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="background-color-expand"></div>
        </div>
      `;
			tab.querySelector(".ib-grid").appendChild(ib);
		});
	});
