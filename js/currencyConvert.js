// Usage: import { formatMoney, moneyFormats } from './currencyConvert';
// Hàm formatMoney sẽ nhận vào 3 tham số: cents, format, currentCurrency. cents là giá tiền hiện tại, format là format của giá tiền, currentCurrency là currency hiện tại.
// Hàm này sẽ convert giá tiền từ USD sang currency hiện tại và format theo format của currency đó.
export function formatMoney(cents, format, currentCurrency) {
	// Set giá trị mặc định cho các tham số nếu không có
	function defaultOption(opt, def) {
		if (typeof opt == "undefined") {
			return def;
		} else {
			return opt;
		}
	}
	// Hàm format giá tiền với delimiters
	function formatWithDelimiters(number, precision, thousands, decimal) {
		precision = defaultOption(precision, 2);
		thousands = defaultOption(thousands, ",");
		decimal = defaultOption(decimal, ".");
		if (isNaN(number) || number == null) {
			return 0;
		}
		number = (number / 100).toFixed(precision);
		var parts = number.split("."),
			dollars = parts[0].replace(
				/(\d)(?=(\d\d\d)+(?!\d))/g,
				"$1" + thousands
			),
			cents = parts[1] ? decimal + parts[1] : "";

		return dollars + cents;
	}
	// Nếu cents là string thì replace dấu "." bằng ""
	if (typeof cents == "string") {
		cents = cents.replace(".", "");
	}
	// Khởi tạo biến value và placeholderRegex
	var value = "",
		placeholderRegex = /\{\{\s*(\w+)\s*\}\}/,
		formatString = format || "${{amount}}",
		decimals = 2;
	// Nếu currency là KWD, BHD, JOD, OMR thì set decimals = 3
	if (
		currentCurrency == "KWD" ||
		currentCurrency == "BHD" ||
		currentCurrency == "JOD" ||
		currentCurrency == "OMR"
	) {
		decimals = 3;
	}

	// Switch case để xử lý các trường hợp format
	switch (formatString.match(placeholderRegex)[1]) {
		case "amount":
		case "amount_no_decimals":
			value = formatWithDelimiters(cents, decimals);
			break;
		case "amount_with_comma_separator":
		case "amount_no_decimals_with_comma_separator":
			value = formatWithDelimiters(cents, decimals, ".", ",");
	}
	// Nếu value không phải là số thì return ""
	if (!isNaN(cents)) {
		return formatString.replace(placeholderRegex, value);
	} else {
		return "";
	}
}

