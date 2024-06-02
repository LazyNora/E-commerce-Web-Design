function queryDomNodes(selectors = {}, context = document) {
  return Object.entries(selectors).reduce((acc, [key, value]) => {
    const isStr = "string" === typeof value;
    const queryType = isStr ? "querySelector" : "querySelectorAll";
    const query = isStr ? value : value[0];
    return (
      context && (acc[key] = context[queryType](query)),
      !isStr && acc[key] && (acc[key] = [...acc[key]]),
      acc
    );
  }, {});
}

class priceRange extends HTMLElement {
  constructor() {
    super();
    this.selectors = {
      ranges: ["input[type='range']"],
      inputs: ["input[type='number']"],
      minRange: '[data-type="min-range"]',
      maxRange: '[data-type="max-range"]',
      minInput: '[data-type="min-input"]',
      maxInput: '[data-type="max-input"]',
    };
    this.domNodes = queryDomNodes(this.selectors, this);
    this.priceGap = parseInt(this.dataset.priceGap);
    this.priceMax = parseInt(this.dataset.priceMax);
    this.domNodes.inputs.forEach((input) =>
      input.addEventListener("change", this.onInputChange.bind(this)),
    );
    this.domNodes.ranges.forEach((range) =>
      range.addEventListener("input", this.onSliderChange.bind(this)),
    );
    this.setMinAndMaxValue();
  }
  onSliderChange(event) {
    const currentTarget = event.currentTarget;
    const type = currentTarget.dataset.type;
    const {
      minInput: minInput,
      maxInput: maxInput,
      minRange: minRange,
      maxRange: maxRange,
    } = this.domNodes;

    if (type === "min-range") {
      maxRange.value - currentTarget.value >= this.priceGap
        ? (minInput.value = currentTarget.value)
        : (currentTarget.value = maxRange.value - this.priceGap);
    } else if (type === "max-range") {
      currentTarget.value - minRange.value >= this.priceGap
        ? (maxInput.value = currentTarget.value)
        : (currentTarget.value =
            Number(minRange.value) + Number(this.priceGap));
    }
    this.style.setProperty(
      "--from",
      (100 * minRange.value) / this.priceMax + "%",
    );
    this.style.setProperty(
      "--to",
      (100 * maxRange.value) / this.priceMax + "%",
    );
  }
  onInputChange(event) {
    if (event.currentTarget.dataset.type === "max-input") {
      event.currentTarget.value - this.domNodes.minInput.value >= this.priceGap
        ? (this.domNodes.maxInput.value = currentTarget.value)
        : (this.domNodes.maxInput.value =
            Number(this.domNodes.minInput.value) + Number(this.priceGap));
    } else if (event.currentTarget.dataset.type === "min-input") {
      this.domNodes.maxInput.value - event.currentTarget.value >= this.priceGap
        ? (this.domNodes.minInput.value = event.currentTarget.value)
        : (this.domNodes.minInput.value =
            this.domNodes.maxInput.value - this.priceGap);
    }
    this.adjustToValidValues(event.currentTarget);
    this.setMinAndMaxValue();
    this.updateSliderValue();
    this.updatePriceRange();
  }
  setMinAndMaxValue() {
    const { minInput: minInput, maxInput: maxInput } = this.domNodes;
    maxInput.value &&
      (minInput == null ||
        minInput.setAttribute("max", Number(maxInput.value) - this.priceGap));
    minInput.value &&
      (maxInput == null ||
        maxInput.setAttribute("min", Number(minInput.value) + this.priceGap));
    minInput.value === "" &&
      (maxInput == null || maxInput.setAttribute("min", 0));
    maxInput.value === "" &&
      (minInput == null ||
        minInput.setAttribute("max", maxInput.getAttribute("max")));
  }
  adjustToValidValues(target) {
    const value = Number(target.value);
    const min = Number(target.getAttribute("min"));
    const max = Number(target.getAttribute("max"));
    value < min && (target.value = min);
    value > max && (target.value = max);
  }
  updateSliderValue() {
    const {
      minInput: minInput,
      maxInput: maxInput,
      minRange: minRange,
      maxRange: maxRange,
    } = this.domNodes;
    minRange.value = Number(minInput.value);
    maxRange.value = Number(maxInput.value) || this.priceMax;
  }
  updatePriceRange() {
    const {
      minInput: minInput,
      maxInput: maxInput,
      minRange: minRange,
      maxRange: maxRange,
    } = this.domNodes;
    this.style.setProperty(
      "--from",
      (100 * minRange.value) / this.priceMax + "%",
    );
    this.style.setProperty(
      "--to",
      (100 * maxRange.value) / this.priceMax + "%",
    );
  }
}

customElements.define("price-range", priceRange);
