import React from "react";

const VariantSelect = ({ index, option, currentVariant }) => {
	const variantSelectRef = React.useRef(null);

	React.useEffect(() => {
		const variantSelect = variantSelectRef.current;
		variantSelect.addEventListener("change", updateSelectedValue);
	}, []);

	const updateSelectedValue = (e) => {
		const selectedValue = e.target.value;
		variantSelectRef.current.dataset.selectedValue = selectedValue;
		const selectedValueElement =
			variantSelectRef.current.querySelector(".selected-value");
		selectedValueElement.textContent = selectedValue;
	};

	return (
		<div
			ref={variantSelectRef}
			className="variant-select"
			data-picker-field="select"
			data-option-name={option.name}
			data-option-position={option.position}
			data-selected-value={currentVariant?.options[index]}>
			<div className="prod__option-label | font-medium flex flex-wrap items-center justify-between prod__option-label--dropdown uppercase">
				<label
					className="form-label"
					htmlFor={`option_${option.position}`}>
					<span className="font-bold mr-1">{option.name}:</span>
					<span className="selected-value">
						{currentVariant?.options[index]}
					</span>
				</label>
			</div>
			<div className="prod__option prod__option--dropdown">
				<div className="flex flex-wrap">
					<select
						defaultValue={currentVariant?.options[index]}
						className="select-bordered uppercase"
						name={`options[${option.name}]`}>
						{option.values.map((value, index2) => (
							<option
								key={index2}
								value={value}
								className="variant-picker__option product-option-item"
								data-value={value}
								data-option-position={option.position}>
								{value}
							</option>
						))}
					</select>
				</div>
			</div>
		</div>
	);
};

export default VariantSelect;
