import {
	getNewArrivals,
	getBestSellers,
	getComboAssembling,
	getMQASupport,
} from "./searchProduct.js";
const currentPath = path || "";
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
const selectSelectedText = selectSelected.querySelector(".select-selected__text");
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
		const tabContent = productTabs.querySelector(`.tab-content[data-tab-content="${index}"]`);
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
	if (!customSelect.contains(event.target) && !selectItems.contains(event.target)) {
		selectItems.classList.add("select-hide");
	}
});

document.querySelectorAll(".tab-content[data-tab-content]").forEach((tab, index) => {
	const items = tabs[index].getFunc(0, tabs[index].numberOfItems);
	items.forEach((item, index) => {
		const media = item.media.filter((m) => m.media_type === "image");
		const ib = document.createElement("div");
		ib.classList.add("ib-column");
		ib.innerHTML = `
        <div class="pcard cursor-pointer prod__block">
          <div class="pcard__img">
            <div class="image-box | overflow-hidden cursor-pointer relative">
              <div class="flex justify-center items-center">
                <a href="${currentPath + item.url}" class="block w-full">
                  <div class="main-img">
                    <div class="p-img ib-image">
                      <img
                        src="${currentPath + media[0].src}"
                        alt="${media[0].alt}"
                        class="img-loaded w-full h-full"
                        sizes="244px"
                        width="244"
                        height="163"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  ${
						media.length > 1
							? `<div class="hover-img">
                      <div class="p-img ib-image">
                        <img
                        src="${currentPath + media[1].src}"
                        alt="${media[1].alt}"
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
                  <a href="${currentPath + item.url}"
									class="block mb-[5px] leading-normal pcard__name font-bold truncate-lines hover:text-color-secondary">
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
                      data-product-price="${item.price}">$${item.price / 100} USD</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="pcard__action">
            <button class="btn-quickview">
              <div class="tooltip-item btn-icon block tooltip-top tooltip-style-1">
                <span class="tooltip-icon block">
                <svg class="w-4 h-4" fill="currentColor" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5m0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3"></path>
                </svg>
                </span>
                <span class="tooltip-content">Quick view</span>
              </div>
            </button>
            <button class="btn-addtocart">
              <div class="tooltip-item btn-icon block tooltip-top tooltip-style-1">
                <span class="tooltip-icon block">
                  <svg class="w-4 h-4" fill="currentColor" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                    <path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2zM6.16 6h12.15l-2.76 5H8.53zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2m10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2"></path>
                  </svg>
                </span>
                <span class="tooltip-content">${item.variants.length > 1 ? "Select options" : "Add to cart"}</span>
              </div>
            </button>
          </div>
          <div class="background-color-expand"></div>
        </div>
      `;
		tab.querySelector(".ib-grid").appendChild(ib);
	});
});
