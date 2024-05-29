import { productsData } from "./productsData.min.js";

let availability = []; // true = in stock, false = out of stock
let priceRange = {
	min: null,
	max: null,
}; // [min, max]
let brand = [];
let productType = [];
let page = 1;
const limit = 24;

// get {name} from "collection/{name}/ from URL, remove "index.html" from the path if exists
const collection = window.location.pathname
	.replace("index.html", "")
	.split("/")
	.filter((item) => item !== "")
	.pop();

const customSelect = document.querySelector(".custom-select");
const sortBySelect = customSelect.querySelector("select[name='sort_by']");

const productList = document.querySelector(".product-listing");
const pagination = document.querySelector(".pagination");

let products = null;
let defaultProducts = null;

function init() {
	products = defaultProducts = collectionGetFunction(collection);
	sortProducts();
	initFilter();
	URLParamsLoad();
}

function sortProducts() {
	const sortby = sortBySelect.value;
	products.sort((a, b) => {
		switch (sortby) {
			case "price-ascending":
				return a.price - b.price;
			case "price-descending":
				return b.price - a.price;
			case "created-ascending":
				return new Date(a.created_at) - new Date(b.created_at);
			case "created-descending":
				return new Date(b.created_at) - new Date(a.created_at);
			case "title-ascending":
				return a.title.localeCompare(b.title);
			case "title-descending":
				return b.title.localeCompare(a.title);
			case "best-selling":
				return a.sale_top - b.sale_top;
			default:
				return 0;
		}
	});
}

function URLParamsLoad() {
	const urlParams = new URLSearchParams(window.location.search);
	const sortby = urlParams.get("sort_by") || "created-descending";
	const ftpage = urlParams.get("page");
	const ftavailability = urlParams.getAll("filter.availability");
	const ftpriceMin = urlParams.get("filter.price.min");
	const ftpriceMax = urlParams.get("filter.price.max");
	const ftbrand = urlParams.getAll("filter.brand");
	const ftproductType = urlParams.getAll("filter.productType");

	sortBySelect.value = sortby;
	availability = ftavailability;
	priceRange.min = ftpriceMin ? parseInt(ftpriceMin) : null;
	priceRange.max = ftpriceMax ? parseInt(ftpriceMax) : null;
	brand = ftbrand;
	productType = ftproductType;
	page = ftpage ? parseInt(ftpage) : 1;

	const FilterForm = document.getElementById("FilterForm");
	FilterForm.querySelectorAll(".filter-checkbox").forEach((item) => {
		const input = item.querySelector("input");
		const key = input.name.split(".")[1];
		const value = input.value;
		if (key === "availability") {
			input.checked = availability.includes(value);
		} else if (key === "brand") {
			input.checked = brand.includes(value);
		} else if (key === "productType") {
			input.checked = productType.includes(value);
		}
	});
	if (priceRange.min) {
		FilterForm.querySelector("input[data-type='min-input']").value = priceRange.min;
		FilterForm.querySelector("input[data-type='min-range']").value = priceRange.min;
		FilterForm.querySelector("input[data-type='max-range']").dispatchEvent(new Event("input"));
	}
	if (priceRange.max) {
		FilterForm.querySelector("input[data-type='max-input']").value = priceRange.max;
		FilterForm.querySelector("input[data-type='max-range']").value = priceRange.max;
		FilterForm.querySelector("input[data-type='max-range']").dispatchEvent(new Event("input"));
	}
	FilterForm.dispatchEvent(new Event("change"));
	sortBySelect.dispatchEvent(new Event("change"));
}

function URLParamsUpdate() {
	const urlParams = new URLSearchParams();
	urlParams.set("sort_by", sortBySelect.value);
	availability.forEach((item) => urlParams.append("filter.availability", item));
	if (sortBySelect.value !== "created-descending") {
		urlParams.set("sort_by", sortBySelect.value);
	}
	if (priceRange.min) {
		urlParams.set("filter.price.min", priceRange.min);
	}
	if (priceRange.max) {
		urlParams.set("filter.price.max", priceRange.max);
	}
	if (page > 1) {
		urlParams.set("page", page);
	}
	brand.forEach((item) => urlParams.append("filter.brand", item));
	productType.forEach((item) => urlParams.append("filter.productType", item));
	window.history.pushState({}, "", `${window.location.pathname}?${urlParams.toString()}`);
}

