const customSelect = document.querySelector(".custom-select");
const select = customSelect.querySelector("select[name='sort_by']");
const options = select.querySelectorAll("option");
const selectItems = customSelect.querySelector(".select-items");
const selectSelected = customSelect.querySelector(".select-selected");
const selectSelectedText = selectSelected.querySelector(".select-selected__text");

let sortByValue = localStorage.getItem("sortByValue");
if (sortByValue) {
	select.value = sortByValue;
} else {
	localStorage.setItem("sortByValue", options[options.length - 1].value);
	select.value = options[options.length - 1].value;
}

selectSelectedText.textContent = select.options[select.selectedIndex].textContent;

options.forEach((option) => {
	const item = document.createElement("div");
	item.classList.add("select-item");
	item.textContent = option.textContent;
	item.dataset.value = option.value;

	item.addEventListener("click", () => {
		const sameAsSelected = selectItems.querySelector(".same-as-selected");
		if (sameAsSelected) {
			sameAsSelected.classList.remove("same-as-selected");
		}
		select.value = item.dataset.value;
		item.classList.add("same-as-selected");
		selectSelectedText.textContent = item.textContent;
		selectItems.classList.add("select-hide");
		localStorage.setItem("sortByValue", select.value);
	});

	selectItems.appendChild(item);
});

selectSelected.addEventListener("click", () => {
	selectItems.classList.toggle("select-hide");
});

select.addEventListener("change", () => {
	selectSelectedText.textContent = tabs[select.value].title;
});

document.addEventListener("click", (event) => {
	if (!customSelect.contains(event.target) && !selectItems.contains(event.target)) {
		selectItems.classList.add("select-hide");
	}
});

const gridColumn_view = document.querySelector(".gridColumn-view");
const gridBtns = gridColumn_view.querySelectorAll("button[data-column]");
let gridColumnView = parseInt(localStorage.getItem("gridColumnViews"));
const productListing = document.querySelector(".product-listing");
if (!gridColumnView) {
	localStorage.setItem("gridColumnViews", "5");
	gridColumnView = 5;
	const btn = gridColumn_view.querySelector("button[data-column='5']");
	btn.classList.add("active");
	productListing.classList.add("col-5");
} else {
	gridColumn_view
		.querySelector("button[data-column='" + gridColumnView + "']")
		.classList.add("active");
	productListing.classList.add("col-" + gridColumnView);
}

gridBtns.forEach((btn) => {
	btn.addEventListener("click", () => {
		gridBtns.forEach((btn) => {
			btn.classList.remove("active");
		});
		btn.classList.add("active");
		productListing.classList.remove("col-" + gridColumnView);
		gridColumnView = parseInt(btn.dataset.column);
		localStorage.setItem("gridColumnViews", gridColumnView);
		productListing.classList.add("col-" + gridColumnView);
	});
});

window.addEventListener("resize", () => {
	if (window.innerWidth < 768 && gridColumnView > 2) {
		productListing.classList.remove("col-" + gridColumnView);
		gridColumnView = 2;
		productListing.classList.add("col-2");
		gridBtns.forEach((btn) => {
			btn.classList.remove("active");
		});
		gridColumn_view.querySelector("button[data-column='2']").classList.add("active");
		localStorage.setItem("gridColumnViews", "2");
	}
	if (window.innerWidth < 1024 && gridColumnView === 5) {
		productListing.classList.remove("col-" + gridColumnView);
		gridColumnView = 4;
		productListing.classList.add("col-4");
		gridBtns.forEach((btn) => {
			btn.classList.remove("active");
		});
		gridColumn_view.querySelector("button[data-column='4']").classList.add("active");
		localStorage.setItem("gridColumnViews", "4");
	}
});
