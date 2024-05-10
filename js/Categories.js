import { categories } from "./data.js";
document.querySelector(".categories-wrapper .ib-grid").innerHTML = categories
	.map(
		(item, index) => `
    <div class="ib-column">
      <div class="ib-icon-box ib-icon-box--vertical hover-scale-up scroll-animation"
      data-animation="animate-fade-up animate-ease-out animate-delay-100">
        <div class="ib-icon-box__inner flex flex-col items-center sm:items-start">
          <a
            href=${item.link}
            class="ib-icon-box__icon w-full flex shrink-0 justify-center max-w-full mb-5 md:mb-0 items-start"
            style="width: 100%">
            <div
              class="ib-image w-full border border-[#e5e5e5]"
              style="--aspect-ratio: 1.25"
              intersecting="true">
              <img
                src=${item.img}
                sizes="460px"
                alt=""
                loading="lazy"
                class="w-full img-loaded"
                width="460"
                height="368"
              />
            </div>
          </a>
          <div class="md:mt-5 ib-icon-box__text flex-1 text-left">
            <h3 class="h4 mb-1.5 font-medium">${item.title}</h3>
            <div class="rte text-color-subtext">
              <p>${item.desc}</p>
            </div>
            <a href=${item.link} class="btn mt-3 btn-link ">
              SHOP NOW
            </a>
          </div>
        </div>
      </div>
    </div>
    `
	)
	.join("");
