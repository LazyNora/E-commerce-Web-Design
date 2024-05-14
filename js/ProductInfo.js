// Lấy ra variant hiện tại
var currentVariant = null;
if (variantId) {
  currentVariant =
    product.variants.find(
      (variant) => parseInt(variant.id) === parseInt(variantId),
    ) || product.variants[0];
} else {
  currentVariant = product.variants[0];
}

document.querySelector(".prod__info").innerHTML = `
<div
  class="product-form form main-product"
  data-product-id=${product.id}>
  <div class="main-product__blocks">
    <div class="main-product__block main-product__block-vendor">
      <div>
        <a
          class="text-xl uppercase"
          href="${path}/collections/${product.vendor}">
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
          data-rating="4.6"
          data-rating-count="123">
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
      <div class="product__variant-picker product-options">
        <VariantPicker item={item} variantId={variantId} />
      </div>
    </div>
  </div>
  <div class="main-product__block main-product__block-buy_buttons">
    button here
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
