const currentPath = path || "";

// Navbar data for the menu
const navList = [
	{
		text: "Headphones",
		link: "/collections/headphones",
		submenu: [
			{
				text: "All Headphones",
				link: "/collections/headphones",
			},
			{
				text: "In-ear Headphone",
				link: "/collections/in-ear-headphone",
			},
			{
				text: "Over-ear Headphone",
				link: "/collections/over-ear-headphone",
			},
			{
				text: "Wireless Headphone",
				link: "/collections/wireless-headphones",
			},
		],
	},
	{
		text: "DACS",
		link: "/collections/dac",
		submenu: [
			{
				text: "All DACs",
				link: "/collections/dac",
			},
			{
				text: "Portable DACs",
				link: "/collections/portable-dac",
			},
			{
				text: "Desktop DACs",
				link: "/collections/desktop-dac",
			},
			{
				text: "USB Interface",
				link: "/collections/dac",
			},
			{
				text: "MQA Support",
				link: "/collections/mqa-support",
			},
		],
	},
	{
		text: "Headphone AMPs",
		link: "/collections/headphone-amplifiers",
		submenu: [
			{
				text: "All Headphone AMPs",
				link: "/collections/headphone-amplifiers",
			},
			{
				text: "Portable Headphone AMPs",
				link: "/collections/portable-headphone-amplifiers",
			},
			{
				text: "Desktop Headphone AMPs",
				link: "/collections/desktop-headphone-amplifiers",
			},
		],
	},
	{
		text: "Speaker Amplifiers",
		link: "/collections/speaker-amplifiers",
	},
	{
		text: "Accessories",
		link: "/collections/accessories",
		submenu: [
			{
				text: "All Accessories",
				link: "/collections/accessories",
			},
			{
				text: "Headphone Cable",
				link: "/collections/accessories/?filter.productType=Headphone+Cable",
			},
			{
				text: "Audio Cable",
				link: "/collections/accessories/?filter.productType=Audio+Cables",
			},
			{
				text: "Stand",
				link: "/collections/accessories/?s=stand",
			},
			{
				text: "Ear Pads & Tips",
				link: "/collections/accessories/?s=eartips",
			},
		],
	},
	{
		text: "By Brands",
		link: "/collections/all",
	},
	{
		text: "Guarantees",
		link: "/pages/guarantees-return-policy",
		submenu: [
			{
				text: "Lowest Price Guarantee",
				link: "/pages/guarantees-return-policy#lowest-price",
			},
			{
				text: "30 Days No Reason Return",
				link: "/pages/guarantees-return-policy#return",
			},
			{
				text: "180 Days Quality of Exchange",
				link: "/pages/guarantees-return-policy#exchange",
			},
			{
				text: "7 Days DOA Product Guarantee",
				link: "/pages/guarantees-return-policy#doa",
			},
		],
	},
];

// Danh sách các loại tiền tệ (Có thể làm full nhưng dài nên chỉ chừng này thôi)
const supportCurrencies = {
	USD: "USD",
	EUR: "EUR",
	GBP: "GBP",
	AUD: "AUD",
	CAD: "CAD",
	JPY: "JPY",
	CNY: "CNY",
	IDR: "IDR",
	RUB: "RUB",
	MYR: "MYR",
	HKD: "HKD",
	KRW: "KRW",
	VND: "VND",
};

// Event handlers for the menu on mobile
const menuButton_click = (e) => {
	const menuButton = e.target.closest(".menu-button");
	menuButton.classList.toggle("opened");
	menuButton.setAttribute("aria-expanded", menuButton.classList.contains("opened"));
	document.body.classList.toggle("menu-opened");
	document.documentElement.classList.toggle("prevent-scroll");
};

