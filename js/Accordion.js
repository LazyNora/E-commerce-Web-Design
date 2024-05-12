document.querySelectorAll(".accordion-item[value]").forEach((item) => {
	const title = item.querySelector("h3[data-state]");
	const button = title.querySelector(".accordion-button");
	const content = item.querySelector("div[data-state][role=region]");
	content.classList.add(
		"data-[state=closed]:animate-accordion-up",
		"data-[state=open]:animate-accordion-down"
	);
	// content.style.setProperty(
	// 	"--accordion-content-height",
	// 	`${content.scrollHeight}px`
	// );
	// Trigger the accordion animation on load to prevent the content from flickering
	// when the page loads
	if (content.dataset.state === "closed") {
		content.style.height = "0";
	}

	// End of trigger

	button.addEventListener("click", () => {
		const state = title.dataset.state === "open" ? "closed" : "open";
		title.dataset.state = state;
		button.dataset.state = state;
		content.dataset.state = state;
		content.style.setProperty(
			"--accordion-content-height",
			`${content.scrollHeight}px`
		);
		// if (state === "closed")
		// 	setTimeout(() => {
		// 		content.style.display = "none";
		// 	}, 200);
		// else {
		// 	content.style.display = "block";
		// }
	});
});
