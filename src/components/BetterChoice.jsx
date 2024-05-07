import {
	LocalShippingOutlined,
	MonetizationOnOutlined,
	PaymentOutlined,
	PeopleAltOutlined,
	VerifiedUserOutlined,
} from "@mui/icons-material";

const BetterChoice = () => {
	return (
		<section className="section-betterchoices | justify-center hidden md:flex">
			<div className="container-fuild my-[100px] flex flex-row justify-center items-center px-14 lg:px-32">
				<h2 className="text-4xl font-bold w-1/4">
					Better choices,
					<br />
					Better prices
				</h2>
				<ul className="w-full flex flex-row text-center">
					<li className="w-1/5 mx-2">
						<div className="text-4xl">
							<MonetizationOnOutlined fontSize="inherit" />
						</div>
						<h3 className="text-base font-bold">
							Lowest Price Guarantee
						</h3>
						<p className="text-sm text-gray-500">
							Find a lower price and Request a price match
						</p>
					</li>
					<li className="w-1/5 mx-2">
						<div className="text-4xl">
							<PeopleAltOutlined fontSize="inherit" />
						</div>
						<h3 className="text-base font-bold">
							No Reason Return
						</h3>
						<p className="text-sm text-gray-500">
							7 Days DOA Product Guarantee
							<br />
							30 Days No Reason Return
						</p>
					</li>
					<li className="w-1/5 mx-2">
						<div className="text-4xl">
							<LocalShippingOutlined fontSize="inherit" />
						</div>
						<h3 className="text-base font-bold">Fast Delivery</h3>
						<p className="text-sm text-gray-500">
							Faster delivery on selected items thanks to our
							improved logistics
						</p>
					</li>
					<li className="w-1/5 mx-2">
						<div className="text-4xl">
							<PaymentOutlined fontSize="inherit" />
						</div>
						<h3 className="text-base font-bold">Safe Payments</h3>
						<p className="text-sm text-gray-500">
							Safe payment methods preferred by Paypal
						</p>
					</li>
					<li className="w-1/5 mx-2">
						<div className="text-4xl">
							<VerifiedUserOutlined fontSize="inherit" />
						</div>
						<h3 className="text-base font-bold">
							100% Authentic Guarantee
						</h3>
						<p className="text-sm text-gray-500">
							All products are guaranteed 100% authentic directly
							from brand
						</p>
					</li>
				</ul>
			</div>
		</section>
	);
};

export default BetterChoice;
