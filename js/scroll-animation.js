const inViewPort = (entries, observer) => {
	entries.forEach((entry) => {
		const animation = entry.target.dataset.animation.split(" ");
		if (entry.isIntersecting) {
			entry.target.classList.remove("opacity-0");
			entry.target.classList.add(...animation);
		} else {
			entry.target.classList.add("opacity-0");
			entry.target.classList.remove(...animation);
		}
	});
};

const observer = new IntersectionObserver(inViewPort);
const observerOptions = {
	root: null,
	rootMargin: "0px",
	threshold: 0.5,
};

setTimeout(() => {
	const elements = document.querySelectorAll(".scroll-animation");
	elements.forEach((element) => {
		observer.observe(element, {
			root: element.dataset.root || null,
			rootMargin: "0px",
			threshold: element.dataset.threshold || 0.5,
		});
	});
}, 1000);
