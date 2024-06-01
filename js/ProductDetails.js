document.querySelector(".accordion-item[data-desc] .prose").innerHTML = product.description.replace(/<img/g, '<img loading="lazy" width="auto" height="auto"');
metafields &&
	metafields.length &&
	metafields.forEach((metafield, index) => {
		const tabTitles = metafieldsTitle.length > 0 ? metafieldsTitle : ["SPECIFICATIONS", "WHAT'S IN THE BOX?"];
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

const tabHeaders = document.querySelectorAll(".tab-header");
const tabContents = document.querySelectorAll(".tab-content");

tabHeaders.forEach((tabHeader, index) => {
	tabHeader.addEventListener("click", () => {
		tabHeaders.forEach((tabHeader) => tabHeader.classList.remove("active"));
		tabContents.forEach((tabContent) => tabContent.classList.remove("active"));
		tabHeader.classList.add("active");
		tabContents[index].classList.add("active");
	});
});

const accordionItems = document.querySelectorAll(".accordion-item");
const accordionButtons = document.querySelectorAll(".accordion-button");
const accordionContents = document.querySelectorAll(".accordion-content");

accordionButtons.forEach((accordionButton, index) => {
	accordionButton.addEventListener("click", () => {
		accordionItems[index].classList.toggle("open");
		accordionContents[index].classList.toggle("open");
		accordionContents[index].classList[accordionContents[index].classList.contains("open") ? "add" : "remove"]("overflow-hidden");
	});
});

const normalStarReview = '<svg class="star-icon normalStar w-[14px] h-[14px]" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>';
const halfStarReview = '<svg class="star-icon halfStar w-[14px] h-[14px]" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="m22 9.24-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28z"></path></svg>';
const borderStarReview = '<svg class="star-icon borderStar w-[14px] h-[14px]" focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="m22 9.24-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28z"></path></svg>';

const reviewWrapper = document.querySelector(".review-message-wrapper");
if (typeof product.reviews === "object" && product.reviews.length > 0) {
	const noReview = document.querySelector(".no-review");
	if (noReview) {
		noReview.remove();
	}
	const reviewList = document.createElement("div");
	reviewList.className = "review-list";
	product.reviews.forEach((review) => {
		let reviewStars = "";
		for (let i = 0; i < 5; i++) {
			if (review.rating - i >= 1) {
				reviewStars += normalStarReview;
			} else if (review.rating - i >= 0.5 && review.rating - i < 1) {
				reviewStars += halfStarReview;
			} else {
				reviewStars += borderStarReview;
			}
		}

		reviewList.innerHTML += `
    <div class="review-item">
      <div class="user-info">
        <div class="user-thumb">
          <a href="#" onclick="return false;" title="Profile of ${review.user}" aria-label="Profile of ${review.user}">
            <span title="Profile of ${review.user}" class="user-avatar">${review.user.slice(0, 1).toUpperCase()}</span>
          </a>
        </div>
        <a class="author" href="#" onclick="return false;" aria-label="Profile of ${review.user}">${review.user}</a>
        <div class="user-subheader">
          <div class="stars" data-rating="${review.rating}">
            ${reviewStars}
          </div>
          <span class="timestamp" data-timestamp="${review.timestamp}">${new Date(review.timestamp).toLocaleDateString("vi-VN")}</span>
        </div>
      </div>
      <div class="user-message">
        <p class="text-message">${review.review}</p>
        <div class="review-opts">
          <button type="button" class="review-helpful" data-vote="${typeof review.liked === "number" ? review.liked : 0}">
            <span class="icon-like" aria-label="Like this comment">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="15.61" viewBox="0 0 18 15.61">
                <path d="M8.218,15.237,12.652,10.8a1.592,1.592,0,0,0,.484-1.129V1.612A1.617,1.617,0,0,0,11.523,0H4.267A1.593,1.593,0,0,0,2.816.967L.156,7.094A2.444,2.444,0,0,0,2.413,10.48h4.6L6.2,14.189a1.445,1.445,0,0,0,.322,1.129A1.247,1.247,0,0,0,8.218,15.237ZM16.36,0a1.617,1.617,0,0,0-1.612,1.612V8.062a1.612,1.612,0,0,0,3.225,0V1.612A1.617,1.617,0,0,0,16.36,0Z" transform="translate(17.973 15.61) rotate(180)" fill="rgba(136,136,136,0.25)"></path>
              </svg>
              <span class="helpful-vote-count ${typeof review.liked === "number" && review.liked > 0 ? "" : "hidden"}">${typeof review.liked === "number" ? review.liked : 0}</span>
            </span>
          </button>
        </div>
      </div>
    </div>
    `;
	});
	reviewWrapper.appendChild(reviewList);

	reviewWrapper.querySelectorAll(".review-helpful").forEach((btn) => {
		btn.addEventListener("click", (e) => {
			const voteCount = btn.querySelector(".helpful-vote-count");
			const currentVote = parseInt(btn.getAttribute("data-vote"));
			if (btn.classList.contains("voted")) {
				btn.setAttribute("data-vote", currentVote - 1);
				btn.classList.remove("voted");
				voteCount.textContent = currentVote - 1;
			} else {
				btn.setAttribute("data-vote", currentVote + 1);
				btn.classList.add("voted");
				voteCount.textContent = currentVote + 1;
			}
			if (btn.getAttribute("data-vote") === "0") {
				voteCount.classList.add("hidden");
			} else {
				voteCount.classList.remove("hidden");
			}
		});
	});
}