function collectionGetFunction(collection) {
	// New arrivals min day
	const newDate = new Date();
	newDate.setDate(newDate.getDate() - 60);
	switch (collection) {
		case "all":
			return productsData;
		case "new-arrivals":
			return productsData
				.filter((product) => new Date(product.created_at) > newDate)
				.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
		case "best-sellers":
			return productsData.sort((a, b) => b.sale_top - a.sale_top);
		case "accessories":
			return productsData.filter(
				(product) =>
					product.type === "Accessories" ||
					product.type === "Audio Cables" ||
					product.type === "Headphone Accessories" ||
					product.type === "Headphone Cable" ||
					product.type === "Up Frequency Box"
			);
		case "speaker-amplifiers":
			return productsData.filter((product) =>
				product.title.toLowerCase().includes("speaker amplifier")
			);
		case "dac":
			return productsData.filter((product) => product.type === "DAC / AMP");
		case "desktop-dac":
			return productsData.filter(
				(product) =>
					product.type === "DAC / AMP" &&
					!product.title.toLowerCase().includes("portable")
			);
		case "portable-dac":
			return productsData.filter(
				(product) =>
					product.type === "DAC / AMP" && product.title.toLowerCase().includes("portable")
			);
		case "headphones":
			return productsData.filter((product) => product.type === "Headphones");
		case "in-ear-headphone":
			return productsData.filter((product) =>
				product.title.toLowerCase().includes("in-ear headphone")
			);
		case "wireless-headphones":
			return productsData.filter((product) =>
				product.title.toLowerCase().includes("wireless headphone")
			);
		case "combo-assembling":
			return productsData.filter((product) => product.tags.includes("combo"));
		case "mqa-support":
			return productsData.filter((product) => product.tags.includes("MQA"));
		case "sales":
			return productsData.filter((product) => product.tags.includes("Sales"));
		default:
			return productsData.filter(
				(product) => product.vendor.toLowerCase() === collection.replace("-", ".")
			);
	}
}

function getAvailableFilter(products = defaultProducts) {
	let filterData = {
		availability: products
			.map((product) => product.available.toString())
			.filter((value, index, self) => self.indexOf(value) === index)
			.map((value) => {
				return {
					value: value,
					count: products.filter((product) => product.available.toString() === value)
						.length,
				};
			}),
		priceRange: {
			min: Math.min(...products.map((product) => product.price)),
			max: Math.max(...products.map((product) => product.price)),
		},
		brand: products
			.map((product) => product.vendor)
			.filter((value, index, self) => self.indexOf(value) === index)
			.map((value) => {
				return {
					value: value,
					count: products.filter((product) => product.vendor === value).length,
				};
			}),
		productType: products
			.map((product) => product.type)
			.filter((value, index, self) => self.indexOf(value) === index)
			.map((value) => {
				return {
					value: value,
					count: products.filter((product) => product.type === value).length,
				};
			}),
	};

	filterData.availability.sort((a, b) => (a.value === "true" ? -1 : 1));
	filterData.brand.sort((a, b) => a.value.localeCompare(b.value));
	filterData.productType.sort((a, b) => a.value.localeCompare(b.value));

	return filterData;
}

const priceGap = 300;

