const currentPath = path || "";
// Lấy ra variant hiện tại
var currentVariant = null;
if (variantId) {
	currentVariant =
		product.variants.find((variant) => parseInt(variant.id) === parseInt(variantId)) ||
		product.variants[0];
} else {
	currentVariant = product.variants[0];
}

document.title = `${product.title} - Audio Oasis`;

document.querySelector(".prod__info").innerHTML = `
<div
  class="product-form form main-product"
  data-product-id=${product.id}>
  <div class="main-product__blocks">
    <div class="main-product__block main-product__block-vendor">
      <div>
        <a
          class="text-xl uppercase"
          href="${currentPath}/collections/${product.vendor}">
          ${product.vendor}
        </a>
      </div>
    </div>
    <div class="main-product__block main-product__block-title">
      <div class="prod__title flex justify-between items-start pt-0.5 relative">
        <h1 class="text-2xl md:text-3xl md:leading-[36px] pr-2">
          ${product.title}
        </h1>
      </div>
    </div>
    <div class="main-product__block main-product__block-rate">
      <div class="prod__rating">
        <div
          id="avg-rate"
          data-product-id=${product.id}
          data-rating="0"
          data-rating-count="0">
          <div
            class="rate-stars"
            tabIndex=0
            aria-label="Review">
            <span class="review-count"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="main-product__block main-product__block-price">
      <div class="prod__price flex">
        <div class="price inline-flex items-center flex-wrap">
          <div class="price__regular">
            <span class="visually-hidden visually-hidden--inline">
              Regular price
            </span>
            <span class="price-item price-item--regular text-xl md:text-2xl">
              <span
                class="money"
                data-product-price=${currentVariant.price}>$${currentVariant.price / 100} USD</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="main-product__block main-product__block-variant_picker">
      <div class="product__variant-picker product-options"></div>
    </div>
    <div class="main-product__block main-product__block-buy_buttons">
      <div class="product__actions">
        <div class="flex flex-wrap items-end">
          <button name="add" class="btn-atc add-to-cart btn flex-grow shrink relative"><span>Add to cart</span></button>
          <div class="prod__dynamic_checkout buy-one-click w-full">
            <button class="paypal">
              <span class="paypal-text">Buy now with PayPal</span>
              <span aria-hidden="true">Buy with </span>
              <span class="paypal-logo">
                <svg viewBox="0 0 67 19" style="height: 18px; width: 63.4737px;">
                  <path d="M8.44.57H3.29a.718.718 0 0 0-.707.61L.502 14.517c-.041.263.16.5.425.5h2.458a.718.718 0 0 0 .707-.61l.561-3.597a.717.717 0 0 1 .706-.611h1.63c3.391 0 5.349-1.658 5.86-4.944.23-1.437.01-2.566-.657-3.357C11.461 1.029 10.162.57 8.44.57zm.594 4.87C8.752 7.308 7.34 7.308 5.976 7.308h-.777l.545-3.485a.43.43 0 0 1 .424-.366h.356c.93 0 1.807 0 2.26.535.27.32.353.794.25 1.45zm14.796-.06h-2.466a.43.43 0 0 0-.424.367l-.109.696-.172-.252c-.534-.783-1.724-1.044-2.912-1.044-2.725 0-5.052 2.084-5.505 5.008-.235 1.46.1 2.854.919 3.827.75.894 1.826 1.267 3.105 1.267 2.195 0 3.412-1.426 3.412-1.426l-.11.692a.432.432 0 0 0 .424.502h2.22a.718.718 0 0 0 .707-.61l1.333-8.526a.43.43 0 0 0-.423-.5zm-3.437 4.849c-.238 1.422-1.356 2.378-2.782 2.378-.716 0-1.288-.232-1.655-.672-.365-.436-.503-1.058-.387-1.75.222-1.41 1.359-2.397 2.763-2.397.7 0 1.269.235 1.644.678.375.448.524 1.073.417 1.763zM36.96 5.38h-2.478a.716.716 0 0 0-.592.318l-3.417 5.085-1.448-4.887a.719.719 0 0 0-.687-.515h-2.435a.433.433 0 0 0-.407.573l2.73 8.09-2.567 3.66a.434.434 0 0 0 .35.684h2.475a.712.712 0 0 0 .588-.31l8.24-12.016a.434.434 0 0 0-.352-.681z" style="fill: rgb(37, 59, 128);"></path>
                  <path d="M45.163.57h-5.15a.717.717 0 0 0-.706.61l-2.082 13.337a.43.43 0 0 0 .423.5h2.642a.502.502 0 0 0 .494-.427l.591-3.78a.717.717 0 0 1 .706-.611h1.63c3.392 0 5.348-1.658 5.86-4.944.231-1.437.009-2.566-.657-3.357C48.183 1.029 46.886.57 45.163.57zm.593 4.87c-.28 1.867-1.692 1.867-3.057 1.867h-.777l.546-3.485a.429.429 0 0 1 .423-.366h.356c.93 0 1.807 0 2.26.535.27.32.353.794.25 1.45zm14.795-.06h-2.464a.428.428 0 0 0-.423.367l-.109.696-.173-.252c-.534-.783-1.723-1.044-2.911-1.044-2.724 0-5.05 2.084-5.504 5.008-.235 1.46.099 2.854.918 3.827.753.894 1.826 1.267 3.105 1.267 2.195 0 3.413-1.426 3.413-1.426l-.11.692a.432.432 0 0 0 .424.502h2.22a.717.717 0 0 0 .707-.61l1.333-8.526a.433.433 0 0 0-.426-.5zm-3.436 4.849c-.237 1.422-1.356 2.378-2.782 2.378-.714 0-1.288-.232-1.655-.672-.365-.436-.502-1.058-.387-1.75.223-1.41 1.359-2.397 2.763-2.397.7 0 1.269.235 1.644.678.377.448.526 1.073.417 1.763zM63.458.935l-2.113 13.582a.43.43 0 0 0 .423.5h2.124a.716.716 0 0 0 .707-.61L66.683 1.07a.432.432 0 0 0-.423-.5h-2.379c-.21 0-.39.156-.423.366z" style="fill: rgb(23, 155, 215);"></path>
                </svg>
              </span>
            </button>
            <button class="more-options">More payment options</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;

const avgRate = document.querySelector("#avg-rate");
const rating = avgRate.getAttribute("data-rating");
const ratingCount = avgRate.getAttribute("data-rating-count");
const normalStar =
	'<svg class="star-icon normalStar w=[18px] h-[18px]" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>';
const halfStar =
	'<svg class="star-icon halfStar w=[18px] h-[18px]" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="m22 9.24-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28z"></path></svg>';
const borderStar =
	'<svg class="star-icon borderStar w=[18px] h-[18px]" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="m22 9.24-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28z"></path></svg>';
const rateStars = document.querySelector(".rate-stars");
// Tạo biến star để lưu trữ các icon sao
let star = "";
// Duyệt qua 5 lần để render ra 5 icon sao
for (let i = 0; i < 5; i++) {
	if (rating - i >= 1) {
		star += normalStar;
	} else if (rating - i >= 0.5 && rating - i < 1) {
		star += halfStar;
	} else {
		star += borderStar;
	}
}
// Thêm số lượng reviews vào sau các icon sao
star += `<span class="review-count">${ratingCount} Reviews</span>`;
rateStars.innerHTML = star;