// Event handlers for opening the submenu on mobile
const subMenuOpen_click = (e) => {
	if (
		e.target.classList.contains("back-btn") ||
		e.target.parentElement.classList.contains("back-btn")
	)
		return;
	const menuContent = document.querySelector(".menu-content");
	if (!menuContent.classList.contains("sub-menu-open")) {
		const subMenuToggle = e.target.closest(".menu-link");
		const subMenu = subMenuToggle.querySelector(".sub-links");
		menuContent.classList.add("sub-menu-open");
		subMenu.classList.remove("hidden");
	}
};

// Event handlers for closing the submenu on mobile
const subMenuClose_click = (e) => {
	const menuContent = document.querySelector(".menu-content");
	if (menuContent.classList.contains("sub-menu-open")) {
		const subMenuToggle = e.target.closest(".menu-link");
		const subMenu = subMenuToggle.querySelector(".sub-links");
		menuContent.classList.remove("sub-menu-open");
		subMenu.classList.add("hidden");
	}
};

document.querySelector(".menu-button").addEventListener("click", menuButton_click);

let navDesktopInner = "";
navList.map((nav, index) => {
	navDesktopInner += `
		<li
			class="menu-item | relative list-none"
			data-index=${index}>
			<a
				class="menu-link | px-4 py-5 flex items-center uppercase font-bold"
				href=${currentPath + nav.link}>
				${nav.text}
				${
					nav.submenu
						? `<svg class="menu__arrow | ml-2 w-6 h-6" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></svg>`
						: ""
				}
			</a>
			${
				nav.submenu
					? `
			<div class="menu__submenu menu__desktop-sub-menu menu__dropdown | pointer-events-none absolute z-50 inset-x-0 bg-white w-full opacity-0 invisible min-w-max">
				<div class="menu__inner">
					<div class="mx-auto">
						<div class="submenu__content | flex p-4">
							<ul class="submenu-items | flex flex-col w-full">
							${nav.submenu
								.map(
									(subnav, index) =>
										`<li class="submenu-item | list-none w-full leading-9">
								<a
									href=${currentPath + subnav.link}
									class="submenu-link | whitespace-normal block">
									${subnav.text}
								</a>
							</li>`
								)
								.join("")}
						</ul>
					</div>
				</div>
			</div>
		</div>
		`
					: ""
			}
	</li>`;
});
document.querySelector(".menu-nav").innerHTML = navDesktopInner;

document.querySelector(".currency-selector").innerHTML = `
	${Object.keys(supportCurrencies)
		.map((currency) => `<option value=${currency}>${supportCurrencies[currency]}</option>`)
		.join("")}
	`;

document.querySelector(".currency-selector").value = localStorage.getItem("currency") || "USD";

document.querySelector(".menu-links").innerHTML = `
	${navList
		.map(
			(nav, index) => `
		<li
			class="menu-link | list-none flex items-center">
			<a
				href=${nav.submenu ? "#" : currentPath + nav.link}
				class="w-full px-4 py-3 flex items-center justify-between relative ${
					nav.submenu ? "pointer-events-none" : ""
				}">
				<span>${nav.text}</span>
			</a>
			${
				nav.submenu
					? `
				<span class="toggle-submenu-mb | flex items-center justify-center">
					<svg
						class="w-[16px] h-[16px]"
						fill="currentColor"
						stroke="currentColor"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 256 512">
						<path d="M17.525 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L205.947 256 10.454 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L34.495 36.465c-4.686-4.687-12.284-4.687-16.97 0z" />
					</svg>
				</span>
			`
					: ""
			}
			${
				nav.submenu
					? `
				<div class="sub-links | absolute inset-y-0 bg-white flex-col left-full w-full flex hidden">
					<div class="h-full overscroll-contain">
						<button class="back-btn | p-4 font-medium flex items-center">
							<svg
								class="w-[16px] h-[16px]"
								fill="currentColor"
								stroke="currentColor"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 256 512">
								<path d="m238.475 36.465 7.071 7.07c4.686 4.686 4.686 12.284 0 16.971L50.053 256l195.493 195.494c4.686 4.686 4.686 12.284 0 16.971l-7.071 7.07c-4.686 4.686-12.284 4.686-16.97 0L10.454 264.485c-4.686-4.686-4.686-12.284 0-16.971L221.505 36.465c4.686-4.687 12.284-4.687 16.97 0" />
							</svg>
							<span class="ml-3">
								Back
							</span>
						</button>
						<ul class="sub-links--2 | pb-4">
							${nav.submenu
								.map(
									(subnav, index) => `
									<li
										class="menu-link | list-none flex items-center">
										<a
											href=${currentPath + subnav.link}
											class="w-full px-4 py-3 flex items-center justify-between relative">
											<span>
												${subnav.text}
											</span>
										</a>
									</li>`
								)
								.join("")}
						</ul>
					</div>
				</div>
			`
					: ""
			}
		</li>`
		)
		.join("")}`;