// Các format của tiền tệ
// Thường dùng money_with_currency_format vì đẹp hơn
export const moneyFormats = {
	USD: {
		money_format: "${{amount}}",
		money_with_currency_format: "${{amount}} USD",
	},
	EUR: {
		money_format: "&euro;{{amount}}",
		money_with_currency_format: "&euro;{{amount}} EUR",
	},
	GBP: {
		money_format: "&pound;{{amount}}",
		money_with_currency_format: "&pound;{{amount}} GBP",
	},
	CAD: {
		money_format: "${{amount}}",
		money_with_currency_format: "${{amount}} CAD",
	},
	ALL: {
		money_format: "Lek {{amount}}",
		money_with_currency_format: "Lek {{amount}} ALL",
	},
	DZD: {
		money_format: "DA {{amount}}",
		money_with_currency_format: "DA {{amount}} DZD",
	},
	AOA: {
		money_format: "Kz{{amount}}",
		money_with_currency_format: "Kz{{amount}} AOA",
	},
	ARS: {
		money_format: "${{amount_with_comma_separator}}",
		money_with_currency_format: "${{amount_with_comma_separator}} ARS",
	},
	AMD: {
		money_format: "{{amount}}",
		money_with_currency_format: "{{amount}} AMD",
	},
	AWG: {
		money_format: "Afl{{amount}}",
		money_with_currency_format: "Afl{{amount}} AWG",
	},
	AUD: {
		money_format: "${{amount}}",
		money_with_currency_format: "${{amount}} AUD",
	},
	BBD: {
		money_format: "${{amount}}",
		money_with_currency_format: "${{amount}} Bds",
	},
	AZN: {
		money_format: "&#8380;{{amount}}",
		money_with_currency_format: "&#8380;{{amount}} AZN",
	},
	BDT: {
		money_format: "Tk {{amount}}",
		money_with_currency_format: "Tk {{amount}} BDT",
	},
	BSD: {
		money_format: "BS${{amount}}",
		money_with_currency_format: "BS${{amount}} BSD",
	},
	BHD: {
		money_format: "{{amount}} BD",
		money_with_currency_format: "{{amount}} BHD",
	},
	BYN: {
		money_format: "Br {{amount}}",
		money_with_currency_format: "Br {{amount}} BYN",
	},
	BZD: {
		money_format: "BZ${{amount}}",
		money_with_currency_format: "BZ${{amount}} BZD",
	},
	BTN: {
		money_format: "Nu {{amount}}",
		money_with_currency_format: "Nu {{amount}} BTN",
	},
	BAM: {
		money_format: "KM {{amount_with_comma_separator}}",
		money_with_currency_format: "KM {{amount_with_comma_separator}} BAM",
	},
	BRL: {
		money_format: "R$ {{amount_with_comma_separator}}",
		money_with_currency_format: "R$ {{amount_with_comma_separator}} BRL",
	},
	BOB: {
		money_format: "Bs{{amount_with_comma_separator}}",
		money_with_currency_format: "Bs{{amount_with_comma_separator}} BOB",
	},
	BWP: {
		money_format: "P{{amount}}",
		money_with_currency_format: "P{{amount}} BWP",
	},
	BND: {
		money_format: "${{amount}}",
		money_with_currency_format: "${{amount}} BND",
	},
	BGN: {
		money_format: "{{amount}} лв",
		money_with_currency_format: "{{amount}} лв BGN",
	},
	MMK: {
		money_format: "K{{amount}}",
		money_with_currency_format: "K{{amount}} MMK",
	},
	KHR: {
		money_format: "KHR{{amount}}",
		money_with_currency_format: "KHR{{amount}}",
	},
	KYD: {
		money_format: "${{amount}}",
		money_with_currency_format: "${{amount}} KYD",
	},
	XAF: {
		money_format: "FCFA{{amount}}",
		money_with_currency_format: "FCFA{{amount}} XAF",
	},
	CLP: {
		money_format: "${{amount_no_decimals}}",
		money_with_currency_format: "${{amount_no_decimals}} CLP",
	},
	CNY: {
		money_format: "&#165;{{amount}}",
		money_with_currency_format: "&#165;{{amount}} CNY",
	},
	COP: {
		money_format: "${{amount_with_comma_separator}}",
		money_with_currency_format: "${{amount_with_comma_separator}} COP",
	},
	CRC: {
		money_format: "&#8353; {{amount_with_comma_separator}}",
		money_with_currency_format:
			"&#8353; {{amount_with_comma_separator}} CRC",
	},
	HRK: {
		money_format: "{{amount_with_comma_separator}} kn",
		money_with_currency_format: "{{amount_with_comma_separator}} kn HRK",
	},
	CZK: {
		money_format: "{{amount_with_comma_separator}} K&#269;",
		money_with_currency_format: "{{amount_with_comma_separator}} K&#269;",
	},
	DKK: {
		money_format: "kr {{amount_with_comma_separator}}",
		money_with_currency_format: "kr {{amount_with_comma_separator}} DKK",
	},
	DOP: {
		money_format: "RD$ {{amount}}",
		money_with_currency_format: "RD$ {{amount}}",
	},
	XCD: {
		money_format: "${{amount}}",
		money_with_currency_format: "EC${{amount}}",
	},
	EGP: {
		money_format: "LE {{amount}}",
		money_with_currency_format: "LE {{amount}} EGP",
	},
	ETB: {
		money_format: "Br{{amount}}",
		money_with_currency_format: "Br{{amount}} ETB",
	},
	XPF: {
		money_format: "{{amount_no_decimals_with_comma_separator}} XPF",
		money_with_currency_format:
			"{{amount_no_decimals_with_comma_separator}} XPF",
	},
	FJD: {
		money_format: "${{amount}}",
		money_with_currency_format: "FJ${{amount}}",
	},
	GMD: {
		money_format: "D {{amount}}",
		money_with_currency_format: "D {{amount}} GMD",
	},
	GHS: {
		money_format: "GH&#8373;{{amount}}",
		money_with_currency_format: "GH&#8373;{{amount}}",
	},
	GTQ: {
		money_format: "Q{{amount}}",
		money_with_currency_format: "{{amount}} GTQ",
	},
	GYD: {
		money_format: "G${{amount}}",
		money_with_currency_format: "${{amount}} GYD",
	},
	GEL: {
		money_format: "{{amount}} GEL",
		money_with_currency_format: "{{amount}} GEL",
	},
	HNL: {
		money_format: "L {{amount}}",
		money_with_currency_format: "L {{amount}} HNL",
	},
	HKD: {
		money_format: "HK${{amount}}",
		money_with_currency_format: "HK${{amount}} HKD",
	},
	HUF: {
		money_format: "{{amount_no_decimals_with_comma_separator}} Ft",
		money_with_currency_format:
			"{{amount_no_decimals_with_comma_separator}} Ft HUF",
	},
	ISK: {
		money_format: "{{amount_no_decimals}} kr",
		money_with_currency_format: "{{amount_no_decimals}} kr ISK",
	},
	INR: {
		money_format: "&#8377; {{amount}}",
		money_with_currency_format: "&#8377; {{amount}} INR",
	},
	IDR: {
		money_format: "{{amount_with_comma_separator}} IDR",
		money_with_currency_format: "Rp {{amount_with_comma_separator}} IDR",
	},
	ILS: {
		money_format: "&#8362;{{amount}}",
		money_with_currency_format: "&#8362;{{amount}} NIS",
	},
	JMD: {
		money_format: "${{amount}}",
		money_with_currency_format: "${{amount}} JMD",
	},
	JPY: {
		money_format: "&#165;{{amount_no_decimals}}",
		money_with_currency_format: "&#165;{{amount_no_decimals}} JPY",
	},
	JEP: {
		money_format: "&pound;{{amount}}",
		money_with_currency_format: "&pound;{{amount}} JEP",
	},
	JOD: {
		money_format: "{{amount}} JD",
		money_with_currency_format: "{{amount}} JOD",
	},
	KZT: {
		money_format: "{{amount}} KZT",
		money_with_currency_format: "{{amount}} KZT",
	},
	KES: {
		money_format: "KSh{{amount}}",
		money_with_currency_format: "KSh{{amount}}",
	},
	KWD: {
		money_format: "{{amount}} KD",
		money_with_currency_format: "{{amount}} KWD",
	},
	KGS: {
		money_format: "лв{{amount}}",
		money_with_currency_format: "лв{{amount}}",
	},
	LVL: {
		money_format: "Ls {{amount}}",
		money_with_currency_format: "Ls {{amount}} LVL",
	},
	LBP: {
		money_format: "L.L.{{amount}}",
		money_with_currency_format: "L.L.{{amount}} LBP",
	},
	LTL: {
		money_format: "{{amount}} Lt",
		money_with_currency_format: "{{amount}} Lt",
	},
	MGA: {
		money_format: "Ar {{amount}}",
		money_with_currency_format: "Ar {{amount}} MGA",
	},
	MKD: {
		money_format: "ден {{amount}}",
		money_with_currency_format: "ден {{amount}} MKD",
	},
	MOP: {
		money_format: "MOP${{amount}}",
		money_with_currency_format: "MOP${{amount}}",
	},
	MVR: {
		money_format: "Rf{{amount}}",
		money_with_currency_format: "Rf{{amount}} MVR",
	},
	MXN: {
		money_format: "$ {{amount}}",
		money_with_currency_format: "$ {{amount}} MXN",
	},
	MYR: {
		money_format: "RM{{amount}}",
		money_with_currency_format: "RM{{amount}} MYR",
	},
	MUR: {
		money_format: "Rs {{amount}}",
		money_with_currency_format: "Rs {{amount}} MUR",
	},
	MDL: {
		money_format: "{{amount}} MDL",
		money_with_currency_format: "{{amount}} MDL",
	},
	MAD: {
		money_format: "{{amount}} dh",
		money_with_currency_format: "Dh {{amount}} MAD",
	},
	MNT: {
		money_format: "{{amount_no_decimals}} &#8366",
		money_with_currency_format: "{{amount_no_decimals}} MNT",
	},
	MZN: {
		money_format: "{{amount}} Mt",
		money_with_currency_format: "Mt {{amount}} MZN",
	},
	NAD: {
		money_format: "N${{amount}}",
		money_with_currency_format: "N${{amount}} NAD",
	},
	NPR: {
		money_format: "Rs{{amount}}",
		money_with_currency_format: "Rs{{amount}} NPR",
	},
	ANG: {
		money_format: "&fnof;{{amount}}",
		money_with_currency_format: "{{amount}} NA&fnof;",
	},
	NZD: {
		money_format: "${{amount}}",
		money_with_currency_format: "${{amount}} NZD",
	},
	NIO: {
		money_format: "C${{amount}}",
		money_with_currency_format: "C${{amount}} NIO",
	},
	NGN: {
		money_format: "&#8358;{{amount}}",
		money_with_currency_format: "&#8358;{{amount}} NGN",
	},
	NOK: {
		money_format: "kr {{amount_with_comma_separator}}",
		money_with_currency_format: "kr {{amount_with_comma_separator}} NOK",
	},
	OMR: {
		money_format: "{{amount_with_comma_separator}} OMR",
		money_with_currency_format: "{{amount_with_comma_separator}} OMR",
	},
	PKR: {
		money_format: "Rs.{{amount}}",
		money_with_currency_format: "Rs.{{amount}} PKR",
	},
	PGK: {
		money_format: "K {{amount}}",
		money_with_currency_format: "K {{amount}} PGK",
	},
	PYG: {
		money_format: "Gs. {{amount_no_decimals_with_comma_separator}}",
		money_with_currency_format:
			"Gs. {{amount_no_decimals_with_comma_separator}} PYG",
	},
	PEN: {
		money_format: "S/. {{amount}}",
		money_with_currency_format: "S/. {{amount}} PEN",
	},
	PHP: {
		money_format: "&#8369;{{amount}}",
		money_with_currency_format: "&#8369;{{amount}} PHP",
	},
	PLN: {
		money_format: "{{amount_with_comma_separator}} zl",
		money_with_currency_format: "{{amount_with_comma_separator}} zl PLN",
	},
	QAR: {
		money_format: "QAR {{amount_with_comma_separator}}",
		money_with_currency_format: "QAR {{amount_with_comma_separator}}",
	},
	RON: {
		money_format: "{{amount_with_comma_separator}} lei",
		money_with_currency_format: "{{amount_with_comma_separator}} lei RON",
	},
	RUB: {
		money_format: "&#8381; {{amount_with_comma_separator}}",
		money_with_currency_format:
			"&#8381; {{amount_with_comma_separator}} RUB",
	},
	/*RUB: { money_format: "&#1088;&#1091;&#1073;{{amount_with_comma_separator}}", money_with_currency_format: "&#1088;&#1091;&#1073;{{amount_with_comma_separator}} RUB" }, */
	RWF: {
		money_format: "{{amount_no_decimals}} RF",
		money_with_currency_format: "{{amount_no_decimals}} RWF",
	},
	WST: {
		money_format: "WS$ {{amount}}",
		money_with_currency_format: "WS$ {{amount}} WST",
	},
	SAR: {
		money_format: "{{amount}} SR",
		money_with_currency_format: "{{amount}} SAR",
	},
	STD: {
		money_format: "Db {{amount}}",
		money_with_currency_format: "Db {{amount}} STD",
	},
	RSD: {
		money_format: "{{amount}} RSD",
		money_with_currency_format: "{{amount}} RSD",
	},
	SCR: {
		money_format: "Rs {{amount}}",
		money_with_currency_format: "Rs {{amount}} SCR",
	},
	SGD: {
		money_format: "S${{amount}}",
		money_with_currency_format: "S${{amount}} SGD",
	},
	SYP: {
		money_format: "S&pound;{{amount}}",
		money_with_currency_format: "S&pound;{{amount}} SYP",
	},
	ZAR: {
		money_format: "R {{amount}}",
		money_with_currency_format: "R {{amount}} ZAR",
	},
	KRW: {
		money_format: "&#8361;{{amount_no_decimals}}",
		money_with_currency_format: "&#8361;{{amount_no_decimals}} KRW",
	},
	LKR: {
		money_format: "Rs {{amount}}",
		money_with_currency_format: "Rs {{amount}} LKR",
	},
	SEK: {
		money_format: "kr {{amount_with_comma_separator}}",
		money_with_currency_format: "kr {{amount_with_comma_separator}} SEK",
	},
	CHF: {
		money_format: "{{amount}} CHF",
		money_with_currency_format: "{{amount}} CHF",
	},
	TWD: {
		money_format: "${{amount}}",
		money_with_currency_format: "${{amount}} TWD",
	},
	THB: {
		money_format: "{{amount}} &#xe3f;",
		money_with_currency_format: "{{amount}} &#xe3f; THB",
	},
	TZS: {
		money_format: "{{amount}} TZS",
		money_with_currency_format: "{{amount}} TZS",
	},
	TTD: {
		money_format: "${{amount}}",
		money_with_currency_format: "${{amount}} TTD",
	},
	TND: {
		money_format: "{{amount}}",
		money_with_currency_format: "{{amount}} DT",
	},
	TRY: {
		money_format: "{{amount}} TL",
		money_with_currency_format: "{{amount}} TL",
	},
	UGX: {
		money_format: "Ush {{amount_no_decimals}}",
		money_with_currency_format: "Ush {{amount_no_decimals}} UGX",
	},
	UAH: {
		money_format: "₴{{amount}}",
		money_with_currency_format: "₴{{amount}} UAH",
	},
	AED: {
		money_format: "{{amount}} د.إ",
		money_with_currency_format: "{{amount}} د.إ AED",
	},
	UYU: {
		money_format: "${{amount_with_comma_separator}}",
		money_with_currency_format: "${{amount_with_comma_separator}} UYU",
	},
	VUV: {
		money_format: "${{amount}}",
		money_with_currency_format: "${{amount}}VT",
	},
	VEF: {
		money_format: "Bs. {{amount_with_comma_separator}}",
		money_with_currency_format: "Bs. {{amount_with_comma_separator}} VEF",
	},
	VND: {
		money_format: "{{amount_no_decimals_with_comma_separator}}&#8363;",
		money_with_currency_format:
			"{{amount_no_decimals_with_comma_separator}} VND",
	},
	BTC: {
		money_format: "{{amount_no_decimals}} BTC",
		money_with_currency_format: "{{amount_no_decimals}} BTC",
	},
	XOF: {
		money_format: "CFA{{amount}}",
		money_with_currency_format: "CFA{{amount}} XOF",
	},
	ZMW: {
		money_format: "K{{amount_no_decimals_with_comma_separator}}",
		money_with_currency_format:
			"ZMW{{amount_no_decimals_with_comma_separator}}",
	},
	AFN: {
		money_format: "&#65;&#102; {{amount}}",
		money_with_currency_format: "&#65;&#102; {{amount}} AFN",
	},
	BMD: {
		money_format: "&#36; {{amount}}",
		money_with_currency_format: "&#36; {{amount}} BMD",
	},
	BIF: {
		money_format: "&#70;&#66;&#117; {{amount}}",
		money_with_currency_format: "&#70;&#66;&#117; {{amount}} BIF",
	},
	CVE: {
		money_format: "&#36; {{amount}}",
		money_with_currency_format: "&#36; {{amount}} CVE",
	},
	KMF: {
		money_format: "&#67;&#70; {{amount}}",
		money_with_currency_format: "&#67;&#70; {{amount}} KMF",
	},
	CDF: {
		money_format: "&#70;&#67; {{amount}}",
		money_with_currency_format: "&#70;&#67; {{amount}} CDF",
	},
	CUC: {
		money_format: "{{amount}}",
		money_with_currency_format: "{{amount}} CUC",
	},
	CUP: {
		money_format: "{{amount}}",
		money_with_currency_format: "{{amount}} CUP",
	},
	DJF: {
		money_format: "&#70;&#100;&#106; {{amount}}",
		money_with_currency_format: "&#70;&#100;&#106; {{amount}} DJF",
	},
	ERN: {
		money_format: "{{amount}}",
		money_with_currency_format: "{{amount}} ERN",
	},
	EEK: {
		money_format: "{{amount}}",
		money_with_currency_format: "{{amount}} EEK",
	},
	FKP: {
		money_format: "&#163; {{amount}}",
		money_with_currency_format: "&#163; {{amount}} FKP",
	},
	GIP: {
		money_format: "&#163; {{amount}}",
		money_with_currency_format: "&#163; {{amount}} GIP",
	},
	XAU: {
		money_format: "{{amount}}",
		money_with_currency_format: "{{amount}} XAU",
	},
	GGP: {
		money_format: "{{amount}}",
		money_with_currency_format: "{{amount}} GGP",
	},
	GNF: {
		money_format: "&#70;&#71; {{amount}}",
		money_with_currency_format: "&#70;&#71; {{amount}} GNF",
	},
	HTG: {
		money_format: "&#71; {{amount}}",
		money_with_currency_format: "&#71; {{amount}} HTG",
	},
	XDR: {
		money_format: "{{amount}}",
		money_with_currency_format: "{{amount}} XDR",
	},
	IRR: {
		money_format: "&#65020; {{amount}}",
		money_with_currency_format: "&#65020; {{amount}} IRR",
	},
	IQD: {
		money_format: "&#1593;.&#1583; {{amount}}",
		money_with_currency_format: "&#1593;.&#1583; {{amount}} IQD",
	},
	IMP: {
		money_format: "{{amount}}",
		money_with_currency_format: "{{amount}} IMP",
	},
	LAK: {
		money_format: "&#8365; {{amount}}",
		money_with_currency_format: "&#8365; {{amount}} LAK",
	},
	LSL: {
		money_format: "&#76; {{amount}}",
		money_with_currency_format: "&#76; {{amount}} LSL",
	},
	LRD: {
		money_format: "&#36; {{amount}}",
		money_with_currency_format: "&#36; {{amount}} LRD",
	},
	LYD: {
		money_format: "&#1604;.&#1583; {{amount}}",
		money_with_currency_format: "&#1604;.&#1583; {{amount}} LYD",
	},
	MWK: {
		money_format: "&#77;&#75; {{amount}}",
		money_with_currency_format: "&#77;&#75; {{amount}} MWK",
	},
	MRO: {
		money_format: "&#85;&#77; {{amount}}",
		money_with_currency_format: "&#85;&#77; {{amount}} MRO",
	},
	KPW: {
		money_format: "&#8361; {{amount}}",
		money_with_currency_format: "&#8361; {{amount}} KPW",
	},
	XPD: {
		money_format: "{{amount}}",
		money_with_currency_format: "{{amount}} XPD",
	},
	PAB: {
		money_format: "&#66;&#47;&#46; {{amount}}",
		money_with_currency_format: "&#66;&#47;&#46; {{amount}} PAB",
	},
	XPT: {
		money_format: "{{amount}}",
		money_with_currency_format: "{{amount}} XPT",
	},
	SHP: {
		money_format: "&#163; {{amount}}",
		money_with_currency_format: "&#163; {{amount}} SHP",
	},
	SVC: {
		money_format: "&#36; {{amount}}",
		money_with_currency_format: "&#36; {{amount}} SVC",
	},
	SPL: {
		money_format: "{{amount}}",
		money_with_currency_format: "{{amount}} SPL",
	},
	SLL: {
		money_format: "&#76;&#101; {{amount}}",
		money_with_currency_format: "&#76;&#101; {{amount}} SLL",
	},
	XAG: {
		money_format: "{{amount}}",
		money_with_currency_format: "{{amount}} XAG",
	},
	SKK: {
		money_format: "{{amount}}",
		money_with_currency_format: "{{amount}} SKK",
	},
	SBD: {
		money_format: "&#36; {{amount}}",
		money_with_currency_format: "&#36; {{amount}} SBD",
	},
	SOS: {
		money_format: "&#83; {{amount}}",
		money_with_currency_format: "&#83; {{amount}} SOS",
	},
	SDG: {
		money_format: "&#163; {{amount}}",
		money_with_currency_format: "&#163; {{amount}} SDG",
	},
	SRD: {
		money_format: "&#36; {{amount}}",
		money_with_currency_format: "&#36; {{amount}} SRD",
	},
	SZL: {
		money_format: "&#76; {{amount}}",
		money_with_currency_format: "&#76; {{amount}} SZL",
	},
	TJS: {
		money_format: "&#84;&#74;&#83; {{amount}}",
		money_with_currency_format: "&#84;&#74;&#83; {{amount}} TJS",
	},
	TOP: {
		money_format: "&#84;&#36; {{amount}}",
		money_with_currency_format: "&#84;&#36; {{amount}} TOP",
	},
	TMT: {
		money_format: "&#109; {{amount}}",
		money_with_currency_format: "&#109; {{amount}} TMT",
	},
	TVD: {
		money_format: "{{amount}}",
		money_with_currency_format: "{{amount}} TVD",
	},
	UZS: {
		money_format: "&#1083;&#1074; {{amount}}",
		money_with_currency_format: "&#1083;&#1074; {{amount}} UZS",
	},
	YER: {
		money_format: "&#65020; {{amount}}",
		money_with_currency_format: "&#65020; {{amount}} YER",
	},
	ZWD: {
		money_format: "{{amount}}",
		money_with_currency_format: "{{amount}} ZWD",
	},
};
