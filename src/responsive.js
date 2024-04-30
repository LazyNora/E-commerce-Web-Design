import { css } from "styled-components";
import { useLayoutEffect, useState } from "react";

export const mobile = (props) => {
	return css`
		@media only screen and (max-width: 380px) {
			${props}
		}
	`;
};

export const sc1280 = (props) => {
	return css`
		@media screen and (min-width: 1280px) {
			${props}
		}
	`;
};

export const sc767 = (props) => {
	return css`
		@media screen and (max-width: 767px) {
			${props}
		}
	`;
};

export const min1024 = (props) => {
	return css`
		@media (min-width: 1024px) {
			${props}
		}
	`;
};

export const min1536 = (props) => {
	return css`
		@media (min-width: 1536px) {
			${props}
		}
	`;
};

export const min1280 = (props) => {
	return css`
		@media (min-width: 1280) {
			${props}
		}
	`;
};

export const min768 = (props) => {
	return css`
		@media (min-width: 768px) {
			${props}
		}
	`;
};

export const max767 = (props) => {
	return css`
		@media (max-width: 767px) {
			${props}
		}
	`;
};

export const scmin1440max2000 = (props) => {
	return css`
		@media screen and (min-width: 1440px) and (max-width: 2000px) {
			${props}
		}
	`;
};

export function useWindowSize() {
	const [size, setSize] = useState([0, 0]);
	useLayoutEffect(() => {
		function updateSize() {
			setSize([window.innerWidth, window.innerHeight]);
		}
		window.addEventListener("resize", updateSize);
		updateSize();
		return () => window.removeEventListener("resize", updateSize);
	}, []);
	return size;
}
