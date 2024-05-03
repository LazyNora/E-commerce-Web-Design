import { Badge, SvgIcon, styled } from "@material-ui/core";
import {
	Search,
	ShoppingCartOutlined,
	AccountCircleOutlined,
	ExpandMore,
} from "@material-ui/icons";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "../components/ui/select";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../components/ui/tooltip";
import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/Navbar.css";

const CustomBadge = styled(Badge)({
	"& .MuiBadge-badge": {
		backgroundColor: "#008667",
		color: "#fff",
		fontSize: "0.625rem",
		bottom: "0.15em",
	},
});

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

const Navbar = () => {
	// Vẫn là Identify classes | Utility classes (Xem thêm tại Footer.jsx)
	return (
		<section className="section-header">
			<header className="header | inset-x-0 z-[70] header__wrapper">
				<div className="desktop-header | hidden lg:block bg-white border-b border-[#ddd]">
					<div className="header_top | container">
						<div className="logo-bar | flex -mx-4 items-center py-2">
							<div className="logo | px-4 justify-center">
								<a
									href="/"
									className="logo-img | block relative"
									style={{ width: "290px" }}
									title="AUDIO OASIS">
									<svg
										x="0px"
										y="0px"
										viewBox="0 0 3650 615"
										xmlns="http://www.w3.org/2000/svg"
										xmlSpace="preserve">
										<title>AUDIO OASIS</title>
										<path d="m907.156 90.625 201.918 413.538h-37.489l-71-143H811.281l-70 143h-35.507Zm-1.446 75.504-79.154 162.534h159.146Z" />
										<path d="M1224.543 511.163h-5.042c-32.327-.353-61.533-12.478-84.144-34.769-22.118-22.806-33.92-52.838-34.253-86.783V111.163h34.5v278.111c-.285 26.648 7.835 47.096 25.06 64.225 16.846 17.616 36.145 25.164 61.44 25.164 25.318 0 44.85-7.851 61.476-25.201 17.127-16.988 24.813-37.378 24.524-64.36V111.163h34.5v277.586c-.32 34.262-12.325 64.607-34.444 87.587-22.596 22.456-51.595 34.467-83.617 34.827" />
										<path d="M1414.664 111.163c57.672.338 106.206 20.262 142.088 58.181 35.223 38.226 53.857 85.433 53.857 138.569 0 53.131-18.678 100.393-53.734 138.457-35.725 37.757-84.3 57.452-142.298 57.793h-24.968v-393Zm16.284 33.256-3.155-.144-4.184-.192v326.655l7.304-.322c40.785-1.998 71.139-14.765 100.78-47.295 30.197-32.226 44.416-69.653 44.416-115.208 0-45.56-14.087-83.027-44.329-115.609-29.214-32.367-60.004-45.801-100.832-47.885m248.575 359.744h-34.5v-393h34.5Zm234.485 6.5c-53.431-.38-101.464-21.302-140.694-61.289-38.753-40.368-59.24-89.063-59.24-142.961 0-53.93 20.915-102.382 60.209-141.932 39.734-39.123 88.893-59.818 144.291-59.818 55.386 0 104.648 20.422 143.863 59.637 39.206 39.206 59.637 87.867 59.637 142.113 0 54.221-20.508 103.116-59.099 143.324-39.074 39.825-87.354 60.541-141.44 60.926Zm173.566-203.179v-36.946c0-22.318-15.475-48.974-49.602-83.249-33.38-34.122-72.211-50.126-119.648-50.126s-86.263 15.896-119.825 50.052c-33.975 33.719-49.925 72.749-49.925 120.198 0 47.45 15.838 86.463 49.844 120.368 33.551 34.283 72.394 50.382 119.656 50.382 47.26 0 86.002-15.973 119.568-50.291 33.984-33.904 50.261-72.978 49.932-120.388m416.387 203.179c-53.431-.38-101.464-21.302-140.694-61.289-38.753-40.368-59.24-89.063-59.24-142.961 0-53.93 20.915-102.382 60.209-141.932 39.734-39.123 88.893-59.818 144.291-59.818 55.386 0 104.648 20.422 143.863 59.637 39.206 39.206 59.637 87.867 59.637 142.113 0 54.221-20.508 103.116-59.099 143.324-39.073 39.823-87.355 60.541-141.44 60.926Zm173.566-203.179v-36.946c0-22.318-15.474-48.973-49.602-83.249-33.379-34.122-72.211-50.126-119.648-50.126s-86.265 15.897-119.827 50.054c-33.975 33.718-49.923 72.746-49.923 120.196s15.834 86.455 49.837 120.36c33.55 34.277 72.401 50.39 119.663 50.39 47.26 0 85.986-15.958 119.553-50.275 33.974-33.901 50.275-72.994 49.947-120.404m201.911-216.859 201.918 413.538h-37.489l-71-143h-189.304l-70 143h-35.507Zm-1.446 75.504-79.154 162.534h159.146Zm374.488 11.273c-6.98-13.027-15.975-22.396-28.126-29.632-12-7.48-24.274-10.607-39.437-10.607-14.784 0-26.086 4.128-36.031 13.184l-30.999 23.959 19.569-8.401-.675 2.093c-1.45 4.483-2.103 7.595-1.864 17.293l-.01 2.715c-.57 18.483 9.236 33.876 31.367 49.927 9.78 7.182 20.577 14.127 32.866 21.174 12.617 7.232 25.349 15.042 37.958 23.275 12.767 8.36 24.701 17.497 35.141 26.884 10.753 9.812 20.138 22.512 27.055 36.535 6.838 14.304 10.506 30.949 10.623 47.898v5.066c-.376 33.385-12.828 62.048-35.47 82.297-22.904 19.476-52.362 30.101-85.53 30.101-43.792 0-79.913-19.811-104.519-55.551l-1.481-2.212v-71.24l13.37 29.384 3.85 8.454c8.032 17.963 19.44 31.621 35.323 42.637 15.468 11.153 33.673 16.028 57.457 16.028 23.462 0 42.375-6.891 59.262-21.929 17.114-14.426 24.591-32.353 24.238-57.154v-3.025c.157-15.387-3.587-28.303-11.677-40.948-8.118-13.107-17.666-23.054-29.908-31.271-12.928-8.79-26.951-17.929-42.212-27.559a6739 6739 0 0 1-42.598-27.06c-13.689-8.876-25.871-20.749-35.103-34.078-9.224-13.828-14.281-30.251-14.502-46.547v-3.566c.375-25.01 9.758-46.444 25.967-60.46 16.373-13.062 37.595-20.403 61.033-20.403 32.587 0 60.498 13.57 80.086 37.45l1.914 2.4v63.911l-9.39-17.195Zm123.964 326.761h-34.5v-393h34.5Zm201.547-326.761c-6.98-13.027-15.975-22.396-28.125-29.632-11.995-7.47-24.276-10.607-39.438-10.607-14.697 0-25.603 3.896-35.426 12.642l-.12.107-5.114 2.177 1.328.809-27.696 21.403 19.569-8.398-.677 2.094c-1.45 4.482-2.103 7.596-1.864 17.294l-.01 2.715c-.57 18.483 9.24 33.878 31.369 49.928 9.779 7.182 20.575 14.126 32.864 21.173 12.617 7.232 25.349 15.042 37.958 23.275 12.771 8.363 24.701 17.497 35.141 26.884 10.754 9.812 20.138 22.512 27.055 36.534 6.837 14.305 10.506 30.95 10.623 47.899v5.066c-.376 33.385-12.828 62.048-35.47 82.297-22.904 19.476-52.362 30.101-85.53 30.101-43.792 0-79.913-19.811-104.519-55.551l-1.481-2.212v-71.24l13.37 29.384 3.85 8.454c8.032 17.963 19.44 31.621 35.323 42.637 15.468 11.153 33.673 16.028 57.457 16.028 23.462 0 42.375-6.891 59.262-21.929 17.114-14.426 24.591-32.352 24.238-57.154v-3.025c.157-15.387-3.596-28.312-11.683-40.956-8.115-13.103-17.66-23.046-29.902-31.263-12.928-8.79-26.951-17.929-42.212-27.559a6618 6618 0 0 1-42.597-27.061c-13.69-8.875-25.872-20.748-35.104-34.077-9.224-13.828-14.282-30.251-14.502-46.547v-3.566c.375-25.01 9.758-46.444 25.967-60.46 16.373-13.062 37.595-20.403 61.033-20.403 32.587 0 60.498 13.57 80.086 37.45l1.914 2.4v63.911l-9.39-17.195Z" />
										<path d="M303.728 21.886c-1.781 3.144-14.458 25.25-28.288 49.138s-24.83 43.584-24.411 43.689 11.839-1.048 25.354-2.62l24.516-2.828 2.829-6.81c1.572-3.667 3.353-6.915 3.877-7.125.628-.209 23.259 35.936 50.499 80.149C496.505 400.63 494.829 397.801 495.562 395.811c1.362-3.772 3.877-29.86 4.086-42.537l.21-12.572-15.506-26.193c-8.487-14.353-24.307-40.965-35.098-59.09-28.602-48.194-69.148-116.504-80.149-135.153-34.784-58.881-60.662-102.256-61.291-103.094-.524-.524-2.305 1.676-4.086 4.714" />
										<path d="M268.526 125.085c-49.242 6.6-91.569 28.288-131.801 67.472-33.317 32.269-53.328 64.014-65.062 102.989-8.068 26.507-10.477 51.232-8.382 83.292.733 10.582 1.467 19.487 1.676 19.697.21.209 2.62-3.248 5.134-7.753 2.619-4.401 11.42-19.278 19.592-33.003 12.887-21.792 15.087-25.983 17.078-34.05 16.763-67.158 59.09-117.447 119.018-141.544 27.345-11.106 56.157-16.868 90.836-18.545 8.382-.419 15.296-.943 15.296-1.257s-5.343-9.22-11.734-19.801l-11.839-19.173-14.668.104c-8.067.105-19.382.734-25.144 1.572m133.581 16.658c0 .315 7.753 13.935 17.183 30.279 17.077 29.44 17.391 29.859 27.764 39.917 29.754 28.812 51.966 68.834 59.823 107.39 11.42 55.947-.733 111.58-33.945 156.107l-5.867 7.858 23.259.314c17.706.209 23.573-.105 24.516-1.048 2.933-3.143 24.621-47.251 27.554-56.052 7.544-23.154 9.953-41.908 9.22-71.767-.733-30.593-4.924-52.385-14.982-78.054-21.268-54.48-61.71-99.427-111.79-124.676-13.096-6.496-22.735-10.896-22.735-10.268" />
										<path d="M238.98 188.89c-12.991 4.295-23.992 9.848-36.46 18.02l-9.429 6.286-15.401 24.098c-24.621 38.555-52.699 84.654-78.158 128.133-22.107 37.822-67.263 113.361-89.579 149.821L0 531.488l29.126.314c16.03.105 42.641.105 59.195 0l29.964-.314-4.924-6.286c-2.619-3.458-8.172-11.106-12.258-17.078l-7.439-10.687H81.825c-6.495 0-11.839-.314-11.839-.628 0-.419 32.479-56.471 82.245-141.859 27.24-46.727 64.538-110.846 79.625-136.725 9.639-16.763 18.02-31.011 18.649-31.745 1.467-1.886.314-1.571-11.525 2.41m312.948 253.334c-1.99 5.867-6.076 15.925-9.01 22.525l-5.448 11.734 4.086 9.639c2.2 5.239 4.086 9.953 4.086 10.477 0 .419-83.082.838-184.605.838l-184.709.105 4.715 4.086c9.324 8.172 22.735 17.078 35.517 23.364l12.886 6.496 192.777.314 192.777.21-1.467-2.305c-.838-1.362-14.144-23.888-29.65-50.08-15.401-26.193-28.078-47.776-28.183-47.88-.105-.105-1.781 4.61-3.772 10.477" />
										<path d="m108.123 455.215-11.63 20.745 3.143 5.762c8.801 16.239 37.089 49.766 51.757 61.29 34.05 26.926 65.795 42.118 104.036 49.766 45.68 9.115 96.389 5.972 137.773-8.591 13.62-4.819 38.765-17.811 54.375-28.078l13.411-8.906-40.336-.314-40.442-.21-10.896 4.086c-6.076 2.201-14.144 4.61-18.125 5.344-10.686 1.886-55.738 2.619-68.205 1.152-47.251-5.553-88.74-25.983-124.048-60.871-16.658-16.554-27.869-32.584-34.469-49.766-1.781-4.61-3.562-9.22-3.981-10.267-.629-1.467-3.563 2.933-12.363 18.858" />
										<path d="M445.492 359.439c0 75.222-60.979 136.201-136.201 136.201S173.09 434.661 173.09 359.439s60.979-136.201 136.201-136.201 136.201 60.979 136.201 136.201m-136.201-95c-52.467 0-95 42.533-95 95s42.533 95 95 95 95-42.533 95-95-42.533-95-95-95" />
										<path d="M349.291 359.439c0 22.091-17.908 40-40 40s-40-17.909-40-40 17.909-40 40-40 40 17.909 40 40" />
									</svg>
								</a>
							</div>
							<div className="w-2/3 flex flex-grow justify-end items-center">
								<div className="flex flex-grow justify-end items-center">
									<form
										id="menu-form-search"
										action="/pages/search-result"
										method="get"
										role="search"
										noValidate
										className="search-form | relative w-full md:mx-10 flex border-2 border-black rounded">
										<input
											type="search"
											name="s"
											id="s"
											required
											autoComplete="off"
											placeholder="Search products"
											aria-label="Search products"
											className="search-input | w-full h-11 border-none"
										/>
										<button
											type="submit"
											className="search-submit | absolute top-px right-0 py-1 px-2">
											<Search fontSize="large" />
										</button>
									</form>
								</div>
								<Select
									className="currency-selector"
									defaultValue="VND">
									<SelectTrigger className="w-[70px] border-none px-2 font-bold text-base">
										<SelectValue placeholder="" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="USD">USD</SelectItem>
										<SelectItem value="EUR">EUR</SelectItem>
										<SelectItem value="GBP">GBP</SelectItem>
										<SelectItem value="CAD">CAD</SelectItem>
										<SelectItem value="AUD">AUD</SelectItem>
										<SelectItem value="CNY">CNY</SelectItem>
										<SelectItem value="IDR">IDR</SelectItem>
										<SelectItem value="RUB">RUB</SelectItem>
										<SelectItem value="MYR">MYR</SelectItem>
										<SelectItem value="JPY">JPY</SelectItem>
										<SelectItem value="HKD">HKD</SelectItem>
										<SelectItem value="KRW">KRW</SelectItem>
										<SelectItem value="VND">VND</SelectItem>
									</SelectContent>
								</Select>
								<Link to="/cart" className="pl-4 pr-2 py-3.5">
									<CustomBadge
										badgeContent={3}
										overlap="rectangular"
										anchorOrigin={{
											vertical: "bottom",
											horizontal: "right",
										}}>
										<ShoppingCartOutlined fontSize="large" />
									</CustomBadge>
								</Link>
								<Link to="/account" className="px-2 py-3.5">
									<AccountCircleOutlined fontSize="large" />
								</Link>
							</div>
						</div>
					</div>
					<div className="header_bottom">
						<nav className="menu-wrapper__desktop | container flex items-center">
							<ul className="menu-nav | flex flex-wrap font-medium whitespace-nowrap -ml-[20px] w-full relative justify-between">
								{navList.map((nav, index) => (
									<li
										key={index}
										className="menu-item | relative list-none"
										data-index={index}>
										<Link
											className="menu-link | px-4 py-5 flex items-center uppercase font-bold"
											to={nav.link}>
											{nav.text}
											{nav.submenu && (
												<ExpandMore className="menu__arrow | ml-2" />
											)}
										</Link>
										{nav.submenu && (
											<div className="menu__submenu menu__desktop-sub-menu menu__dropdown | pointer-events-none absolute z-50 inset-x-0 bg-white w-full opacity-0 invisible min-w-max">
												<div className="menu__inner">
													<div className="mx-auto">
														<div className="submenu__content | flex p-4">
															<ul className="submenu-items | flex flex-col w-full">
																{nav.submenu.map(
																	(
																		subnav,
																		index
																	) => (
																		<li
																			key={
																				index
																			}
																			className="submenu-item | list-none w-full leading-9">
																			<a
																				href={
																					subnav.link
																				}
																				className="submenu-link | whitespace-normal block">
																				{
																					subnav.text
																				}
																			</a>
																		</li>
																	)
																)}
															</ul>
														</div>
													</div>
												</div>
											</div>
										)}
									</li>
								))}
							</ul>
						</nav>
					</div>
				</div>
				<div className="mobile-header | flex lg:hidden container-fluid bg-white items-center border-b border-[#ddd}">
					<button
						className="menu-button | flex"
						onClick={menuButton_click}
						aria-label="Main Menu">
						<svg
							className="w-[2.1875rem] h-[2.1875rem]"
							fill="none"
							stroke="black"
							viewBox="0 0 100 100">
							<path
								className="line line1"
								d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
							/>
							<path className="line line2" d="M 20,50 H 80" />
							<path
								className="line line3"
								d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
							/>
						</svg>
					</button>
					<div className="logo--mobile | ml-2">
						<a
							href="/"
							className="flex w-full relative"
							title="AUDIO OASIS">
							<svg
								viewBox="0 0 3650 615"
								xmlns="http://www.w3.org/2000/svg"
								height="28px">
								<title>AUDIO OASIS</title>
								<path d="m907.156 90.625 201.918 413.538h-37.489l-71-143H811.281l-70 143h-35.507Zm-1.446 75.504-79.154 162.534h159.146Z" />
								<path d="M1224.543 511.163h-5.042c-32.327-.353-61.533-12.478-84.144-34.769-22.118-22.806-33.92-52.838-34.253-86.783V111.163h34.5v278.111c-.285 26.648 7.835 47.096 25.06 64.225 16.846 17.616 36.145 25.164 61.44 25.164 25.318 0 44.85-7.851 61.476-25.201 17.127-16.988 24.813-37.378 24.524-64.36V111.163h34.5v277.586c-.32 34.262-12.325 64.607-34.444 87.587-22.596 22.456-51.595 34.467-83.617 34.827" />
								<path d="M1414.664 111.163c57.672.338 106.206 20.262 142.088 58.181 35.223 38.226 53.857 85.433 53.857 138.569 0 53.131-18.678 100.393-53.734 138.457-35.725 37.757-84.3 57.452-142.298 57.793h-24.968v-393Zm16.284 33.256-3.155-.144-4.184-.192v326.655l7.304-.322c40.785-1.998 71.139-14.765 100.78-47.295 30.197-32.226 44.416-69.653 44.416-115.208 0-45.56-14.087-83.027-44.329-115.609-29.214-32.367-60.004-45.801-100.832-47.885m248.575 359.744h-34.5v-393h34.5Zm234.485 6.5c-53.431-.38-101.464-21.302-140.694-61.289-38.753-40.368-59.24-89.063-59.24-142.961 0-53.93 20.915-102.382 60.209-141.932 39.734-39.123 88.893-59.818 144.291-59.818 55.386 0 104.648 20.422 143.863 59.637 39.206 39.206 59.637 87.867 59.637 142.113 0 54.221-20.508 103.116-59.099 143.324-39.074 39.825-87.354 60.541-141.44 60.926Zm173.566-203.179v-36.946c0-22.318-15.475-48.974-49.602-83.249-33.38-34.122-72.211-50.126-119.648-50.126s-86.263 15.896-119.825 50.052c-33.975 33.719-49.925 72.749-49.925 120.198 0 47.45 15.838 86.463 49.844 120.368 33.551 34.283 72.394 50.382 119.656 50.382 47.26 0 86.002-15.973 119.568-50.291 33.984-33.904 50.261-72.978 49.932-120.388m416.387 203.179c-53.431-.38-101.464-21.302-140.694-61.289-38.753-40.368-59.24-89.063-59.24-142.961 0-53.93 20.915-102.382 60.209-141.932 39.734-39.123 88.893-59.818 144.291-59.818 55.386 0 104.648 20.422 143.863 59.637 39.206 39.206 59.637 87.867 59.637 142.113 0 54.221-20.508 103.116-59.099 143.324-39.073 39.823-87.355 60.541-141.44 60.926Zm173.566-203.179v-36.946c0-22.318-15.474-48.973-49.602-83.249-33.379-34.122-72.211-50.126-119.648-50.126s-86.265 15.897-119.827 50.054c-33.975 33.718-49.923 72.746-49.923 120.196s15.834 86.455 49.837 120.36c33.55 34.277 72.401 50.39 119.663 50.39 47.26 0 85.986-15.958 119.553-50.275 33.974-33.901 50.275-72.994 49.947-120.404m201.911-216.859 201.918 413.538h-37.489l-71-143h-189.304l-70 143h-35.507Zm-1.446 75.504-79.154 162.534h159.146Zm374.488 11.273c-6.98-13.027-15.975-22.396-28.126-29.632-12-7.48-24.274-10.607-39.437-10.607-14.784 0-26.086 4.128-36.031 13.184l-30.999 23.959 19.569-8.401-.675 2.093c-1.45 4.483-2.103 7.595-1.864 17.293l-.01 2.715c-.57 18.483 9.236 33.876 31.367 49.927 9.78 7.182 20.577 14.127 32.866 21.174 12.617 7.232 25.349 15.042 37.958 23.275 12.767 8.36 24.701 17.497 35.141 26.884 10.753 9.812 20.138 22.512 27.055 36.535 6.838 14.304 10.506 30.949 10.623 47.898v5.066c-.376 33.385-12.828 62.048-35.47 82.297-22.904 19.476-52.362 30.101-85.53 30.101-43.792 0-79.913-19.811-104.519-55.551l-1.481-2.212v-71.24l13.37 29.384 3.85 8.454c8.032 17.963 19.44 31.621 35.323 42.637 15.468 11.153 33.673 16.028 57.457 16.028 23.462 0 42.375-6.891 59.262-21.929 17.114-14.426 24.591-32.353 24.238-57.154v-3.025c.157-15.387-3.587-28.303-11.677-40.948-8.118-13.107-17.666-23.054-29.908-31.271-12.928-8.79-26.951-17.929-42.212-27.559a6739 6739 0 0 1-42.598-27.06c-13.689-8.876-25.871-20.749-35.103-34.078-9.224-13.828-14.281-30.251-14.502-46.547v-3.566c.375-25.01 9.758-46.444 25.967-60.46 16.373-13.062 37.595-20.403 61.033-20.403 32.587 0 60.498 13.57 80.086 37.45l1.914 2.4v63.911l-9.39-17.195Zm123.964 326.761h-34.5v-393h34.5Zm201.547-326.761c-6.98-13.027-15.975-22.396-28.125-29.632-11.995-7.47-24.276-10.607-39.438-10.607-14.697 0-25.603 3.896-35.426 12.642l-.12.107-5.114 2.177 1.328.809-27.696 21.403 19.569-8.398-.677 2.094c-1.45 4.482-2.103 7.596-1.864 17.294l-.01 2.715c-.57 18.483 9.24 33.878 31.369 49.928 9.779 7.182 20.575 14.126 32.864 21.173 12.617 7.232 25.349 15.042 37.958 23.275 12.771 8.363 24.701 17.497 35.141 26.884 10.754 9.812 20.138 22.512 27.055 36.534 6.837 14.305 10.506 30.95 10.623 47.899v5.066c-.376 33.385-12.828 62.048-35.47 82.297-22.904 19.476-52.362 30.101-85.53 30.101-43.792 0-79.913-19.811-104.519-55.551l-1.481-2.212v-71.24l13.37 29.384 3.85 8.454c8.032 17.963 19.44 31.621 35.323 42.637 15.468 11.153 33.673 16.028 57.457 16.028 23.462 0 42.375-6.891 59.262-21.929 17.114-14.426 24.591-32.352 24.238-57.154v-3.025c.157-15.387-3.596-28.312-11.683-40.956-8.115-13.103-17.66-23.046-29.902-31.263-12.928-8.79-26.951-17.929-42.212-27.559a6618 6618 0 0 1-42.597-27.061c-13.69-8.875-25.872-20.748-35.104-34.077-9.224-13.828-14.282-30.251-14.502-46.547v-3.566c.375-25.01 9.758-46.444 25.967-60.46 16.373-13.062 37.595-20.403 61.033-20.403 32.587 0 60.498 13.57 80.086 37.45l1.914 2.4v63.911l-9.39-17.195Z" />
								<path d="M303.728 21.886c-1.781 3.144-14.458 25.25-28.288 49.138s-24.83 43.584-24.411 43.689 11.839-1.048 25.354-2.62l24.516-2.828 2.829-6.81c1.572-3.667 3.353-6.915 3.877-7.125.628-.209 23.259 35.936 50.499 80.149C496.505 400.63 494.829 397.801 495.562 395.811c1.362-3.772 3.877-29.86 4.086-42.537l.21-12.572-15.506-26.193c-8.487-14.353-24.307-40.965-35.098-59.09-28.602-48.194-69.148-116.504-80.149-135.153-34.784-58.881-60.662-102.256-61.291-103.094-.524-.524-2.305 1.676-4.086 4.714" />
								<path d="M268.526 125.085c-49.242 6.6-91.569 28.288-131.801 67.472-33.317 32.269-53.328 64.014-65.062 102.989-8.068 26.507-10.477 51.232-8.382 83.292.733 10.582 1.467 19.487 1.676 19.697.21.209 2.62-3.248 5.134-7.753 2.619-4.401 11.42-19.278 19.592-33.003 12.887-21.792 15.087-25.983 17.078-34.05 16.763-67.158 59.09-117.447 119.018-141.544 27.345-11.106 56.157-16.868 90.836-18.545 8.382-.419 15.296-.943 15.296-1.257s-5.343-9.22-11.734-19.801l-11.839-19.173-14.668.104c-8.067.105-19.382.734-25.144 1.572m133.581 16.658c0 .315 7.753 13.935 17.183 30.279 17.077 29.44 17.391 29.859 27.764 39.917 29.754 28.812 51.966 68.834 59.823 107.39 11.42 55.947-.733 111.58-33.945 156.107l-5.867 7.858 23.259.314c17.706.209 23.573-.105 24.516-1.048 2.933-3.143 24.621-47.251 27.554-56.052 7.544-23.154 9.953-41.908 9.22-71.767-.733-30.593-4.924-52.385-14.982-78.054-21.268-54.48-61.71-99.427-111.79-124.676-13.096-6.496-22.735-10.896-22.735-10.268" />
								<path d="M238.98 188.89c-12.991 4.295-23.992 9.848-36.46 18.02l-9.429 6.286-15.401 24.098c-24.621 38.555-52.699 84.654-78.158 128.133-22.107 37.822-67.263 113.361-89.579 149.821L0 531.488l29.126.314c16.03.105 42.641.105 59.195 0l29.964-.314-4.924-6.286c-2.619-3.458-8.172-11.106-12.258-17.078l-7.439-10.687H81.825c-6.495 0-11.839-.314-11.839-.628 0-.419 32.479-56.471 82.245-141.859 27.24-46.727 64.538-110.846 79.625-136.725 9.639-16.763 18.02-31.011 18.649-31.745 1.467-1.886.314-1.571-11.525 2.41m312.948 253.334c-1.99 5.867-6.076 15.925-9.01 22.525l-5.448 11.734 4.086 9.639c2.2 5.239 4.086 9.953 4.086 10.477 0 .419-83.082.838-184.605.838l-184.709.105 4.715 4.086c9.324 8.172 22.735 17.078 35.517 23.364l12.886 6.496 192.777.314 192.777.21-1.467-2.305c-.838-1.362-14.144-23.888-29.65-50.08-15.401-26.193-28.078-47.776-28.183-47.88-.105-.105-1.781 4.61-3.772 10.477" />
								<path d="m108.123 455.215-11.63 20.745 3.143 5.762c8.801 16.239 37.089 49.766 51.757 61.29 34.05 26.926 65.795 42.118 104.036 49.766 45.68 9.115 96.389 5.972 137.773-8.591 13.62-4.819 38.765-17.811 54.375-28.078l13.411-8.906-40.336-.314-40.442-.21-10.896 4.086c-6.076 2.201-14.144 4.61-18.125 5.344-10.686 1.886-55.738 2.619-68.205 1.152-47.251-5.553-88.74-25.983-124.048-60.871-16.658-16.554-27.869-32.584-34.469-49.766-1.781-4.61-3.562-9.22-3.981-10.267-.629-1.467-3.563 2.933-12.363 18.858" />
								<path d="M445.492 359.439c0 75.222-60.979 136.201-136.201 136.201S173.09 434.661 173.09 359.439s60.979-136.201 136.201-136.201 136.201 60.979 136.201 136.201m-136.201-95c-52.467 0-95 42.533-95 95s42.533 95 95 95 95-42.533 95-95-42.533-95-95-95" />
								<path d="M349.291 359.439c0 22.091-17.908 40-40 40s-40-17.909-40-40 17.909-40 40-40 40 17.909 40 40" />
							</svg>
						</a>
					</div>
					<div className="w-1/4 flex flex-1 items-center justify-end">
						<button className="search-popup | flex justify-center items-center snize-custom-widget-opener p-2">
							<Search fontSize="large" />
						</button>
						<button className="cart-popup | relative py-2 px-2 whitespace-nowrap cursor-pointer">
							<CustomBadge
								badgeContent={3}
								overlap="rectangular"
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "right",
								}}>
								<ShoppingCartOutlined fontSize="large" />
							</CustomBadge>
						</button>
					</div>
				</div>
			</header>
			<div
				className="menu-offcanvas offcanvas offcanvas-left | lg:hidden touch-none fixed z-[60] inset-0 transition-colors duration-300 bg-black"
				style={{ "--tw-bg-opacity": 0.3 }}>
				<div className="menu-content__wrapper | overscroll-contain transition-transform duration-300 w-[450px] z-50 bg-white text-black overflow-x-hidden h-full">
					<div className="flex flex-col">
						<div className="menu-content | flex-grow flex flex-col justify-between transition-all opacity-100 duration-300">
							<ul className="menu-links | w-full pt-8">
								{navList.map((nav, index) => (
									<li
										key={index}
										className="menu-link | list-none flex items-center"
										onClick={
											nav.submenu && subMenuOpen_click
										}>
										<a
											href={nav.submenu ? "#" : nav.link}
											className={`w-full px-4 py-3 flex items-center justify-between relative ${
												nav.submenu
													? "pointer-events-none"
													: ""
											}`}>
											<span>{nav.text}</span>
										</a>
										{nav.submenu && (
											<span className="toggle-submenu-mb | flex items-center justify-center">
												<svg
													className="w-[16px] h-[16px]"
													fill="currentColor"
													stroke="currentColor"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 256 512">
													<path d="M17.525 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L205.947 256 10.454 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L34.495 36.465c-4.686-4.687-12.284-4.687-16.97 0z" />
												</svg>
											</span>
										)}
										{nav.submenu && (
											<div className="sub-links | absolute inset-y-0 bg-white flex-col left-full w-full flex hidden">
												<div className="h-full overscroll-contain">
													<button
														className="back-btn | p-4 font-medium flex items-center"
														onClick={
															subMenuClose_click
														}>
														<svg
															className="w-[16px] h-[16px]"
															fill="currentColor"
															stroke="currentColor"
															xmlns="http://www.w3.org/2000/svg"
															viewBox="0 0 256 512">
															<path d="m238.475 36.465 7.071 7.07c4.686 4.686 4.686 12.284 0 16.971L50.053 256l195.493 195.494c4.686 4.686 4.686 12.284 0 16.971l-7.071 7.07c-4.686 4.686-12.284 4.686-16.97 0L10.454 264.485c-4.686-4.686-4.686-12.284 0-16.971L221.505 36.465c4.686-4.687 12.284-4.687 16.97 0" />
														</svg>
														<span className="ml-3">
															Back
														</span>
													</button>
													<ul className="sub-links--2 | pb-4">
														{nav.submenu.map(
															(subnav, index) => (
																<li
																	key={index}
																	className="menu-link | list-none flex items-center">
																	<a
																		href={
																			subnav.link
																		}
																		className="w-full px-4 py-3 flex items-center justify-between relative">
																		<span>
																			{
																				subnav.text
																			}
																		</span>
																	</a>
																</li>
															)
														)}
													</ul>
												</div>
											</div>
										)}
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Navbar;
