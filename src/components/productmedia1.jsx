import React from "react";
import { productsData } from "../productsData";
import { Swiper, SwiperSlide } from "swiper/react";
import PhotoSwipeLightbox from "photoswipe/lightbox";

class ProductMedia extends HTMLElement {
	constructor() {
		super();
		this.selectors = {
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
	}
	connectedCallback() {
		this.container = this.closest(this.selectors.container);
		this.domNodes = queryDomNodes(this.selectors, this);
		this.enableVideoAutoplay = this.dataset.enableVideoAutoplay === "true";
		this.enableImageZoom = this.dataset.enableImageZoom === "true";
		this.enableVariantGroupImages =
			this.dataset.enableVariantGroupImages === "true";
		this.onlyMedia = this.dataset.onlyMedia === "true";
		this.closest(".prod__block") &&
			(this.view =
				this.closest(".prod__block").dataset.view ||
				"product-template");
		this.section = this.closest(`[data-section-id="${this.sectionId}"]`);
		this.layout = this.dataset.layout;
		this.setupData();
	}
	// Change to async when use fetch
	setupData() {
		this.productHandle = this.dataset.productHandle;
		this.productUrl = this.dataset.productUrl;
		this.productData = this.getProductJson(this.productHandle);
		const { productData, productData: { variants } = {} } = this,
			variantIdNode = this.container.querySelector(
				this.selectors.variantIdNode
			);
		if (productData && variantIdNode) {
			let currentVariantId = Number(variantIdNode.value);
			currentVariantId ||
				(currentVariantId =
					productData.selected_or_first_available_variant.id);
			const currentVariant =
				variants.find((v) => v.id === currentVariantId) || variants[0];
			this.productData.initialVariant = currentVariant;
			!this.productData.selected_variant &&
				variantIdNode.dataset.selectedVariant &&
				(this.productData.selected_variant = variants.find(
					(v) =>
						v.id === Number(variantIdNode.dataset.selectedVariant)
				));
		}
		this.init();
	}
	init() {
		const variantPicker = this.container.querySelector("variant-picker");
		switch (this.view) {
			case "product-template":
				this.handlePhotoswipe();
				this.initPhotoswipe();
				this.initSlider();
				this.mediaMode !== "slider" && (this.mediaMode = "gallery");
				break;
			case "featured-product":
				this.initSlider();
				break;
			case "card":
				this.mediaMode = "featured-image";
				break;
			case "sticky-atc":
				this.mediaMode = "featured-image";
				break;
			case "quick-view":
				this.mediaMode = "featured-image";
				this.initSlider();
				break;
			default:
				console.warn("Unknown product view: ", this, this.view);
				break;
		}
		this.handleAutoplayVideo();
		variantPicker ||
			(this.initPhotoswipe() &&
				this.handleSlideChange() &&
				this.removeAttribute("data-media-loading") &&
				(this.firstElementChild.style.opacity = 1));
	}
	initSlider() {
		if (!this.domNodes.slider) return;
		this.mediaMode = "slider";
		const {
			domNodes: {
				slider,
				sliderPagination,
				navSlider,
				sliderNextEl: nextEl,
				sliderPrevEl: prevEl,
			},
		} = this;
		let initialSlide = 0,
			configNav = {},
			config = {};
		if (
			this.productData.initialVariant &&
			this.productData.selected_variant
		) {
			var _this$productData$ini, _this$productData$ini2;
			initialSlide =
				((_this$productData$ini = this.productData.initialVariant) ===
					null ||
				_this$productData$ini === void 0 ||
				(_this$productData$ini2 =
					_this$productData$ini.featured_media) === null ||
				_this$productData$ini2 === void 0
					? void 0
					: _this$productData$ini2.position) - 1 || 0;
		}
		configNav = {
			loop: !1,
			initialSlide,
			slidesPerView: 5,
			freeMode: !0,
			spaceBetween: 10,
			threshold: 2,
			watchSlidesVisibility: !0,
			watchSlidesProgress: !0,
			direction: this.layout === "layout-6" ? "vertical" : "horizontal",
			on: { init: () => (navSlider.style.opacity = 1) },
		};
		this.navSlider = navSlider ? new Swiper(navSlider, configNav) : null;
		const thumbs = this.navSlider
			? { thumbs: { swiper: this.navSlider } }
			: {};
		config = Object.assign(
			{},
			{
				initialSlide,
				autoHeight: !0,
				navigation: { nextEl, prevEl },
				threshold: 2,
				loop: !this.enableVariantGroupImages,
				pagination: {
					el: sliderPagination,
					clickable: !0,
					type: "bullets",
				},
				...thumbs,
				on: {
					init: () => {
						slider.style.opacity = 1;
						this.domNodes = queryDomNodes(
							this.selectors,
							this.container
						);
					},
				},
			}
		);
		this.slider = new Swiper(slider, config);
		this.enableVariantGroupImages || this.handleSlideChange();
	}
	handleSlideChange() {
		if (!this.slider) return;
		let draggable = !0,
			mediaType = "",
			visibleSlides = [];
		this.slider.on("slideChange", (swiper) => {
			window.pauseAllMedia();
			try {
				const { slides, activeIndex } = swiper;
				slides[activeIndex] &&
					this.playActiveMedia(slides[activeIndex]);
				visibleSlides = [activeIndex];
				(this.layout === "layout-5" || this.layout === "layout-7") &&
					visibleSlides.push(activeIndex + 1);
				for (let index of visibleSlides) {
					const currSlide = slides[index];
					if (
						((mediaType = currSlide?.dataset.mediaType),
						mediaType === "model")
					)
						break;
				}
				mediaType === "model"
					? (this.slider.allowTouchMove = !1) && (draggable = !1)
					: draggable ||
					  ((this.slider.allowTouchMove = !0) && (draggable = !0));
			} catch (error) {
				console.error("Failed to execute slideChange event.", error);
			}
		});
	}
	handleAutoplayVideo() {
		if (this.mediaMode === "slider") {
			const { slides, activeIndex } = this.slider,
				slideActive = slides[activeIndex],
				firstElmMediaType = slideActive?.dataset.mediaType;
			if (
				firstElmMediaType === "video" ||
				firstElmMediaType == "external_video"
			) {
				const deferredMedia =
						slideActive.querySelector("deferred-media"),
					autoplay = deferredMedia.dataset.autoPlay === "true";
				deferredMedia && autoplay && deferredMedia.loadContent(!1);
			}
		} else {
			const allMedia = this.querySelectorAll(".prod-media-item");
			allMedia &&
				allMedia.forEach((media) => {
					const mediaType = media.dataset.mediaType;
					if (
						mediaType === "video" ||
						mediaType === "external_video"
					) {
						const deferredMedia =
								media.querySelector("deferred-media"),
							autoplay =
								deferredMedia.dataset.autoPlay === "true";
						deferredMedia &&
							autoplay &&
							deferredMedia.loadContent(!1);
					}
				});
		}
	}
	playActiveMedia(selected) {
		const deferredMedia = selected.querySelector("deferred-media");
		if (!(!deferredMedia || !(deferredMedia.dataset.autoPlay === "true")))
			if (!deferredMedia.getAttribute("loaded"))
				deferredMedia.loadContent(!1);
			else {
				const deferredElement = deferredMedia.querySelector(
					"video, model-viewer, iframe"
				);
				if (deferredElement.classList.contains("js-youtube")) {
					const symbol =
						deferredElement.src.indexOf("?") > -1 ? "&" : "?";
					deferredElement.src += symbol + "autoplay=1&mute=1";
				} else if (deferredElement.classList.contains("js-vimeo")) {
					const symbol =
						deferredElement.src.indexOf("?") > -1 ? "&" : "?";
					deferredElement.src += symbol + "autoplay=1&muted=1";
				} else deferredElement.play();
			}
	}
	handlePhotoswipe() {
		let customData =
			arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
		if (!this.enableImageZoom) return;
		const data = [],
			medias = this.querySelectorAll(
				".prod-media-item:not(.swiper-slide-duplicate)"
			);
		medias &&
			medias.forEach((media, index) => {
				if (media.dataset.mediaType === "image") {
					const mediaData =
						media.querySelector(".prod-media").dataset;
					data.push({
						src: mediaData.mediaSrc,
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
		this.lightbox = new PhotoSwipeLightbox({
			dataSource: customData.length > 0 ? customData : data,
			bgOpacity: 1,
			close: !1,
			zoom: !1,
			arrowNext: !1,
			arrowPrev: !1,
			counter: !1,
			preloader: !1,
			pswpModule: () => import("photoswipe"),
		});
		this.lightbox.addFilter("thumbEl", (thumbEl, data2, index) => {
			const el = this.querySelector(
				'[data-index="' +
					data2.id +
					'"]:not(.swiper-slide-duplicate) img'
			);
			return el || thumbEl;
		});
		this.lightbox.addFilter("placeholderSrc", (placeholderSrc, slide) => {
			const el = this.querySelector(
				'[data-index="' +
					slide.data.id +
					'"]:not(.swiper-slide-duplicate) img'
			);
			return el ? el.src : placeholderSrc;
		});
		this.lightbox.on("change", () => {
			if ((window.pauseAllMedia(), this.slider)) {
				const currIndex = this.lightbox.pswp.currIndex;
				this.enableVariantGroupImages
					? this.slider.slideTo(currIndex, 100, !1)
					: this.slider.slideToLoop(currIndex, 100, !1);
			}
		});
		this.lightbox.on("pointerDown", (e) => {
			this.lightbox.pswp.currSlide.data.type === "model" &&
				e.preventDefault();
		});
		const closeBtn = {
				name: "m-close",
				order: 11,
				isButton: !0,
				html: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>',
				onClick: (event, el, pswp) => {
					pswp.close();
				},
			},
			arrowNext = {
				name: "m-arrowNext",
				className: "pswp-button--arrow-next",
				order: 12,
				isButton: !0,
				html: '<svg fill="currentColor" width="14px" height="14px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M218.101 38.101L198.302 57.9c-4.686 4.686-4.686 12.284 0 16.971L353.432 230H12c-6.627 0-12 5.373-12 12v28c0 6.627 5.373 12 12 12h341.432l-155.13 155.13c-4.686 4.686-4.686 12.284 0 16.971l19.799 19.799c4.686 4.686 12.284 4.686 16.971 0l209.414-209.414c4.686-4.686 4.686-12.284 0-16.971L235.071 38.101c-4.686-4.687-12.284-4.687-16.97 0z"></path></svg>',
				onClick: (event, el, pswp) => {
					pswp.next();
				},
			},
			arrowPrev = {
				name: "m-arrowPrev",
				className: "pswp-button--arrow-prev",
				order: 10,
				isButton: !0,
				html: '<svg width="14px" height="14px" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M229.9 473.899l19.799-19.799c4.686-4.686 4.686-12.284 0-16.971L94.569 282H436c6.627 0 12-5.373 12-12v-28c0-6.627-5.373-12-12-12H94.569l155.13-155.13c4.686-4.686 4.686-12.284 0-16.971L229.9 38.101c-4.686-4.686-12.284-4.686-16.971 0L3.515 247.515c-4.686 4.686-4.686 12.284 0 16.971L212.929 473.9c4.686 4.686 12.284 4.686 16.971-.001z"></path></svg>',
				onClick: (event, el, pswp) => {
					pswp.prev();
				},
			};
		this.lightbox.on("uiRegister", () => {
			this.lightbox.pswp.ui.registerElement(closeBtn);
			this.onlyMedia ||
				(this.lightbox.pswp.ui.registerElement(arrowPrev) &&
					this.lightbox.pswp.ui.registerElement(arrowNext));
		});
	}
	initPhotoswipe() {
		this.enableImageZoom && this.lightbox.init();
		addEventDelegate({
			selector: this.selectors.medias[0],
			context: this,
			handler: (e, media) => {
				e.preventDefault();
				const isImage = media.classList.contains("media-type-image"),
					isZoomButton = e.target.closest(
						this.selectors.mediaZoomIns[0]
					);
				if (isImage || isZoomButton) {
					const index = Number(media.dataset.index) || 0;
					this.lightbox.loadAndOpen(index);
				}
			},
		});
	}
	setActiveMedia(variant) {
		if (variant) {
			if (this.mediaMode === "slider") {
				if (variant.featured_media) {
					const slideIndex = variant.featured_media.position || 0;
					this.slider &&
						this.slider.wrapperEl &&
						this.slider.slideToLoop(slideIndex - 1);
				}
			} else if (this.mediaMode === "featured-image") {
				if (variant.featured_image) {
					const src = variant.featured_image.src,
						{ featuredImage } = this.domNodes,
						img = featuredImage.querySelector("img");
					img && src && (img.src = src);
				}
			} else if (variant.featured_media) {
				const selectedMedia = this.querySelector(
					`[data-media-id="${variant.featured_media.id}"]`
				);
				selectedMedia && this.scrollIntoView(selectedMedia);
			}
		}
	}
	scrollIntoView(selectedMedia) {
		selectedMedia.scrollIntoView({ behavior: "smooth" });
	}
	getProductJson(productHandle) {
		// return fetch(productUrl + ".js").then(function (response) {
		// 	return response.json();
		// });
		return productsData.find((product) => product.handle === productHandle);
	}
}

customElements.define("media-gallery", ProductMedia);

function queryDomNodes(selectors, context) {
	const nodes = {};
	for (const key in selectors) {
		const selector = selectors[key];
		nodes[key] = context.querySelector(selector);
	}
	return nodes;
}

function addEventDelegate({ selector, context, handler }) {
	context.addEventListener("click", (e) => {
		const target = e.target.closest(selector);
		if (target) handler(e, target);
	});
}
