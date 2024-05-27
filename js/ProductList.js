import { productsData } from "./productsData.min.js";

const defaultQuery = collectionQuery || {
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

let availability = []; // 0 = all, 1 = in stock, 2 = out of stock
let priceRange = {
	min: null,
	max: null,
}; // [min, max]
let brand = [];
let productType = [];
let driverType = [];
let connectivity = [];
let wearingStyle = [];
let portability = [];

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

function initFilter() {
	let filterData = {
		brand: [],
		productType: [],
		availability: [],
	};
	//each filters have value, label and quantity of products
	products.forEach((product) => {
		//brand
		if (!filterData.brand.includes(product.vendor)) {
			filterData.brand.push({
				value: product.vendor,
				label: product.vendor,
				quantity: 1,
			});
		} else {
			filterData.brand.find((item) => item.value === product.vendor).quantity++;
		}
		//productType
		if (!filterData.productType.includes(product.type)) {
			filterData.productType.push({
				value: product.type,
				label: product.type,
				quantity: 1,
			});
		} else {
			filterData.productType.find((item) => item.value === product.type).quantity++;
		}
		//availability
		if (!filterData.availability.includes(product.availability)) {
			filterData.availability.push({
				value: product.availability,
				label: product.availability,
				quantity: 1,
			});
		} else {
			filterData.availability.find((item) => item.value === product.availability).quantity++;
		}
	});

	console.log(filterData);
	// // create filter elements
	// const filterContainer = document.querySelector(".sidebar");
	// const filterContent = document.createElement("div");
	// filterContent.classList.add("sidebar-content", "overscroll-contain", "h-full");
	// filterContent.innerHTML = `
	// <h3 class="text-3xl p-5 font-medium xl:px-0 xl:mb-8 xl:py-0">Filters</h3>
	// <div class="sidebar-close cursor-pointer absolute top-4 right-4 xl:hidden">
	// 	<svg class="w-[24px] h-[24px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
	// 		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
	// 	</svg>
	// </div>
	// <div class="p-5 pt-0 xl:p-0">
	// 	<div class="filter-wrapper opacity-100">
	// 		<form id="FilterForm" class="pb-4" action="" method="get">
	// 			${Object.keys(filterData)
	// 				.map((key, index) => {
	// 					return `
	// 				<div class="accordion-item" data-index="${index}">
	// 					<div class="mb-1.5 accordion-button text-lg"><span>${key}</span></div>
	// 					<div class="accordion-content">
	// 						<ul role="list">
	// 							${filterData[key]
	// 								.map((item) => {
	// 									return `
	// 								<li>
	// 								</li>`;
	// 								})
	// 								.join("")}
	// 						</ul>
	// 					</div>
	// 				</div>
	// 				`;
	// 				})
	// 				.join("")}
	// 		</form>
	// 	</div>
	// </div>
	// `;
}

function queryProducts(query) {
	let filteredProducts = products;
}
