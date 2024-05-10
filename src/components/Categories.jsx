import { categories } from "../../js/data";
import CategoryItem from "./CategoryItem";
import "../assets/css/Categories.css";

const Categories = () => {
	return (
		<section className="section-categories">
			<div
				className="container categories-wrapper section-ib-wrapper"
				style={{
					"--column-gap": "30px",
					"--column-gap-mobile": "10px",
					"--row-gap": "40px",
					"--row-gap-mobile": "30px",
					"--items": "3",
				}}>
				<div className="section__header text-center">
					<h2 className="section__heading">Shop by Categories</h2>
				</div>
				<div className="relative ib">
					<div className="ib-grid ib-wrapper md:grid md:grid-cols-2 lg:grid-cols-3 ">
						{categories.map((item, index) => (
							<div key={index} className="ib-column">
								<CategoryItem item={item} />
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Categories;