document.querySelectorAll(".menu-link").forEach((item) => {
	if (item.querySelector(".sub-links")) {
		item.addEventListener("click", subMenuOpen_click);
		item.querySelector(".back-btn").addEventListener("click", subMenuClose_click);
	}
});

let responseData = null;
const getExchangeRate = async () => {
	// Kiểm tra xem đã lưu exchange rate trong localStorage chưa
	const sessionExchangeRate = JSON.parse(localStorage.getItem("exchangeRate"));
	if (sessionExchangeRate && sessionExchangeRate.time_next_update_unix > Date.now() / 1000) {
		// Nếu đã lưu thì lấy ra và set vào state
		responseData = sessionExchangeRate;
	} else {
		// Nếu chưa lưu thì fetch từ API
		const response = await fetch(
			"https://v6.exchangerate-api.com/v6/45f265cd120e93555c364328/latest/USD"
		).then((response) => response.json());

		// Nếu fetch thành công thì set vào state và lưu vào localStorage
		if (response.result === "success") {
			responseData = response;
		} else {
			// Nếu fetch thất bại thì set mặc định là giá trị dưới đây
			if (!sessionExchangeRate)
				responseData = {
					result: "success",
					documentation: "https://www.exchangerate-api.com/docs",
					terms_of_use: "https://www.exchangerate-api.com/terms",
					time_last_update_unix: 1715731201,
					time_last_update_utc: "Wed, 15 May 2024 00:00:01 +0000",
					time_next_update_unix: 1715817601,
					time_next_update_utc: "Thu, 16 May 2024 00:00:01 +0000",
					base_code: "USD",
					conversion_rates: {
						USD: 1,
						AED: 3.6725,
						AFN: 72.2574,
						ALL: 93.1142,
						AMD: 387.7417,
						ANG: 1.79,
						AOA: 845.0812,
						ARS: 864.75,
						AUD: 1.5104,
						AWG: 1.79,
						AZN: 1.7002,
						BAM: 1.8082,
						BBD: 2,
						BDT: 116.8173,
						BGN: 1.8086,
						BHD: 0.376,
						BIF: 2870.5589,
						BMD: 1,
						BND: 1.3527,
						BOB: 6.9138,
						BRL: 5.1419,
						BSD: 1,
						BTN: 83.5286,
						BWP: 13.5962,
						BYN: 3.2674,
						BZD: 2,
						CAD: 1.3652,
						CDF: 2755.6458,
						CHF: 0.907,
						CLP: 923.5632,
						CNY: 7.2353,
						COP: 3887.1402,
						CRC: 511.6771,
						CUP: 24,
						CVE: 101.9446,
						CZK: 22.9321,
						DJF: 177.721,
						DKK: 6.8957,
						DOP: 58.3262,
						DZD: 134.5844,
						EGP: 46.9525,
						ERN: 15,
						ETB: 57.4729,
						EUR: 0.9245,
						FJD: 2.2422,
						FKP: 0.7949,
						FOK: 6.8957,
						GBP: 0.795,
						GEL: 2.6882,
						GGP: 0.7949,
						GHS: 14.3768,
						GIP: 0.7949,
						GMD: 65.0828,
						GNF: 8568.9616,
						GTQ: 7.767,
						GYD: 209.15,
						HKD: 7.8119,
						HNL: 24.7098,
						HRK: 6.966,
						HTG: 132.6114,
						HUF: 357.3789,
						IDR: 16126.1361,
						ILS: 3.7032,
						IMP: 0.7949,
						INR: 83.5287,
						IQD: 1312.9353,
						IRR: 42067.2143,
						ISK: 139.4697,
						JEP: 0.7949,
						JMD: 156.4497,
						JOD: 0.709,
						JPY: 156.4197,
						KES: 130.2749,
						KGS: 88.7583,
						KHR: 4096.1961,
						KID: 1.5104,
						KMF: 454.8449,
						KRW: 1365.7652,
						KWD: 0.3074,
						KYD: 0.8333,
						KZT: 440.6496,
						LAK: 21677.5465,
						LBP: 89500,
						LKR: 300.7497,
						LRD: 193.3583,
						LSL: 18.3989,
						LYD: 4.8564,
						MAD: 10.0215,
						MDL: 17.7914,
						MGA: 4417.1798,
						MKD: 56.9662,
						MMK: 2101.6363,
						MNT: 3411.4803,
						MOP: 8.0463,
						MRU: 40.1064,
						MUR: 46.2495,
						MVR: 15.4115,
						MWK: 1744.3394,
						MXN: 16.8383,
						MYR: 4.7222,
						MZN: 63.8271,
						NAD: 18.3989,
						NGN: 1425.2329,
						NIO: 36.8068,
						NOK: 10.8139,
						NPR: 133.6458,
						NZD: 1.6566,
						OMR: 0.3845,
						PAB: 1,
						PEN: 3.7252,
						PGK: 3.8313,
						PHP: 57.8024,
						PKR: 278.4138,
						PLN: 3.9548,
						PYG: 7489.4311,
						QAR: 3.64,
						RON: 4.6096,
						RSD: 108.4138,
						RUB: 91.286,
						RWF: 1306.8323,
						SAR: 3.75,
						SBD: 8.3462,
						SCR: 14.7342,
						SDG: 449.4309,
						SEK: 10.8199,
						SGD: 1.3527,
						SHP: 0.7949,
						SLE: 22.7402,
						SLL: 22740.1608,
						SOS: 571.0802,
						SRD: 32.5877,
						SSP: 1597.3915,
						STN: 22.6513,
						SYP: 12894.5905,
						SZL: 18.3989,
						THB: 36.6065,
						TJS: 10.9202,
						TMT: 3.4999,
						TND: 3.1295,
						TOP: 2.3373,
						TRY: 32.2751,
						TTD: 6.7653,
						TVD: 1.5104,
						TWD: 32.3211,
						TZS: 2586.5529,
						UAH: 39.6655,
						UGX: 3759.2384,
						UYU: 38.494,
						UZS: 12744.967,
						VES: 36.5949,
						VND: 25407.4968,
						VUV: 119.7304,
						WST: 2.7479,
						XAF: 606.4598,
						XCD: 2.7,
						XDR: 0.7577,
						XOF: 606.4598,
						XPF: 110.3275,
						YER: 250.2204,
						ZAR: 18.3992,
						ZMW: 25.3914,
						ZWL: 3.5187,
					},
				};
		}
		localStorage.setItem("exchangeRate", JSON.stringify(responseData));
	}
	updatePrice();
	document.querySelectorAll("span.money").forEach((element) => {
		element.addEventListener("mouseover", priceMouseOver);
		element.addEventListener("mouseout", priceMouseOut);
	});
};

