import { carouselData } from "./data.js";
document.querySelector(".swiper-wrapper").innerHTML = carouselData
	.map(
		(item) => `
    <div class="swiper-slide | relative">
      <div class="slide-media | relative" style="--aspect-ratio: 2.072704081632653; --aspect-ratio-mobile: 1.314060446780552">
        <div class="res | hidden md:block">
          <div class="slide-bg">
            <img
              src=${item.img}
              sizes="100vw"
              width="3520"
              height="1568"
              loading="lazy"
            />
            <div class="swiper-lazy-preloader"></div>
          </div>
        </div>
        <div class="res-mobile | md:hidden" style="height:20vw">
          <div class="slide-bg-mobile">
            <img
              src=${item.img_mobile}
              sizes="100vw"
              width="1000"
              height="761"
              loading="lazy"
            />
            <div class="swiper-lazy-preloader"></div>
          </div>
        </div>
      </div>
      <div class="slide-block slide_block-desktop flex slide-block--middle-right container-fluid w-full h-full p-4 md:p-6 lg:py-24 absolute inset-0">
          <div class="slide-content max-w-4xl w-max text-right">
            <div
              class="slide_block-subtitle text-xl mb-2 md:mb-[14px] text-black ${
					item.type === "light" ? "md:text-black" : "md:text-white"
				}">
              <span class="font-semibold">
                ${item.subtitle}
              </span>
            </div>
            <h2
              class="slide_block-title | leading-[55px] md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl mb-3 md:mb-5 text-black ${
					item.type === "light" ? "md:text-black" : "md:text-white"
				} lg:leading-tight xl:leading-tight 2xl:leading-tight">
              <span
                class="sf__font-normal"
                >
                ${item.title}
                </span>
            </h2>
            <div
              class="slide_block-description md:text-xl mb-3 md:mb-7
              text-black ${
					item.type === "light" ? "md:text-black" : "md:text-white"
				}
              "">
              <p>${item.desc}</p>
            </div>
            <a
              href=${item.link}
              class="slide_block-link inline-block sf__btn ${
					item.type === "light" ? "sf__btn-primary" : "sf__btn-white"
				}">
              ${item.buttontext}
            </a>
          </div>
        </div>
        <div
          type=${item.type}
          class="slide-footer container-fluid absolute inset-x-0 bottom-16 z-10 flex items-center justify-end text-black text-xs lg:text-base">
          <span class="mx-2">
            ${item.footer}
          </span>
        </div>
    </div>`
	)
	.join("");

const renderCustomPagination = (index, className) => {
	return (
		'<span class="carousel-dot ' +
		className +
		" page-" +
		index +
		'"><svg width="65px" height="65px" viewBox="0 0 72 72" aria-hidden="true" xmlns="http://www.w3.org/200/svg"><circle stroke-width="5" fill="none" stroke-linecap="round" cx="33" cy="33" r="28" stroke="#000" stroke-dashoffset="180" stroke-dasharray="179"></circle></svg></span>'
	);
};

const handleSlideChange = (swiper) => {
	const footerElement =
		swiper.slides[swiper.realIndex].querySelector(".slide-footer");
	if (footerElement) {
		footerElement.classList.remove("animate"); // Remove animation class
		void footerElement.offsetWidth; // Trigger reflow
		footerElement.classList.add("animate"); // Add animation class to restart animation
	}

	const contentElement =
		swiper.slides[swiper.realIndex].querySelector(".slide-content");
	if (contentElement) {
		contentElement.classList.remove("animate"); // Remove animation class
		void contentElement.offsetWidth; // Trigger reflow
		contentElement.classList.add("animate"); // Add animation class to restart animation
	}

	//Change pagination color base on item.type on screen 768px or bigger
	const paginationElement = document.querySelector(
		".custom-swiper-pagination"
	);
	const slideType = carouselData[swiper.realIndex].type;
	if (paginationElement && window.screen.width >= 768) {
		if (slideType === "light") {
			paginationElement.classList.add("carousel-dot-dark");
			paginationElement.classList.remove("carousel-dot-light");
		} else {
			paginationElement.classList.remove("carousel-dot-dark");
			paginationElement.classList.add("carousel-dot-light");
		}
	}
};

const swiper = new Swiper(".swiper", {
	loop: true,
	autoplay: {
		delay: 6000,
		disableOnInteraction: true,
	},
	pagination: {
		el: ".custom-swiper-pagination",
		clickable: true,
		renderBullet: renderCustomPagination,
	},
	effect: "fade",
	fadeEffect: {
		crossFade: true,
	},
	on: {
		realIndexChange: handleSlideChange,
	},
});
