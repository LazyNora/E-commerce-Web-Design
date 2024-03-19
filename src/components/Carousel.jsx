import styled, { keyframes } from "styled-components";
import {
	max767,
	min1024,
	min768,
	sc767,
	scmin1440max2000,
} from "../responsive";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { carouselData } from "../data";
import React from "react";

const Container = styled.div`
	box-sizing: border-box;
	display: block;
`;

const Section = styled.section`
	position: relative;
	display: block;
`;

const Wrapper = styled.div`
	width: 100%;
	display: block;
`;

const SwiperContainer = styled.div`
	display: block;
	list-style: none;
	margin-left: auto;
	margin-right: auto;
	overflow: hidden;
	padding: 0;
	position: relative;
	z-index: 1;
`;

const SlideMedia = styled.div`
	height: 100%;
	position: relative;
	overflow: hidden;
	display: block;

	&:before {
		content: "";
		display: block;
		height: 0;
		width: 100%;
		padding-top: calc(100% / (0.0001 + var(--aspect-ratio, 16/9)));
	}
`;

const Image = styled.img`
	max-width: 100%;
	display: block;
`;

const Res = styled.div`
	bottom: 0;
	height: 100%;
	left: 0;
	-o-object-fit: cover;
	object-fit: cover;
	position: absolute !important;
	right: 0;
	top: 0;
	width: 100%;
	display: none;

	${min768({
		display: "block!important",
	})}
`;

const SlideBG = styled.div`
	backface-visibility: hidden;
	transform: scale(1) translateZ(0);
	bottom: 0;
	left: 0;
	position: absolute;
	right: 0;
	top: 0;
	transform-origin: center;
	transition: all 3s;
	pointer-events: none;
	display: block;

	${Image} {
		height: 100%;
		-o-object-fit: cover;
		object-fit: cover;
		width: 100%;
		display: block;
		aspect-ratio: auto 3520 / 1568;
		overflow-clip-margin: content-box;
		overflow: clip;
		pointer-events: none;
	}
`;

const ResMobile = styled.div`
	${min768({
		display: "none",
	})}
`;

const SlideBGMobile = styled.div`
	backface-visibility: hidden;
	bottom: 0;
	left: 0;
	position: absolute;
	right: 0;
	top: 0;
	transform: scale(1.01) translateZ(0);
	transform-origin: center;
	transition: all 3s;
	pointer-events: none;

	${Image} {
		bottom: 0;
		height: 100%;
		left: 0;
		-o-object-fit: cover;
		object-fit: cover;
		position: absolute !important;
		right: 0;
		top: 0;
		width: 100%;
		display: block;
	}
`;

const SlideBlock = styled.div`
	align-items: center;
	justify-content: flex-end;
	margin-left: auto;
	margin-right: auto;
	width: 100%;
	height: 100%;
	display: flex;
	bottom: 0;
	left: 0;
	right: 0;
	top: 0;
	position: absolute;
	box-sizing: border-box;

	${scmin1440max2000({
		maxWidth: "1570px!important",
	})}

	${min768({
		padding: "1.5rem",
	})}

	${min1024({
		paddingBottom: "6rem",
		paddingTop: "6rem",
		paddingLeft: "65px",
		paddingRight: "65px",
	})}
`;

const SlideContent = styled.div`
	opacity: 0;
	transform: translate3d(0, 60px, 0);
	max-width: 72rem;
	text-align: right;
	width: max-content;
`;

const SlideSubtitle = styled.div`
	line-height: 1.75rem;
	font-size: 1.25rem;

	color: ${(props) => (props.type === "light" ? "black" : "white")};

	${min768({
		marginBottom: "14px",
	})}
	${max767({
		color: "black",
	})}

	span {
		font-weight: 600;
	}
`;

const SlideTitle = styled.h2`
	color: ${(props) => (props.type === "light" ? "black" : "white")};

	${max767({
		color: "black",
	})}
`;

const SlideDesc = styled.div`
	color: ${(props) => (props.type === "light" ? "black" : "white")};

	${max767({
		color: "black",
	})}
`;

const SlideFooter = styled.div`
	opacity: 1;
	margin-left: auto;
	margin-right: auto;
	padding-left: 65px;
	padding-right: 65px;
	width: 100%;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	z-index: 10;
	bottom: 4rem;
	left: 0;
	right: 0;
	position: absolute;
	box-sizing: border-box;

	color: ${(props) => (props.type === "light" ? "black" : "white")};

	span {
		margin-left: 0.5rem;
		margin-right: 0.5rem;
	}

	${scmin1440max2000({
		maxWidth: "1570px!important",
	})}
`;

const SliderControls = styled.div`
	pointer-events: none;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0;

	${sc767({
		margin: 0,
		maxWidth: "100vw",
	})}
`;