window.onload = () => {
	// Gọi hàm getExchangeRate khi component được render
	getExchangeRate();
	// Lấy currency từ localStorage, nếu chưa có thì set mặc định là USD
	localStorage.getItem("currency") || localStorage.setItem("currency", "USD");
};

document.querySelector(".currency-selector").addEventListener("change", (e) => {
	localStorage.setItem("currency", e.target.value);
	updatePrice();
});

import { formatMoney, moneyFormats } from "./currencyConvert.js";

const updatePrice = () => {
	const currency = localStorage.getItem("currency");
	if (currency && responseData) {
		const priceElements = document.querySelectorAll("span.money");
		priceElements.forEach((element) => {
			const price = element.getAttribute("data-product-price");
			const convertedPrice = price * responseData.conversion_rates[currency];
			element.innerHTML = formatMoney(
				convertedPrice,
				moneyFormats[currency].money_with_currency_format,
				currency
			);
			element.addEventListener("mouseover", priceMouseOver);
			element.addEventListener("mouseout", priceMouseOut);
		});
	}
};

const priceMouseOver = (e) => {
	const currency = localStorage.getItem("currency");
	if (currency && currency !== "USD") {
		const price = e.target.getAttribute("data-product-price");
		const money = e.target.closest("span.money");
		const convertedPrice = price * responseData.conversion_rates["USD"];
		const priceOnHover = document.createElement("span");
		priceOnHover.classList.add("price-on-hover-wrapper");
		priceOnHover.innerHTML = `
		<span class="price-on-hover">${formatMoney(convertedPrice, moneyFormats["USD"].money_with_currency_format, "USD")}</span>
		`;
		money.appendChild(priceOnHover);
	}
};

