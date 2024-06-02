import PhotoSwipeLightbox from "./photoswipe-lightbox.esm.js";

if (!product) {
	window.location.href = path + "/404.html";
}
document.querySelectorAll(".media-gallery").forEach((gallery) => {
	gallery.dataset.productId = product.id;
	gallery.dataset.productHandle = product.handle;
	gallery.dataset.productUrl = product.url;
	gallery.dataset.enableImageZoom = true;
	gallery.dataset.enableHistoryState = true;
	gallery.dataset.enableVideoAutoplay = true;
	gallery.dataset.enableVariantGroupImages = false;
	gallery.dataset.onlyMedia = false;
	gallery.dataset.layout = "layout-4";
	gallery.dataset.section = "product__main";
	gallery.dataset.screen = gallery.getAttribute("type");
	gallery.dataset.mediaSize = product.media.length;
	gallery.innerHTML = `
  <div class="pis__wrapper | overflow-hidden w-full">
    <div class="preview__wrapper | mb-4 flex-grow">
      <div class="swiper media-${gallery.getAttribute("type")}">
        <div class="swiper-wrapper">
          ${product.media
						.map(
							(media, index) =>
								`
            <div class="swiper-slide prod-media-item media-type-${media.media_type}" data-index=${index} data-media-type=${media.media_type} data-media-id=${media.id} data-aspect-ratio="1.499">
              ${
								media.media_type === "image"
									? `
              <div class="prod-media media-image" data-media-id=${media.id} data-media-width=${media.width} data-media-height=${media.height} data-media-alt=${media.alt} data-media-src=${media.src}>
                <div class="prod-image" style="aspect-ratio: 1.499">
                  <img class="img-loaded" src=${path + media.src} sizes="946px" loading="lazy" width="946" height="631" alt=${media.alt} fetchpriority="auto">
                </div>
              </div>
              <div class="zoom-in | transition-all opacity-0 absolute z-10 right-5 ${gallery.getAttribute("type") === "desktop" ? "top-5" : "bottom-2.5"}">
                <button class="prod-media__zoom-in | tooltip-item btn-icon tooltip-left tooltip-style-1" type="button" data-product-handle=${product.handle}>
                  <span class="tooltip-icon block">
                    <svg class="w-[20px] h-[20px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" stroke="currentColor">
                      <path d="M319.8 204v8c0 6.6-5.4 12-12 12h-84v84c0 6.6-5.4 12-12 12h-8c-6.6 0-12-5.4-12-12v-84h-84c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h84v-84c0-6.6 5.4-12 12-12h8c6.6 0 12 5.4 12 12v84h84c6.6 0 12 5.4 12 12zm188.5 293L497 508.3c-4.7 4.7-12.3 4.7-17 0l-129-129c-2.3-2.3-3.5-5.3-3.5-8.5v-8.5C310.6 395.7 261.7 416 208 416 93.8 416 1.5 324.9 0 210.7-1.5 93.7 93.7-1.5 210.7 0 324.9 1.5 416 93.8 416 208c0 53.7-20.3 102.6-53.7 139.5h8.5c3.2 0 6.2 1.3 8.5 3.5l129 129c4.7 4.7 4.7 12.3 0 17zM384 208c0-97.3-78.7-176-176-176S32 110.7 32 208s78.7 176 176 176 176-78.7 176-176z"></path>
                    </svg>
                  </span>
                  <span class="tooltip-content">
                    Zoom in
                  </span>
                </button>
              </div>
              `
									: `
              <div class="deferred-media" style="/*padding-top: 56.25%;*/" data-media-id=${media.id} data-auto-play="true">
                <video playinline controls autoplay loop muted aria-label=${product.title} poster=${media.preview_image.src}>
                  <source src=${media.sources[media.sources.findIndex((src) => src.width === 1280)].url} type="video/mp4">
                  <img src=${media.preview_image.src}>
                </video>
              </div>
              `
							}
            </div>
            `
						)
						.join("")}
        </div>
				${
					product.media.length > 1
						? `<div class="absolute z-10 pointer-events-none inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-4">
          <button class="swiper-button-control swiper-button-prev btn-icon | tooltip-item tooltip-right tooltop-style-1">
            <span class="tooltip-icon block">
              <svg
                width="14px"
                height="14px"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512">
                <path d="M229.9 473.899l19.799-19.799c4.686-4.686 4.686-12.284 0-16.971L94.569 282H436c6.627 0 12-5.373 12-12v-28c0-6.627-5.373-12-12-12H94.569l155.13-155.13c4.686-4.686 4.686-12.284 0-16.971L229.9 38.101c-4.686-4.686-12.284-4.686-16.971 0L3.515 247.515c-4.686 4.686-4.686 12.284 0 16.971L212.929 473.9c4.686 4.686 12.284 4.686 16.971-.001z"></path>
              </svg>
            </span>
            <span class="tooltip-content">Previous</span>
          </button>
          <button class="swiper-button-control swiper-button-next btn-icon | tooltip-item tooltip-left tooltop-style-1">
            <span class="tooltip-icon block">
              <svg
                fill="currentColor"
                width="14px"
                height="14px"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512">
                <path d="M218.101 38.101L198.302 57.9c-4.686 4.686-4.686 12.284 0 16.971L353.432 230H12c-6.627 0-12 5.373-12 12v28c0 6.627 5.373 12 12 12h341.432l-155.13 155.13c-4.686 4.686-4.686 12.284 0 16.971l19.799 19.799c4.686 4.686 12.284 4.686 16.971 0l209.414-209.414c4.686-4.686 4.686-12.284 0-16.971L235.071 38.101c-4.686-4.687-12.284-4.687-16.97 0z"></path>
              </svg>
              </span>
            <span class="tooltip-content">Next</span>
          </button>
        </div>`
						: ""
				}
      </div>
    </div>
		${
			product.media.length > 1
				? `${
						gallery.getAttribute("type") === "desktop"
							? `
    <div class="media-nav">
      <div class="nav-swiper-container" style="opacity:1;">
        <div class="swiper-wrapper">
          ${product.media
						.map(
							(media, index) =>
								`
            <div class="swiper-slide" data-index=${index}>
              <div class="prod-media media-image" data-media-id=${media.id} data-media-width=${media.width} data-media-height=${media.height} data-media-alt=${media.alt} data-media-src=${media.src}>
                <div class="prod-image">
                  <img src=${path + media.preview_image.src} alt=${media.alt} loading="lazy" class="img-loaded" width="179" height="120" sizes="175px"/>
                </div>
              </div>
            </div>
            `
						)
						.join("")}
        </div>
      </div>
    </div>
    `
							: `
    <div class="swiper-pagination"></div>
    `
					}`
				: ""
		}
  </div>
  `;

	// Hàm lấy các node từ selector
	function queryDomNodes(selectors, context) {
		const nodes = {};
		for (const key in selectors) {
			const selector = selectors[key];
			nodes[key] = context.querySelector(selector);
		}
		return nodes;
	}

	// Hàm thêm sự kiện delegate
	function addEventDelegate({ selector, context, handler }) {
		context.addEventListener("click", (e) => {
			const target = e.target.closest(selector);
			if (target) handler(e, target);
		});
	}

	function pauseAllMedia() {
		document.querySelectorAll("video").forEach((video) => video.pause());
	}

	const selectors = {
		container: ".product-wrapper",
		slider: ".swiper-container",
		sliderPagination: ".swiper-pagination",
		sliderPrevEl: ".swiper-button-prev",
		sliderNextEl: ".swiper-button-next",
		navSlider: ".nav-swiper-container",
		medias: [".prod-media-item"],
		mediaWrapper: ".prod-media__wrapper",
		mediaZoomIns: [".prod-media__zoom-in"],
		videos: [".media-video"],
		productBlock: ".prod__block",
		variantIdNode: '.main-product-form [name="id"]',
		featuredImage: ".prod-media",
	};

	var domNodes = null;

	const container = document.querySelector(`.media-gallery[data-screen=${gallery.getAttribute("type")}]`);
	const enableVariantGroupImages = container.dataset.enableVariantGroupImages === "true";
	const enableImageZoom = container.dataset.enableImageZoom === "true";
	domNodes = queryDomNodes(selectors, container);

	const navSlider =
		product.media.length > 1
			? new Swiper(".nav-swiper-container", {
					spaceBetween: 10,
					slidesPerView: 5,
					watchSlidesProgress: true,
					threshold: 2,
					freeMode: true,
					direction: "horizontal",
				})
			: null;

	const slider =
		product.media.length > 1
			? new Swiper(`.media-${gallery.getAttribute("type")}`, {
					initialSlide: 0,
					autoHeight: true,
					navigation: {
						nextEl: ".swiper-button-next",
						prevEl: ".swiper-button-prev",
					},
					thumbs: {
						swiper: navSlider || null,
					},
					pagination: {
						el: ".swiper-pagination",
						clickable: true,
						type: "bullets",
					},
					loop: true,
					threshold: 2,
				})
			: null;

	const handleSlideChange = () => {
		if (!slider) return;
		slider.on("slideChange", (swiper) => {
			pauseAllMedia();
			try {
				const { slides, activeIndex } = swiper;
				if (slides[activeIndex].querySelector(".deferred-media")) slides[activeIndex].querySelector("video").play();
			} catch (error) {
				console.error("Failed to execute slideChange event.", error);
			}
		});
	};

	handleSlideChange();

	const data = [];
	const medias = container.querySelectorAll(".prod-media-item:not(.swiper-slide-duplicate)");
	// Lặp qua các media để lấy thông tin và thêm vào data
	medias &&
		medias.forEach((media, index) => {
			if (media.dataset.mediaType === "image") {
				const mediaData = media.querySelector(".prod-media").dataset;
				data.push({
					src: path + mediaData.mediaSrc,
					width: parseInt(mediaData.mediaWidth),
					height: parseInt(mediaData.mediaHeight),
					alt: mediaData.mediaAlt,
					id: media.dataset.index,
				});
			} else
				data.push({
					html: `<div class="pswp__${media.dataset.mediaType}">${media.innerHTML}</div>`,
					type: media.dataset.mediaType,
					id: media.dataset.index,
				});
		});

	// Khởi tạo lightbox để xem ảnh chi tiết (zoom ảnh)
	var lightbox = new PhotoSwipeLightbox({
		dataSource: data,
		bgOpacity: true,
		close: false,
		zoom: false,
		arrowNext: false,
		arrowPrev: false,
		counter: false,
		preloader: false,
		pswpModule: () => import("./photoswipe.esm.js"),
	});

	// Thêm filter để lấy ảnh thumbnail
	lightbox.addFilter("thumbEl", (thumbEl, item, index) => {
		const el = container.querySelector('[data-index="' + item.id + '"]:not(.swiper-slide-duplicate) img');
		return el || thumbEl;
	});

	// Thêm filter để lấy ảnh placeholder
	lightbox.addFilter("placeholderSrc", (placeholderSrc, item) => {
		const el = container.querySelector('[data-index="' + item.data.id + '"]:not(.swiper-slide-duplicate) img');
		return el ? el.src : placeholderSrc;
	});

	// Thêm sự kiện change để chuyển slide khi chuyển ảnh trong lightbox
	lightbox.on("change", () => {
		if (slider) {
			pauseAllMedia();
			const currIndex = lightbox.pswp.currIndex;
			enableVariantGroupImages ? slider.slideTo(currIndex, 100, !1) : slider.slideToLoop(currIndex, 100, !1);
		}
	});

	// Thêm sự kiện pointerDown để ngăn chặn việc kéo ảnh 3D
	lightbox.on("pointerDown", (e) => {
		lightbox.pswp.currSlide.data.type === "model" && e.preventDefault();
	});

	// Thêm các button vào lightbox
	const closeBtn = {
		name: "m-close",
		order: 11,
		isButton: !0,
		html: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>',
		onClick: (event, el, pswp) => {
			pswp.close();
		},
	};

	const arrowNext = {
		name: "m-arrowNext",
		className: "pswp-button--arrow-next",
		order: 12,
		isButton: !0,
		html: '<svg fill="currentColor" width="14px" height="14px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M218.101 38.101L198.302 57.9c-4.686 4.686-4.686 12.284 0 16.971L353.432 230H12c-6.627 0-12 5.373-12 12v28c0 6.627 5.373 12 12 12h341.432l-155.13 155.13c-4.686 4.686-4.686 12.284 0 16.971l19.799 19.799c4.686 4.686 12.284 4.686 16.971 0l209.414-209.414c4.686-4.686 4.686-12.284 0-16.971L235.071 38.101c-4.686-4.687-12.284-4.687-16.97 0z"></path></svg>',
		onClick: (event, el, pswp) => {
			pswp.next();
		},
	};

	const arrowPrev = {
		name: "m-arrowPrev",
		className: "pswp-button--arrow-prev",
		order: 10,
		isButton: !0,
		html: '<svg width="14px" height="14px" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M229.9 473.899l19.799-19.799c4.686-4.686 4.686-12.284 0-16.971L94.569 282H436c6.627 0 12-5.373 12-12v-28c0-6.627-5.373-12-12-12H94.569l155.13-155.13c4.686-4.686 4.686-12.284 0-16.971L229.9 38.101c-4.686-4.686-12.284-4.686-16.971 0L3.515 247.515c-4.686 4.686-4.686 12.284 0 16.971L212.929 473.9c4.686 4.686 12.284 4.686 16.971-.001z"></path></svg>',
		onClick: (event, el, pswp) => {
			pswp.prev();
		},
	};

	// Thêm sự kiện uiRegister để thêm các button vào lightbox
	lightbox.on("uiRegister", () => {
		lightbox.pswp.ui.registerElement(closeBtn);
		if (product.media.length > 1) {
			lightbox.pswp.ui.registerElement(arrowPrev);
			lightbox.pswp.ui.registerElement(arrowNext);
		}
	});

	// Thêm sự kiện uiUpdate để cập nhật các button
	enableImageZoom && lightbox.init();
	addEventDelegate({
		selector: selectors.medias[0],
		context: container,
		handler: (e, media) => {
			e.preventDefault();
			const isImage = media.classList.contains("media-type-image"),
				isZoomButton = e.target.closest(selectors.mediaZoomIns[0]);
			if (isImage || isZoomButton) {
				const index = Number(media.dataset.index) || 0;
				lightbox.loadAndOpen(index);
			}
		},
	});

	// Thêm sự kiện changeSlideTo để chuyển slide
	container.addEventListener("changeSlideTo", (e) => {
		const index = e.detail.index;
		if (index !== undefined && slider) {
			slider.slideTo(index);
		}
	});
});