function initFilter() {
	const displayLabel = {
		availability: "Availability",
		priceRange: "Price Range",
		brand: "Brand",
		productType: "Product Type",
	};

	let filterData = getAvailableFilter(products);

	// create filter elements
	const filterContainer = document.querySelector(".sidebar");
	const filterContent = document.createElement("div");
	filterContent.classList.add("sidebar-content", "overscroll-contain", "h-full");
	filterContent.innerHTML = `
	<h3 class="text-3xl p-5 font-medium xl:px-0 xl:mb-8 xl:py-0">Filters</h3>
	<div class="sidebar-close cursor-pointer absolute top-4 right-4 xl:hidden">
		<svg class="w-[24px] h-[24px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
		</svg>
	</div>
	<div class="p-5 pt-0 xl:p-0">
		<div class="filter-wrapper opacity-100">
			<form id="FilterForm" class="pb-4" action="" method="get">
				${Object.keys(filterData)
					.map((key, index) => {
						return `
					<div class="accordion-item" data-index="${index}">
						<div class="mb-1.5 accordion-button text-lg" data-state="${index < 2 ? "open" : "closed"}"><span>${displayLabel[key]}</span></div>
						<div class="accordion-content overflow-hidden" data-state="${index < 2 ? "open" : "closed"}">
							${
								key === "priceRange"
									? `
									<price-range class="price-range" data-price-max="${filterData.priceRange.max / 100}" data-price-gap="${priceGap}" style="--from: 0.0%; --to: 100.0%;">
										<div class="price__range-group">
											<input type="range" data-type="min-range" aria-label="From" class="price__range price__range--min" min="0" max="${filterData.priceRange.max / 100}" value="0">
											<input type="range" data-type="max-range" aria-label="To" class="price__range price__range--max" min="0" max="${filterData.priceRange.max / 100}" value="${filterData.priceRange.max / 100}">
										</div>
										<div class="price__inputs">
											<div class="price__field">
												<span class="visually-hidden">From</span>
												<span class="price__field-currency">$</span>
												<input class="form-control" data-type="min-input" name="filter.price.min" type="number" placeholder="0" min="0" max="${filterData.priceRange.max / 100}">
											</div>
											<span class="price__to">To</span>
											<div class="price__field">
												<span class="visually-hidden">To</span>
												<span class="price__field-currency">$</span>
												<input class="form-control" data-type="max-input" name="filter.price.max" type="number" placeholder="${filterData.priceRange.max / 100}" min="0" max="${filterData.priceRange.max / 100}">
											</div>
										</div>
                	</price-range>`
									: `<ul role="list">
								${filterData[key]
									.map((item, index2) => {
										return `
									<li>
										<label for="Filter-${key}-${index2 + 1}" class="filter-checkbox">
											<input type="checkbox" name="filter.${key}" id="Filter-${key}-${index2 + 1}" value="${item.value}">
											<span class="ml-4 filter-label">${key === "availability" ? (item.value === "true" ? "In stock" : "Out of stock") : item.value}</span>
											<span class="ml-1 filter-products-count">(${item.count})</span>
										</label>
									</li>`;
									})
									.join("")}
							</ul>`
							}
						</div>
					</div>
					`;
					})
					.join("")}
			</form>
		</div>
	</div>
	`;
	filterContainer.appendChild(filterContent);

	const FilterForm = document.getElementById("FilterForm");
	FilterForm.querySelectorAll(".accordion-item").forEach((item) => {
		const button = item.querySelector(".accordion-button");
		const content = item.querySelector(".accordion-content");
		content.classList.add(
			"data-[state=closed]:animate-accordion-up",
			"data-[state=open]:animate-accordion-down"
		);
		if (content.dataset.state === "closed") {
			content.style.height = "0";
		}
		button.addEventListener("click", () => {
			const state = button.dataset.state === "open" ? "closed" : "open";
			content.style.setProperty("--accordion-content-height", `${content.scrollHeight}px`);
			button.dataset.state = state;
			content.dataset.state = state;
		});
	});

	const section = document.querySelector(".section-collection");
	const sideBar = section.querySelector(".sidebar");
	const sideBarContent = sideBar.querySelector(".sidebar-content");
	const sideBarClose = sideBar.querySelector(".sidebar-close");
	const sideBarOpen = section.querySelector(".sidebar-open");

	function openSidebarFilter() {
		sideBar.style.display = "block";
		window.requestAnimationFrame(() => {
			sideBar.style.setProperty("--tw-bg-opacity", "0.5");
			sideBarContent.style.setProperty("--tw-translate-x", "0");
		});
		section.classList.add("sidebar-open");
	}

	function closeSidebarFilter() {
		section.classList.remove("sidebar-open");
		(window.innerWidth < 1280 || sideBar.dataset.type === "fixed") &&
			sideBarContent.style.setProperty("--tw-translate-x", "-100%");
		sideBar.style.removeProperty("--tw-bg-opacity");
		setTimeout(() => sideBar.style.removeProperty("display"), 300);
	}

	sideBarOpen.addEventListener("click", openSidebarFilter);
	sideBarClose.addEventListener("click", closeSidebarFilter);
	sideBar.addEventListener("click", (event) => {
		if (event.target === sideBar) {
			closeSidebarFilter();
		}
	});

	FilterForm.addEventListener("change", (event) => {
		const target = event.target;
		const name = target.name;
		const value = target.value;

		if (name === "filter.availability") {
			availability = target.checked
				? [...availability, value]
				: availability.filter((item) => item !== value);
		} else if (name === "filter.price.min") {
			priceRange.min = target.value ? parseInt(target.value) : null;
		} else if (name === "filter.price.max") {
			priceRange.max = target.value ? parseInt(target.value) : null;
		} else if (name === "filter.brand") {
			brand = target.checked ? [...brand, value] : brand.filter((item) => item !== value);
		} else if (name === "filter.productType") {
			productType = target.checked
				? [...productType, value]
				: productType.filter((item) => item !== value);
		} else if (target.classList.contains("price__range")) {
			priceRange.min = parseInt(FilterForm.querySelector(".price__range--min").value);
			priceRange.max = parseInt(FilterForm.querySelector(".price__range--max").value);
		}

		URLParamsUpdate();
		filterProducts();
		updateFilter(products);
		renderProducts();
	});

	sortBySelect.addEventListener("change", (event) => {
		sortProducts();
		URLParamsUpdate();
		renderProducts();
	});

	renderProducts();
}

