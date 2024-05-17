const cartDrawer = document.getElementById("cart-drawer");
const cartWrapper = cartDrawer.querySelector(".cart__wrapper");
const cartContent = cartDrawer.querySelector(".cart__content");
const cartClose = cartDrawer.querySelector(".cart__close");
const cartOpenBtns = document.querySelectorAll(".btn-cart");
cartContent.classList.add("translate-x-full");

cartWrapper.addEventListener("click", (e) => {
	if (e.target === cartWrapper) {
		document.documentElement.classList.remove("prevent-scroll");
		cartContent.classList.add("translate-x-full");
		cartWrapper.style.setProperty("--tw-bg-opacity", 0);
		setTimeout(() => {
			cartWrapper.classList.add("hidden");
		}, 300);
	}
});

cartClose.addEventListener("click", () => {
	document.documentElement.classList.remove("prevent-scroll");
	cartContent.classList.add("translate-x-full");
	cartWrapper.style.setProperty("--tw-bg-opacity", 0);
	setTimeout(() => {
		cartWrapper.classList.add("hidden");
	}, 300);
});

document.addEventListener("keydown", (e) => {
	if (e.key === "Escape") {
		document.documentElement.classList.remove("prevent-scroll");
		cartContent.classList.add("translate-x-full");
		cartWrapper.style.setProperty("--tw-bg-opacity", 0);
		setTimeout(() => {
			cartWrapper.classList.add("hidden");
		}, 300);
	}
});

cartOpenBtns.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		e.preventDefault();
		document.documentElement.classList.add("prevent-scroll");
		cartWrapper.classList.remove("hidden");
		setTimeout(() => {
			cartContent.classList.remove("translate-x-full");
			cartWrapper.style.setProperty("--tw-bg-opacity", 0.5);
		}, 300);
	});
});

function loadCart(addToCart = false) {
	var currentCart = JSON.parse(localStorage.getItem("cart")) || {
		items: [],
		subtotal: 0,
	};

	const badges = document.querySelectorAll(".badge");

	if (currentCart.items.length == 0) {
		cartWrapper.classList.add("cart-empty");
		badges.forEach((badge) => {
			const badgeInner = badge.querySelector(".badge-inner");
			if (badgeInner) badgeInner.remove();
		});
	} else {
		cartWrapper.classList.remove("cart-empty");
		badges.forEach((badge) => {
			const badgeInner = badge.querySelector(".badge-inner");
			if (badgeInner) {
				badgeInner.textContent = currentCart.items.length;
			} else {
				const badgeInner = document.createElement("span");
				badgeInner.classList.add("badge-inner");
				badgeInner.textContent = currentCart.items.length;
				badge.appendChild(badgeInner);
			}
		});
	}

	const addSuccessMsg =
		'<div class="notification show success"><svg class="w-6 h-6" fill="none" stroke="currentColor" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"></path></svg><div class="ml-3">Product added to cart successfully</div></div>';

	const cartBody = cartContent.querySelector(".cart__body");
	cartBody.innerHTML =
		currentCart.items.length > 0
			? `
  <div class="cart__items">
    ${addToCart ? addSuccessMsg : ""}
    ${currentCart.items
		.map(
			(item, index) =>
				`
        <div class="cart-item" data-index=${index} data-product-id=${item.id}>
          <div class="cart-item__inner flex items-start">
            <div class="cart-item__image">
              <a href=${currentPath + item.url + "/?variant=" + item.variantId} class="block" style="--aspect-ratio:1.499">
                <img src=${item.img} alt=${item.alt} />
              </a>
            </div>
            <div class="cart-item__info">
              <a href=${currentPath + item.url + "/?variant=" + item.variantId} class="font-medium hover:underline">${item.title}</a>
              ${
					item.options_with_values
						? `
              <div class="cart-item__variant mb-1">
              ${item.options_with_values
					.map(
						(option) =>
							`
                <div class="cart-item__variant-option">
                  <span class="font-medium">${option.name}: </span>${option.value}
                </div>
                `
					)
					.join("")}
              </div>`
						: ""
				}
              <div class="cart-item__prices">
                <div class="cart-item__price text-color-regular-price">
                  <span class="money" data-product-price=${item.price}>$${item.price / 100} USD</span>
                </div>
              </div>
              <div class="flex items-center mt-[10px] justify-between">
                <div class="cart-item__quantity flex justify-between rounded">
                  <button class="cart-item__btn" data-id=${item.id + ":" + item.variantId} data-qty-change="dec">-</button>
                  <input class="py-1 cart-item__qty_input w-9 text-center" type="number" name="quantity" id="quantity" data-id=${item.id + ":" + item.variantId} value="1" min="0">
                  <button class="cart-item__btn" data-id=${item.id + ":" + item.variantId} data-qty-change="inc">+</button>
                </div>
                <button class="cart-item__remove underline p-2 ml-2" data-id=${item.id + ":" + item.variantId}>Remove</button>
              </div>
            </div>
          </div>
        </div>
        `
		)
		.join("")}
    </div>
    `
			: "<div class='cart-empty-msg'><p>Your cart is currently empty.</p></div>";

	const cartSubtotal = cartContent.querySelector(".cart__subtotal-price");
	cartSubtotal.innerHTML = `<span class="money" data-product-price=${currentCart.subtotal}>$${currentCart.subtotal / 100} USD</span>`;

	if (addToCart && currentCart.items.length > 0) {
		setTimeout(() => {
			cartBody.querySelector(".notification").remove();
		}, 6000);
	}
}

loadCart();
