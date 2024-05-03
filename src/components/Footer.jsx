import React from "react";
import { EmailOutlined, Send } from "@material-ui/icons"; // Importing icons
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../components/ui/accordion"; // Importing Accordion components
import { useWindowSize } from "../responsive";
import "../assets/css/Footer.css"; // Importing CSS

const Footer = () => {
	// Get the window width using the useWindowSize hook
	const [width] = useWindowSize();

	// Structure: Identify classes | Utility classes
	// Indentify classes dùng cho những lúc cần querySelector hoặc cần style đặc biệt cho riêng nó
	// Utility classes dùng cho những lúc cần style chung cho nhiều element như padding, margin, font-size, color, ...
	return (
		<footer className="section-footer shop-footer">
			<div className="footer_middle">
				<div className="container">
					{width > 767 ? (
						<div className="footer_accordion | flex flex-wrap lg:flex-nowrap -mx-4 lg:-mx-5">
							<div className="footer_block | accordion-item open block-newsletter w-full lg:w-1/3 order-first md:order-none">
								<div className="footer_block-inner | px-4 lg:px-5">
									<h3 className="block-title accordion-button | font-bold mb-4 text-base">
										LET'S GET IN TOUCH
									</h3>
									<div className="block-content accordion-content">
										<div className="pb-5 md:pb-0">
											<p className="newsletter-block-desc | py-2 block-text">
												Stay up to date!
											</p>
											<div>
												<form
													id="contact-form"
													acceptCharset="UTF-8"
													className="footer-form-newsletter">
													<div className="relative">
														<input
															type="email"
															required
															name="contact[email]"
															placeholder="Enter your email"
															autoCorrect="off"
															autoCapitalize="off"
															autoComplete="off"
															spellCheck="false"
															className="newsletter_form-inpu | form-control control-icon py-1.5 px-12"
														/>
														<span className="form-newsletter-icon | absolute">
															<EmailOutlined className="w-[16px] h-[16px]" />
														</span>
														<button
															type="submit"
															name="submit"
															className="form-submit | absolute">
															<Send className="w-[16px] h-[16px]" />
														</button>
													</div>
													<div className="agree-terms">
														<label htmlFor="agree_terms">
															<input
																id="agree_terms"
																type="checkbox"
																name="agree_terms"
																value={"yes"}
																required
															/>
															<span>
																<p>
																	I agree with
																	the{" "}
																	<a
																		href="#"
																		title="#">
																		Terms &
																		conditions
																	</a>
																</p>
															</span>
														</label>
													</div>
												</form>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="footer_block footer_block-spacing | w-full lg:w-1/6">
								<div className="footer_block-inner px-4 lg:px-5"></div>
							</div>
							<div className="footer_block accordion-item footer_block-menu | | w-full lg:w-1/4">
								<div className="footer_block-inner | px-4 lg:px-5">
									<h3 className="block-title accordion-button | font-bold mb-4 text-base">
										SUPPORT
									</h3>
									<ul className="block-content accordion-content">
										<div className="pb-5 md:pb-0">
											<li className="link-lv2 | leading-8 hover-underline">
												<a href="#">Drivers Download</a>
											</li>

											<li className="link-lv2 | leading-8 hover-underline">
												<a href="#">Track Your Order</a>
											</li>

											<li className="link-lv2 | leading-8 hover-underline">
												<a href="/pages/shipping-return">
													Shipping &amp; Returns
												</a>
											</li>

											<li className="link-lv2 | leading-8 hover-underline">
												<a href="/pages/reviews">
													Customer Reviews
												</a>
											</li>
										</div>
									</ul>
								</div>
							</div>
							<div className="footer_block accordion-item footer_block-menu | | w-full lg:w-1/4">
								<div className="footer_block-inner | px-4 lg:px-5">
									<h3 className="accordion-button block-title | font-bold mb-4 text-base">
										GET TO KNOW US
									</h3>
									<ul className="accordion-content block-content">
										<div className="pb-5 md:pb-0">
											<li className="link-lv2 | leading-8 hover-underline">
												<a href="/pages/security-privacy">
													Security &amp; Privacy
												</a>
											</li>

											<li className="link-lv2 | leading-8 hover-underline">
												<a href="/pages/terms-conditions">
													Terms of Use
												</a>
											</li>

											<li className="link-lv2 | leading-8 hover-underline">
												<a href="/pages/contact-us">
													Contact Us
												</a>
											</li>

											<li className="link-lv2 | leading-8 hover-underline">
												<a href="#">Our DISCORD</a>
											</li>
										</div>
									</ul>
								</div>
							</div>
							<div className="footer_block accordion-item footer_block-our_store | w-full lg:w-1/4">
								<div className="footer_block-inner | px-4 lg:px-5">
									<h3 className="accordion-button block-title | font-bold mb-4 text-base">
										FOLLOW US
									</h3>
									<div className="accordion-content rte block-content">
										<div className="pb-5 md:pb-0">
											<div className="block-text | mt-4">
												<p className="mt-1">
													<a href="mailto:support@audiooasis.com">
														{" "}
														support@audiooasis.com{" "}
													</a>
												</p>
												<div className="social-media-links | mt-6 px-0 -mx-2 flex items-center">
													<a
														target="_blank"
														className="px-2 flex items-center"
														href="#"
														rel="noreferrer">
														<svg
															className="w-[20px] h-[20px]"
															xmlns="http://www.w3.org/2000/svg"
															viewBox="0 0 320 512">
															<path
																fill="currentColor"
																d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
														</svg>
													</a>
													<a
														target="_blank"
														className="px-2 flex items-center"
														href="#"
														rel="noreferrer">
														<svg
															className="w-[20px] h-[20px]"
															xmlns="http://www.w3.org/2000/svg"
															viewBox="0 0 448 512">
															<path
																fill="currentColor"
																d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
														</svg>
													</a>
													<a
														target="_blank"
														className="px-2 flex items-center"
														href="#"
														rel="noreferrer">
														<svg
															className="w-[20px] h-[20px]"
															xmlns="http://www.w3.org/2000/svg"
															viewBox="0 0 512 512">
															<path
																fill="currentColor"
																d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
														</svg>
													</a>
													<a
														target="_blank"
														className="px-2 flex items-center"
														href="#"
														rel="noreferrer">
														<svg
															className="w-[20px] h-[20px]"
															xmlns="http://www.w3.org/2000/svg"
															viewBox="0 0 576 512">
															<path
																fill="currentColor"
																d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path>
														</svg>
													</a>
													<a
														target="_blank"
														className="px-2 flex items-center"
														href="#"
														rel="noreferrer">
														<svg
															className="w-[20px] h-[20px]"
															xmlns="http://www.w3.org/2000/svg"
															viewBox="0 0 448 512">
															<path
																fill="currentColor"
																d="M297.216 243.2c0 15.616-11.52 28.416-26.112 28.416-14.336 0-26.112-12.8-26.112-28.416s11.52-28.416 26.112-28.416c14.592 0 26.112 12.8 26.112 28.416zm-119.552-28.416c-14.592 0-26.112 12.8-26.112 28.416s11.776 28.416 26.112 28.416c14.592 0 26.112-12.8 26.112-28.416.256-15.616-11.52-28.416-26.112-28.416zM448 52.736V512c-64.494-56.994-43.868-38.128-118.784-107.776l13.568 47.36H52.48C23.552 451.584 0 428.032 0 398.848V52.736C0 23.552 23.552 0 52.48 0h343.04C424.448 0 448 23.552 448 52.736zm-72.96 242.688c0-82.432-36.864-149.248-36.864-149.248-36.864-27.648-71.936-26.88-71.936-26.88l-3.584 4.096c43.52 13.312 63.744 32.512 63.744 32.512-60.811-33.329-132.244-33.335-191.232-7.424-9.472 4.352-15.104 7.424-15.104 7.424s21.248-20.224 67.328-33.536l-2.56-3.072s-35.072-.768-71.936 26.88c0 0-36.864 66.816-36.864 149.248 0 0 21.504 37.12 78.08 38.912 0 0 9.472-11.52 17.152-21.248-32.512-9.728-44.8-30.208-44.8-30.208 3.766 2.636 9.976 6.053 10.496 6.4 43.21 24.198 104.588 32.126 159.744 8.96 8.96-3.328 18.944-8.192 29.44-15.104 0 0-12.8 20.992-46.336 30.464 7.68 9.728 16.896 20.736 16.896 20.736 56.576-1.792 78.336-38.912 78.336-38.912z"></path>
														</svg>
													</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					) : (
						<Accordion
							type="multiple"
							collapsible="true"
							defaultValue={["item-1"]}
							className="footer_accordion | flex flex-wrap -mx-4">
							<AccordionItem
								value="item-1"
								className="footer_block accordion-item block-newsletter | open | w-full order-first">
								<AccordionTrigger className="footer_block-inner accordion-button block-title | font-bold text-base">
									LET'S GET IN TOUCH
								</AccordionTrigger>
								<AccordionContent className="accordion-content block-content">
									<div className="pb-5 md:pb-0">
										<p className="newsletter-block-desc block-text | py-2">
											Stay up to date!
										</p>
										<div>
											<form
												id="contact-form"
												acceptCharset="UTF-8"
												className="footer-form-newsletter">
												<div className="relative">
													<input
														type="email"
														required
														name="contact[email]"
														placeholder="Enter your email"
														autoCorrect="off"
														autoCapitalize="off"
														autoComplete="off"
														spellCheck="false"
														className="newsletter_form-input | form-control control-icon py-1.5 px-12"
													/>
													<span className="form-newsletter-icon | absolute">
														<EmailOutlined className="w-[16px] h-[16px]" />
													</span>
													<button
														type="submit"
														name="submit"
														className="form-submit absolute">
														<Send className="w-[16px] h-[16px]" />
													</button>
												</div>
												<div className="agree-terms">
													<label htmlFor="agree_terms">
														<input
															id="agree_terms"
															type="checkbox"
															name="agree_terms"
															value={"yes"}
															required
														/>
														<span>
															<p>
																I agree with the{" "}
																<a
																	href="#"
																	title="#">
																	Terms &
																	conditions
																</a>
															</p>
														</span>
													</label>
												</div>
											</form>
										</div>
									</div>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem
								value="item-2"
								className="footer_block accordion-item footer_block-menu | w-full">
								<AccordionTrigger className="footer_block-inner accordion-button block-title | font-bold text-base">
									SUPPORT
								</AccordionTrigger>
								<AccordionContent>
									<ul className="accordion-content block-content">
										<div className="pb-5 md:pb-0">
											<li className="link-lv2 | leading-8 hover-underline">
												<a href="#">Drivers Download</a>
											</li>

											<li className="link-lv2 | leading-8 hover-underline">
												<a href="#">Track Your Order</a>
											</li>

											<li className="link-lv2 | leading-8 hover-underline">
												<a href="/pages/shipping-return">
													Shipping &amp; Returns
												</a>
											</li>

											<li className="link-lv2 | leading-8 hover-underline">
												<a href="/pages/reviews">
													Customer Reviews
												</a>
											</li>
										</div>
									</ul>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem
								value="item-3"
								className="footer_block accordion-item footer_block-menu | w-full">
								<AccordionTrigger className="footer_block-inner accordion-button block-title | font-bold text-base">
									GET TO KNOW US
								</AccordionTrigger>
								<AccordionContent>
									<ul className="accordion-content block-content">
										<div className="pb-5 md:pb-0">
											<li className="link-lv2 | leading-8 hover-underline">
												<a href="/pages/security-privacy">
													Security &amp; Privacy
												</a>
											</li>

											<li className="link-lv2 | leading-8 hover-underline">
												<a href="/pages/terms-conditions">
													Terms of Use
												</a>
											</li>

											<li className="link-lv2 | leading-8 hover-underline">
												<a href="/pages/contact-us">
													Contact Us
												</a>
											</li>

											<li className="link-lv2 | leading-8 hover-underline">
												<a href="#">Our DISCORD</a>
											</li>
										</div>
									</ul>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem
								value="item-4"
								className="footer_block accordion-item footer_block-our_store | w-full">
								<AccordionTrigger className="footer_block-inner accordion-button block-title | font-bold text-base">
									FOLLOW US
								</AccordionTrigger>
								<AccordionContent>
									<div className="accordion-content rte block-content">
										<div className="pb-5 md:pb-0">
											<div className="block-text mt-4">
												<p className="mt-1">
													<a href="mailto:support@audiooasis.com">
														{" "}
														support@audiooasis.com{" "}
													</a>
												</p>
												<div className="social-media-links | mt-6 px-0 -mx-2 flex items-center">
													<a
														target="_blank"
														className="px-2 flex items-center"
														href="#"
														rel="noreferrer">
														<svg
															className="w-[20px] h-[20px]"
															xmlns="http://www.w3.org/2000/svg"
															viewBox="0 0 320 512">
															<path
																fill="currentColor"
																d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
														</svg>
													</a>
													<a
														target="_blank"
														className="px-2 flex items-center"
														href="#"
														rel="noreferrer">
														<svg
															className="w-[20px] h-[20px]"
															xmlns="http://www.w3.org/2000/svg"
															viewBox="0 0 448 512">
															<path
																fill="currentColor"
																d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
														</svg>
													</a>
													<a
														target="_blank"
														className="px-2 flex items-center"
														href="#"
														rel="noreferrer">
														<svg
															className="w-[20px] h-[20px]"
															xmlns="http://www.w3.org/2000/svg"
															viewBox="0 0 512 512">
															<path
																fill="currentColor"
																d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
														</svg>
													</a>
													<a
														target="_blank"
														className="px-2 flex items-center"
														href="#"
														rel="noreferrer">
														<svg
															className="w-[20px] h-[20px]"
															xmlns="http://www.w3.org/2000/svg"
															viewBox="0 0 576 512">
															<path
																fill="currentColor"
																d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path>
														</svg>
													</a>
													<a
														target="_blank"
														className="px-2 flex items-center"
														href="#"
														rel="noreferrer">
														<svg
															className="w-[20px] h-[20px]"
															xmlns="http://www.w3.org/2000/svg"
															viewBox="0 0 448 512">
															<path
																fill="currentColor"
																d="M297.216 243.2c0 15.616-11.52 28.416-26.112 28.416-14.336 0-26.112-12.8-26.112-28.416s11.52-28.416 26.112-28.416c14.592 0 26.112 12.8 26.112 28.416zm-119.552-28.416c-14.592 0-26.112 12.8-26.112 28.416s11.776 28.416 26.112 28.416c14.592 0 26.112-12.8 26.112-28.416.256-15.616-11.52-28.416-26.112-28.416zM448 52.736V512c-64.494-56.994-43.868-38.128-118.784-107.776l13.568 47.36H52.48C23.552 451.584 0 428.032 0 398.848V52.736C0 23.552 23.552 0 52.48 0h343.04C424.448 0 448 23.552 448 52.736zm-72.96 242.688c0-82.432-36.864-149.248-36.864-149.248-36.864-27.648-71.936-26.88-71.936-26.88l-3.584 4.096c43.52 13.312 63.744 32.512 63.744 32.512-60.811-33.329-132.244-33.335-191.232-7.424-9.472 4.352-15.104 7.424-15.104 7.424s21.248-20.224 67.328-33.536l-2.56-3.072s-35.072-.768-71.936 26.88c0 0-36.864 66.816-36.864 149.248 0 0 21.504 37.12 78.08 38.912 0 0 9.472-11.52 17.152-21.248-32.512-9.728-44.8-30.208-44.8-30.208 3.766 2.636 9.976 6.053 10.496 6.4 43.21 24.198 104.588 32.126 159.744 8.96 8.96-3.328 18.944-8.192 29.44-15.104 0 0-12.8 20.992-46.336 30.464 7.68 9.728 16.896 20.736 16.896 20.736 56.576-1.792 78.336-38.912 78.336-38.912z"></path>
														</svg>
													</a>
												</div>
											</div>
										</div>
									</div>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					)}
				</div>
			</div>
			<div className="footer-layout footer_bottom | mt-5 md:mt-0">
				<div className="container">
					<div className="footer_bottom-inner | lg:pb-8 pt-0 lg:py-5 flex flex-col lg:flex-row justify-between items-center">
						<div className="footer_left | flex-1 text-center w-full md:text-left mb-6 lg:mb-0 lg:w-auto lg:order-none">
							<span className="text-sm text-left">
								© AUDIOOASIS.COM 2024 All Rights Reserved.
							</span>
						</div>
						<div className="footer_right | w-full flex flex-wrap justify-center md:justify-start lg:justify-center items-center lg:w-auto">
							<div className="payment-icons flex justify-center lg:justify-start">
								<span className="hidden">
									Payment options:{" "}
								</span>
								<ul className="flex flex-wrap -m-2.5">
									<li className="m-2.5">
										<svg
											className="icon icon--full-color"
											xmlns="http://www.w3.org/2000/svg"
											role="img"
											aria-labelledby="pi-american_express"
											viewBox="0 0 38 24"
											width="38"
											height="24">
											<title id="pi-american_express">
												American Express
											</title>
											<path
												fill="#000"
												d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3Z"
												opacity=".07"></path>
											<path
												fill="#006FCF"
												d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32Z"></path>
											<path
												fill="#FFF"
												d="M22.012 19.936v-8.421L37 11.528v2.326l-1.732 1.852L37 17.573v2.375h-2.766l-1.47-1.622-1.46 1.628-9.292-.02Z"></path>
											<path
												fill="#006FCF"
												d="M23.013 19.012v-6.57h5.572v1.513h-3.768v1.028h3.678v1.488h-3.678v1.01h3.768v1.531h-5.572Z"></path>
											<path
												fill="#006FCF"
												d="m28.557 19.012 3.083-3.289-3.083-3.282h2.386l1.884 2.083 1.89-2.082H37v.051l-3.017 3.23L37 18.92v.093h-2.307l-1.917-2.103-1.898 2.104h-2.321Z"></path>
											<path
												fill="#FFF"
												d="M22.71 4.04h3.614l1.269 2.881V4.04h4.46l.77 2.159.771-2.159H37v8.421H19l3.71-8.421Z"></path>
											<path
												fill="#006FCF"
												d="m23.395 4.955-2.916 6.566h2l.55-1.315h2.98l.55 1.315h2.05l-2.904-6.566h-2.31Zm.25 3.777.875-2.09.873 2.09h-1.748Z"></path>
											<path
												fill="#006FCF"
												d="M28.581 11.52V4.953l2.811.01L32.84 9l1.456-4.046H37v6.565l-1.74.016v-4.51l-1.644 4.494h-1.59L30.35 7.01v4.51h-1.768Z"></path>
										</svg>
									</li>
									<li className="m-2.5">
										<svg
											className="icon icon--full-color"
											version="1.1"
											xmlns="http://www.w3.org/2000/svg"
											role="img"
											x="0"
											y="0"
											width="38"
											height="24"
											viewBox="0 0 165.521 105.965"
											xmlSpace="preserve"
											aria-labelledby="pi-apple_pay">
											<title id="pi-apple_pay">
												Apple Pay
											</title>
											<path
												fill="#000"
												d="M150.698 0H14.823c-.566 0-1.133 0-1.698.003-.477.004-.953.009-1.43.022-1.039.028-2.087.09-3.113.274a10.51 10.51 0 0 0-2.958.975 9.932 9.932 0 0 0-4.35 4.35 10.463 10.463 0 0 0-.975 2.96C.113 9.611.052 10.658.024 11.696a70.22 70.22 0 0 0-.022 1.43C0 13.69 0 14.256 0 14.823v76.318c0 .567 0 1.132.002 1.699.003.476.009.953.022 1.43.028 1.036.09 2.084.275 3.11a10.46 10.46 0 0 0 .974 2.96 9.897 9.897 0 0 0 1.83 2.52 9.874 9.874 0 0 0 2.52 1.83c.947.483 1.917.79 2.96.977 1.025.183 2.073.245 3.112.273.477.011.953.017 1.43.02.565.004 1.132.004 1.698.004h135.875c.565 0 1.132 0 1.697-.004.476-.002.952-.009 1.431-.02 1.037-.028 2.085-.09 3.113-.273a10.478 10.478 0 0 0 2.958-.977 9.955 9.955 0 0 0 4.35-4.35c.483-.947.789-1.917.974-2.96.186-1.026.246-2.074.274-3.11.013-.477.02-.954.022-1.43.004-.567.004-1.132.004-1.699V14.824c0-.567 0-1.133-.004-1.699a63.067 63.067 0 0 0-.022-1.429c-.028-1.038-.088-2.085-.274-3.112a10.4 10.4 0 0 0-.974-2.96 9.94 9.94 0 0 0-4.35-4.35A10.52 10.52 0 0 0 156.939.3c-1.028-.185-2.076-.246-3.113-.274a71.417 71.417 0 0 0-1.431-.022C151.83 0 151.263 0 150.698 0z"></path>
											<path
												fill="#FFF"
												d="M150.698 3.532l1.672.003c.452.003.905.008 1.36.02.793.022 1.719.065 2.583.22.75.135 1.38.34 1.984.648a6.392 6.392 0 0 1 2.804 2.807c.306.6.51 1.226.645 1.983.154.854.197 1.783.218 2.58.013.45.019.9.02 1.36.005.557.005 1.113.005 1.671v76.318c0 .558 0 1.114-.004 1.682-.002.45-.008.9-.02 1.35-.022.796-.065 1.725-.221 2.589a6.855 6.855 0 0 1-.645 1.975 6.397 6.397 0 0 1-2.808 2.807c-.6.306-1.228.511-1.971.645-.881.157-1.847.2-2.574.22-.457.01-.912.017-1.379.019-.555.004-1.113.004-1.669.004H14.801c-.55 0-1.1 0-1.66-.004a74.993 74.993 0 0 1-1.35-.018c-.744-.02-1.71-.064-2.584-.22a6.938 6.938 0 0 1-1.986-.65 6.337 6.337 0 0 1-1.622-1.18 6.355 6.355 0 0 1-1.178-1.623 6.935 6.935 0 0 1-.646-1.985c-.156-.863-.2-1.788-.22-2.578a66.088 66.088 0 0 1-.02-1.355l-.003-1.327V14.474l.002-1.325a66.7 66.7 0 0 1 .02-1.357c.022-.792.065-1.717.222-2.587a6.924 6.924 0 0 1 .646-1.981c.304-.598.7-1.144 1.18-1.623a6.386 6.386 0 0 1 1.624-1.18 6.96 6.96 0 0 1 1.98-.646c.865-.155 1.792-.198 2.586-.22.452-.012.905-.017 1.354-.02l1.677-.003h135.875"></path>
											<g>
												<g>
													<path
														fill="#000"
														d="M43.508 35.77c1.404-1.755 2.356-4.112 2.105-6.52-2.054.102-4.56 1.355-6.012 3.112-1.303 1.504-2.456 3.959-2.156 6.266 2.306.2 4.61-1.152 6.063-2.858"></path>
													<path
														fill="#000"
														d="M45.587 39.079c-3.35-.2-6.196 1.9-7.795 1.9-1.6 0-4.049-1.8-6.698-1.751-3.447.05-6.645 2-8.395 5.1-3.598 6.2-.95 15.4 2.55 20.45 1.699 2.5 3.747 5.25 6.445 5.151 2.55-.1 3.549-1.65 6.647-1.65 3.097 0 3.997 1.65 6.696 1.6 2.798-.05 4.548-2.5 6.247-5 1.95-2.85 2.747-5.6 2.797-5.75-.05-.05-5.396-2.101-5.446-8.251-.05-5.15 4.198-7.6 4.398-7.751-2.399-3.548-6.147-3.948-7.447-4.048"></path>
												</g>
												<g>
													<path
														fill="#000"
														d="M78.973 32.11c7.278 0 12.347 5.017 12.347 12.321 0 7.33-5.173 12.373-12.529 12.373h-8.058V69.62h-5.822V32.11h14.062zm-8.24 19.807h6.68c5.07 0 7.954-2.729 7.954-7.46 0-4.73-2.885-7.434-7.928-7.434h-6.706v14.894z"></path>
													<path
														fill="#000"
														d="M92.764 61.847c0-4.809 3.665-7.564 10.423-7.98l7.252-.442v-2.08c0-3.04-2.001-4.704-5.562-4.704-2.938 0-5.07 1.507-5.51 3.82h-5.252c.157-4.86 4.731-8.395 10.918-8.395 6.654 0 10.995 3.483 10.995 8.89v18.663h-5.38v-4.497h-.13c-1.534 2.937-4.914 4.782-8.579 4.782-5.406 0-9.175-3.222-9.175-8.057zm17.675-2.417v-2.106l-6.472.416c-3.64.234-5.536 1.585-5.536 3.95 0 2.288 1.975 3.77 5.068 3.77 3.95 0 6.94-2.522 6.94-6.03z"></path>
													<path
														fill="#000"
														d="M120.975 79.652v-4.496c.364.051 1.247.103 1.715.103 2.573 0 4.029-1.09 4.913-3.899l.52-1.663-9.852-27.293h6.082l6.863 22.146h.13l6.862-22.146h5.927l-10.216 28.67c-2.34 6.577-5.017 8.735-10.683 8.735-.442 0-1.872-.052-2.261-.157z"></path>
												</g>
											</g>
										</svg>
									</li>
									<li className="m-2.5">
										<svg
											className="icon icon--full-color"
											viewBox="0 0 38 24"
											xmlns="http://www.w3.org/2000/svg"
											role="img"
											width="38"
											height="24"
											aria-labelledby="pi-master">
											<title id="pi-master">
												Mastercard
											</title>
											<path
												opacity=".07"
												d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path>
											<path
												fill="#fff"
												d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path>
											<circle
												fill="#EB001B"
												cx="15"
												cy="12"
												r="7"></circle>
											<circle
												fill="#F79E1B"
												cx="23"
												cy="12"
												r="7"></circle>
											<path
												fill="#FF5F00"
												d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"></path>
										</svg>
									</li>
									<li className="m-2.5">
										<svg
											className="icon icon--full-color"
											viewBox="0 0 38 24"
											xmlns="http://www.w3.org/2000/svg"
											width="38"
											height="24"
											role="img"
											aria-labelledby="pi-paypal">
											<title id="pi-paypal">PayPal</title>
											<path
												opacity=".07"
												d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path>
											<path
												fill="#fff"
												d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path>
											<path
												fill="#003087"
												d="M23.9 8.3c.2-1 0-1.7-.6-2.3-.6-.7-1.7-1-3.1-1h-4.1c-.3 0-.5.2-.6.5L14 15.6c0 .2.1.4.3.4H17l.4-3.4 1.8-2.2 4.7-2.1z"></path>
											<path
												fill="#3086C8"
												d="M23.9 8.3l-.2.2c-.5 2.8-2.2 3.8-4.6 3.8H18c-.3 0-.5.2-.6.5l-.6 3.9-.2 1c0 .2.1.4.3.4H19c.3 0 .5-.2.5-.4v-.1l.4-2.4v-.1c0-.2.3-.4.5-.4h.3c2.1 0 3.7-.8 4.1-3.2.2-1 .1-1.8-.4-2.4-.1-.5-.3-.7-.5-.8z"></path>
											<path
												fill="#012169"
												d="M23.3 8.1c-.1-.1-.2-.1-.3-.1-.1 0-.2 0-.3-.1-.3-.1-.7-.1-1.1-.1h-3c-.1 0-.2 0-.2.1-.2.1-.3.2-.3.4l-.7 4.4v.1c0-.3.3-.5.6-.5h1.3c2.5 0 4.1-1 4.6-3.8v-.2c-.1-.1-.3-.2-.5-.2h-.1z"></path>
										</svg>
									</li>
									<li className="m-2.5">
										<svg
											className="icon icon--full-color"
											viewBox="0 0 38 24"
											xmlns="http://www.w3.org/2000/svg"
											role="img"
											width="38"
											height="24"
											aria-labelledby="pi-visa">
											<title id="pi-visa">Visa</title>
											<path
												opacity=".07"
												d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path>
											<path
												fill="#fff"
												d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path>
											<path
												d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z"
												fill="#142688"></path>
										</svg>
									</li>
									<li className="m-2.5">
										<svg
											className="payment-icon"
											xmlns="http://www.w3.org/2000/svg"
											role="img"
											viewBox="0 0 38 24"
											width="38"
											height="24"
											aria-labelledby="pi-google_pay">
											<title id="pi-google_pay">
												Google Pay
											</title>
											<path
												d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
												fill="#000"
												opacity=".07"></path>
											<path
												d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
												fill="#FFF"></path>
											<path
												d="M18.093 11.976v3.2h-1.018v-7.9h2.691a2.447 2.447 0 0 1 1.747.692 2.28 2.28 0 0 1 .11 3.224l-.11.116c-.47.447-1.098.69-1.747.674l-1.673-.006zm0-3.732v2.788h1.698c.377.012.741-.135 1.005-.404a1.391 1.391 0 0 0-1.005-2.354l-1.698-.03zm6.484 1.348c.65-.03 1.286.188 1.778.613.445.43.682 1.03.65 1.649v3.334h-.969v-.766h-.049a1.93 1.93 0 0 1-1.673.931 2.17 2.17 0 0 1-1.496-.533 1.667 1.667 0 0 1-.613-1.324 1.606 1.606 0 0 1 .613-1.336 2.746 2.746 0 0 1 1.698-.515c.517-.02 1.03.093 1.49.331v-.208a1.134 1.134 0 0 0-.417-.901 1.416 1.416 0 0 0-.98-.368 1.545 1.545 0 0 0-1.319.717l-.895-.564a2.488 2.488 0 0 1 2.182-1.06zM23.29 13.52a.79.79 0 0 0 .337.662c.223.176.5.269.785.263.429-.001.84-.17 1.146-.472.305-.286.478-.685.478-1.103a2.047 2.047 0 0 0-1.324-.374 1.716 1.716 0 0 0-1.03.294.883.883 0 0 0-.392.73zm9.286-3.75l-3.39 7.79h-1.048l1.281-2.728-2.224-5.062h1.103l1.612 3.885 1.569-3.885h1.097z"
												fill="#5F6368"></path>
											<path
												d="M13.986 11.284c0-.308-.024-.616-.073-.92h-4.29v1.747h2.451a2.096 2.096 0 0 1-.9 1.373v1.134h1.464a4.433 4.433 0 0 0 1.348-3.334z"
												fill="#4285F4"></path>
											<path
												d="M9.629 15.721a4.352 4.352 0 0 0 3.01-1.097l-1.466-1.14a2.752 2.752 0 0 1-4.094-1.44H5.577v1.17a4.53 4.53 0 0 0 4.052 2.507z"
												fill="#34A853"></path>
											<path
												d="M7.079 12.05a2.709 2.709 0 0 1 0-1.735v-1.17H5.577a4.505 4.505 0 0 0 0 4.075l1.502-1.17z"
												fill="#FBBC04"></path>
											<path
												d="M9.629 8.44a2.452 2.452 0 0 1 1.74.68l1.3-1.293a4.37 4.37 0 0 0-3.065-1.183 4.53 4.53 0 0 0-4.027 2.5l1.502 1.171a2.715 2.715 0 0 1 2.55-1.875z"
												fill="#EA4335"></path>
										</svg>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