function filterProducts() {
	products = defaultProducts.filter((product) => {
		//filter and count the number of products of each filter
		if (availability.length && !availability.includes(product.available.toString())) {
			return false;
		}
		if (priceRange.min && product.price < priceRange.min * 100) {
			return false;
		}
		if (priceRange.max && product.price > priceRange.max * 100) {
			return false;
		}
		if (brand.length && !brand.includes(product.vendor)) {
			return false;
		}
		if (productType.length && !productType.includes(product.type)) {
			return false;
		}
		return true;
	});
}

function getPosibleFilter() {
	// get filter that not in current filter, but if added to current filter there will be more products
	// ex: if currently there are 10 products total, if we add a filter that will make the total products 5 more (15), then that filter is a posible filter
	let posibleFilter = {};
	let currentFilter = {
		availability: availability,
		priceRange: priceRange,
		brand: brand,
		productType: productType,
	};
	let allProducts = defaultProducts;
	let allFilterData = getAvailableFilter(allProducts);

	Object.keys(allFilterData).forEach((key) => {
		if (key === "priceRange") return;
		let notInCurrentFilter = allFilterData[key].filter(
			(item) => !currentFilter[key].includes(item.value)
		);
		notInCurrentFilter.forEach((item) => {
			let newFilter = { ...currentFilter };
			newFilter[key] = [...currentFilter[key], item.value];
			let newProducts = allProducts.filter((product) => {
				if (
					newFilter.availability.length &&
					!newFilter.availability.includes(product.available.toString())
				) {
					return false;
				}
				if (newFilter.priceRange.min && product.price < newFilter.priceRange.min * 100) {
					return false;
				}
				if (newFilter.priceRange.max && product.price > newFilter.priceRange.max * 100) {
					return false;
				}
				if (newFilter.brand.length && !newFilter.brand.includes(product.vendor)) {
					return false;
				}
				if (newFilter.productType.length && !newFilter.productType.includes(product.type)) {
					return false;
				}
				return true;
			});
			item.count = newProducts.length - products.length;
			if (item.count > 0) {
				if (!posibleFilter[key]) {
					posibleFilter[key] = [];
				}
				posibleFilter[key].push(item);
			}
		});
	});

	return posibleFilter;
}

