import styled from "styled-components";
import "../assets/css/Announcement.css";

// Event listener to close the announcement bar
const Announcement = () => {
	const closeAnnouncement = () => {
		document.querySelector(".announcement-bar").remove();
		document.documentElement.style.setProperty(
			"--sf-announcement-height",
			"0px"
		);
	};

	return (
		<section className="section-announcement | hidden lg:block">
			<div className="announcement-bar | relative">
				<div className="announcement-bar__content | md:text-center py-2.5 text-base">
					<span className="font-medium" style={{ fontSize: "13px" }}>
						30 DAYS NO REASON RETURN • 180 DAYS QUALITY OF EXCHANGE
						OR REFUND • LOWEST PRICE GUARANTEE • 7 DAYS DOA PRODUCT
						GUARANTEE
					</span>
				</div>
				<div
					className="topbar__close | p-3 absolute top-0 right-0 cursor-pointer h-full flex items-center"
					onClick={closeAnnouncement}>
					<svg
						className="w-[20px] h-[20px]"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M6 18L18 6M6 6l12 12"></path>
					</svg>
				</div>
			</div>
		</section>
	);
};

export default Announcement;
