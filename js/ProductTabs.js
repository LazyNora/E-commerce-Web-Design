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
        <div class="pcard cursor-pointer prod__block" data-product-handle="${item.handle}">
        <div class="pcard cursor-pointer prod__block" data-product-handle="${item.handle}">
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
          <div class="pcard__action hidden lg:block">
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

		const quickviewBtn = ib.querySelector(".btn-quickview");
		const addtocartBtn = ib.querySelector(".btn-addtocart");

		const quickview = () => {
			const modal = document.createElement("div");
			modal.classList.add(
				"modal",
				"modal__wrapper",
				"fixed",
				"inset-0",
				"px-5",
				"bg-black",
				"flex",
				"items-center",
				"justify-center",
				"transition-opacity",
				"opacity-0",
				"duration-200",
				"ease-out",
				"opacity-100",
				"z-[99]"
			);
			modal.style.setProperty("--tw-bg-opacity", "0.3");
			modal.innerHTML = `
      <div class="modal__content bg-white relative rounded max-h-[90vh] modal__quickview" style="width:960px">
        <button class="modal__close text-black absolute p-2 bg-white hover:bg-gray-300 rounded-full z-10">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <div class="modal__content-inner">
          <div class="flex flex-col lg:flex-row w-full pqv prod__block product-wrapper prod__info items-start">
            <div class="w-full lg:w-1/2 p-[50px]">
              <div class="relative overflow-hidden flex items-center justify-center" style="--aspect-ratio: 1.499">
                <div class="pqv__media">
                  <div class="media-gallery w-full">
                    <div class="pis__wrapper overflow-hidden w-full">
                      <div class="preview__wrapper mb-4 flex-grow">
                        <div class="swiper-container quickview-swiper">
                          <div class="swiper-wrapper main-slider pis h-full">
                          ${item.media
								.map(
									(media, index) =>
										`
                                <div class="swiper-slide prod-media-item media-type-${media.media_type}" data-index=${index} data-media-type=${media.media_type} data-media-id=${media.id} data-aspect-ratio="1.499">
                                  ${
										media.media_type === "image"
											? `
                                  <div class="prod-media media-image" data-media-id=${media.id} data-media-width=${media.width} data-media-height=${media.height} data-media-alt=${media.alt} data-media-src=${media.src}>
                                    <div class="prod-image" style="aspect-ratio: 1.499">
                                      <img class="img-loaded" src=${path + media.src} sizes="946px" loading="lazy" width="946" height="631" alt=${media.alt} fetchpriority="auto">
                                    </div>
                                  </div>
                                  `
											: `
                                  <div class="deferred-media" style="/*padding-top: 56.25%;*/" data-media-id=${media.id} data-auto-play="true">
                                    <video playinline controls autoplay loop muted aria-label=${item.title} poster=${media.preview_image.src}>
                                      <source src=${media.sources[media.sources.findIndex((src) => src.width === 1280)].url} type="video/mp4">
                                      <img src=${media.preview_image.src}>
                                    </video>
                                  </div>
                                  `
									}
                                </div>
                                `
								)
								.join("")}
                          </div>
                          ${
								item.media.length > 1
									? `<div class="absolute z-10 pointer-events-none inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-4">
                            <button class="swiper-button-control swiper-button-prev btn-icon | tooltip-item tooltip-right tooltop-style-1">
                              <span class="tooltip-icon block">
                                <svg
                                  width="14px"
                                  height="14px"
                                  fill="currentColor"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 448 512">
                                  <path d="M229.9 473.899l19.799-19.799c4.686-4.686 4.686-12.284 0-16.971L94.569 282H436c6.627 0 12-5.373 12-12v-28c0-6.627-5.373-12-12-12H94.569l155.13-155.13c4.686-4.686 4.686-12.284 0-16.971L229.9 38.101c-4.686-4.686-12.284-4.686-16.971 0L3.515 247.515c-4.686 4.686-4.686 12.284 0 16.971L212.929 473.9c4.686 4.686 12.284 4.686 16.971-.001z"></path>
                                </svg>
                              </span>
                              <span class="tooltip-content">Previous</span>
                            </button>
                            <button class="swiper-button-control swiper-button-next btn-icon | tooltip-item tooltip-left tooltop-style-1">
                              <span class="tooltip-icon block">
                                <svg
                                  fill="currentColor"
                                  width="14px"
                                  height="14px"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 448 512">
                                  <path d="M218.101 38.101L198.302 57.9c-4.686 4.686-4.686 12.284 0 16.971L353.432 230H12c-6.627 0-12 5.373-12 12v28c0 6.627 5.373 12 12 12h341.432l-155.13 155.13c-4.686 4.686-4.686 12.284 0 16.971l19.799 19.799c4.686 4.686 12.284 4.686 16.971 0l209.414-209.414c4.686-4.686 4.686-12.284 0-16.971L235.071 38.101c-4.686-4.687-12.284-4.687-16.97 0z"></path>
                                </svg>
                                </span>
                              <span class="tooltip-content">Next</span>
                            </button>
                          </div>`
									: ""
							}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full flex flex-col overflow-y-scroll custom_scroll lg:w-1/2 lg:absolute top-0 right-0 h-full">
              <div class="quick-view__info p-4 lg:p-8">
                <div class="prod__title flex justify-between items-center">
                  <h1 class="text-2xl md:text-3xl md:leading-[42px] pr-2">
                    <a href="${currentPath + item.url}">${item.title}</a>
                  </h1>
                </div>
                <div class="price inline-flex items-center flex-wrap">
                  <div class="price__regular">
                    <span class="visually-hidden visually-hidden--inline">
                      Regular price
                    </span>
                    <span class="price-item price-item--regular text-xl md:text-2xl">
                      <span
                        class="money"
                        data-product-price=${item.variants[0].price}>$${item.variants[0].price / 100} USD</span>
                    </span>
                  </div>
                </div>
                <div class="hidden lg:block mt-[25px] mb-4 text-color-secondary">
                  <a class="block mt-2 underline text-black" href="${currentPath + item.url}">View details</a>
                </div>
                <div class="actions-block border-b border-color-border">
                  <div class="product-options">
                    <div data-product-id=${item.id}>
                      <div class="variant-picker">
                        ${item.options
							.map((option, index) =>
								option.values[1] !== null && option.name !== "Title"
									? `
                              <div class="product-options__option product-options__option--dropdown">
                                <div
                                  class="variant-select"
                                  data-picker-field="select"
                                  data-option-name=${option.name}
                                  data-option-position=${option.position}
                                  data-selected-value=${item.variants[0]?.options[index]}>
                                  <div class="prod__option-label | font-medium flex flex-wrap items-center justify-between prod__option-label--dropdown uppercase">
                                    <label
                                      class="form-label"
                                      for="option_${option.position}">
                                      <span class="font-bold mr-1">${option.name}:</span>
                                      <span class="selected-value">
                                        ${item.variants[0]?.options[index]}
                                      </span>
                                    </label>
                                  </div>
                                  <div class="prod__option prod__option--dropdown">
                                    <div class="flex flex-wrap">
                                      <select
                                        id="option_${option.position}"
                                        class="select-bordered uppercase"
                                        name="options[${option.name}]">
                                        ${option.values
											.map(
												(value, index2) =>
													`
                                          <option
                                            ${item.variants[0]?.options[index] === value ? "selected" : ""}
                                            value="${value.toString()}"
                                            class="variant-picker__option product-option-item"
                                            data-value="${value.toString()}"
                                            data-option-position=${option.position}>${value}</option>
                                          `
											)
											.join("")}
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            `
									: ""
							)
							.join("")}
                      </div>
                    </div>
                  </div>
                  <div class="product-form__actions">
                    <label class="prod__option-label prod__option-label__quantity font-bold hidden md:block">
                      Quantity
                    </label>
                    <div class="flex flex-wrap items-end">
                      <div class="form__input-wrapper form__input-wrapper--select mr-5 w-32">
                        <label class="prod__option-label font-medium md:hidden">
                          Quantity
                        </label>
                        <div class="quantity-input h-[46px] flex border border-color-border rounded ">
                          <button class="quantity-input__button flex items-center justify-center h-[46px] w-[46px]" type="button" aria-label="Decrease quantity of by one" data-quantity-selector="decrease" name="minus">
                            <svg class="w-[12px] h-[12px]" fill="currentColor" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                              <path d="M376 232H8c-4.42 0-8 3.58-8 8v32c0 4.42 3.58 8 8 8h368c4.42 0 8-3.58 8-8v-32c0-4.42-3.58-8-8-8z"></path>
                            </svg>
                          </button>
                          <input class="quantity-input__element w-10 text-center flex-grow shrink appearance-none" type="number" name="quantity" value="1" min="1" aria-label="Product quantity">
                          <button class="quantity-input__button flex items-center justify-center h-[46px] w-[46px]" type="button" aria-label="Increase quantity of by one" data-quantity-selector="increase" name="plus">
                            <svg class="w-[12px] h-[12px]" fill="currentColor" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                              <path d="M376 232H216V72c0-4.42-3.58-8-8-8h-32c-4.42 0-8 3.58-8 8v160H8c-4.42 0-8 3.58-8 8v32c0 4.42 3.58 8 8 8h160v160c0 4.42 3.58 8 8 8h32c4.42 0 8-3.58 8-8V280h160c4.42 0 8-3.58 8-8v-32c0-4.42-3.58-8-8-8z"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <button name="add" class="btn-quickatc add-to-cart btn flex-grow shrink relative"><span>Add to cart</span></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;
			document.documentElement.classList.add("prevent-scroll");
			document.body.appendChild(modal);
			document.querySelector(".currency-selector").dispatchEvent(new Event("change"));

			const close = modal.querySelector(".modal__close");
			close.addEventListener("click", () => {
				document.documentElement.classList.remove("prevent-scroll");
				modal.remove();
			});

			document.addEventListener("keydown", (event) => {
				if (event.key === "Escape") {
					document.documentElement.classList.remove("prevent-scroll");
					modal.remove();
				}
			});
			const swiper = new Swiper(modal.querySelector(".quickview-swiper"), {
				loop: true,
				navigation: {
					nextEl: modal.querySelector(".swiper-button-next"),
					prevEl: modal.querySelector(".swiper-button-prev"),
				},
			});

			const modalContent = modal.querySelector(".modal__content");
			modal.addEventListener("click", (event) => {
				if (!modalContent.contains(event.target)) {
					document.documentElement.classList.remove("prevent-scroll");
					modal.remove();
				}
			});

			const quantityInput = modal.querySelector(".quantity-input__element");
			const quantityDecrease = modal.querySelector("[data-quantity-selector='decrease']");
			const quantityIncrease = modal.querySelector("[data-quantity-selector='increase']");

			quantityDecrease.addEventListener("click", () => {
				if (quantityInput.value > 1) {
					quantityInput.value = parseInt(quantityInput.value) - 1;
				}
			});
			quantityIncrease.addEventListener("click", () => {
				quantityInput.value = parseInt(quantityInput.value) + 1;
			});

			quantityInput.addEventListener("change", () => {
				if (quantityInput.value < 1) {
					quantityInput.value = 1;
				}
			});

			let currentVariant = item.variants[0];
			var productData = item;

			var options = [];
			const variantPicker = modal.querySelector(".variant-picker");

			// Hàm kiểm tra dữ liệu sản phẩm
			function _validateProductStructure(product) {
				if (typeof product != "object") throw new TypeError(product + " is not an object.");
				if (Object.keys(product).length === 0 && product.constructor === Object)
					throw new Error(product + " is empty.");
			}

			// Hàm kiểm tra dữ liệu options
			function _validateOptionsArray(options) {
				if (Array.isArray(options) && typeof options[0] == "object")
					throw new Error(options + "is not a valid array of options.");
			}

			// Hàm xử lý sự kiện khi thay đổi variant
			const onVariantChange = (e) => {
				getSelectedOptions();
				getSelectedVariant();
				updateButton(true, "", false);
				if (currentVariant) {
					updateMedia();
					document.querySelector(".currency-selector").dispatchEvent(new Event("change"));
					updateButton(!currentVariant.available, "Sold Out");
				}
			};
			variantPicker.addEventListener("change", onVariantChange);
			// Hàm lấy các options đã chọn
			const getSelectedOptions = () => {
				const pickerFields = Array.from(document.querySelectorAll("[data-picker-field]"));
				options = pickerFields.map((field) => {
					return field.querySelector("select").value;
				});
			};

			// Hàm lấy variant đã chọn
			const getSelectedVariant = () => {
				let variant = getVariantFromOptionArray(productData, options);
				let optionsClone = [...options];
				if (!variant) {
					var _variant;
					optionsClone.pop();
					variant = getVariantFromOptionArray(productData, optionsClone);
					variant ||
						(optionsClone.pop() &&
							(variant = getVariantFromOptionArray(this.productData, optionsClone)));
					options = [
						...((_variant = variant) === null || _variant === void 0
							? void 0
							: _variant.options),
					];
					updateSelectedOptions();
				}
				currentVariant = variant;
			};

			// Hàm cập nhật options đã chọn
			const updateSelectedOptions = () => {
				const pickerFields = Array.from(document.querySelectorAll("[data-picker-field]"));
				pickerFields.forEach((field, index) => {
					if (field.dataset.selectedValue !== options[index]) {
						const selectedOption = field.querySelector(
							`input[value="${options[index]}"]`
						);
						selectedOption &&
							((selectedOption.checked = !0),
							field.dispatchEvent(new Event("change", { bubbles: !0 })));
					}
				});
			};

			// Hàm cập nhật button
			const updateButton = (...args) => {
				let disable = args.length > 0 && args[0] !== 0 ? args[0] : 1;
				let text = args.length > 1 ? args[1] : 0;
				let modifyClass = args.length > 2 && args[2] !== 0 ? args[2] : 1;

				const productForms = document.querySelectorAll(`.product__actions`);

				if (productForms) {
					productForms.forEach((productForm) => {
						const addButton = productForm.querySelector('[name="add"]');
						const addButtonText = productForm.querySelector('[name="add"] > span');
						const preorder = productForm.dataset.preorder;

						if (addButton) {
							if (disable) {
								addButton.setAttribute("disabled", "disabled");
								addButton.classList.add("disabled");
								text && addButtonText && (addButtonText.textContent = text);
							} else {
								addButton.removeAttribute("disabled");
								addButton.classList.remove("disabled");
								preorder === "true"
									? (addButtonText.textContent = "Pre-order")
									: (addButtonText.textContent = "Add to cart");
							}
						}
					});
				}
			};
			// Hàm lấy variant từ mảng options
			const getVariantFromOptionArray = (product, options) => {
				_validateProductStructure(product);
				_validateOptionsArray(options);
				var result = product.variants.filter((variant) => {
					return options.every((option, index) => {
						return variant.options[index] === option;
					});
				});
				return result[0] || null;
			};
			// Hàm cập nhật media-gallery
			const updateMedia = () => {
				if (!currentVariant || !currentVariant.featured_media) return;
				const slides = document.querySelectorAll(".media-gallery");
				slides.forEach((slide) => {
					const swiperslide = slide.querySelectorAll(".swiper-slide");
					swiperslide.forEach((item, index) => {
						const mediaId = item.getAttribute("data-media-id");
						if (parseInt(mediaId) === parseInt(currentVariant.featured_media.id)) {
							const changeSlideEvent = new CustomEvent("changeSlideTo", {
								detail: { index: index },
							});
							slide.dispatchEvent(changeSlideEvent);
						}
					});
				});
			};

			document
				.querySelectorAll(".product-options__option")
				.forEach((variantSelect, index) => {
					let option = productData.options[index];

					const updateSelectedValue = (e) => {
						const selectedValue = e.target.value;
						variantSelect.dataset.selectedValue = selectedValue;
						const selectedValueElement = variantSelect.querySelector(".selected-value");
						selectedValueElement.textContent = selectedValue;
					};
					variantSelect.addEventListener("change", updateSelectedValue);
				});

			document.querySelector(".media-gallery").addEventListener("changeSlideTo", (e) => {
				const index = e.detail.index;
				if (index !== undefined && swiper) {
					swiper.slideTo(index);
				}
			});

			updateButton(!currentVariant.available, "Sold Out", false);

			const quickatcBtn = modal.querySelector(".btn-quickatc");
			quickatcBtn.addEventListener("click", (e) => {
				const productId = item.id;
				const productTitle = item.title;
				const currentvariantId = currentVariant.id;
				const variantPrice = currentVariant.price;
				const variantOptions = currentVariant.options
					.filter((option) => option !== "Default Title")
					.map((option, index) => {
						return {
							name: item.options[index].name,
							value: option,
						};
					});
				const productImg = currentVariant.featured_image
					? currentVariant.featured_image.src
					: item.featured_image;
				const productAlt = currentVariant.featured_image
					? currentVariant.featured_image.alt
					: item.title;
				const productUrl = item.url;
				const quantity = parseInt(quantityInput.value);

				var currentCart = JSON.parse(localStorage.getItem("cart")) || {
					items: [],
					subtotal: 0,
				};

				const itemIndex = currentCart.items.findIndex(
					(item) => item.id === productId && item.variantId === currentvariantId
				);

				if (itemIndex === -1) {
					currentCart.items.push({
						id: productId,
						title: productTitle,
						price: variantPrice,
						img: productImg,
						alt: productAlt,
						url: productUrl,
						variantId: currentvariantId,
						options_with_values: variantOptions ? variantOptions : null,
						qty: quantity,
					});
				} else {
					currentCart.items[itemIndex].qty += quantity;
				}

				currentCart.subtotal = currentCart.items.reduce(
					(acc, item) => acc + item.price * item.qty,
					0
				);

				localStorage.setItem("cart", JSON.stringify(currentCart));

				loadCart(true);
				if (window.innerWidth < 768)
					document.documentElement.classList.add("prevent-scroll");
				cartWrapper.classList.remove("hidden");
				setTimeout(() => {
					cartContent.classList.remove("translate-x-full");
					cartWrapper.style.setProperty("--tw-bg-opacity", 0.5);
				}, 300);
			});
		};

		quickviewBtn.addEventListener("click", quickview);
		if (item.variants.length > 1) {
			addtocartBtn.addEventListener("click", (event) => {
				quickview();
			});
		} else {
			addtocartBtn.addEventListener("click", (e) => {
				const productId = item.id;
				const productTitle = item.title;
				let currentVariant = item.variants[0];
				const currentvariantId = currentVariant.id;
				const variantPrice = currentVariant.price;
				const variantOptions = currentVariant.options
					.filter((option) => option !== "Default Title")
					.map((option, index) => {
						return {
							name: item.options[index].name,
							value: option,
						};
					});
				const productImg = currentVariant.featured_image
					? currentVariant.featured_image.src
					: item.featured_image;
				const productAlt = currentVariant.featured_image
					? currentVariant.featured_image.alt
					: item.title;
				const productUrl = item.url;

				var currentCart = JSON.parse(localStorage.getItem("cart")) || {
					items: [],
					subtotal: 0,
				};

				const itemIndex = currentCart.items.findIndex(
					(item) => item.id === productId && item.variantId === currentvariantId
				);

				if (itemIndex === -1) {
					currentCart.items.push({
						id: productId,
						title: productTitle,
						price: variantPrice,
						img: productImg,
						alt: productAlt,
						url: productUrl,
						variantId: currentvariantId,
						options_with_values: variantOptions ? variantOptions : null,
						qty: 1,
					});
				} else {
					currentCart.items[itemIndex].qty += 1;
				}

				currentCart.subtotal = currentCart.items.reduce(
					(acc, item) => acc + item.price * item.qty,
					0
				);

				localStorage.setItem("cart", JSON.stringify(currentCart));

				loadCart(true);
				if (window.innerWidth < 768)
					document.documentElement.classList.add("prevent-scroll");
				cartWrapper.classList.remove("hidden");
				setTimeout(() => {
					cartContent.classList.remove("translate-x-full");
					cartWrapper.style.setProperty("--tw-bg-opacity", 0.5);
				}, 300);
			});
		}
	});
});
