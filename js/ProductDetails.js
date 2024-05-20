document.querySelector(".accordion-item[data-desc] .prose").innerHTML = product.description.replace(
	/<img/g,
	'<img loading="lazy" width="auto" height="auto"'
);
metafields &&
	metafields.length &&
	metafields.forEach((metafield, index) => {
		const tabTitles = ["SPECIFICATIONS", "WHAT'S IN THE BOX?"];
		const tabsWrap = document.querySelector(".tabs-adds-wrap");
		const reviewTab = document.querySelector(".review-tab");
		const tabBlock = document.createElement("div");
		tabBlock.classList.add("tabs-adds-blocks");
		tabBlock.innerHTML = `
    <div class="tabs-adds-header border-color-border border-b">${tabTitles[index]}</div>
    <p>
      <span class="metafield">${metafield}</span>
    </p>
    `;
		tabsWrap.insertBefore(tabBlock, reviewTab);
	});