const SwiperPagination = styled.div`
	bottom: 2rem;
	z-index: 1;
	justify-content: center;
	padding: 5px 0;
	pointer-events: auto;
	align-items: center;
	display: flex;
	flex-flow: wrap;

	${min768({
		display: "inline-flex",
		position: "absolute",
		flexFlow: "column",
		margin: 0,
		top: "50%",
		transform: "translateY(-50%)",
		width: "auto",
		left: "auto",
		right: "2.5rem",
	})}

	${max767({
		margin: 0,
		position: "static!important",
		width: "auto!important",
	})}

	.dot {
		cursor: pointer;
		height: 36px;
		margin: 0;
		mix-blend-mode: difference;
		opacity: 1;
		padding: 5px;
		pointer-events: all;
		position: relative;
		transition: all 0.15s cubic-bezier(0.25, 0.25, 0.1, 1);
		width: 36px;

		&:before {
			background-color: #000;
			border-radius: 50%;
			content: "";
			display: block;
			height: 8px;
			left: 14px;
			position: absolute;
			top: 14px;
			transition: all 0.1s linear;
			width: 8px;
		}

		svg {
			height: 26px;
			left: 5px;
			pointer-events: none;
			position: absolute;
			top: 4px;
			width: 28px;
			vertical-align: middle;
		}
	}
`;

const Carousel = () => {
	const renderCustomPagination = (index, className) => {
		return (
			'<span class="dot ' +
			className +
			" page-" +
			index +
			'"><svg width="65px" height="65px" viewBox="0 0 72 72" aria-hidden="true" xmlns="http://www.w3.org/200/svg"><circle stroke-width="5" fill="none" stroke-linecap="round" cx="33" cy="33" r="28" stroke="#000" stroke-dashoffset="180" stroke-dasharray="179"></circle></svg></span>'
		);
	};

	const handleSlideChange = (swiper) => {
		const footerElement =
			swiper.slides[swiper.activeIndex].querySelector(".slide-footer");
		if (footerElement) {
			footerElement.classList.remove("animate"); // Remove animation class
			void footerElement.offsetWidth; // Trigger reflow
			footerElement.classList.add("animate"); // Add animation class to restart animation
		}

		const contentElement =
			swiper.slides[swiper.activeIndex].querySelector(".slide-content");
		if (contentElement) {
			contentElement.classList.remove("animate"); // Remove animation class
			void contentElement.offsetWidth; // Trigger reflow
			contentElement.classList.add("animate"); // Add animation class to restart animation
		}
	};

	return (
		<Container>
			<Section>
				<Wrapper>
					<div>
						<SwiperContainer>
							<Swiper
								modules={[
									Navigation,
									Pagination,
									Autoplay,
									EffectFade,
								]}
								loop={true}
								grabCursor={true}
								autoplay={{
									delay: 6000,
									disableOnInteraction: true,
								}}
								onSlideChange={(swiper) =>
									handleSlideChange(swiper)
								}
								effect="fade"
								fadeEffect={{ crossFade: true }}
								pagination={{
									clickable: true,
									el: ".custom-swiper-pagination",
									renderBullet: renderCustomPagination,
								}}>
								{carouselData.map((item) => (
									<SwiperSlide
										style={{
											width: "100%",
											transitionProperty: "opacity",
											flexShrink: "0",
											height: "100%",
											position: "relative",
										}}>
										<SlideMedia
											style={{
												"--aspect-ratio":
													"2.072704081632653",
												"--aspect-ratio-mobile":
													"1.314060446780552",
											}}>
											<Res>
												<SlideBG>
													<Image src={item.img} />
												</SlideBG>
											</Res>
											<ResMobile>
												<SlideBGMobile>
													<Image
														src={item.img_mobile}
													/>
												</SlideBGMobile>
											</ResMobile>
										</SlideMedia>
										<SlideBlock>
											<SlideContent className="slide-content">
												<SlideSubtitle type={item.type}>
													<span>{item.subtitle}</span>
												</SlideSubtitle>
												<SlideTitle
													type={item.type}
													className="lg:text-5xl xl:text-6xl 2xl:text-7xl mb-3 md:mb-5 lg:leading-tight xl:leading-tight 2xl:leading-tight">
													<span
														dangerouslySetInnerHTML={{
															__html: item.title,
														}}></span>
												</SlideTitle>
												<SlideDesc
													type={item.type}
													className="md:text-xl mb-3 md:mb-7">
													<p>{item.desc}</p>
												</SlideDesc>
											</SlideContent>
										</SlideBlock>
										<SlideFooter
											type={item.type}
											className="slide-footer">
											<span>{item.footer}</span>
										</SlideFooter>
									</SwiperSlide>
								))}
							</Swiper>
							<SliderControls>
								<SwiperPagination className="custom-swiper-pagination"></SwiperPagination>
							</SliderControls>
						</SwiperContainer>
					</div>
				</Wrapper>
			</Section>
		</Container>
	);
};

export default Carousel;