function updateFilter() {
	let newFilterData = getAvailableFilter(products);
	let posibleFilter = getPosibleFilter();
	const currentFilter = {
		availability: availability,
		priceRange: priceRange,
		brand: brand,
		productType: productType,
	};
	// if an filter is not in newFilterData or posibleFilter, then it is disabled
	// if an filter is in current filter but not in newFilterData, then it is enabled but with 0 count
	// if an filter is in posibleFilter, then it is enabled with the new count
	document.querySelectorAll(".filter-checkbox").forEach((item) => {
		const input = item.querySelector("input");
		const label = item.querySelector(".filter-label");
		const count = item.querySelector(".filter-products-count");
		const key = input.name.split(".")[1];
		const value = input.value;
		const filter = newFilterData[key].find((item) => item.value === value);
		const inCurrent = currentFilter[key].includes(value);
		const posible =
			posibleFilter[key] && posibleFilter[key].find((item) => item.value === value);
		if (filter) {
			input.disabled = false;
			item.classList.remove("checkbox--disabled");
			count.textContent = `(${filter.count})`;
		} else if (inCurrent) {
			input.disabled = false;
			item.classList.remove("checkbox--disabled");
			count.textContent = "(0)";
		} else if (posible) {
			input.disabled = false;
			item.classList.remove("checkbox--disabled");
			count.textContent = `(${posible.count})`;
		} else {
			input.disabled = true;
			item.classList.add("checkbox--disabled");
			count.textContent = "(0)";
		}
	});
}

function renderProducts(page = 1) {
	const ProductGrid = document.getElementById("ProductGrid");
	const oldProductListing = ProductGrid.querySelector(".product-listing");
	if (oldProductListing) {
		ProductGrid.removeChild(oldProductListing);
	}
	const start = (page - 1) * limit;
	const end = start + limit;
	const list = products.slice(start, end);
	const productListing = document.createElement("div");
	productListing.classList.add(
		"product-listing",
		"relative",
		localStorage.getItem("gridColumnViews")
			? `col-${localStorage.getItem("gridColumnViews")}`
			: "col-5"
	);
	productListing.innerHTML =
		list.length > 0 ? `<div class="mt-6 flex flex-wrap -mx-2 xl:-mx-3"></div>` : "none";
	ProductGrid.appendChild(productListing);

	const productListingContent = document.querySelector(".product-listing>div");
	list.forEach((item) => {
		const media = item.media.filter((m) => m.media_type === "image");
		const colItem = document.createElement("div");
		colItem.classList.add("col-item", "w-6/12", "md:w-4/12", "px-2", "xl:px-3");
		colItem.innerHTML = `
					<div class="pcard cursor-pointer prod__block" data-product-handle="${item.handle}">
						<div class="pcard__img">
							<div class="image-box | overflow-hidden cursor-pointer relative">
								<div class="flex justify-center items-center">
									<a href="${path + item.url}" class="block w-full">
										<div class="main-img">
											<div class="p-img ib-image">
												<img
													src="${path + media[0].src}"
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
													src="${path + media[1].src}"
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
										<a href="${path + item.url}"
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
		productListingContent.appendChild(colItem);

		const quickviewBtn = colItem.querySelector(".btn-quickview");
		const addtocartBtn = colItem.querySelector(".btn-addtocart");

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
																			media.media_type ===
																			"image"
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
											<a href="${path + item.url}">${item.title}</a>
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
										<a class="block mt-2 underline text-black" href="${path + item.url}">View details</a>
									</div>
									<div class="actions-block border-b border-color-border">
										<div class="product-options">
											<div data-product-id=${item.id}>
												<div class="variant-picker">
													${item.options
														.map((option, index) =>
															option.values[1] !== null &&
															option.name !== "Title"
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
																							(
																								value,
																								index2
																							) =>
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
}

init();
