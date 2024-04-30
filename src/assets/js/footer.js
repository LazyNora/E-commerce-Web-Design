// (function () {
// 	var __webpack_modules__ = {
// 			3578: function (
// 				module,
// 				__unused_webpack_exports,
// 				__webpack_require__2
// 			) {
// 				var QueryHandler = __webpack_require__2(3745),
// 					each = __webpack_require__2(2178).each;
// 				function MediaQuery(query, isUnconditional) {
// 					(this.query = query),
// 						(this.isUnconditional = isUnconditional),
// 						(this.handlers = []),
// 						(this.mql = window.matchMedia(query));
// 					var self = this;
// 					(this.listener = function (mql) {
// 						(self.mql = mql.currentTarget || mql), self.assess();
// 					}),
// 						this.mql.addListener(this.listener);
// 				}
// 				(MediaQuery.prototype = {
// 					constuctor: MediaQuery,
// 					addHandler: function (handler) {
// 						var qh = new QueryHandler(handler);
// 						this.handlers.push(qh), this.matches() && qh.on();
// 					},
// 					removeHandler: function (handler) {
// 						var handlers = this.handlers;
// 						each(handlers, function (h, i) {
// 							if (h.equals(handler))
// 								return h.destroy(), !handlers.splice(i, 1);
// 						});
// 					},
// 					matches: function () {
// 						return this.mql.matches || this.isUnconditional;
// 					},
// 					clear: function () {
// 						each(this.handlers, function (handler) {
// 							handler.destroy();
// 						}),
// 							this.mql.removeListener(this.listener),
// 							(this.handlers.length = 0);
// 					},
// 					assess: function () {
// 						var action = this.matches() ? "on" : "off";
// 						each(this.handlers, function (handler) {
// 							handler[action]();
// 						});
// 					},
// 				}),
// 					(module.exports = MediaQuery);
// 			},
// 			6779: function (
// 				module,
// 				__unused_webpack_exports,
// 				__webpack_require__2
// 			) {
// 				var MediaQuery = __webpack_require__2(3578),
// 					Util = __webpack_require__2(2178),
// 					each = Util.each,
// 					isFunction = Util.isFunction,
// 					isArray = Util.isArray;
// 				function MediaQueryDispatch() {
// 					if (!window.matchMedia)
// 						throw new Error(
// 							"matchMedia not present, legacy browsers require a polyfill"
// 						);
// 					(this.queries = {}),
// 						(this.browserIsIncapable =
// 							!window.matchMedia("only all").matches);
// 				}
// 				(MediaQueryDispatch.prototype = {
// 					constructor: MediaQueryDispatch,
// 					register: function (q, options, shouldDegrade) {
// 						var queries = this.queries,
// 							isUnconditional =
// 								shouldDegrade && this.browserIsIncapable;
// 						return (
// 							queries[q] ||
// 								(queries[q] = new MediaQuery(
// 									q,
// 									isUnconditional
// 								)),
// 							isFunction(options) &&
// 								(options = { match: options }),
// 							isArray(options) || (options = [options]),
// 							each(options, function (handler) {
// 								isFunction(handler) &&
// 									(handler = { match: handler }),
// 									queries[q].addHandler(handler);
// 							}),
// 							this
// 						);
// 					},
// 					unregister: function (q, handler) {
// 						var query = this.queries[q];
// 						return (
// 							query &&
// 								(handler
// 									? query.removeHandler(handler)
// 									: (query.clear(), delete this.queries[q])),
// 							this
// 						);
// 					},
// 				}),
// 					(module.exports = MediaQueryDispatch);
// 			},
// 			3745: function (module) {
// 				function QueryHandler(options) {
// 					(this.options = options),
// 						!options.deferSetup && this.setup();
// 				}
// 				(QueryHandler.prototype = {
// 					constructor: QueryHandler,
// 					setup: function () {
// 						this.options.setup && this.options.setup(),
// 							(this.initialised = !0);
// 					},
// 					on: function () {
// 						!this.initialised && this.setup(),
// 							this.options.match && this.options.match();
// 					},
// 					off: function () {
// 						this.options.unmatch && this.options.unmatch();
// 					},
// 					destroy: function () {
// 						this.options.destroy
// 							? this.options.destroy()
// 							: this.off();
// 					},
// 					equals: function (target) {
// 						return (
// 							this.options === target ||
// 							this.options.match === target
// 						);
// 					},
// 				}),
// 					(module.exports = QueryHandler);
// 			},
// 			2178: function (module) {
// 				function each(collection, fn) {
// 					var i = 0,
// 						length = collection.length,
// 						cont;
// 					for (
// 						i;
// 						i < length &&
// 						((cont = fn(collection[i], i)), cont !== !1);
// 						i++
// 					);
// 				}
// 				function isArray(target) {
// 					return (
// 						Object.prototype.toString.apply(target) ===
// 						"[object Array]"
// 					);
// 				}
// 				function isFunction(target) {
// 					return typeof target == "function";
// 				}
// 				module.exports = { isFunction, isArray, each };
// 			},
// 			1179: function (
// 				module,
// 				__unused_webpack_exports,
// 				__webpack_require__2
// 			) {
// 				var MediaQueryDispatch = __webpack_require__2(6779);
// 				module.exports = new MediaQueryDispatch();
// 			},
// 		},
// 		__webpack_module_cache__ = {};
// 	function __webpack_require__(moduleId) {
// 		var cachedModule = __webpack_module_cache__[moduleId];
// 		if (cachedModule !== void 0) return cachedModule.exports;
// 		var module = (__webpack_module_cache__[moduleId] = { exports: {} });
// 		return (
// 			__webpack_modules__[moduleId](
// 				module,
// 				module.exports,
// 				__webpack_require__
// 			),
// 			module.exports
// 		);
// 	}
// 	(function () {
// 		__webpack_require__.n = function (module) {
// 			var getter =
// 				module && module.__esModule
// 					? function () {
// 							return module.default;
// 					  }
// 					: function () {
// 							return module;
// 					  };
// 			return __webpack_require__.d(getter, { a: getter }), getter;
// 		};
// 	})(),
// 		(function () {
// 			__webpack_require__.d = function (exports, definition) {
// 				for (var key in definition)
// 					__webpack_require__.o(definition, key) &&
// 						!__webpack_require__.o(exports, key) &&
// 						Object.defineProperty(exports, key, {
// 							enumerable: !0,
// 							get: definition[key],
// 						});
// 			};
// 		})(),
// 		(function () {
// 			__webpack_require__.o = function (obj, prop) {
// 				return Object.prototype.hasOwnProperty.call(obj, prop);
// 			};
// 		})();
// 	var __webpack_exports__ = {};
// 	(function () {
// 		"use strict";
// 		var SECTION_ID_ATTR = "data-section-id";
// 		function Section(container, properties) {
// 			(this.container = validateContainerElement(container)),
// 				(this.id = container.getAttribute(SECTION_ID_ATTR)),
// 				(this.extensions = []),
// 				Object.assign(this, validatePropertiesObject(properties)),
// 				this.onLoad();
// 		}
// 		Section.prototype = {
// 			onLoad: Function.prototype,
// 			onUnload: Function.prototype,
// 			onSelect: Function.prototype,
// 			onDeselect: Function.prototype,
// 			onBlockSelect: Function.prototype,
// 			onBlockDeselect: Function.prototype,
// 			extend: function (extension) {
// 				this.extensions.push(extension);
// 				var extensionClone = Object.assign({}, extension);
// 				delete extensionClone.init,
// 					Object.assign(this, extensionClone),
// 					typeof extension.init == "function" &&
// 						extension.init.apply(this);
// 			},
// 		};
// 		function validateContainerElement(container) {
// 			if (!(container instanceof Element))
// 				throw new TypeError(
// 					"Theme Sections: Attempted to load section. The section container provided is not a DOM element."
// 				);
// 			if (container.getAttribute(SECTION_ID_ATTR) === null)
// 				throw new Error(
// 					"Theme Sections: The section container provided does not have an id assigned to the " +
// 						SECTION_ID_ATTR +
// 						" attribute."
// 				);
// 			return container;
// 		}
// 		function validatePropertiesObject(value) {
// 			if (
// 				(typeof value < "u" && typeof value != "object") ||
// 				value === null
// 			)
// 				throw new TypeError(
// 					"Theme Sections: The properties object provided is not a valid"
// 				);
// 			return value;
// 		}
// 		typeof Object.assign != "function" &&
// 			Object.defineProperty(Object, "assign", {
// 				value: function (target) {
// 					"use strict";
// 					if (target == null)
// 						throw new TypeError(
// 							"Cannot convert undefined or null to object"
// 						);
// 					for (
// 						var to = Object(target), index = 1;
// 						index < arguments.length;
// 						index++
// 					) {
// 						var nextSource = arguments[index];
// 						if (nextSource != null)
// 							for (var nextKey in nextSource)
// 								Object.prototype.hasOwnProperty.call(
// 									nextSource,
// 									nextKey
// 								) && (to[nextKey] = nextSource[nextKey]);
// 					}
// 					return to;
// 				},
// 				writable: !0,
// 				configurable: !0,
// 			});
// 		var SECTION_TYPE_ATTR = "data-section-type",
// 			theme_sections_SECTION_ID_ATTR = "data-section-id";
// 		(window.Shopify = window.Shopify || {}),
// 			(window.Shopify.theme = window.Shopify.theme || {}),
// 			(window.Shopify.theme.sections =
// 				window.Shopify.theme.sections || {});
// 		var registered = (window.Shopify.theme.sections.registered =
// 				window.Shopify.theme.sections.registered || {}),
// 			instances = (window.Shopify.theme.sections.instances =
// 				window.Shopify.theme.sections.instances || []);
// 		function register(type, properties) {
// 			if (typeof type != "string")
// 				throw new TypeError(
// 					"Theme Sections: The first argument for .register must be a string that specifies the type of the section being registered"
// 				);
// 			if (typeof registered[type] < "u")
// 				throw new Error(
// 					'Theme Sections: A section of type "' +
// 						type +
// 						'" has already been registered. You cannot register the same section type twice'
// 				);
// 			function TypedSection(container) {
// 				Section.call(this, container, properties);
// 			}
// 			return (
// 				(TypedSection.constructor = Section),
// 				(TypedSection.prototype = Object.create(Section.prototype)),
// 				(TypedSection.prototype.type = type),
// 				(registered[type] = TypedSection)
// 			);
// 		}
// 		function unregister(types) {
// 			(types = normalizeType(types)),
// 				types.forEach(function (type) {
// 					delete registered[type];
// 				});
// 		}
// 		function load(types, containers) {
// 			(types = normalizeType(types)),
// 				typeof containers > "u" &&
// 					(containers = document.querySelectorAll(
// 						"[" + SECTION_TYPE_ATTR + "]"
// 					)),
// 				(containers = normalizeContainers(containers)),
// 				types.forEach(function (type) {
// 					var TypedSection = registered[type];
// 					typeof TypedSection > "u" ||
// 						(containers = containers.filter(function (container) {
// 							return isInstance(container) ||
// 								container.getAttribute(SECTION_TYPE_ATTR) ===
// 									null
// 								? !1
// 								: container.getAttribute(SECTION_TYPE_ATTR) !==
// 								  type
// 								? !0
// 								: (instances.push(new TypedSection(container)),
// 								  !1);
// 						}));
// 				});
// 		}
// 		function unload(selector) {
// 			var instancesToUnload = getInstances(selector);
// 			instancesToUnload.forEach(function (instance) {
// 				var index = instances
// 					.map(function (e) {
// 						return e.id;
// 					})
// 					.indexOf(instance.id);
// 				instances.splice(index, 1), instance.onUnload();
// 			});
// 		}
// 		function extend(selector, extension) {
// 			var instancesToExtend = getInstances(selector);
// 			instancesToExtend.forEach(function (instance) {
// 				instance.extend(extension);
// 			});
// 		}
// 		function getInstances(selector) {
// 			var filteredInstances = [];
// 			if (
// 				NodeList.prototype.isPrototypeOf(selector) ||
// 				Array.isArray(selector)
// 			)
// 				var firstElement = selector[0];
// 			if (
// 				selector instanceof Element ||
// 				firstElement instanceof Element
// 			) {
// 				var containers = normalizeContainers(selector);
// 				containers.forEach(function (container) {
// 					filteredInstances = filteredInstances.concat(
// 						instances.filter(function (instance) {
// 							return instance.container === container;
// 						})
// 					);
// 				});
// 			} else if (
// 				typeof selector == "string" ||
// 				typeof firstElement == "string"
// 			) {
// 				var types = normalizeType(selector);
// 				types.forEach(function (type) {
// 					filteredInstances = filteredInstances.concat(
// 						instances.filter(function (instance) {
// 							return instance.type === type;
// 						})
// 					);
// 				});
// 			}
// 			return filteredInstances;
// 		}
// 		function getInstanceById(id) {
// 			for (var instance, i = 0; i < instances.length; i++)
// 				if (instances[i].id === id) {
// 					instance = instances[i];
// 					break;
// 				}
// 			return instance;
// 		}
// 		function isInstance(selector) {
// 			return getInstances(selector).length > 0;
// 		}
// 		function normalizeType(types) {
// 			return (
// 				types === "*"
// 					? (types = Object.keys(registered))
// 					: typeof types == "string"
// 					? (types = [types])
// 					: types.constructor === Section
// 					? (types = [types.prototype.type])
// 					: Array.isArray(types) &&
// 					  types[0].constructor === Section &&
// 					  (types = types.map(function (TypedSection) {
// 							return TypedSection.prototype.type;
// 					  })),
// 				(types = types.map(function (type) {
// 					return type.toLowerCase();
// 				})),
// 				types
// 			);
// 		}
// 		function normalizeContainers(containers) {
// 			return (
// 				NodeList.prototype.isPrototypeOf(containers) &&
// 				containers.length > 0
// 					? (containers = Array.prototype.slice.call(containers))
// 					: NodeList.prototype.isPrototypeOf(containers) &&
// 					  containers.length === 0
// 					? (containers = [])
// 					: containers === null
// 					? (containers = [])
// 					: !Array.isArray(containers) &&
// 					  containers instanceof Element &&
// 					  (containers = [containers]),
// 				containers
// 			);
// 		}
// 		window.Shopify.designMode &&
// 			(document.addEventListener(
// 				"shopify:section:load",
// 				function (event) {
// 					var id = event.detail.sectionId,
// 						container = event.target.querySelector(
// 							"[" +
// 								theme_sections_SECTION_ID_ATTR +
// 								'="' +
// 								id +
// 								'"]'
// 						);
// 					container !== null &&
// 						load(
// 							container.getAttribute(SECTION_TYPE_ATTR),
// 							container
// 						);
// 				}
// 			),
// 			document.addEventListener(
// 				"shopify:section:unload",
// 				function (event) {
// 					var id = event.detail.sectionId,
// 						container = event.target.querySelector(
// 							"[" +
// 								theme_sections_SECTION_ID_ATTR +
// 								'="' +
// 								id +
// 								'"]'
// 						),
// 						instance = getInstances(container)[0];
// 					typeof instance == "object" && unload(container);
// 				}
// 			),
// 			document.addEventListener(
// 				"shopify:section:select",
// 				function (event) {
// 					var instance = getInstanceById(event.detail.sectionId);
// 					typeof instance == "object" && instance.onSelect(event);
// 				}
// 			),
// 			document.addEventListener(
// 				"shopify:section:deselect",
// 				function (event) {
// 					var instance = getInstanceById(event.detail.sectionId);
// 					typeof instance == "object" && instance.onDeselect(event);
// 				}
// 			),
// 			document.addEventListener("shopify:block:select", function (event) {
// 				var instance = getInstanceById(event.detail.sectionId);
// 				typeof instance == "object" && instance.onBlockSelect(event);
// 			}),
// 			document.addEventListener(
// 				"shopify:block:deselect",
// 				function (event) {
// 					var instance = getInstanceById(event.detail.sectionId);
// 					typeof instance == "object" &&
// 						instance.onBlockDeselect(event);
// 				}
// 			));
// 		function _defineProperty(obj, key, value) {
// 			return (
// 				key in obj
// 					? Object.defineProperty(obj, key, {
// 							value,
// 							enumerable: !0,
// 							configurable: !0,
// 							writable: !0,
// 					  })
// 					: (obj[key] = value),
// 				obj
// 			);
// 		}
// 		function debounce(fn) {
// 			var _this = this;
// 			let wait =
// 					arguments.length > 1 && arguments[1] !== void 0
// 						? arguments[1]
// 						: 300,
// 				t;
// 			return function () {
// 				for (
// 					var _len = arguments.length,
// 						args = new Array(_len),
// 						_key = 0;
// 					_key < _len;
// 					_key++
// 				)
// 					args[_key] = arguments[_key];
// 				clearTimeout(t),
// 					(t = setTimeout(() => fn.apply(_this, args), wait));
// 			};
// 		}
// 		const addEventDelegate = (_ref) => {
// 			let {
// 				context = document.documentElement,
// 				event = "click",
// 				selector,
// 				handler,
// 				capture = !1,
// 			} = _ref;
// 			const listener = function (e) {
// 				for (
// 					let target = e.target;
// 					target && target !== this;
// 					target = target.parentNode
// 				)
// 					if (target.matches(selector)) {
// 						handler.call(target, e, target);
// 						break;
// 					}
// 			};
// 			return (
// 				context.addEventListener(event, listener, capture),
// 				() => {
// 					context.removeEventListener(event, listener, capture);
// 				}
// 			);
// 		};
// 		class events_Event {
// 			constructor() {
// 				this.events = {};
// 			}
// 			get evts() {
// 				return Object.keys(this.events);
// 			}
// 			subscribe(event, handler) {
// 				return (
// 					(this.events[event] = this.events[event] || []),
// 					this.events[event].push(handler),
// 					() => this.unSubscribe(event, handler)
// 				);
// 			}
// 			unSubscribe(event, handler) {
// 				const handlers = this.events[event];
// 				if (handlers && Array.isArray(handlers)) {
// 					for (let i = 0; i < handlers.length; i++)
// 						if (handlers[i] === handler) {
// 							handlers.splice(i, 1);
// 							break;
// 						}
// 				}
// 			}
// 			emit(event) {
// 				for (
// 					var _len = arguments.length,
// 						args = new Array(_len > 1 ? _len - 1 : 0),
// 						_key = 1;
// 					_key < _len;
// 					_key++
// 				)
// 					args[_key - 1] = arguments[_key];
// 				console.groupCollapsed(`Event emitted: ${event}`),
// 					console.trace(),
// 					console.groupEnd(),
// 					(this.events[event] || []).forEach((handler) => {
// 						handler(...args);
// 					});
// 			}
// 		}
// 		class Accordion {
// 			constructor(container) {
// 				let options =
// 					arguments.length > 1 && arguments[1] !== void 0
// 						? arguments[1]
// 						: this.defaultOptions;
// 				_defineProperty(this, "defaultOptions", {
// 					presetContentHeight: !1,
// 					duration: 300,
// 					callback: () => {},
// 				}),
// 					_defineProperty(this, "selectors", {
// 						items: [".accordion-item"],
// 						buttons: [".accordion-button"],
// 						contents: [".accordion-content"],
// 					}),
// 					_defineProperty(this, "openClass", "open"),
// 					_defineProperty(this, "initClass", "acc-initialized"),
// 					_defineProperty(this, "removeEvents", null),
// 					_defineProperty(this, "destroy", () => {
// 						this.removeEvents(),
// 							window.removeEventListener(
// 								"resize",
// 								this.debouncedSetContentHeight
// 							);
// 					}),
// 					_defineProperty(this, "setContentOpacity", () => {
// 						this.domNodes.contents.forEach(
// 							(cont) => (cont.style.opacity = 1)
// 						);
// 					}),
// 					_defineProperty(this, "setItemOverflowState", () => {
// 						var _this$domNodes, _this$domNodes$items;
// 						(_this$domNodes = this.domNodes) === null ||
// 							_this$domNodes === void 0 ||
// 							(_this$domNodes$items = _this$domNodes.items) ===
// 								null ||
// 							_this$domNodes$items === void 0 ||
// 							_this$domNodes$items.forEach((item, index) => {
// 								var _this$domNodes2,
// 									_this$domNodes2$conte,
// 									_item$classList,
// 									_item$classList$conta,
// 									_contents$classList,
// 									_contents$classList$m;
// 								let contents =
// 									(_this$domNodes2 = this.domNodes) ===
// 										null ||
// 									_this$domNodes2 === void 0 ||
// 									(_this$domNodes2$conte =
// 										_this$domNodes2.contents) === null ||
// 									_this$domNodes2$conte === void 0
// 										? void 0
// 										: _this$domNodes2$conte[index];
// 								const method =
// 									item != null &&
// 									(_item$classList = item.classList) !==
// 										null &&
// 									_item$classList !== void 0 &&
// 									(_item$classList$conta =
// 										_item$classList.contains) !== null &&
// 									_item$classList$conta !== void 0 &&
// 									_item$classList$conta.call(
// 										_item$classList,
// 										this.openClass
// 									)
// 										? "remove"
// 										: "add";
// 								contents == null ||
// 									(_contents$classList =
// 										contents.classList) === null ||
// 									_contents$classList === void 0 ||
// 									(_contents$classList$m =
// 										_contents$classList[method]) === null ||
// 									_contents$classList$m === void 0 ||
// 									_contents$classList$m.call(
// 										_contents$classList,
// 										"overflow-hidden"
// 									);
// 							});
// 					}),
// 					_defineProperty(this, "setContentHeight", () => {
// 						this.domNodes = queryDomNodes(
// 							this.selectors,
// 							this.container
// 						);
// 						const { items, contents } = this.domNodes;
// 						items.forEach((item, index) => {
// 							var _contents$index2, _contents$index2$clas;
// 							if (
// 								item != null &&
// 								item.classList.contains(this.openClass)
// 							) {
// 								var _item$style, _contents$index, _item$style2;
// 								item == null ||
// 									(_item$style = item.style) === null ||
// 									_item$style === void 0 ||
// 									_item$style.setProperty(
// 										"--content-max-height",
// 										"auto"
// 									);
// 								const maxHeight =
// 									contents == null ||
// 									(_contents$index = contents[index]) ===
// 										null ||
// 									_contents$index === void 0
// 										? void 0
// 										: _contents$index.scrollHeight;
// 								item == null ||
// 									(_item$style2 = item.style) === null ||
// 									_item$style2 === void 0 ||
// 									_item$style2.setProperty(
// 										"--content-max-height",
// 										`${maxHeight}px`
// 									);
// 							} else {
// 								var _item$style3;
// 								item == null ||
// 									(_item$style3 = item.style) === null ||
// 									_item$style3 === void 0 ||
// 									_item$style3.setProperty(
// 										"--content-max-height",
// 										0
// 									);
// 							}
// 							contents == null ||
// 								(_contents$index2 = contents[index]) === null ||
// 								_contents$index2 === void 0 ||
// 								(_contents$index2$clas =
// 									_contents$index2.classList) === null ||
// 								_contents$index2$clas === void 0 ||
// 								_contents$index2$clas.add("max-height-set");
// 						}),
// 							this.setItemOverflowState(),
// 							this.setContentOpacity();
// 					}),
// 					_defineProperty(this, "toggle", (index) => {
// 						var _this$domNodes3,
// 							_this$domNodes3$items,
// 							_this$domNodes4,
// 							_this$domNodes4$conte,
// 							_accItem$classList,
// 							_accItem$classList2,
// 							_this$domNodes5,
// 							_this$domNodes5$conte,
// 							_this$domNodes5$conte2;
// 						const accItem =
// 								(_this$domNodes3 = this.domNodes) === null ||
// 								_this$domNodes3 === void 0 ||
// 								(_this$domNodes3$items =
// 									_this$domNodes3.items) === null ||
// 								_this$domNodes3$items === void 0
// 									? void 0
// 									: _this$domNodes3$items[index],
// 							accContent =
// 								(_this$domNodes4 = this.domNodes) === null ||
// 								_this$domNodes4 === void 0 ||
// 								(_this$domNodes4$conte =
// 									_this$domNodes4.contents) === null ||
// 								_this$domNodes4$conte === void 0
// 									? void 0
// 									: _this$domNodes4$conte[index],
// 							isOpen =
// 								accItem == null ||
// 								(_accItem$classList = accItem.classList) ===
// 									null ||
// 								_accItem$classList === void 0
// 									? void 0
// 									: _accItem$classList.contains(
// 											this.openClass
// 									  );
// 						accItem == null ||
// 							(_accItem$classList2 = accItem.classList) ===
// 								null ||
// 							_accItem$classList2 === void 0 ||
// 							_accItem$classList2.toggle(this.openClass);
// 						const maxHeight = isOpen
// 							? 0
// 							: (_this$domNodes5 = this.domNodes) === null ||
// 							  _this$domNodes5 === void 0 ||
// 							  (_this$domNodes5$conte =
// 									_this$domNodes5.contents) === null ||
// 							  _this$domNodes5$conte === void 0 ||
// 							  (_this$domNodes5$conte2 =
// 									_this$domNodes5$conte[index]) === null ||
// 							  _this$domNodes5$conte2 === void 0
// 							? void 0
// 							: _this$domNodes5$conte2.scrollHeight;
// 						if (
// 							(accItem?.style.setProperty(
// 								"--content-max-height",
// 								`${maxHeight}px`
// 							),
// 							isOpen)
// 						) {
// 							var _accContent$classList;
// 							accContent == null ||
// 								(_accContent$classList =
// 									accContent.classList) === null ||
// 								_accContent$classList === void 0 ||
// 								_accContent$classList.add("overflow-hidden");
// 						} else
// 							setTimeout(() => {
// 								var _accContent$classList2;
// 								accContent == null ||
// 									(_accContent$classList2 =
// 										accContent.classList) === null ||
// 									_accContent$classList2 === void 0 ||
// 									_accContent$classList2.remove(
// 										"overflow-hidden"
// 									);
// 							}, 350);
// 					}),
// 					!(
// 						!container ||
// 						container.classList.contains(this.initClass)
// 					) &&
// 						((this.container = container),
// 						(this.domNodes = queryDomNodes(
// 							this.selectors,
// 							this.container
// 						)),
// 						(this.options = Object.assign(
// 							{},
// 							this.defaultOptions,
// 							options
// 						)),
// 						(this.debouncedSetContentHeight = debounce(
// 							this.setContentHeight.bind(this),
// 							300
// 						)),
// 						this.init());
// 			}
// 			init() {
// 				var _this$container, _this$container$style;
// 				(_this$container = this.container) === null ||
// 					_this$container === void 0 ||
// 					(_this$container$style = _this$container.style) === null ||
// 					_this$container$style === void 0 ||
// 					_this$container$style.setProperty(
// 						"--duration",
// 						` ${this.options.duration}ms`
// 					),
// 					(this.removeEvents = addEventDelegate({
// 						context: this.container,
// 						selector: this.selectors.buttons[0],
// 						handler: (e, btn) => {
// 							btn.classList.add("pointer-events-none");
// 							const index = this.domNodes.buttons.indexOf(btn);
// 							this.toggle(index),
// 								setTimeout(() => {
// 									btn.classList.remove("pointer-events-none");
// 								}, 350);
// 						},
// 					})),
// 					this.options.presetContentHeight
// 						? window.requestAnimationFrame(this.setContentHeight)
// 						: (this.setItemOverflowState(),
// 						  this.setContentOpacity()),
// 					window.addEventListener(
// 						"resize",
// 						this.debouncedSetContentHeight
// 					),
// 					typeof this.options.callback == "function" &&
// 						this.options.callback(),
// 					this.container.classList.add(this.initClass);
// 			}
// 		}
// 		function initCustomSelect(container) {
// 			let x, i, j, l, ll, selElmnt, a, b, c, ar, at;
// 			if (
// 				((x = container.getElementsByClassName("custom-select")),
// 				(l = x.length),
// 				x.length > 0)
// 			)
// 				for (i = 0; i < l; i++) {
// 					var _selElmnt$options$sel;
// 					for (
// 						selElmnt = x[i].getElementsByTagName("select")[0],
// 							x[i].innerHTML = "",
// 							x[i].appendChild(selElmnt),
// 							ll = selElmnt.length,
// 							a = document.createElement("DIV"),
// 							a.setAttribute("class", "select-selected"),
// 							at = document.createElement("SPAN"),
// 							at.innerHTML =
// 								(_selElmnt$options$sel =
// 									selElmnt.options[
// 										selElmnt.selectedIndex
// 									]) === null ||
// 								_selElmnt$options$sel === void 0
// 									? void 0
// 									: _selElmnt$options$sel.innerHTML,
// 							x[i].appendChild(a),
// 							a.appendChild(at),
// 							ar = document.createElement("SPAN"),
// 							ar.innerHTML =
// 								'<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M441.9 167.3l-19.8-19.8c-4.7-4.7-12.3-4.7-17 0L224 328.2 42.9 147.5c-4.7-4.7-12.3-4.7-17 0L6.1 167.3c-4.7 4.7-4.7 12.3 0 17l209.4 209.4c4.7 4.7 12.3 4.7 17 0l209.4-209.4c4.7-4.7 4.7-12.3 0-17z"/></svg>',
// 							ar.setAttribute("class", "select-arrow"),
// 							a.appendChild(ar),
// 							b = document.createElement("DIV"),
// 							b.setAttribute("class", "select-items select-hide"),
// 							j = 0;
// 						j < ll;
// 						j++
// 					)
// 						(c = document.createElement("DIV")),
// 							(c.innerHTML = selElmnt.options[j].innerHTML),
// 							selElmnt.options[j].getAttribute("selected") &&
// 								c.setAttribute("class", "same-as-selected"),
// 							c.addEventListener("click", function (e) {
// 								let y, i2, k, s, h, sl, yl;
// 								for (
// 									s =
// 										this.parentNode.parentNode.getElementsByTagName(
// 											"select"
// 										)[0],
// 										sl = s.length,
// 										h = this.parentNode.previousSibling,
// 										i2 = 0;
// 									i2 < sl;
// 									i2++
// 								)
// 									if (
// 										s.options[i2].innerHTML ==
// 										this.innerHTML
// 									) {
// 										for (
// 											s.selectedIndex = i2,
// 												h.childNodes[0].innerHTML =
// 													this.innerHTML,
// 												y =
// 													this.parentNode.getElementsByClassName(
// 														"same-as-selected"
// 													),
// 												yl = y.length,
// 												k = 0;
// 											k < yl;
// 											k++
// 										)
// 											y[k].removeAttribute("class");
// 										this.setAttribute(
// 											"class",
// 											"same-as-selected"
// 										);
// 										break;
// 									}
// 								s.dispatchEvent(new Event("change")),
// 									s.dispatchEvent(new Event("click")),
// 									h.click();
// 							}),
// 							b.appendChild(c);
// 					x[i].appendChild(b),
// 						a.addEventListener("click", function (e) {
// 							e.stopPropagation(),
// 								closeAllSelect(this),
// 								this.nextSibling.classList.toggle(
// 									"select-hide"
// 								),
// 								this.classList.toggle("select-arrow-active");
// 						});
// 				}
// 		}
// 		function closeAllSelect(elmnt) {
// 			var x,
// 				y,
// 				i,
// 				xl,
// 				yl,
// 				arrNo = [];
// 			for (
// 				x = document.getElementsByClassName("select-items"),
// 					y = document.getElementsByClassName("select-selected"),
// 					xl = x.length,
// 					yl = y.length,
// 					i = 0;
// 				i < yl;
// 				i++
// 			)
// 				elmnt == y[i]
// 					? arrNo.push(i)
// 					: y[i].classList.remove("select-arrow-active");
// 			for (i = 0; i < xl; i++)
// 				arrNo.indexOf(i) && x[i].classList.add("select-hide");
// 		}
// 		document.addEventListener("click", closeAllSelect);
// 		var src = __webpack_require__(1179),
// 			src_default = __webpack_require__.n(src);
// 		register("footer", {
// 			onLoad: function () {
// 				src_default().register("screen and (max-width: 767px)", {
// 					match: () => {
// 						var _this$container;
// 						const mobileAccordion =
// 							this === null ||
// 							this === void 0 ||
// 							(_this$container = this.container) === null ||
// 							_this$container === void 0
// 								? void 0
// 								: _this$container.querySelector(
// 										".footer_accordion"
// 								  );
// 						mobileAccordion &&
// 							(this.acc = new Accordion(mobileAccordion, {
// 								presetContentHeight: !0,
// 							}));
// 					},
// 				}),
// 					initCustomSelect(this.container);
// 			},
// 		}),
// 			load("footer");
// 	})();
// })();
// //# sourceMappingURL=/cdn/shop/t/13/assets/footer.js.map?v=4685485400641924001710399461
