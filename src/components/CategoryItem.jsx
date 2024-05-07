const CategoryItem = ({ item }) => {
	return (
		<div className="ib-icon-box ib-icon-box--vertical hover-scale-up">
			<div className="ib-icon-box__inner flex flex-col items-center sm:items-start">
				<a
					href={item.link}
					className="ib-icon-box__icon w-full flex shrink-0 justify-center max-w-full mb-5 md:mb-0 items-start"
					style={{ width: "100%" }}>
					<div
						className="ib-image w-full border border-[#e5e5e5]"
						style={{ "--aspect-ratio": "1.25" }}
						intersecting="true">
						<img
							src={item.img}
							sizes="460px"
							alt=""
							loading="lazy"
							className="w-full img-loaded"
							width="460"
							height="368"
						/>
					</div>
				</a>
				<div className="md:mt-5 ib-icon-box__text flex-1 text-left">
					<h3 className="h4 mb-1.5 font-medium">{item.title}</h3>
					<div className="rte text-color-subtext">
						<p>{item.desc}</p>
					</div>
					<a href={item.link} className="btn mt-3 btn-link ">
						SHOP NOW
					</a>
				</div>
			</div>
		</div>
	);
};

export default CategoryItem;
