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
				link: "/collections/headphones?wearing_style=In-ear+Headphone",
			},
			{
				text: "Over-ear Headphone",
				link: "/collections/headphones?wearing_style=Over-ear+Headphone",
			},
			{
				text: "Wireless Headphone",
				link: "/collections/headphones?connectivity=Wireless",
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
				link: "/collections/dac?portability=Portable",
			},
			{
				text: "Desktop DACs",
				link: "/collections/dac?portability=Desktop",
			},
			{
				text: "USB Interface",
				link: "/collections/dac?product_type=USB+Interface",
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
				link: "/collections/headphone-amplifiers?portability=Portable",
			},
			{
				text: "Desktop Headphone AMPs",
				link: "/collections/headphone-amplifiers?portability=Desktop",
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
				link: "/collections/accessories?product_type=Headphone+Cable",
			},
			{
				text: "Audio Cable",
				link: "/collections/accessories?product_type=Audio+Cable",
			},
			{
				text: "Stand",
				link: "/collections/accessories?product_type=Stand",
			},
			{
				text: "Ear Pads & Tips",
				link: "/collections/accessories?product_type=Ear+Tips",
			},
		],
	},
	{
		text: "By Brands",
		link: "#",
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
	menuButton.setAttribute(
		"aria-expanded",
		menuButton.classList.contains("opened")
	);
	document.body.classList.toggle("menu-opened");
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

document
	.querySelector(".menu-button")
	.addEventListener("click", menuButton_click);

let navDesktopInner = "";
navList.map((nav, index) => {
	navDesktopInner += `
		<li
			class="menu-item | relative list-none"
			data-index=${index}>
			<a
				class="menu-link | px-4 py-5 flex items-center uppercase font-bold"
				href=${nav.link}>
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
									href=${subnav.link}
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
		.map(
			(currency) =>
				`<option value=${currency}>${supportCurrencies[currency]}</option>`
		)
		.join("")}
	`;

document.querySelector(".currency-selector").value =
	sessionStorage.getItem("currency") || "USD";

document.querySelector(".menu-links").innerHTML = `
	${navList
		.map(
			(nav, index) => `
		<li
			class="menu-link | list-none flex items-center">
			<a
				href=${nav.submenu ? "#" : nav.link}
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
											href=${subnav.link}
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
		item.querySelector(".back-btn").addEventListener(
			"click",
			subMenuClose_click
		);
	}
});

let responseData = null;
const getExchangeRate = async () => {
	// Kiểm tra xem đã lưu exchange rate trong sessionStorage chưa
	const sessionExchangeRate = sessionStorage.getItem("exchangeRate");
	if (
		sessionExchangeRate &&
		sessionExchangeRate.time_next_update_unix > Date.now() / 1000
	) {
		// Nếu đã lưu thì lấy ra và set vào state
		responseData = JSON.parse(sessionExchangeRate);
		return;
	}
	// Nếu chưa lưu thì fetch từ API
	const response = await fetch(
		"https://v6.exchangerate-api.com/v6/45f265cd120e93555c364328/latest/USD"
	).then((response) => response.json());

	// Nếu fetch thành công thì set vào state và lưu vào sessionStorage
	if (response.result === "success") {
		responseData = response;
		sessionStorage.setItem("exchangeRate", JSON.stringify(response));
	}
	updatePrice();
};

window.onload = () => {
	// Gọi hàm getExchangeRate khi component được render
	getExchangeRate();
	// Lấy currency từ sessionStorage, nếu chưa có thì set mặc định là USD
	sessionStorage.getItem("currency") ||
		sessionStorage.setItem("currency", "USD");
};

document.querySelector(".currency-selector").addEventListener("change", (e) => {
	sessionStorage.setItem("currency", e.target.value);
	updatePrice();
});

import { formatMoney, moneyFormats } from "./currencyConvert.js";

const updatePrice = () => {
	const currency = sessionStorage.getItem("currency");
	if (currency) {
		const priceElements = document.querySelectorAll("span.money");
		priceElements.forEach((element) => {
			const price = element.getAttribute("data-product-price");
			const convertedPrice =
				price * responseData.conversion_rates[currency];
			element.innerHTML = formatMoney(
				convertedPrice,
				moneyFormats[currency].money_with_currency_format,
				currency
			);
		});
	}
};
