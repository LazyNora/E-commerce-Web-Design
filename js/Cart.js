const cartWrapper = document.querySelector(".cart__wrapper");
const cartTable = cartWrapper.querySelector(".cart__table");

function loadCart(addToCart = false) {
	let currentCart = JSON.parse(localStorage.getItem("cart")) || {
		items: [],
		subtotal: 0,
	};

	const badges = document.querySelectorAll(".badge");

	if (currentCart.items.length == 0) {
		document.body.classList.add("cart-empty");
		badges.forEach((badge) => {
			const badgeInner = badge.querySelector(".badge-inner");
			if (badgeInner) badgeInner.remove();
		});
	} else {
		document.body.classList.remove("cart-empty");
		badges.forEach((badge) => {
			const badgeInner = badge.querySelector(".badge-inner");
			if (badgeInner) {
				badgeInner.textContent = currentCart.items.reduce((acc, item) => acc + item.qty, 0);
			} else {
				const badgeInner = document.createElement("span");
				badgeInner.classList.add("badge-inner");
				badgeInner.textContent = currentCart.items.reduce((acc, item) => acc + item.qty, 0);
				badge.appendChild(badgeInner);
			}
		});
	}

	const addSuccessMsg =
		'<div class="notification success"><svg class="w-6 h-6" fill="none" stroke="currentColor" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"></path></svg><div class="ml-3">Product added to cart successfully</div></div>';

	const cartBody = cartTable.querySelector(".cart__table-body");
	cartBody.innerHTML =
		currentCart.items.length > 0
			? `<div class="cart__items">
          ${addToCart ? addSuccessMsg : ""}
          ${currentCart.items
				.map(
					(item, index) =>
						`
            <div class="cart__item cart-item flex" data-index=${index} data-product-id=${item.id} data-variant-id=${item.variantId}>
              <div class="cart__table-col cart__table-product">
                <div class="cart__item-product">
                  <div class="cart__item-product-image">
                    <div class="image cart__item-product-image" style="--aspect-ratio: 1.499;">
                      <img src=${path + item.img} sizes="110px" alt=${item.alt} loading="lazy" class="img-loaded" width="110" height="73"/>
                    </div>
                  </div>
                  <div class="cart__item-product-info">
                    <div class="cart__item-product-title">
                      <a href=${path + item.url + "/?variant=" + item.variantId}>${item.title}</a>
                    </div>
                    ${
						item.options_with_values
							? `
                      <ul class="cart__item-product-details text-color-subtext" aria-label="Product details">
                        ${item.options_with_values
							.map(
								(option) =>
									`
                          <li class="cart__item--variant-option text-sm"><span class="font-bold">${option.name}</span>: ${option.value}</li>
                          `
							)
							.join("")}
                      </ul>
                      `
							: ""
					}
                    <button class="cart-item__remove mt-2" data-id=${item.id + ":" + item.variantId}>Remove</button>
                  </div>
                </div>
              </div>
              <div class="cart__table-col cart__table-price">
                <div class="cart__item-prices">
                  <div class="cart__item-discount-prices">
                    <p>
                      <span class="visually-hidden">Regular price</span>
                      <span class="money" data-product-price=${item.price}>$${item.price / 100} USD</span>
                    </p>
                  </div>
                </div>
                <div class="cart__quantity mt-2 md:hidden">
                  <div class="flex items-center justify-end">
                    <span class="mr-2 text-sm hidden sm:block">Qty</span>
                    <div class="cart-item__qty flex justify-between border border-color-border rounded">
                      <button class="cart-item__btn" data-id=${item.id + ":" + item.variantId} data-qty-change="dec">-</button>
                      <input class="py-1 cart-item__qty_input w-9 text-center" type="number" name="quantity" id="quantity${index}-1" data-id=${item.id + ":" + item.variantId} value=${item.qty} min="0">
                      <button class="cart-item__btn" data-id=${item.id + ":" + item.variantId} data-qty-change="inc">+</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cart__table-col cart__table-quantity hidden md:block">
                <div class="cart-item__qty flex justify-between border border-color-border rounded">
                  <button class="cart-item__btn" data-id=${item.id + ":" + item.variantId} data-qty-change="dec">-</button>
                  <input class="py-1 cart-item__qty_input w-9 text-center" type="number" name="quantity" id="quantity${index}-2" data-id=${item.id + ":" + item.variantId} value=${item.qty} min="0">
                  <button class="cart-item__btn" data-id=${item.id + ":" + item.variantId} data-qty-change="inc">+</button>
                </div>
              </div>
              <div class="cart__table-col cart__table-subtotal text-right hidden md:block">
                <div>
                  <span class="font-bold cart-item__original_line_price">
                    <span class="money" data-product-price=${item.price}>$${item.price / 100} USD</span>
                  </span>
                </div>
              </div>
            </div>
            `
				)
				.join("")}
          </div>
          `
			: `<div class="my-20 px-4"><h3 class="text-center text-xl">Your cart is currently empty. <a href=${path + "/collections/all"} class="border-b border-gray-800">Back to shopping</a></h3></div>`;

	const cartSubtotal = cartWrapper.querySelector(".cart-subtotal__price");
	cartSubtotal.innerHTML = `<span class="money" data-product-price=${currentCart.subtotal}></span>`;
	document.querySelectorAll(".currency-selector").forEach((selector) => {
		selector.dispatchEvent(new Event("change"));
	});

	const cartItemDecBtns = cartTable.querySelectorAll(".cart-item__btn[data-qty-change='dec']");
	const cartItemIncBtns = cartTable.querySelectorAll(".cart-item__btn[data-qty-change='inc']");
	const cartItemQtyInputs = cartTable.querySelectorAll(".cart-item__qty_input");
	const cartItemRemoveBtns = cartTable.querySelectorAll(".cart-item__remove");

	cartItemDecBtns.forEach((btn) => {
		btn.addEventListener("click", (e) => {
			const id = e.target.getAttribute("data-id");
			const itemIndex = currentCart.items.findIndex(
				(item) => item.id + ":" + item.variantId === id
			);
			if (currentCart.items[itemIndex].qty > 1) {
				currentCart.items[itemIndex].qty -= 1;
				currentCart.subtotal -= currentCart.items[itemIndex].price;
				localStorage.setItem("cart", JSON.stringify(currentCart));
				loadCart();
			} else {
				currentCart.subtotal -= currentCart.items[itemIndex].price;
				currentCart.items.splice(itemIndex, 1);
				localStorage.setItem("cart", JSON.stringify(currentCart));
				loadCart();
			}
		});
	});

	cartItemIncBtns.forEach((btn) => {
		btn.addEventListener("click", (e) => {
			const id = e.target.getAttribute("data-id");
			const itemIndex = currentCart.items.findIndex(
				(item) => item.id + ":" + item.variantId === id
			);
			currentCart.items[itemIndex].qty += 1;
			currentCart.subtotal += currentCart.items[itemIndex].price;
			localStorage.setItem("cart", JSON.stringify(currentCart));
			loadCart();
		});
	});

	cartItemQtyInputs.forEach((input) => {
		input.addEventListener("change", (e) => {
			const id = e.target.getAttribute("data-id");
			const itemIndex = currentCart.items.findIndex(
				(item) => item.id + ":" + item.variantId === id
			);
			const newQty = parseInt(e.target.value);
			if (newQty > 0) {
				currentCart.subtotal -=
					currentCart.items[itemIndex].price * currentCart.items[itemIndex].qty;
				currentCart.items[itemIndex].qty = newQty;
				currentCart.subtotal +=
					currentCart.items[itemIndex].price * currentCart.items[itemIndex].qty;
				localStorage.setItem("cart", JSON.stringify(currentCart));
				loadCart();
			} else {
				currentCart.subtotal -=
					currentCart.items[itemIndex].price * currentCart.items[itemIndex].qty;
				currentCart.items.splice(itemIndex, 1);
				localStorage.setItem("cart", JSON.stringify(currentCart));
				loadCart();
			}
		});
	});

	cartItemRemoveBtns.forEach((btn) => {
		btn.addEventListener("click", (e) => {
			const id = e.target.getAttribute("data-id");
			const itemIndex = currentCart.items.findIndex(
				(item) => item.id + ":" + item.variantId === id
			);
			currentCart.subtotal -=
				currentCart.items[itemIndex].price * currentCart.items[itemIndex].qty;
			currentCart.items.splice(itemIndex, 1);
			localStorage.setItem("cart", JSON.stringify(currentCart));
			loadCart();
		});
	});

	if (addToCart && currentCart.items.length > 0) {
		setTimeout(() => {
			cartBody.querySelector(".notification").classList.add("show");
		}, 500);
		setTimeout(() => {
			cartBody.querySelector(".notification").classList.remove("show");
		}, 3000);
		setTimeout(() => {
			cartBody.querySelector(".notification").remove();
		}, 3300);
	}
}

loadCart();
