import React from "react";

const VariantPicker = ({ item }) => {
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
		updateButton(!0, "", !1);
		if (currentVariant) {
			updateMedia();
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

	const getDataImageVariant = (variantId) => {};

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
								<div
									className="variant-select"
									data-picker-field="select"
									data-option-name={option.name}
									data-option-position={option.position}
									data-selected-value={option.values[0]}>
									<div className="prod__option-label | font-medium flex flex-wrap items-center justify-between prod__option-label--dropdown uppercase">
										<label
											className="form-label"
											htmlFor={`option_${option.position}`}>
											<span className="font-bold mr-1">
												{option.name}:
											</span>
											<span className="selected-value">
												{option.values[0]}
											</span>
										</label>
									</div>
									<div className="prod__option prod__option--dropdown">
										<div className="flex flex-wrap">
											<select
												className="select-bordered uppercase"
												name={`options[${option.name}]`}>
												{option.values.map(
													(value, index) => (
														<option
															key={index}
															value={value}
															className="variant-picker__option product-option-item"
															data-value={value}
															data-option-position={
																option.position
															}>
															{value}
														</option>
													)
												)}
											</select>
										</div>
									</div>
								</div>
							</div>
						)
				)}
			</div>
			{/* <script id="productVariants" type="application/json">
				{JSON.stringify(item.variants)}
			</script> */}
		</div>
	);
};

export default VariantPicker;
