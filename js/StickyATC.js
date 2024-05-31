function scrollToTop(callback) {
	const scrollToTopTarget = document.querySelector("#scroll-to-top-target");
	if (!scrollToTopTarget) return;
	scrollToTopTarget.scrollIntoView({ behavior: "smooth" });
	typeof callback === "function" && callback();
}

(function () {
	const stickyATC = document.querySelector(".sticky-atc");
	const container = stickyATC.closest(".prod__sticky-atc");
	const mainImg = stickyATC.querySelector(".main-img");
	const mainImg_img = mainImg.querySelector("img");
	const select = stickyATC.querySelector("select.combined-variant");
	const prodTitle = stickyATC.querySelector(".psa__title");
	function init() {
		mainImg_img.src = path + product.media[0].src;
		mainImg_img.alt = product.title;
		stickyATC.querySelector(".psa__title").textContent = product.title;
		if (product.variants.length < 2) select.classList.add("hidden");
		product.variants.forEach((variant) => {
			const option = document.createElement("option");
			option.value = variant.id;
			option.textContent = variant.title;
			select.appendChild(option);
		});

		const rootMargin = `-${document.querySelector(".header__wrapper").offsetHeight || 66}px 0px 0px 0px`;
		let observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					const method = entry.intersectionRatio !== 1 ? "remove" : "add";
					container.classList[method]("translate-y-full"),
						document.documentElement.classList[
							entry.intersectionRatio != 1 ? "remove" : "add"
						]("stick-atc-show");
				});
			},
			{ threshold: 1, rootMargin }
		);
		const productFormActions = document.querySelector(".product-form");
		observer.observe(productFormActions);
		window.addEventListener("resize", () => {
			const rootMargin = `-${document.querySelector(".header__wrapper").offsetHeight || 66}px 0px 0px 0px`;
			observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						const method = entry.intersectionRatio !== 1 ? "remove" : "add";
						container.classList[method]("translate-y-full"),
							document.documentElement.classList[
								entry.intersectionRatio != 1 ? "remove" : "add"
							]("stick-atc-show");
					});
				},
				{ threshold: 1, rootMargin }
			);
			observer.observe(productFormActions);
		});
		mainImg?.addEventListener("click", scrollToTop);
		prodTitle?.addEventListener("click", scrollToTop);
		select.value = variantId || product.variants[0].id;
		select?.addEventListener("change", () => {
			const selectedVariantId = select.value;
			const currentVariant = product.variants.find(
				(variant) => variant.id === Number(selectedVariantId)
			);
			currentVariant.options.forEach((option, index) => {
				const field = document.querySelector("select#option_" + (index + 1));
				field.value = option;
				const event = new Event("change", { bubbles: true });
				field.dispatchEvent(event);
			});
		});

		const increment = document.querySelector(
			"button.quantity-input__button[data-quantity-selector=increase]"
		);
		const decrement = document.querySelector(
			"button.quantity-input__button[data-quantity-selector=decrease]"
		);
		const quantity = document.querySelector("input.quantity-input__element");
		increment?.addEventListener("click", () => {
			quantity.value = Number(quantity.value) + 1;
		});
		decrement?.addEventListener("click", () => {
			if (quantity.value <= 1) return;
			quantity.value = Number(quantity.value) - 1;
		});
		quantity?.addEventListener("change", () => {
			if (quantity.value < 1) quantity.value = 1;
		});

		const addToCart = document.querySelector("button[name=add].sticky-atc-btn");
		addToCart?.addEventListener("click", () => {
			const productId = product.id;
			const productTitle = product.title;
			let currentVariant = null;
			if (variantId) {
				currentVariant =
					product.variants.find(
						(variant) => parseInt(variant.id) === parseInt(variantId)
					) || product.variants[0];
			} else {
				currentVariant = product.variants[0];
			}
			const currentvariantId = currentVariant.id;
			const variantPrice = currentVariant.price;
			const variantOptions = currentVariant.options
				.filter((option) => option !== "Default Title")
				.map((option, index) => {
					return {
						name: product.options[index].name,
						value: option,
					};
				});
			const productImg = currentVariant.featured_image
				? currentVariant.featured_image.src
				: product.featured_image;
			const productAlt = currentVariant.featured_image
				? currentVariant.featured_image.alt
				: product.title;
			const productUrl = product.url;

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
					qty: parseInt(quantity.value),
				});
			} else {
				currentCart.items[itemIndex].qty += parseInt(quantity.value);
			}

			currentCart.subtotal += parseInt(variantPrice) * parseInt(quantity.value);

			localStorage.setItem("cart", JSON.stringify(currentCart));

			loadCart(true);

			if (window.innerWidth < 768) document.documentElement.classList.add("prevent-scroll");
			cartWrapper.classList.remove("hidden");
			setTimeout(() => {
				cartContent.classList.remove("translate-x-full");
				cartWrapper.style.setProperty("--tw-bg-opacity", 0.5);
			}, 300);
		});
	}

	init();
})();
