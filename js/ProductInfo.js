const currentPath = path || "";
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
          href="${currentPath}/collections/${product.vendor.toLowerCase()}">
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
          data-rating="${typeof product.rating === "number" ? product.rating : 0}"
          data-rating-count="${typeof product.ratingCount === "number" ? product.ratingCount : 0}">
          <div
            class="rate-stars"
            tabIndex=0
            aria-label="Review">
            <span class="review-count"></span>
          </div>
        </div>
      </div>
    </div>
    ${
      currentVariant.compare_at_price
        ? `<div class="main-product__block main-product__block-countdown">
    <div class="prod__sale-wraps">
      <div class="prod__sale-text">SALES</div>
      <div id="deals-countdown-wrapper" class="deals-countdown-wrapper"></div>
    </div>
  </div>`
        : ""
    }
    <div class="main-product__block main-product__block-price">
      <div class="prod__price flex">
        <div class="price inline-flex items-center flex-wrap">
        ${
          currentVariant.compare_at_price !== null &&
          currentVariant.compare_at_price !== currentVariant.price
            ? `
        <div class="price__sale">
          <span class="visually-hidden visually-hidden--inline">Sale price</span>
          <span class="price-item price-item--sale text-xl md:text-2xl">
            <span class="money" data-product-price=${currentVariant.price}>$${currentVariant.price / 100} USD</span>
          </span>
          <span class="visually-hidden visually-hidden--inline">Regular price</span>
          <s class="price-item price-item--regular prod__compare_price ml-2 line-through text-color-secondary flex items-center">
            <span class="money" data-product-price=${currentVariant.compare_at_price}>$${currentVariant.compare_at_price / 100} USD</span>
          </s>
        </div>
        `
            : `
        <div class="price__regular">
          <span class="visually-hidden visually-hidden--inline">
            Regular price
          </span>
          <span class="price-item price-item--regular text-xl md:text-2xl">
            <span class="money" data-product-price=${currentVariant.price}>$${currentVariant.price / 100} USD</span>
          </span>
        </div>`
        }
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
    <div class="main-product__block main-product__block-extra">
      <div class="actions-block border-y border-[#dedede]">
        <div class="prod__form-buttons flex flex-wrap">
          <a class="flex items-center mr-[30px]">
            <svg class="w-5 h-4" fill="currentColor" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M509.5 184.6L458.9 32.8C452.4 13.2 434.1 0 413.4 0H98.6c-20.7 0-39 13.2-45.5 32.8L2.5 184.6c-1.6 4.9-2.5 10-2.5 15.2V464c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V199.8c0-5.2-.8-10.3-2.5-15.2zM32 199.8c0-1.7.3-3.4.8-5.1L83.4 42.9C85.6 36.4 91.7 32 98.6 32H240v168H32v-.2zM480 464c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V232h448v232zm0-264H272V32h141.4c6.9 0 13 4.4 15.2 10.9l50.6 151.8c.5 1.6.8 3.3.8 5.1v.2z"></path>
            </svg>
            <span class="ml-2"><strong>World Free Shipping & Returns</strong></span>
          </a>
          <a class="flex items-center" data-open-share>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" fill="none" viewBox="0 0 14 16">
              <path fill="#000" d="M11 10c.8333 0 1.5417.2917 2.125.875.5833.5833.875 1.2917.875 2.125 0 .8333-.2917 1.5417-.875 2.125-.5833.5833-1.2917.875-2.125.875-.8333 0-1.54167-.2917-2.125-.875C8.29167 14.5417 8 13.8333 8 13c0-.3125.04167-.6146.125-.9062l-3.0625-1.9063C4.47917 10.7292 3.79167 11 3 11c-.83333 0-1.54167-.2917-2.125-.875C.291667 9.54167 0 8.83333 0 8c0-.83333.291667-1.54167.875-2.125C1.45833 5.29167 2.16667 5 3 5c.79167 0 1.47917.27083 2.0625.8125L8.125 3.90625C8.04167 3.61458 8 3.3125 8 3c0-.83333.29167-1.54167.875-2.125C9.45833.291667 10.1667 0 11 0c.8333 0 1.5417.291667 2.125.875C13.7083 1.45833 14 2.16667 14 3c0 .83333-.2917 1.54167-.875 2.125C12.5417 5.70833 11.8333 6 11 6c-.7917 0-1.47917-.27083-2.0625-.8125L5.875 7.09375c.1875.60417.1875 1.20833 0 1.8125l3.0625 1.90625C9.52083 10.2708 10.2083 10 11 10zm1.0625-8.0625C11.7708 1.64583 11.4167 1.5 11 1.5c-.4167 0-.7708.14583-1.0625.4375C9.64583 2.22917 9.5 2.58333 9.5 3s.14583.77083.4375 1.0625c.2917.29167.6458.4375 1.0625.4375.4167 0 .7708-.14583 1.0625-.4375.2917-.29167.4375-.64583.4375-1.0625s-.1458-.77083-.4375-1.0625zm-10.125 7.125C2.22917 9.35417 2.58333 9.5 3 9.5s.77083-.14583 1.0625-.4375S4.5 8.41667 4.5 8s-.14583-.77083-.4375-1.0625S3.41667 6.5 3 6.5s-.77083.14583-1.0625.4375S1.5 7.58333 1.5 8s.14583.77083.4375 1.0625zm8 5c.2917.2917.6458.4375 1.0625.4375.4167 0 .7708-.1458 1.0625-.4375.2917-.2917.4375-.6458.4375-1.0625 0-.4167-.1458-.7708-.4375-1.0625-.2917-.2917-.6458-.4375-1.0625-.4375-.4167 0-.7708.1458-1.0625.4375C9.64583 12.2292 9.5 12.5833 9.5 13c0 .4167.14583.7708.4375 1.0625z"></path>
            </svg>
            <span class="ml-2">Share</span>
          </a>
          <div class="sharing hidden border-t">
            <div class="sharing__copy-link">
              <label for="" class="font-semibold">Copy link</label>
              <input type="text" class="form-control" value="${window.location.href}">
            </div>
            <div class="sharing__socials">
              <label class="font-semibold mr-5">Share:</label>
              <div class="sharing__socials-list flex">
                <a href="https://www.facebook.com/sharer/sharer.php?u=${window.location.href}" target="_blank" class="mr-4 inline-flex items-center justify-center w-6">
                  <svg class="w-[16px] h-[16px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path></svg>
                </a>
                <a href="https://pinterest.com/pin/create/button/?url=${window.location.href}" target="_blank" class="mr-4 inline-flex items-center justify-center w-6">
                  <svg class="w-[16px] h-[16px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M204 6.5C101.4 6.5 0 74.9 0 185.6 0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-67.8 0-80.4 61.2-137.4 140.4-137.4 68.1 0 118.5 38.7 118.5 109.8 0 53.1-21.3 152.7-90.3 152.7-24.9 0-46.2-18-46.2-43.8 0-37.8 26.4-74.4 26.4-113.4 0-66.2-93.9-54.2-93.9 25.8 0 16.8 2.1 35.4 9.6 50.7-13.8 59.4-42 147.9-42 209.1 0 18.9 2.7 37.5 4.5 56.4 3.4 3.8 1.7 3.4 6.9 1.5 50.4-69 48.6-82.5 71.4-172.8 12.3 23.4 44.1 36 69.3 36 106.2 0 153.9-103.5 153.9-196.8C384 71.3 298.2 6.5 204 6.5z"></path></svg>
                </a>
                <a href="https://twitter.com/intent/tweet?url=${window.location.href}" target="_blank" class="mr-4 inline-flex items-center justify-center w-6">
                  <svg class="w-[16px] h-[16px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg>
                </a>
              </div>
            </div>
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
  '<svg class="star-icon normalStar w-[18px] h-[18px]" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>';
const halfStar =
  '<svg class="star-icon halfStar w-[18px] h-[18px]" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="m22 9.24-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28z"></path></svg>';
const borderStar =
  '<svg class="star-icon borderStar w-[18px] h-[18px]" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="m22 9.24-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28z"></path></svg>';
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

document.querySelector("a[data-open-share]").addEventListener("click", () => {
  document.querySelector(".sharing").classList.toggle("hidden");
});
