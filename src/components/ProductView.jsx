import "../assets/css/ProductView.css";
import ProductMedia from "./ProductMedia";

const ProductView = ({ item }) => {
	return (
		<section id="product__main" className="section-product">
			<div
				className="product-template | md:mt-4 mb-5 md:mb-12"
				data-section-type="product-page"
				data-section-id="product__main"
				data-layout="layout-4"
				data-product-handle={item.handle}
				data-product-url={item.url}
				data-product-id={item.id}
				data-container="container">
				<div className="container">
					<div className="prod-template product-wrapper prod-template__desktop | enable-zoom">
						<div className="prod__container prod__block | flex flex-wrap">
							<div className="w-full md:w-2/3">
								<div className="product-media__desktop prod-media__wrapper | justify-end hidden md:block prod__layout-4">
									<ProductMedia item={item} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProductView;