const priceMouseOut = (e) => {
	const currency = localStorage.getItem("currency");
	if (currency && currency !== "USD") {
		const money = e.target.closest("span.money");
		const priceOnHover = e.target.querySelector(".price-on-hover-wrapper");
		money.removeChild(priceOnHover);
	}
};

import { searchData } from "./searchData.js";

const handleSearchResults = (e) => {
	const searchResults = document.querySelector(".searchResults");
	const searchResultsContent = document.querySelector(".searchResults__content");
	const query = e.target.value.toLowerCase();
	if (query === "") {
		searchResults.classList.add("hidden");
		searchResultsContent.innerHTML = "";
		return;
	}
	searchResults.classList.remove("hidden");
	const filteredResults = searchData.filter((item) => item.title.toLowerCase().includes(query));
	filteredResults.sort((a, b) => {
		let aTitle = a.title.toLowerCase();
		let bTitle = b.title.toLowerCase();

		if (aTitle.startsWith(query) && !bTitle.startsWith(query)) {
			return -1;
		} else if (!aTitle.startsWith(query) && bTitle.startsWith(query)) {
			return 1;
		} else {
			return 0;
		}
	});
	searchResultsContent.innerHTML =
		filteredResults.length > 0
			? filteredResults
					.slice(0, 6)
					.map((item) => {
						return `
		<div class="searchResults__item">
			<a href="${path + item.url}">
				<div class="item__img">
					<img src="${currentPath + item.img}" alt="${item.title}"/>
				</div>
				<div class="item__content">
					<p class="item__title">${item.title}</p>
					<div class="item__price">
						<span class="money" data-product-price="${item.price}"><span>
					</div>
				</div>
			</a>
		</div>
		`;
					})
					.join("")
			: `<p>Sorry, nothing found for <strong>${e.target.value}</strong>.</p>`;

	updatePrice();
};

document
	.querySelector(".desktop-header .search-input")
	.addEventListener("input", handleSearchResults);

document.addEventListener("click", (e) => {
	if (!e.target.closest(".search-form")) {
		document.querySelector(".searchResults").classList.add("hidden");
	} else if (e.target.closest(".search-input").value !== "") {
		document.querySelector(".searchResults").classList.remove("hidden");
	}
});
