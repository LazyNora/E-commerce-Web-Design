import React, { useEffect } from "react";
import { productsData } from "../productsData";
import { SwiperSlide } from "swiper/react";
import PhotoSwipeLightbox from "photoswipe/lightbox";

const Swiper = require("swiper").default;

function queryDomNodes(selectors, context) {
	const nodes = {};
	for (const key in selectors) {
		const selector = selectors[key];
		nodes[key] = context.querySelector(selector);
	}
	return nodes;
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

		var navSlider = new Swiper(".nav-swiper-container", {
			loop: false,
			initialSlide: 0,
			slidePerView: 5,
			freeMode: true,
			spaceBetween: 10,
			threshold: 2,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			direction: "horizontal",
			on: { init: () => (navSliderE.style.opacity = 1) },
		});
		const thumbs = navSlider ? { thumbs: { swiper: navSlider } } : {};

		var slider = new Swiper(".swiper-container", {
			initialSlide: 0,
			autoHeight: true,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			threshold: 2,
			loop: !enableVariantGroupImages,
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
				type: "bullets",
			},
			...thumbs,
			on: {
				init: () => {
					sliderE.style.opacity = 1;
					domNodes = queryDomNodes(selectors, container);
				},
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
						<div
							className="swiper-wrapper main-slider pis | h-full"
							style={{
								height: "631px",
								transform: "translate3d(-1892px, 0px, 0px)",
								transitionDuration: "0ms",
							}}>
							{item.media.map((media, index) => (
								<div
									key={index}
									className="swiper-slide prod-media-item media-type-image | relative overflow-hidden"
									data-media-type={media.media_type}
									data-media-id={media.id}
									data-aspect-ratio={media.aspect_ratio}
									style={{ width: "946px" }}>
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
													media.src + "&width=946px"
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
											className="prod-media__zoom-in | sf__tooltip-item sf__btn-icon sf__tooltip-left sf__tooltip-style-1"
											type="button"
											data-product-handle={item.handle}>
											<span className="sf__tooltip-icon block">
												<svg
													className="w-[20px] h-[20px]"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 512 512"
													fill="currentColor"
													stroke="currentColor">
													<path d="M319.8 204v8c0 6.6-5.4 12-12 12h-84v84c0 6.6-5.4 12-12 12h-8c-6.6 0-12-5.4-12-12v-84h-84c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h84v-84c0-6.6 5.4-12 12-12h8c6.6 0 12 5.4 12 12v84h84c6.6 0 12 5.4 12 12zm188.5 293L497 508.3c-4.7 4.7-12.3 4.7-17 0l-129-129c-2.3-2.3-3.5-5.3-3.5-8.5v-8.5C310.6 395.7 261.7 416 208 416 93.8 416 1.5 324.9 0 210.7-1.5 93.7 93.7-1.5 210.7 0 324.9 1.5 416 93.8 416 208c0 53.7-20.3 102.6-53.7 139.5h8.5c3.2 0 6.2 1.3 8.5 3.5l129 129c4.7 4.7 4.7 12.3 0 17zM384 208c0-97.3-78.7-176-176-176S32 110.7 32 208s78.7 176 176 176 176-78.7 176-176z"></path>
												</svg>
											</span>
										</button>
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
