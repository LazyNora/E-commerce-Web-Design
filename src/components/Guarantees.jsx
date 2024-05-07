import React from "react";
import "../assets/css/Guarantees.css";

const Guarantees = () => {
	return (
		<section className="section-guarantees">
			<div className="container guarantees-wrapper">
				<div className="relative ib">
					<div className="ib-grid ib-wrapper grid grid-cols-2 md:grid md:grid-cols-2 lg:grid-cols-4 ">
						<div className="ib-column">
							<div className="icon-box icon-box--horizontal ">
								<div className="icon-box__inner flex flex-col justify-center sm:items-start sm:flex-row flex-nowrap items-center">
									<div
										className="icon-box__icon w-full flex shrink-0 justify-center max-w-full mb-5 md:mb-0 sf-image--loaded items-start pt-1 sm:mr-5"
										style={{ width: "60px" }}>
										<div
											className="ib-image w-full"
											style={{
												"--aspect-ratio":
													"0.9803921568627451",
											}}
											intersecting="true">
											<img
												src="/assets/fastDelivery.svg"
												sizes="60px"
												alt=""
												loading="lazy"
												className="w-full img-loaded"
												width="60"
												height="61"
											/>
										</div>
									</div>
									<div className="icon-box__text flex-1 sm:text-left">
										<h3 className="h4 mb-1.5 font-medium">
											Free Shipping
										</h3>
										<div className="rte text-color-subtext">
											<p>Worldwide Free Shipping</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="ib-column">
							<div className="ib-icon-box ib-icon-box--horizontal ">
								<div className="ib-icon-box__inner flex flex-col justify-center sm:items-start sm:flex-row flex-nowrap items-center">
									<div
										className="ib-icon-box__icon w-full flex shrink-0 justify-center max-w-full mb-5 md:mb-0 sf-image--loaded items-start pt-1 sm:mr-5"
										style={{ width: "60px" }}>
										<div
											className="sf-image w-full"
											style={{
												"--aspect-ratio":
													"0.9803921568627451",
											}}
											intersecting="true">
											<img
												src="/assets/discount.svg"
												sizes="60px"
												alt=""
												loading="lazy"
												className="w-full img-loaded"
												width="60"
												height="61"
											/>
										</div>
									</div>
									<div className="icon-box__text flex-1 sm:text-left">
										<h3 className="h4 mb-1.5 font-medium">
											Best Pricing
										</h3>
										<div className="rte text-color-subtext">
											<p>
												Offering{" "}
												<strong>
													lowest possible{" "}
												</strong>
												prices & best world class
												selections.
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="ib-column">
							<div className="ib-icon-box ib-icon-box--horizontal ">
								<div className="ib-icon-box__inner flex flex-col justify-center sm:items-start sm:flex-row flex-nowrap items-center">
									<div
										className="ib-icon-box__icon w-full flex shrink-0 justify-center max-w-full mb-5 md:mb-0 sf-image--loaded items-start pt-1 sm:mr-5"
										style={{ width: "60px" }}>
										<div
											className="sf-image w-full"
											style={{
												"--aspect-ratio":
													"0.9803921568627451",
											}}
											intersecting="true">
											<img
												src="/assets/people.svg"
												sizes="60px"
												alt=""
												loading="lazy"
												className="w-full img-loaded"
												width="60"
												height="61"
											/>
										</div>
									</div>
									<div className="icon-box__text flex-1 sm:text-left">
										<h3 className="h4 mb-1.5 font-medium">
											Online Support
										</h3>
										<div className="rte text-color-subtext">
											<p>
												Our passionate Sales Engineers:
												Monday - Friday: 09:00 – 18:00
												(UTC+8)
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="ib-column">
							<div className="ib-icon-box ib-icon-box--horizontal ">
								<div className="ib-icon-box__inner flex flex-col justify-center sm:items-start sm:flex-row flex-nowrap items-center">
									<div
										className="ib-icon-box__icon w-full flex shrink-0 justify-center max-w-full mb-5 md:mb-0 sf-image--loaded items-start pt-1 sm:mr-5"
										style={{ width: "60px" }}>
										<div
											className="sf-image w-full"
											style={{
												"--aspect-ratio":
													"0.9803921568627451",
											}}
											intersecting="true">
											<img
												src="/assets/shield.svg"
												sizes="60px"
												alt=""
												loading="lazy"
												className="w-full img-loaded"
												width="60"
												height="61"
											/>
										</div>
									</div>
									<div className="icon-box__text flex-1 sm:text-left">
										<h3 className="h4 mb-1.5 font-medium">
											Authorized Retailer
										</h3>
										<div className="rte text-color-subtext">
											<p>
												Guaranteed & authentic genuine
												products.
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Guarantees;
