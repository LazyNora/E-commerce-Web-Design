import { productsData } from "./productsData.min.js";

const defaultQuery = {
	collection: "",
	sortby: "created-descending",
	filter: [],
	page: 1,
	limit: 24,
};

const availableFilters = {
	productType: [
		"Accessories",
		"Audio Cables",
		"Audio Clock",
		"Bluetooth Transmitters",
		"Buffer Processor",
		"CD Player",
		"DAC / AMP",
		"headphone",
		"Headphone Accessories",
		"Headphone Amplifiers",
		"Headphone Cable",
		"Headphones",
		"Music Player",
		"Music Streamer",
		"Phono Preamp",
		"Power Supply",
		"Preamplifier",
		"Speaker Amplifiers",
		"Up Frequency Box",
		"USB Interface",
		"USB Isolate",
	],
	driverType: [
		"Dynamic",
		"Planar Magnetic",
		"Electrostatic",
		"Balanced Armature",
		"Bone Conduction",
	],
	connectivity: ["Wired", "Wireless"],
	wearingStyle: ["In-ear Headphone", "On-ear Headphone", "Over-ear Headphone"],
	portability: ["Portable", "Desktop"],
};

let availability = []; // true = in stock, false = out of stock
let priceRange = {
	min: null,
	max: null,
}; // [min, max]
let brand = [];
let productType = [];

// get {name} from "collection/{name}/ from URL, remove "index.html" from the path if exists
const collection = window.location.pathname
	.replace("index.html", "")
	.split("/")
	.filter((item) => item !== "")
	.pop();
// get parameters from URL
const urlParams = new URLSearchParams(window.location.search);
const sortby = urlParams.get("sort_by") || defaultQuery.sortby;
const filter = urlParams.getAll("filter") || defaultQuery.filter;
const page = urlParams.get("page") || defaultQuery.page;

const customSelect = document.querySelector(".custom-select");
const select = customSelect.querySelector("select[name='sort_by']");
const sortBy = select.value;

const productList = document.querySelector(".product-listing");
const pagination = document.querySelector(".pagination");

let products = null;

function init() {
	products = collectionGetFucntion(collection);
	initFilter();
}

function collectionGetFucntion(collection) {
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
			return productsData.filter((product) => product.type === "Accessories");
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

function getFilterData() {
	let newFilterData = {
		availability: [],
		priceRange: { min: null, max: null },
		brand: [],
		productType: [],
	};

	//each filters have value and number of products
	products.forEach((product) => {
		//brand
		if (!newFilterData.brand.find((item) => item.value === product.vendor)) {
			newFilterData.brand.push({ value: product.vendor, count: 1 });
		} else {
			newFilterData.brand.find((item) => item.value === product.vendor).count++;
		}
		//productType
		if (!newFilterData.productType.find((item) => item.value === product.type)) {
			newFilterData.productType.push({ value: product.type, count: 1 });
		} else {
			newFilterData.productType.find((item) => item.value === product.type).count++;
		}
		//availability
		if (
			!newFilterData.availability.find((item) => item.value === product.available.toString())
		) {
			newFilterData.availability.push({ value: product.available.toString(), count: 1 });
		} else {
			newFilterData.availability.find((item) => item.value === product.available.toString())
				.count++;
		}
		//priceRange
		if (!newFilterData.priceRange.min || product.price < newFilterData.priceRange.min) {
			newFilterData.priceRange.min = product.price;
		}
		if (!newFilterData.priceRange.max || product.price > newFilterData.priceRange.max) {
			newFilterData.priceRange.max = product.price;
		}
	});

	newFilterData.brand = newFilterData.brand.sort((a, b) => a.value.localeCompare(b.value));
	newFilterData.productType = newFilterData.productType.sort((a, b) =>
		a.value.localeCompare(b.value)
	);

	return newFilterData;
}

const priceGap = 300;
let filterData = {
	availability: [],
	priceRange: { min: null, max: null },
	brand: [],
	productType: [],
};

function initFilter() {
	const displayLabel = {
		availability: "Availability",
		priceRange: "Price Range",
		brand: "Brand",
		productType: "Product Type",
	};

	filterData = getFilterData();
	console.log(filterData);

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
											<span class="ml-4 filter-label">${key === "availability" ? (item.value ? "In stock" : "Out of stock") : item.value}</span>
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
				? [...availability, value === "true"]
				: availability.filter((item) => item !== (value === "true"));
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
		console.log(availability, priceRange, brand, productType);
		filterProducts();
		updateFilter();
	});
}

function filterProducts() {
	products = productsData.filter((product) => {
		//filter and count the number of products of each filter
		if (availability.length && !availability.includes(product.available)) {
			return false;
		}
		if (priceRange.min && product.price < priceRange.min) {
			return false;
		}
		if (priceRange.max && product.price > priceRange.max) {
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

function updateFilter() {
	let newFilterData = getFilterData();
	console.log(newFilterData);
	document.querySelectorAll(".filter-checkbox").forEach((item) => {
		const input = item.querySelector("input");
		const label = item.querySelector(".filter-label");
		const count = item.querySelector(".filter-products-count");
		const key = input.name.split(".")[1];
		const value = input.value;
		const filter = newFilterData[key].find((item) => item.value === value);
		if (!filter) {
			count.textContent = "(0)";
			item.classList.add("checkbox--disabled");
			input.disabled = true;
		} else {
			item.classList.remove("checkbox--disabled");
			count.textContent = `(${filter.count})`;
			input.disabled = false;
		}
	});
}

init();
