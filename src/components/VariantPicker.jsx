import React from "react";
import VariantSelect from "./VariantSelect";
import { formatMoney, moneyFormats } from "../currencyConvert";

const VariantPicker = ({ item, variantId = null }) => {
	const variantPickerRef = React.useRef(null); // Tạo ref cho variantPicker

	// Sử dụng useEffect để thêm sự kiện change vào variantPickerRef
	React.useEffect(() => {
		const variantPicker = variantPickerRef.current;
		variantPicker.addEventListener("change", onVariantChange);
	}, []);

	// Local variables để lưu trữ dữ liệu sản phẩm và biến variant hiện tại
	var productData = item;
	var variantData = item.variants;
	var options = [];
	var currentVariant = null;

	if (variantId) {
		currentVariant =
			variantData.find(
				(variant) => parseInt(variant.id) === parseInt(variantId)
			) || variantData[0];
	} else {
		currentVariant = variantData[0];
	}

	// Hàm kiểm tra dữ liệu sản phẩm
	function _validateProductStructure(product) {
		if (typeof product != "object")
			throw new TypeError(product + " is not an object.");
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
			updateBrowserHistory();
			updatePrice();
		}
	};

	// Hàm lấy các options đã chọn
	const getSelectedOptions = () => {
		const pickerFields = Array.from(
			document.querySelectorAll("[data-picker-field]")
		);
		options = pickerFields.map((field) => {
			return field.querySelector("select").value;
		});
	};

	// Hàm lấy variant đã chọn
	const getSelectedVariant = () => {
		let variant = getVariantFromOptionArray(productData, options);
		currentVariant = variant;
	};

	// Hàm cập nhật button
	const updateButton = (...args) => {
		let disable = args.length > 0 && args[0] !== 0 ? args[0] : 1;
		let text = args.length > 1 ? args[1] : 0;
		let modifyClass = args.length > 2 && args[2] !== 0 ? args[2] : 1;

		const productForms = document.querySelectorAll(`.product-form-main`);

		if (productForms) {
			productForms.forEach((productForm) => {
				const addButton = productForm.querySelector('[name="add"]');
				const dynamicCheckout = productForm.querySelector(
					".prod__dynamic_checkout"
				);
				const addButtonText = productForm.querySelector(
					'[name="add"] > span.atc-text'
				);
				const preorder = productForm.dataset.preorder;

				if (addButton) {
					if (disable) {
						addButton.setAttribute("disabled", "disabled");
						addButton.classList.add("disabled");
						dynamicCheckout &&
							dynamicCheckout.classList.add("disabled");
						text &&
							addButtonText &&
							(addButtonText.textContent = text);
					} else {
						addButton.removeAttribute("disabled");
						addButton.classList.remove("disabled");
						dynamicCheckout &&
							dynamicCheckout.classList.remove("disabled");
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

	// Hàm cập nhật giá tiền
	const updatePrice = () => {
		const currency = sessionStorage.getItem("currency");
		const responseData = JSON.parse(sessionStorage.getItem("exchangeRate"));
		console.log(responseData);
		console.log(currency);
		console.log(currentVariant);
		if (currency && responseData) {
			const priceElements = document.querySelectorAll("span.money");
			priceElements.forEach((element) => {
				element.setAttribute(
					"data-product-price",
					currentVariant.price
				);
				const price = currentVariant.price;
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

	// Hàm cập nhật media-gallery
	const updateMedia = () => {
		if (!currentVariant || !currentVariant.featured_media) return;
		const slides = document.querySelectorAll(".media-gallery");
		slides.forEach((slide) => {
			const swiperslide = slide.querySelectorAll(".swiper-slide");
			swiperslide.forEach((item, index) => {
				const mediaId = item.getAttribute("data-media-id");
				if (
					parseInt(mediaId) ===
					parseInt(currentVariant.featured_media.id)
				) {
					const changeSlideEvent = new CustomEvent("changeSlideTo", {
						detail: { index: index },
					});
					slide.dispatchEvent(changeSlideEvent);
				}
			});
		});
	};

	// Hàm cập nhật browser history
	const updateBrowserHistory = () => {
		!currentVariant ||
			window.history.replaceState(
				{},
				"",
				`${productData.url}?variant=${currentVariant.id}`
			);
	};

	return (
		<div data-product-id={item.id}>
			<div ref={variantPickerRef} className="variant-picker">
				{item.options.map(
					(option, index) =>
						option.values[1] !== null &&
						option.name !== "Title" && (
							<div
								key={index}
								className="product-options__option product-options__option--dropdown">
								<VariantSelect
									index={index}
									option={option}
									currentVariant={currentVariant}
								/>
							</div>
						)
				)}
			</div>
		</div>
	);
};

export default VariantPicker;
