import React from "react";
import "../assets/css/ProductTabs.css";

const options = [
	"New Arrivals",
	"Best Sellers",
	"Combo Assembling",
	"MQA Support",
];

const ProductTabs = () => {
	const productTabsRef = React.useRef(null);

	React.useEffect(() => {
		onLoadCustomSelect();
	}, []);

	const onLoadCustomSelect = () => {
		// console.log("onLoadCustomSelect");
	};

	return (
		<section
			ref={productTabsRef}
			className="section-product-tab product-tab tab__header-select section-padding home__product-tab"
			style={{
				backgroundColor: "rgba(0,0,0,0)",
				"--column-gap": "30px",
				"--column-gap-mobile": "16px",
				"--row-gap": "40px",
				"--items": 5,
				"--section-padding-top": "0px",
				"--section-padding-bottom": "0px",
			}}>
			<div className="container-fluid section-ib-wrapper">
				<div className="tabs-container product-tabs__wrapper">
					<div
						className="product-tabs__header product-tabs__header--select flex justify-center flex-wrap  text-[1.125rem] leading-relaxed"
						data-tab-header="">
						<div className="inline-flex items-center justify-center flex-wrap md:flex-nowrap">
							<h2 className="whitespace-nowrap mr-5 text-color-subtext section__heading">
								You are in
							</h2>

							<div className="custom-select select__custom-width section__heading select-plain h2 w-auto">
								<select
									className="form-control"
									data-tab-select="">
									<option value="0">new arrivals</option>
								</select>
								<div className="select-selected">
									<span>new arrivals</span>
									<span className="select-arrow">
										<svg
											fill="currentColor"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 448 512">
											<path d="M441.9 167.3l-19.8-19.8c-4.7-4.7-12.3-4.7-17 0L224 328.2 42.9 147.5c-4.7-4.7-12.3-4.7-17 0L6.1 167.3c-4.7 4.7-4.7 12.3 0 17l209.4 209.4c4.7 4.7 12.3 4.7 17 0l209.4-209.4c4.7-4.7 4.7-12.3 0-17z"></path>
										</svg>
									</span>
								</div>
								<div className="select-items select-hide">
									<div>new arrivals</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProductTabs;
