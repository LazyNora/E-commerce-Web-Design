import React, { useEffect } from "react";
import { productsData } from "../productsData";
import { SwiperSlide } from "swiper/react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import {
	Controller,
	FreeMode,
	Navigation,
	Pagination,
	Thumbs,
} from "swiper/modules";
import "swiper/css";

const Swiper = require("swiper").default;
Swiper.use([Navigation, Controller, FreeMode, Thumbs, Pagination]);

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

const ProductMedia = ({ item }) => {
	useEffect(() => {
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
		const container = document.querySelector(".media-gallery");
		const navSliderE = document.querySelector(".nav-swiper-container");
		const sliderE = document.querySelector(".swiper-container");
		const enableVariantGroupImages =
			container.dataset.enableVariantGroupImages === "true";
		const enableImageZoom = container.dataset.enableImageZoom === "true";
		const onlyMedia = container.dataset.onlyMedia === "true";
		const view =
			container.closest(".prod__block").dataset.view ||
			"product-template";
		const layout = container.dataset.layout;
		const productHandle = container.dataset.productHandle;
		const productUrl = container.dataset.productUrl;

		var navSlider = new Swiper(".nav-swiper-container", {
			loop: false,
			initialSlide: 0,
			slidePerView: 5,
			freeMode: true,
			spaceBetween: 10,
			threshold: 2,
			setWrapperSize: false,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			direction: "horizontal",
			on: {
				init: () => (navSliderE.style.opacity = 1),
			},
		});

		var slider = new Swiper(".swiper-container", {
			initialSlide: 0,
			autoHeight: true,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			threshold: 2,
			loop: true,
			thumbs: {
				swiper: navSlider,
			},
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
				type: "bullets",
			},
			on: {
				init: () => {
					sliderE.style.opacity = 1;
					domNodes = queryDomNodes(selectors, container);
				},
			},
		});

		const data = [];
		const medias = container.querySelectorAll(
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

		var lightbox = new PhotoSwipeLightbox({
			dataSource: data,
			bgOpacity: true,
			close: false,
			zoom: false,
			arrowNext: false,
			arrowPrev: false,
			counter: false,
			preloader: false,
			pswpModule: () => import("photoswipe"),
		});

		lightbox.addFilter("thumbEl", (thumbEl, item, index) => {
			const el = container.querySelector(
				'[data-index="' +
					item.id +
					'"]:not(.swiper-slide-duplicate) img'
			);
			return el || thumbEl;
		});

		lightbox.addFilter("placeholderSrc", (placeholderSrc, item) => {
			const el = container.querySelector(
				'[data-index="' +
					item.data.id +
					'"]:not(.swiper-slide-duplicate) img'
			);
			return el ? el.src : placeholderSrc;
		});

		lightbox.on("change", () => {
			if (slider) {
				const currIndex = lightbox.pswp.currIndex;
				enableVariantGroupImages
					? slider.slideTo(currIndex, 100, !1)
					: slider.slideToLoop(currIndex, 100, !1);
			}
		});

		lightbox.on("pointerDown", (e) => {
			lightbox.pswp.currSlide.data.type === "model" && e.preventDefault();
		});

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

		lightbox.on("uiRegister", () => {
			lightbox.pswp.ui.registerElement(closeBtn);
			lightbox.pswp.ui.registerElement(arrowPrev);
			lightbox.pswp.ui.registerElement(arrowNext);
		});

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
	}, []);

	return (
		<div
			className="media-gallery | hidden md:block w-full"
			data-product-id={item.id}
			data-product-handle={item.handle}
			data-product-url={item.url}
			data-enable-image-zoom="true"
			data-enable-history-state="true"
			data-enable-video-autoplay="true"
			data-enable-variant-group-images="false"
			data-only-media="false"
			data-layout="layout-4"
			data-section="product__main"
			data-screen="desktop"
			data-media-size="4">
			<div className="pis__wrapper | overflow-hidden w-full">
				<div className="preview__wrapper | mb-4 flex-grow">
					<div className="swiper-container | h-full group media-desktop">
						<div className="swiper-wrapper main-slider pis | h-full">
							{item.media.map((media, index) => (
								<div
									key={index}
									className="swiper-slide prod-media-item media-type-image | relative overflow-hidden"
									data-index={index}
									data-media-type={media.media_type}
									data-media-id={media.id}
									data-aspect-ratio={media.aspect_ratio}>
									<div
										className="prod-media media-image"
										data-media-id={media.id}
										data-media-width={media.width}
										data-media-height={media.height}
										data-media-alt={media.alt}
										data-media-src={media.src}>
										<div
											className="prod-image"
											style={{
												aspectRatio: `${media.aspect_ratio}`,
											}}>
											<img
												className="img-loaded"
												src={`${
													media.src + "&width=946"
												}`}
												sizes="946px"
												loading="lazy"
												width="946"
												height="631"
												alt={media.alt}
												fetchpriority="auto"
											/>
										</div>
									</div>
									<div className="zoom-in | transition-all opacity-0 absolute z-10 right-5 top-5">
										<button
											className="prod-media__zoom-in | tooltip-item btn-icon tooltip-left tooltip-style-1"
											type="button"
											data-product-handle={item.handle}>
											<span className="tooltip-icon block">
												<svg
													className="w-[20px] h-[20px]"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 512 512"
													fill="currentColor"
													stroke="currentColor">
													<path d="M319.8 204v8c0 6.6-5.4 12-12 12h-84v84c0 6.6-5.4 12-12 12h-8c-6.6 0-12-5.4-12-12v-84h-84c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h84v-84c0-6.6 5.4-12 12-12h8c6.6 0 12 5.4 12 12v84h84c6.6 0 12 5.4 12 12zm188.5 293L497 508.3c-4.7 4.7-12.3 4.7-17 0l-129-129c-2.3-2.3-3.5-5.3-3.5-8.5v-8.5C310.6 395.7 261.7 416 208 416 93.8 416 1.5 324.9 0 210.7-1.5 93.7 93.7-1.5 210.7 0 324.9 1.5 416 93.8 416 208c0 53.7-20.3 102.6-53.7 139.5h8.5c3.2 0 6.2 1.3 8.5 3.5l129 129c4.7 4.7 4.7 12.3 0 17zM384 208c0-97.3-78.7-176-176-176S32 110.7 32 208s78.7 176 176 176 176-78.7 176-176z"></path>
												</svg>
											</span>
											<span
												className="tooltip-content "
												data-revert-text="">
												Zoom in
											</span>
										</button>
									</div>
								</div>
							))}
						</div>
						<div className="absolute z-10 pointer-events-none inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-4">
							<button className="swiper-button-control swiper-button-prev btn-icon">
								<svg
									width="14px"
									height="14px"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 448 512">
									<path d="M229.9 473.899l19.799-19.799c4.686-4.686 4.686-12.284 0-16.971L94.569 282H436c6.627 0 12-5.373 12-12v-28c0-6.627-5.373-12-12-12H94.569l155.13-155.13c4.686-4.686 4.686-12.284 0-16.971L229.9 38.101c-4.686-4.686-12.284-4.686-16.971 0L3.515 247.515c-4.686 4.686-4.686 12.284 0 16.971L212.929 473.9c4.686 4.686 12.284 4.686 16.971-.001z"></path>
								</svg>
							</button>
							<button className="swiper-button-control swiper-button-next btn-icon">
								<svg
									fill="currentColor"
									width="14px"
									height="14px"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 448 512">
									<path d="M218.101 38.101L198.302 57.9c-4.686 4.686-4.686 12.284 0 16.971L353.432 230H12c-6.627 0-12 5.373-12 12v28c0 6.627 5.373 12 12 12h341.432l-155.13 155.13c-4.686 4.686-4.686 12.284 0 16.971l19.799 19.799c4.686 4.686 12.284 4.686 16.971 0l209.414-209.414c4.686-4.686 4.686-12.284 0-16.971L235.071 38.101c-4.686-4.687-12.284-4.687-16.97 0z"></path>
								</svg>
							</button>
						</div>
					</div>
				</div>
				<div className="media-nav">
					<div
						className="nav-swiper-container | flex items-stretch sf-no-scroll-bar opacity-0 transition-all"
						style={{ opacity: 1 }}>
						<div
							className="swiper-wrapper | flex flex-nowrap w-auto max-w-none"
							style={{
								minWidth: "70px",
								transform: "translate3d(0px, 0px, 0px)",
								transitionDuration: "0ms",
							}}>
							{item.media.map((media, index) => (
								<div
									key={index}
									className="swiper-slide | relative cursor-pointer media-type-image"
									data-index={index}>
									<div
										className="prod-media media-image"
										data-media-id={media.id}
										data-media-width={media.width}
										data-media-height={media.height}
										data-media-alt={media.alt}
										data-media-src={media.src}>
										<div
											className="prod-image"
											style={{
												"--aspect-ratio": `${media.aspect_ratio}`,
											}}>
											<img
												src={`${
													media.src + "&width=175"
												}`}
												loading="lazy"
												className="img-loaded"
												width="179"
												height="120"
												sizes="175px"
											/>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductMedia;
