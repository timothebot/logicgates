import {
  __commonJS,
  __publicField,
  __toESM
} from "./chunk-EQCVQC35.js";

// node_modules/picocolors/picocolors.browser.js
var require_picocolors_browser = __commonJS({
  "node_modules/picocolors/picocolors.browser.js"(exports, module) {
    var x = String;
    var create = function() {
      return { isColorSupported: false, reset: x, bold: x, dim: x, italic: x, underline: x, inverse: x, hidden: x, strikethrough: x, black: x, red: x, green: x, yellow: x, blue: x, magenta: x, cyan: x, white: x, gray: x, bgBlack: x, bgRed: x, bgGreen: x, bgYellow: x, bgBlue: x, bgMagenta: x, bgCyan: x, bgWhite: x, blackBright: x, redBright: x, greenBright: x, yellowBright: x, blueBright: x, magentaBright: x, cyanBright: x, whiteBright: x, bgBlackBright: x, bgRedBright: x, bgGreenBright: x, bgYellowBright: x, bgBlueBright: x, bgMagentaBright: x, bgCyanBright: x, bgWhiteBright: x };
    };
    module.exports = create();
    module.exports.createColors = create;
  }
});

// node_modules/date-fns/toDate.mjs
function toDate(argument) {
  const argStr = Object.prototype.toString.call(argument);
  if (argument instanceof Date || typeof argument === "object" && argStr === "[object Date]") {
    return new argument.constructor(+argument);
  } else if (typeof argument === "number" || argStr === "[object Number]" || typeof argument === "string" || argStr === "[object String]") {
    return new Date(argument);
  } else {
    return /* @__PURE__ */ new Date(NaN);
  }
}

// node_modules/date-fns/_lib/addLeadingZeros.mjs
function addLeadingZeros(number, targetLength) {
  const sign = number < 0 ? "-" : "";
  const output = Math.abs(number).toString().padStart(targetLength, "0");
  return sign + output;
}

// node_modules/date-fns/formatISO.mjs
function formatISO(date, options) {
  const _date = toDate(date);
  if (isNaN(_date.getTime())) {
    throw new RangeError("Invalid time value");
  }
  const format2 = (options == null ? void 0 : options.format) ?? "extended";
  const representation = (options == null ? void 0 : options.representation) ?? "complete";
  let result = "";
  let tzOffset = "";
  const dateDelimiter = format2 === "extended" ? "-" : "";
  const timeDelimiter = format2 === "extended" ? ":" : "";
  if (representation !== "time") {
    const day = addLeadingZeros(_date.getDate(), 2);
    const month = addLeadingZeros(_date.getMonth() + 1, 2);
    const year = addLeadingZeros(_date.getFullYear(), 4);
    result = `${year}${dateDelimiter}${month}${dateDelimiter}${day}`;
  }
  if (representation !== "date") {
    const offset = _date.getTimezoneOffset();
    if (offset !== 0) {
      const absoluteOffset = Math.abs(offset);
      const hourOffset = addLeadingZeros(Math.trunc(absoluteOffset / 60), 2);
      const minuteOffset = addLeadingZeros(absoluteOffset % 60, 2);
      const sign = offset < 0 ? "+" : "-";
      tzOffset = `${sign}${hourOffset}:${minuteOffset}`;
    } else {
      tzOffset = "Z";
    }
    const hour = addLeadingZeros(_date.getHours(), 2);
    const minute = addLeadingZeros(_date.getMinutes(), 2);
    const second = addLeadingZeros(_date.getSeconds(), 2);
    const separator = result === "" ? "" : "T";
    const time = [hour, minute, second].join(timeDelimiter);
    result = `${result}${separator}${time}${tzOffset}`;
  }
  return result;
}

// node_modules/adze/dist/tools.js
var Tools = class {
  constructor(globalStore) {
    /**
     * Reference to the global store.
     */
    __publicField(this, "globalStore");
    this.globalStore = globalStore;
  }
  /**
   * Clears the console.
   */
  clear() {
    console.clear();
  }
  /**
   * Rerenders all logs that match the label filter.
   */
  filterByLabel(label) {
    const logs = filterByLabel(label, this.globalStore.cache);
    logs.forEach((log) => {
      render(log);
    });
  }
  /**
   * Rerenders all logs that match the namespace filter.
   */
  filterByNamespace(...namespace) {
    const logs = filterByNamespace(namespace, this.globalStore.cache);
    logs.forEach((log) => {
      render(log);
    });
  }
  /**
   * Rerenders all logs that match the level selector.
   */
  filterByLevel(level) {
    const logs = filterByLevel(level, this.globalStore.cache);
    logs.forEach((log) => {
      render(log);
    });
  }
  /**
   * Rerenders all logs that have been cached.
   */
  renderAll() {
    this.globalStore.cache.forEach((log) => {
      render(log);
    });
  }
};

// node_modules/adze/dist/adze-global.js
var AdzeGlobal = class {
  constructor(configuration = {}) {
    /**
     * Global Adze configuration overrides.
     */
    __publicField(this, "config");
    /**
     * Incrementing ID counter for identifying logs.
     */
    __publicField(this, "pidCounter", 1);
    /**
     * All log labels.
     */
    __publicField(this, "labels", /* @__PURE__ */ new Map());
    /**
     * Counter for incrementing listener IDs.
     */
    __publicField(this, "_listenerCounter", 0);
    /**
     * Map of log levels to log listeners
     */
    __publicField(this, "_levelsToListeners", /* @__PURE__ */ new Map());
    /**
     * Cache of logs that have been terminated.
     */
    __publicField(this, "_cache", []);
    this.config = configuration;
  }
  /**
   * Returns the cache of logs that have been terminated.
   */
  get cache() {
    return this._cache;
  }
  /**
   * Get the global Adze configuration overrides.
   */
  get configuration() {
    return this.config;
  }
  /**
   * Get the next process ID.
   */
  get pid() {
    const current = this.pidCounter;
    this.pidCounter++;
    return current;
  }
  /**
   * Tools for rerendering and filtering cached logs.
   */
  get tools() {
    return new Tools(this);
  }
  /**
   * Adds a log to the log cache.
   */
  addLogToCache(log) {
    if (this._cache.length < (this.config.cacheSize ?? 300)) {
      this._cache.push(log);
    }
  }
  /**
   * Clears the log cache.
   */
  clearCache() {
    this._cache = [];
  }
  /**
   * Get a label by name.
   */
  getLabel(name) {
    return this.labels.get(name);
  }
  /**
   * Sets a new label or overwrites an existing one.
   */
  setLabel(name, label) {
    this.labels.set(name, label);
  }
  /**
   * Adds a log listener that will be called after a log has been terminated.
   */
  addListener(levels2, listener) {
    const id = this._listenerCounter += 1;
    const normalizedLevels = normalizeLevelSelector({ ...defaultConfiguration.levels, ...this.config.levels ?? {} }, levels2);
    normalizedLevels.forEach((level) => {
      if (this._levelsToListeners.has(level)) {
        const levelContainer = this._levelsToListeners.get(level);
        levelContainer.set(id, listener);
      } else {
        this._levelsToListeners.set(level, /* @__PURE__ */ new Map([[id, listener]]));
      }
    });
    return id;
  }
  /**
   * Removes a log listener by its ID.
   */
  removeListener(id) {
    this._levelsToListeners.forEach((levelContainer) => {
      levelContainer.delete(id);
    });
  }
  /**
   * Returns an array of log listener callback functions.
   */
  getListeners(level) {
    var _a;
    return Array.from(((_a = this._levelsToListeners.get(level)) == null ? void 0 : _a.values()) ?? []);
  }
};

// node_modules/adze/dist/functions/global.js
function setup(cfg) {
  const store = globalThis.$adzeGlobal;
  if (isGlobalInitialized(store)) {
    return store;
  }
  const globalCtxt = new AdzeGlobal(cfg);
  globalThis.$adzeGlobal = globalCtxt;
  return globalCtxt;
}
function teardown() {
  if (isGlobalInitialized(globalThis.$adzeGlobal)) {
    delete globalThis.$adzeGlobal;
  }
}
function isGlobalInitialized(global) {
  return global instanceof AdzeGlobal;
}
function isBrowser() {
  return typeof window !== "undefined" && typeof window.location !== "undefined" && typeof window.navigator.userAgent !== "undefined" && !isDeno();
}
function isDeno() {
  return typeof Deno !== "undefined";
}
function envIsWindow(_) {
  return isBrowser();
}
function isTestEnvironment() {
  let urlAdzeEnvTest = false;
  if (isBrowser()) {
    const urlParams = new URLSearchParams(globalThis.location.search);
    urlAdzeEnvTest = urlParams.get("ADZE_ENV") === "test";
  }
  return globalThis.$ADZE_ENV === "test" || urlAdzeEnvTest;
}
function isFirefox() {
  const _glbl = globalThis;
  if (envIsWindow(_glbl)) {
    return _glbl.navigator.userAgent.includes("Firefox");
  }
  return false;
}

// node_modules/adze/dist/functions/type-guards.js
function isString(value) {
  return Object.prototype.toString.call(value) === "[object String]";
}
function isNumber(value) {
  return value !== null && typeof value === "number" && !isNaN(Number(value));
}
function isMethodWithArgs(value) {
  return methodsWithArgs.includes(value);
}
function isSpecialMethod(value) {
  return specialMethods.includes(value);
}
function isSpecialMethodWithLeader(value) {
  return specialMethodsWithArgsAndLeader.includes(value);
}
function isStringArray(value) {
  return value.every((v) => isString(v));
}
function isRange(value) {
  return Array.isArray(value) && value.length === 3 && value[1] === "-";
}

// node_modules/adze/dist/functions/data.js
function stacktrace() {
  var _a;
  return (_a = Error().stack) == null ? void 0 : _a.replace(/^Error\n/, "\n");
}
function getActiveLevel(cfg) {
  if (isNumber(cfg.activeLevel))
    return cfg.activeLevel;
  return cfg.levels[cfg.activeLevel].level;
}

// node_modules/adze/dist/functions/picocolors-loader.js
var _picocolors = __toESM(require_picocolors_browser(), 1);
var picocolors = _picocolors.default ?? _picocolors;

// node_modules/adze/dist/functions/util.js
function initialCaps(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function allLevels(levels2) {
  return Object.values(levels2).map((level) => level.level);
}
function makeRange(allLevels2, start, end) {
  return allLevels2.filter((level) => level >= start && level <= end);
}
function addPadding(str, withEmoji = false, emoji) {
  const len = withEmoji && emoji ? 9 + emoji.length : 9;
  const diff = len - str.length;
  let padded = str;
  for (let i = 0; i <= diff; i += 1) {
    padded += " ";
  }
  return padded;
}
function applyStyles(str, styles) {
  return styles.reduce((acc, style) => {
    return picocolors[style](acc);
  }, str);
}
function render(log) {
  if (log.data) {
    console[log.data.method](...log.data.message);
  }
}
function cleanMessage(message2) {
  return message2.filter((msg) => msg !== "");
}
function isObject(val) {
  return typeof val === "object" && val !== null;
}

// node_modules/adze/dist/functions/filters.js
function normalizeLevelSelector(levels2, selector) {
  if (selector === "*")
    return Object.values(levels2).map((lvl) => lvl.level);
  if (isString(selector)) {
    return [levels2[selector].level];
  }
  if (isNumber(selector))
    return [selector];
  if (isRange(selector)) {
    if (isStringArray(selector)) {
      const start = levels2[selector[0]].level;
      const end = levels2[selector[2]].level;
      return makeRange(allLevels(levels2), start, end);
    }
    return makeRange(allLevels(levels2), selector[0], selector[2]);
  }
  if (Array.isArray(selector) && isStringArray(selector)) {
    return selector.map((f) => levels2[f].level);
  }
  return selector;
}
function failsLevelSelector(type, levels2, level) {
  if (levels2.length === 0)
    return false;
  return type === "include" ? !levels2.includes(level) : levels2.includes(level);
}
function isNotIncluded(source, values) {
  if (source.length === 0)
    return false;
  if (source.length > 0 && values.length === 0)
    return true;
  return !values.map((v) => source.includes(v)).includes(true);
}
function isExcluded(source, values) {
  if (source.length === 0)
    return false;
  if (source.length > 0 && values.length === 0)
    return true;
  return values.map((v) => source.includes(v)).includes(true);
}
function filterByLabel(label, logs) {
  return logs.filter((log) => {
    var _a, _b;
    return ((_b = (_a = log.data) == null ? void 0 : _a.label) == null ? void 0 : _b.name) === label;
  });
}
function filterByNamespace(namespace, logs) {
  return logs.filter((log) => {
    var _a;
    if ((_a = log.data) == null ? void 0 : _a.namespace) {
      const isMatched = log.data.namespace.map((ns) => namespace.includes(ns)).includes(true);
      return isMatched;
    }
    return false;
  });
}
function filterByLevel(level, logs) {
  return logs.filter((log) => {
    var _a;
    const levels2 = normalizeLevelSelector(log.configuration.levels, level);
    if (((_a = log.data) == null ? void 0 : _a.level) === void 0)
      return false;
    return failsLevelSelector("exclude", levels2, log.data.level);
  });
}

// node_modules/adze/dist/functions/formatters.js
function formatNamespace(ns) {
  if (ns && ns.length > 0) {
    return ns.reduce((acc, name) => `${acc}#${name} `, "");
  }
  return "";
}
function formatLabel(lbl) {
  return lbl ? `[${lbl.name}] ` : "";
}
function formatCount(count) {
  return count !== void 0 ? `(Count: ${count}) ` : "";
}
function formatAssert(expression, withEmoji) {
  return expression !== void 0 && !expression ? `${withEmoji ? "❌ " : ""}Assertion failed:` : "";
}
function formatIf(expression, withEmoji) {
  return expression !== void 0 && expression ? `${withEmoji ? "✅ " : ""}Expression passed:` : "";
}

// node_modules/@ungap/structured-clone/esm/types.js
var VOID = -1;
var PRIMITIVE = 0;
var ARRAY = 1;
var OBJECT = 2;
var DATE = 3;
var REGEXP = 4;
var MAP = 5;
var SET = 6;
var ERROR = 7;
var BIGINT = 8;

// node_modules/@ungap/structured-clone/esm/deserialize.js
var env = typeof self === "object" ? self : globalThis;
var deserializer = ($, _) => {
  const as = (out, index) => {
    $.set(index, out);
    return out;
  };
  const unpair = (index) => {
    if ($.has(index))
      return $.get(index);
    const [type, value] = _[index];
    switch (type) {
      case PRIMITIVE:
      case VOID:
        return as(value, index);
      case ARRAY: {
        const arr = as([], index);
        for (const index2 of value)
          arr.push(unpair(index2));
        return arr;
      }
      case OBJECT: {
        const object = as({}, index);
        for (const [key, index2] of value)
          object[unpair(key)] = unpair(index2);
        return object;
      }
      case DATE:
        return as(new Date(value), index);
      case REGEXP: {
        const { source, flags } = value;
        return as(new RegExp(source, flags), index);
      }
      case MAP: {
        const map = as(/* @__PURE__ */ new Map(), index);
        for (const [key, index2] of value)
          map.set(unpair(key), unpair(index2));
        return map;
      }
      case SET: {
        const set = as(/* @__PURE__ */ new Set(), index);
        for (const index2 of value)
          set.add(unpair(index2));
        return set;
      }
      case ERROR: {
        const { name, message: message2 } = value;
        return as(new env[name](message2), index);
      }
      case BIGINT:
        return as(BigInt(value), index);
      case "BigInt":
        return as(Object(BigInt(value)), index);
    }
    return as(new env[type](value), index);
  };
  return unpair;
};
var deserialize = (serialized) => deserializer(/* @__PURE__ */ new Map(), serialized)(0);

// node_modules/@ungap/structured-clone/esm/serialize.js
var EMPTY = "";
var { toString } = {};
var { keys } = Object;
var typeOf = (value) => {
  const type = typeof value;
  if (type !== "object" || !value)
    return [PRIMITIVE, type];
  const asString = toString.call(value).slice(8, -1);
  switch (asString) {
    case "Array":
      return [ARRAY, EMPTY];
    case "Object":
      return [OBJECT, EMPTY];
    case "Date":
      return [DATE, EMPTY];
    case "RegExp":
      return [REGEXP, EMPTY];
    case "Map":
      return [MAP, EMPTY];
    case "Set":
      return [SET, EMPTY];
  }
  if (asString.includes("Array"))
    return [ARRAY, asString];
  if (asString.includes("Error"))
    return [ERROR, asString];
  return [OBJECT, asString];
};
var shouldSkip = ([TYPE, type]) => TYPE === PRIMITIVE && (type === "function" || type === "symbol");
var serializer = (strict, json, $, _) => {
  const as = (out, value) => {
    const index = _.push(out) - 1;
    $.set(value, index);
    return index;
  };
  const pair = (value) => {
    if ($.has(value))
      return $.get(value);
    let [TYPE, type] = typeOf(value);
    switch (TYPE) {
      case PRIMITIVE: {
        let entry = value;
        switch (type) {
          case "bigint":
            TYPE = BIGINT;
            entry = value.toString();
            break;
          case "function":
          case "symbol":
            if (strict)
              throw new TypeError("unable to serialize " + type);
            entry = null;
            break;
          case "undefined":
            return as([VOID], value);
        }
        return as([TYPE, entry], value);
      }
      case ARRAY: {
        if (type)
          return as([type, [...value]], value);
        const arr = [];
        const index = as([TYPE, arr], value);
        for (const entry of value)
          arr.push(pair(entry));
        return index;
      }
      case OBJECT: {
        if (type) {
          switch (type) {
            case "BigInt":
              return as([type, value.toString()], value);
            case "Boolean":
            case "Number":
            case "String":
              return as([type, value.valueOf()], value);
          }
        }
        if (json && "toJSON" in value)
          return pair(value.toJSON());
        const entries = [];
        const index = as([TYPE, entries], value);
        for (const key of keys(value)) {
          if (strict || !shouldSkip(typeOf(value[key])))
            entries.push([pair(key), pair(value[key])]);
        }
        return index;
      }
      case DATE:
        return as([TYPE, value.toISOString()], value);
      case REGEXP: {
        const { source, flags } = value;
        return as([TYPE, { source, flags }], value);
      }
      case MAP: {
        const entries = [];
        const index = as([TYPE, entries], value);
        for (const [key, entry] of value) {
          if (strict || !(shouldSkip(typeOf(key)) || shouldSkip(typeOf(entry))))
            entries.push([pair(key), pair(entry)]);
        }
        return index;
      }
      case SET: {
        const entries = [];
        const index = as([TYPE, entries], value);
        for (const entry of value) {
          if (strict || !shouldSkip(typeOf(entry)))
            entries.push(pair(entry));
        }
        return index;
      }
    }
    const { message: message2 } = value;
    return as([TYPE, { name: type, message: message2 }], value);
  };
  return pair;
};
var serialize = (value, { json, lossy } = {}) => {
  const _ = [];
  return serializer(!(json || lossy), !!json, /* @__PURE__ */ new Map(), _)(value), _;
};

// node_modules/@ungap/structured-clone/esm/index.js
var esm_default = typeof structuredClone === "function" ? (
  /* c8 ignore start */
  (any, options) => options && ("json" in options || "lossy" in options) ? deserialize(serialize(any, options)) : structuredClone(any)
) : (any, options) => deserialize(serialize(any, options));

// node_modules/adze/dist/functions/seal.js
function SealedLog(Base, cfg, mods, modifierQueue) {
  const { formatters: formatters2, middleware = [], ...cfgWithoutFormatters } = cfg.exportValues();
  const sealing = class Sealing extends Base {
    constructor() {
      super(...arguments);
      __publicField(this, "_cfg", new Configuration({
        ...esm_default(cfgWithoutFormatters),
        formatters: { ...formatters2 },
        middleware: [...middleware]
      }));
      __publicField(this, "_modifierData", esm_default(mods));
      __publicField(this, "modifierQueue", [...modifierQueue]);
    }
  };
  const sealed = sealing;
  return sealed;
}

// node_modules/adze/dist/functions/time.js
function formatTime([sec, nano]) {
  return `${sec}s ${nano / 1e6}ms`;
}
function captureTimeNow() {
  return formatTime(hrtime());
}
function hrtime(prev) {
  const time = performance.now() * 1e-3;
  const seconds = Math.floor(time);
  const nanoseconds = Math.floor(time % 1 * 1e9);
  if (prev === void 0) {
    return [seconds, nanoseconds];
  }
  let secondsDiff = seconds - prev[0];
  let nanosecondsDiff = nanoseconds - prev[1];
  if (nanosecondsDiff < 0) {
    secondsDiff -= 1;
    nanosecondsDiff += 1e9;
  }
  return [secondsDiff, nanosecondsDiff];
}

// node_modules/adze/dist/formatters/formatter.js
var Formatter = class {
  constructor(cfg, level) {
    /**
     * The configuration for the adze log.
     */
    __publicField(this, "cfg");
    /**
     * The log level configuration.
     */
    __publicField(this, "level");
    /**
     * The default timestamp formatter. Override this to customize for your own formatter.
     */
    __publicField(this, "timestampFormatFunction", (date) => formatISO(date));
    this.cfg = cfg;
    this.level = level;
  }
  /**
   * Returns the timestamp formatter override function or the timestamp formatter function from
   * this formatter instance.
   */
  get timestampFormatter() {
    return this.cfg.timestampFormatter ? this.cfg.timestampFormatter : this.timestampFormatFunction;
  }
  /**
   * Entry point to printing logs.
   */
  print(mods, timestamp, args) {
    if (this.level.level > getActiveLevel(this.cfg))
      return [];
    if (this.failsFilters(mods))
      return [];
    if (mods.assertion === true)
      return [];
    if (mods.if === false)
      return [];
    if (mods.method && !isSpecialMethodWithLeader(mods.method)) {
      if (isSpecialMethod(mods.method) && isMethodWithArgs(mods.method))
        return args;
    }
    const message2 = isBrowser() ? this.formatBrowser(mods, timestamp, args) : this.formatServer(mods, timestamp, args);
    if (mods.stacktrace)
      message2.push(mods.stacktrace);
    return message2;
  }
  failsFilters(mods) {
    if (this.failsLevelSelector())
      return true;
    if (this.failsNamespacesFilter(mods))
      return true;
    if (this.failsLabelsFilter(mods))
      return true;
    return false;
  }
  /**
   * Validate that if a level filter is set the log passes the filter.
   */
  failsLevelSelector() {
    var _a;
    if (((_a = this.cfg.filters) == null ? void 0 : _a.levels) === void 0)
      return false;
    const normalizedLevelSelector = normalizeLevelSelector(this.cfg.levels, this.cfg.filters.levels.values);
    if (failsLevelSelector(this.cfg.filters.levels.type, normalizedLevelSelector, this.level.level))
      return true;
    return false;
  }
  /**
   * Validate that if a namespaces filter is set the log passes the filter.
   */
  failsNamespacesFilter(mods) {
    var _a;
    if (((_a = this.cfg.filters) == null ? void 0 : _a.namespaces) === void 0)
      return false;
    if (this.cfg.filters.namespaces.values.length > 0 && mods.namespace === void 0)
      return true;
    if (this.cfg.filters.namespaces.type === "include") {
      const namespaces2 = mods.namespace ?? [];
      return isNotIncluded(this.cfg.filters.namespaces.values, namespaces2);
    }
    const namespaces = mods.namespace ?? [];
    return isExcluded(this.cfg.filters.namespaces.values, namespaces);
  }
  /**
   * Validate that if a labels filter is set the log passes the filter.
   */
  failsLabelsFilter(mods) {
    var _a;
    if (((_a = this.cfg.filters) == null ? void 0 : _a.labels) === void 0)
      return false;
    if (this.cfg.filters.labels.values.length > 0 && mods.label === void 0)
      return true;
    const label = mods.label ? [mods.label.name] : [];
    if (this.cfg.filters.labels.type === "include") {
      return isNotIncluded(this.cfg.filters.labels.values, label);
    }
    return isExcluded(this.cfg.filters.labels.values, label);
  }
};

// node_modules/date-fns/locale/en-US/_lib/formatDistance.mjs
var formatDistanceLocale = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
};
var formatDistance = (token, count, options) => {
  let result;
  const tokenValue = formatDistanceLocale[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }
  if (options == null ? void 0 : options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "in " + result;
    } else {
      return result + " ago";
    }
  }
  return result;
};

// node_modules/date-fns/locale/_lib/buildFormatLongFn.mjs
function buildFormatLongFn(args) {
  return (options = {}) => {
    const width = options.width ? String(options.width) : args.defaultWidth;
    const format2 = args.formats[width] || args.formats[args.defaultWidth];
    return format2;
  };
}

// node_modules/date-fns/locale/en-US/_lib/formatLong.mjs
var dateFormats = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
};
var timeFormats = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
var dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong = {
  date: buildFormatLongFn({
    formats: dateFormats,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats,
    defaultWidth: "full"
  })
};

// node_modules/date-fns/locale/en-US/_lib/formatRelative.mjs
var formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
};
var formatRelative = (token, _date, _baseDate, _options) => formatRelativeLocale[token];

// node_modules/date-fns/locale/_lib/buildLocalizeFn.mjs
function buildLocalizeFn(args) {
  return (value, options) => {
    const context = (options == null ? void 0 : options.context) ? String(options.context) : "standalone";
    let valuesArray;
    if (context === "formatting" && args.formattingValues) {
      const defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      const width = (options == null ? void 0 : options.width) ? String(options.width) : defaultWidth;
      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      const defaultWidth = args.defaultWidth;
      const width = (options == null ? void 0 : options.width) ? String(options.width) : args.defaultWidth;
      valuesArray = args.values[width] || args.values[defaultWidth];
    }
    const index = args.argumentCallback ? args.argumentCallback(value) : value;
    return valuesArray[index];
  };
}

// node_modules/date-fns/locale/en-US/_lib/localize.mjs
var eraValues = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
};
var quarterValues = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
};
var monthValues = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
};
var dayValues = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
};
var dayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
};
var ordinalNumber = (dirtyNumber, _options) => {
  const number = Number(dirtyNumber);
  const rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + "st";
      case 2:
        return number + "nd";
      case 3:
        return number + "rd";
    }
  }
  return number + "th";
};
var localize = {
  ordinalNumber,
  era: buildLocalizeFn({
    values: eraValues,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1
  }),
  month: buildLocalizeFn({
    values: monthValues,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: "wide"
  })
};

// node_modules/date-fns/locale/_lib/buildMatchFn.mjs
function buildMatchFn(args) {
  return (string, options = {}) => {
    const width = options.width;
    const matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
    const matchResult = string.match(matchPattern);
    if (!matchResult) {
      return null;
    }
    const matchedString = matchResult[0];
    const parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
    const key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, (pattern) => pattern.test(matchedString)) : (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      findKey(parsePatterns, (pattern) => pattern.test(matchedString))
    );
    let value;
    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback ? (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      options.valueCallback(value)
    ) : value;
    const rest = string.slice(matchedString.length);
    return { value, rest };
  };
}
function findKey(object, predicate) {
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key) && predicate(object[key])) {
      return key;
    }
  }
  return void 0;
}
function findIndex(array, predicate) {
  for (let key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
  return void 0;
}

// node_modules/date-fns/locale/_lib/buildMatchPatternFn.mjs
function buildMatchPatternFn(args) {
  return (string, options = {}) => {
    const matchResult = string.match(args.matchPattern);
    if (!matchResult) return null;
    const matchedString = matchResult[0];
    const parseResult = string.match(args.parsePattern);
    if (!parseResult) return null;
    let value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
    value = options.valueCallback ? options.valueCallback(value) : value;
    const rest = string.slice(matchedString.length);
    return { value, rest };
  };
}

// node_modules/date-fns/locale/en-US/_lib/match.mjs
var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
};
var parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};
var parseMonthPatterns = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
};
var matchDayPatterns = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};
var parseDayPatterns = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};
var matchDayPeriodPatterns = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
};
var match = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: (value) => parseInt(value, 10)
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: "any"
  })
};

// node_modules/date-fns/locale/en-US.mjs
var enUS = {
  code: "en-US",
  formatDistance,
  formatLong,
  formatRelative,
  localize,
  match,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};

// node_modules/date-fns/_lib/defaultOptions.mjs
var defaultOptions = {};
function getDefaultOptions() {
  return defaultOptions;
}

// node_modules/date-fns/constants.mjs
var daysInYear = 365.2425;
var maxTime = Math.pow(10, 8) * 24 * 60 * 60 * 1e3;
var minTime = -maxTime;
var millisecondsInWeek = 6048e5;
var millisecondsInDay = 864e5;
var secondsInHour = 3600;
var secondsInDay = secondsInHour * 24;
var secondsInWeek = secondsInDay * 7;
var secondsInYear = secondsInDay * daysInYear;
var secondsInMonth = secondsInYear / 12;
var secondsInQuarter = secondsInMonth * 3;

// node_modules/date-fns/startOfDay.mjs
function startOfDay(date) {
  const _date = toDate(date);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.mjs
function getTimezoneOffsetInMilliseconds(date) {
  const _date = toDate(date);
  const utcDate = new Date(
    Date.UTC(
      _date.getFullYear(),
      _date.getMonth(),
      _date.getDate(),
      _date.getHours(),
      _date.getMinutes(),
      _date.getSeconds(),
      _date.getMilliseconds()
    )
  );
  utcDate.setUTCFullYear(_date.getFullYear());
  return +date - +utcDate;
}

// node_modules/date-fns/differenceInCalendarDays.mjs
function differenceInCalendarDays(dateLeft, dateRight) {
  const startOfDayLeft = startOfDay(dateLeft);
  const startOfDayRight = startOfDay(dateRight);
  const timestampLeft = +startOfDayLeft - getTimezoneOffsetInMilliseconds(startOfDayLeft);
  const timestampRight = +startOfDayRight - getTimezoneOffsetInMilliseconds(startOfDayRight);
  return Math.round((timestampLeft - timestampRight) / millisecondsInDay);
}

// node_modules/date-fns/constructFrom.mjs
function constructFrom(date, value) {
  if (date instanceof Date) {
    return new date.constructor(value);
  } else {
    return new Date(value);
  }
}

// node_modules/date-fns/startOfYear.mjs
function startOfYear(date) {
  const cleanDate = toDate(date);
  const _date = constructFrom(date, 0);
  _date.setFullYear(cleanDate.getFullYear(), 0, 1);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// node_modules/date-fns/getDayOfYear.mjs
function getDayOfYear(date) {
  const _date = toDate(date);
  const diff = differenceInCalendarDays(_date, startOfYear(_date));
  const dayOfYear = diff + 1;
  return dayOfYear;
}

// node_modules/date-fns/startOfWeek.mjs
function startOfWeek(date, options) {
  var _a, _b, _c, _d;
  const defaultOptions2 = getDefaultOptions();
  const weekStartsOn = (options == null ? void 0 : options.weekStartsOn) ?? ((_b = (_a = options == null ? void 0 : options.locale) == null ? void 0 : _a.options) == null ? void 0 : _b.weekStartsOn) ?? defaultOptions2.weekStartsOn ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.weekStartsOn) ?? 0;
  const _date = toDate(date);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  _date.setDate(_date.getDate() - diff);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// node_modules/date-fns/startOfISOWeek.mjs
function startOfISOWeek(date) {
  return startOfWeek(date, { weekStartsOn: 1 });
}

// node_modules/date-fns/getISOWeekYear.mjs
function getISOWeekYear(date) {
  const _date = toDate(date);
  const year = _date.getFullYear();
  const fourthOfJanuaryOfNextYear = constructFrom(date, 0);
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear);
  const fourthOfJanuaryOfThisYear = constructFrom(date, 0);
  fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear);
  if (_date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (_date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

// node_modules/date-fns/startOfISOWeekYear.mjs
function startOfISOWeekYear(date) {
  const year = getISOWeekYear(date);
  const fourthOfJanuary = constructFrom(date, 0);
  fourthOfJanuary.setFullYear(year, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  return startOfISOWeek(fourthOfJanuary);
}

// node_modules/date-fns/getISOWeek.mjs
function getISOWeek(date) {
  const _date = toDate(date);
  const diff = +startOfISOWeek(_date) - +startOfISOWeekYear(_date);
  return Math.round(diff / millisecondsInWeek) + 1;
}

// node_modules/date-fns/getWeekYear.mjs
function getWeekYear(date, options) {
  var _a, _b, _c, _d;
  const _date = toDate(date);
  const year = _date.getFullYear();
  const defaultOptions2 = getDefaultOptions();
  const firstWeekContainsDate = (options == null ? void 0 : options.firstWeekContainsDate) ?? ((_b = (_a = options == null ? void 0 : options.locale) == null ? void 0 : _a.options) == null ? void 0 : _b.firstWeekContainsDate) ?? defaultOptions2.firstWeekContainsDate ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1;
  const firstWeekOfNextYear = constructFrom(date, 0);
  firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = startOfWeek(firstWeekOfNextYear, options);
  const firstWeekOfThisYear = constructFrom(date, 0);
  firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = startOfWeek(firstWeekOfThisYear, options);
  if (_date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (_date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

// node_modules/date-fns/startOfWeekYear.mjs
function startOfWeekYear(date, options) {
  var _a, _b, _c, _d;
  const defaultOptions2 = getDefaultOptions();
  const firstWeekContainsDate = (options == null ? void 0 : options.firstWeekContainsDate) ?? ((_b = (_a = options == null ? void 0 : options.locale) == null ? void 0 : _a.options) == null ? void 0 : _b.firstWeekContainsDate) ?? defaultOptions2.firstWeekContainsDate ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1;
  const year = getWeekYear(date, options);
  const firstWeek = constructFrom(date, 0);
  firstWeek.setFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setHours(0, 0, 0, 0);
  const _date = startOfWeek(firstWeek, options);
  return _date;
}

// node_modules/date-fns/getWeek.mjs
function getWeek(date, options) {
  const _date = toDate(date);
  const diff = +startOfWeek(_date, options) - +startOfWeekYear(_date, options);
  return Math.round(diff / millisecondsInWeek) + 1;
}

// node_modules/date-fns/_lib/format/lightFormatters.mjs
var lightFormatters = {
  // Year
  y(date, token) {
    const signedYear = date.getFullYear();
    const year = signedYear > 0 ? signedYear : 1 - signedYear;
    return addLeadingZeros(token === "yy" ? year % 100 : year, token.length);
  },
  // Month
  M(date, token) {
    const month = date.getMonth();
    return token === "M" ? String(month + 1) : addLeadingZeros(month + 1, 2);
  },
  // Day of the month
  d(date, token) {
    return addLeadingZeros(date.getDate(), token.length);
  },
  // AM or PM
  a(date, token) {
    const dayPeriodEnumValue = date.getHours() / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return dayPeriodEnumValue.toUpperCase();
      case "aaa":
        return dayPeriodEnumValue;
      case "aaaaa":
        return dayPeriodEnumValue[0];
      case "aaaa":
      default:
        return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h(date, token) {
    return addLeadingZeros(date.getHours() % 12 || 12, token.length);
  },
  // Hour [0-23]
  H(date, token) {
    return addLeadingZeros(date.getHours(), token.length);
  },
  // Minute
  m(date, token) {
    return addLeadingZeros(date.getMinutes(), token.length);
  },
  // Second
  s(date, token) {
    return addLeadingZeros(date.getSeconds(), token.length);
  },
  // Fraction of second
  S(date, token) {
    const numberOfDigits = token.length;
    const milliseconds = date.getMilliseconds();
    const fractionalSeconds = Math.trunc(
      milliseconds * Math.pow(10, numberOfDigits - 3)
    );
    return addLeadingZeros(fractionalSeconds, token.length);
  }
};

// node_modules/date-fns/_lib/format/formatters.mjs
var dayPeriodEnum = {
  am: "am",
  pm: "pm",
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
};
var formatters = {
  // Era
  G: function(date, token, localize2) {
    const era = date.getFullYear() > 0 ? 1 : 0;
    switch (token) {
      // AD, BC
      case "G":
      case "GG":
      case "GGG":
        return localize2.era(era, { width: "abbreviated" });
      // A, B
      case "GGGGG":
        return localize2.era(era, { width: "narrow" });
      // Anno Domini, Before Christ
      case "GGGG":
      default:
        return localize2.era(era, { width: "wide" });
    }
  },
  // Year
  y: function(date, token, localize2) {
    if (token === "yo") {
      const signedYear = date.getFullYear();
      const year = signedYear > 0 ? signedYear : 1 - signedYear;
      return localize2.ordinalNumber(year, { unit: "year" });
    }
    return lightFormatters.y(date, token);
  },
  // Local week-numbering year
  Y: function(date, token, localize2, options) {
    const signedWeekYear = getWeekYear(date, options);
    const weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;
    if (token === "YY") {
      const twoDigitYear = weekYear % 100;
      return addLeadingZeros(twoDigitYear, 2);
    }
    if (token === "Yo") {
      return localize2.ordinalNumber(weekYear, { unit: "year" });
    }
    return addLeadingZeros(weekYear, token.length);
  },
  // ISO week-numbering year
  R: function(date, token) {
    const isoWeekYear = getISOWeekYear(date);
    return addLeadingZeros(isoWeekYear, token.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function(date, token) {
    const year = date.getFullYear();
    return addLeadingZeros(year, token.length);
  },
  // Quarter
  Q: function(date, token, localize2) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    switch (token) {
      // 1, 2, 3, 4
      case "Q":
        return String(quarter);
      // 01, 02, 03, 04
      case "QQ":
        return addLeadingZeros(quarter, 2);
      // 1st, 2nd, 3rd, 4th
      case "Qo":
        return localize2.ordinalNumber(quarter, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "QQQ":
        return localize2.quarter(quarter, {
          width: "abbreviated",
          context: "formatting"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "QQQQQ":
        return localize2.quarter(quarter, {
          width: "narrow",
          context: "formatting"
        });
      // 1st quarter, 2nd quarter, ...
      case "QQQQ":
      default:
        return localize2.quarter(quarter, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(date, token, localize2) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    switch (token) {
      // 1, 2, 3, 4
      case "q":
        return String(quarter);
      // 01, 02, 03, 04
      case "qq":
        return addLeadingZeros(quarter, 2);
      // 1st, 2nd, 3rd, 4th
      case "qo":
        return localize2.ordinalNumber(quarter, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "qqq":
        return localize2.quarter(quarter, {
          width: "abbreviated",
          context: "standalone"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "qqqqq":
        return localize2.quarter(quarter, {
          width: "narrow",
          context: "standalone"
        });
      // 1st quarter, 2nd quarter, ...
      case "qqqq":
      default:
        return localize2.quarter(quarter, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(date, token, localize2) {
    const month = date.getMonth();
    switch (token) {
      case "M":
      case "MM":
        return lightFormatters.M(date, token);
      // 1st, 2nd, ..., 12th
      case "Mo":
        return localize2.ordinalNumber(month + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "MMM":
        return localize2.month(month, {
          width: "abbreviated",
          context: "formatting"
        });
      // J, F, ..., D
      case "MMMMM":
        return localize2.month(month, {
          width: "narrow",
          context: "formatting"
        });
      // January, February, ..., December
      case "MMMM":
      default:
        return localize2.month(month, { width: "wide", context: "formatting" });
    }
  },
  // Stand-alone month
  L: function(date, token, localize2) {
    const month = date.getMonth();
    switch (token) {
      // 1, 2, ..., 12
      case "L":
        return String(month + 1);
      // 01, 02, ..., 12
      case "LL":
        return addLeadingZeros(month + 1, 2);
      // 1st, 2nd, ..., 12th
      case "Lo":
        return localize2.ordinalNumber(month + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "LLL":
        return localize2.month(month, {
          width: "abbreviated",
          context: "standalone"
        });
      // J, F, ..., D
      case "LLLLL":
        return localize2.month(month, {
          width: "narrow",
          context: "standalone"
        });
      // January, February, ..., December
      case "LLLL":
      default:
        return localize2.month(month, { width: "wide", context: "standalone" });
    }
  },
  // Local week of year
  w: function(date, token, localize2, options) {
    const week = getWeek(date, options);
    if (token === "wo") {
      return localize2.ordinalNumber(week, { unit: "week" });
    }
    return addLeadingZeros(week, token.length);
  },
  // ISO week of year
  I: function(date, token, localize2) {
    const isoWeek = getISOWeek(date);
    if (token === "Io") {
      return localize2.ordinalNumber(isoWeek, { unit: "week" });
    }
    return addLeadingZeros(isoWeek, token.length);
  },
  // Day of the month
  d: function(date, token, localize2) {
    if (token === "do") {
      return localize2.ordinalNumber(date.getDate(), { unit: "date" });
    }
    return lightFormatters.d(date, token);
  },
  // Day of year
  D: function(date, token, localize2) {
    const dayOfYear = getDayOfYear(date);
    if (token === "Do") {
      return localize2.ordinalNumber(dayOfYear, { unit: "dayOfYear" });
    }
    return addLeadingZeros(dayOfYear, token.length);
  },
  // Day of week
  E: function(date, token, localize2) {
    const dayOfWeek = date.getDay();
    switch (token) {
      // Tue
      case "E":
      case "EE":
      case "EEE":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "EEEEE":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "EEEEEE":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "EEEE":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(date, token, localize2, options) {
    const dayOfWeek = date.getDay();
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      // Numerical value (Nth day of week with current locale or weekStartsOn)
      case "e":
        return String(localDayOfWeek);
      // Padded numerical value
      case "ee":
        return addLeadingZeros(localDayOfWeek, 2);
      // 1st, 2nd, ..., 7th
      case "eo":
        return localize2.ordinalNumber(localDayOfWeek, { unit: "day" });
      case "eee":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "eeeee":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "eeeeee":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "eeee":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(date, token, localize2, options) {
    const dayOfWeek = date.getDay();
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      // Numerical value (same as in `e`)
      case "c":
        return String(localDayOfWeek);
      // Padded numerical value
      case "cc":
        return addLeadingZeros(localDayOfWeek, token.length);
      // 1st, 2nd, ..., 7th
      case "co":
        return localize2.ordinalNumber(localDayOfWeek, { unit: "day" });
      case "ccc":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "standalone"
        });
      // T
      case "ccccc":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "standalone"
        });
      // Tu
      case "cccccc":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "standalone"
        });
      // Tuesday
      case "cccc":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(date, token, localize2) {
    const dayOfWeek = date.getDay();
    const isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    switch (token) {
      // 2
      case "i":
        return String(isoDayOfWeek);
      // 02
      case "ii":
        return addLeadingZeros(isoDayOfWeek, token.length);
      // 2nd
      case "io":
        return localize2.ordinalNumber(isoDayOfWeek, { unit: "day" });
      // Tue
      case "iii":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "iiiii":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "iiiiii":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "iiii":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(date, token, localize2) {
    const hours = date.getHours();
    const dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(date, token, localize2) {
    const hours = date.getHours();
    let dayPeriodEnumValue;
    if (hours === 12) {
      dayPeriodEnumValue = dayPeriodEnum.noon;
    } else if (hours === 0) {
      dayPeriodEnumValue = dayPeriodEnum.midnight;
    } else {
      dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    }
    switch (token) {
      case "b":
      case "bb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(date, token, localize2) {
    const hours = date.getHours();
    let dayPeriodEnumValue;
    if (hours >= 17) {
      dayPeriodEnumValue = dayPeriodEnum.evening;
    } else if (hours >= 12) {
      dayPeriodEnumValue = dayPeriodEnum.afternoon;
    } else if (hours >= 4) {
      dayPeriodEnumValue = dayPeriodEnum.morning;
    } else {
      dayPeriodEnumValue = dayPeriodEnum.night;
    }
    switch (token) {
      case "B":
      case "BB":
      case "BBB":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(date, token, localize2) {
    if (token === "ho") {
      let hours = date.getHours() % 12;
      if (hours === 0) hours = 12;
      return localize2.ordinalNumber(hours, { unit: "hour" });
    }
    return lightFormatters.h(date, token);
  },
  // Hour [0-23]
  H: function(date, token, localize2) {
    if (token === "Ho") {
      return localize2.ordinalNumber(date.getHours(), { unit: "hour" });
    }
    return lightFormatters.H(date, token);
  },
  // Hour [0-11]
  K: function(date, token, localize2) {
    const hours = date.getHours() % 12;
    if (token === "Ko") {
      return localize2.ordinalNumber(hours, { unit: "hour" });
    }
    return addLeadingZeros(hours, token.length);
  },
  // Hour [1-24]
  k: function(date, token, localize2) {
    let hours = date.getHours();
    if (hours === 0) hours = 24;
    if (token === "ko") {
      return localize2.ordinalNumber(hours, { unit: "hour" });
    }
    return addLeadingZeros(hours, token.length);
  },
  // Minute
  m: function(date, token, localize2) {
    if (token === "mo") {
      return localize2.ordinalNumber(date.getMinutes(), { unit: "minute" });
    }
    return lightFormatters.m(date, token);
  },
  // Second
  s: function(date, token, localize2) {
    if (token === "so") {
      return localize2.ordinalNumber(date.getSeconds(), { unit: "second" });
    }
    return lightFormatters.s(date, token);
  },
  // Fraction of second
  S: function(date, token) {
    return lightFormatters.S(date, token);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    if (timezoneOffset === 0) {
      return "Z";
    }
    switch (token) {
      // Hours and optional minutes
      case "X":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX":
        return formatTimezone(timezoneOffset);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    switch (token) {
      // Hours and optional minutes
      case "x":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx":
        return formatTimezone(timezoneOffset);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (GMT)
  O: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    switch (token) {
      // Short
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    switch (token) {
      // Short
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },
  // Seconds timestamp
  t: function(date, token, _localize) {
    const timestamp = Math.trunc(date.getTime() / 1e3);
    return addLeadingZeros(timestamp, token.length);
  },
  // Milliseconds timestamp
  T: function(date, token, _localize) {
    const timestamp = date.getTime();
    return addLeadingZeros(timestamp, token.length);
  }
};
function formatTimezoneShort(offset, delimiter = "") {
  const sign = offset > 0 ? "-" : "+";
  const absOffset = Math.abs(offset);
  const hours = Math.trunc(absOffset / 60);
  const minutes = absOffset % 60;
  if (minutes === 0) {
    return sign + String(hours);
  }
  return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
}
function formatTimezoneWithOptionalMinutes(offset, delimiter) {
  if (offset % 60 === 0) {
    const sign = offset > 0 ? "-" : "+";
    return sign + addLeadingZeros(Math.abs(offset) / 60, 2);
  }
  return formatTimezone(offset, delimiter);
}
function formatTimezone(offset, delimiter = "") {
  const sign = offset > 0 ? "-" : "+";
  const absOffset = Math.abs(offset);
  const hours = addLeadingZeros(Math.trunc(absOffset / 60), 2);
  const minutes = addLeadingZeros(absOffset % 60, 2);
  return sign + hours + delimiter + minutes;
}

// node_modules/date-fns/_lib/format/longFormatters.mjs
var dateLongFormatter = (pattern, formatLong2) => {
  switch (pattern) {
    case "P":
      return formatLong2.date({ width: "short" });
    case "PP":
      return formatLong2.date({ width: "medium" });
    case "PPP":
      return formatLong2.date({ width: "long" });
    case "PPPP":
    default:
      return formatLong2.date({ width: "full" });
  }
};
var timeLongFormatter = (pattern, formatLong2) => {
  switch (pattern) {
    case "p":
      return formatLong2.time({ width: "short" });
    case "pp":
      return formatLong2.time({ width: "medium" });
    case "ppp":
      return formatLong2.time({ width: "long" });
    case "pppp":
    default:
      return formatLong2.time({ width: "full" });
  }
};
var dateTimeLongFormatter = (pattern, formatLong2) => {
  const matchResult = pattern.match(/(P+)(p+)?/) || [];
  const datePattern = matchResult[1];
  const timePattern = matchResult[2];
  if (!timePattern) {
    return dateLongFormatter(pattern, formatLong2);
  }
  let dateTimeFormat;
  switch (datePattern) {
    case "P":
      dateTimeFormat = formatLong2.dateTime({ width: "short" });
      break;
    case "PP":
      dateTimeFormat = formatLong2.dateTime({ width: "medium" });
      break;
    case "PPP":
      dateTimeFormat = formatLong2.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      dateTimeFormat = formatLong2.dateTime({ width: "full" });
      break;
  }
  return dateTimeFormat.replace("{{date}}", dateLongFormatter(datePattern, formatLong2)).replace("{{time}}", timeLongFormatter(timePattern, formatLong2));
};
var longFormatters = {
  p: timeLongFormatter,
  P: dateTimeLongFormatter
};

// node_modules/date-fns/_lib/protectedTokens.mjs
var dayOfYearTokenRE = /^D+$/;
var weekYearTokenRE = /^Y+$/;
var throwTokens = ["D", "DD", "YY", "YYYY"];
function isProtectedDayOfYearToken(token) {
  return dayOfYearTokenRE.test(token);
}
function isProtectedWeekYearToken(token) {
  return weekYearTokenRE.test(token);
}
function warnOrThrowProtectedError(token, format2, input) {
  const _message = message(token, format2, input);
  console.warn(_message);
  if (throwTokens.includes(token)) throw new RangeError(_message);
}
function message(token, format2, input) {
  const subject = token[0] === "Y" ? "years" : "days of the month";
  return `Use \`${token.toLowerCase()}\` instead of \`${token}\` (in \`${format2}\`) for formatting ${subject} to the input \`${input}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}

// node_modules/date-fns/isDate.mjs
function isDate(value) {
  return value instanceof Date || typeof value === "object" && Object.prototype.toString.call(value) === "[object Date]";
}

// node_modules/date-fns/isValid.mjs
function isValid(date) {
  if (!isDate(date) && typeof date !== "number") {
    return false;
  }
  const _date = toDate(date);
  return !isNaN(Number(_date));
}

// node_modules/date-fns/format.mjs
var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp = /^'([^]*?)'?$/;
var doubleQuoteRegExp = /''/g;
var unescapedLatinCharacterRegExp = /[a-zA-Z]/;
function format(date, formatStr, options) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const defaultOptions2 = getDefaultOptions();
  const locale = (options == null ? void 0 : options.locale) ?? defaultOptions2.locale ?? enUS;
  const firstWeekContainsDate = (options == null ? void 0 : options.firstWeekContainsDate) ?? ((_b = (_a = options == null ? void 0 : options.locale) == null ? void 0 : _a.options) == null ? void 0 : _b.firstWeekContainsDate) ?? defaultOptions2.firstWeekContainsDate ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1;
  const weekStartsOn = (options == null ? void 0 : options.weekStartsOn) ?? ((_f = (_e = options == null ? void 0 : options.locale) == null ? void 0 : _e.options) == null ? void 0 : _f.weekStartsOn) ?? defaultOptions2.weekStartsOn ?? ((_h = (_g = defaultOptions2.locale) == null ? void 0 : _g.options) == null ? void 0 : _h.weekStartsOn) ?? 0;
  const originalDate = toDate(date);
  if (!isValid(originalDate)) {
    throw new RangeError("Invalid time value");
  }
  let parts = formatStr.match(longFormattingTokensRegExp).map((substring) => {
    const firstCharacter = substring[0];
    if (firstCharacter === "p" || firstCharacter === "P") {
      const longFormatter = longFormatters[firstCharacter];
      return longFormatter(substring, locale.formatLong);
    }
    return substring;
  }).join("").match(formattingTokensRegExp).map((substring) => {
    if (substring === "''") {
      return { isToken: false, value: "'" };
    }
    const firstCharacter = substring[0];
    if (firstCharacter === "'") {
      return { isToken: false, value: cleanEscapedString(substring) };
    }
    if (formatters[firstCharacter]) {
      return { isToken: true, value: substring };
    }
    if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + firstCharacter + "`"
      );
    }
    return { isToken: false, value: substring };
  });
  if (locale.localize.preprocessor) {
    parts = locale.localize.preprocessor(originalDate, parts);
  }
  const formatterOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale
  };
  return parts.map((part) => {
    if (!part.isToken) return part.value;
    const token = part.value;
    if (!(options == null ? void 0 : options.useAdditionalWeekYearTokens) && isProtectedWeekYearToken(token) || !(options == null ? void 0 : options.useAdditionalDayOfYearTokens) && isProtectedDayOfYearToken(token)) {
      warnOrThrowProtectedError(token, formatStr, String(date));
    }
    const formatter = formatters[token[0]];
    return formatter(originalDate, token, locale.localize, formatterOptions);
  }).join("");
}
function cleanEscapedString(input) {
  const matched = input.match(escapedStringRegExp);
  if (!matched) {
    return input;
  }
  return matched[1].replace(doubleQuoteRegExp, "'");
}

// node_modules/adze/dist/formatters/common/common.js
var CommonFormatter = class extends Formatter {
  constructor() {
    super(...arguments);
    /**
     * Format the date in the strftime format.
     *
     * - strftime pattern: `%d/%b/%Y:%H:%M:%S %z`
     * - date-fns pattern: `dd/MMM/yyyy:HH:mm:ss xx`
     */
    __publicField(this, "timestampFormatFunction", (date) => format(date, "dd/MMM/yyyy:HH:mm:ss xx"));
  }
  /**
   * Format the log message for the browser.
   */
  formatBrowser(mods, timestamp, args) {
    return this.formatMessage(mods, timestamp, args);
  }
  /**
   * Format the log message for the server environment.
   */
  formatServer(mods, timestamp, args) {
    return this.formatMessage(mods, timestamp, args);
  }
  /**
   * Format the log message according to the common log format.
   *
   * **Example:** 127.0.0.1 user-identifier frank [10/Oct/2000:13:55:36 -0700] "GET /apache_pb.gif HTTP/1.0" 200 2326
   */
  formatMessage(_, timestamp, args) {
    if (this.cfg.meta.hostname === void 0) {
      console.warn(new Error("Adze: 'hostname' is required for the common log format. Please provide this value in your log's meta data."));
    }
    const hostname = this.cfg.meta.hostname;
    const ident = this.cfg.meta.ident ?? "-";
    const user = this.cfg.meta.user ?? "-";
    const firstArg = args[0];
    return [`${hostname} ${ident} ${user} [${timestamp}] ${firstArg}`];
  }
};

// node_modules/adze/dist/formatters/common/index.js
var common_default = CommonFormatter;

// node_modules/adze/dist/formatters/json/type-guards.js
function hasRequiredFields(meta) {
  return typeof meta.name === "string" && typeof meta.hostname === "string";
}

// node_modules/adze/dist/formatters/json/json.js
var JsonFormatter = class extends Formatter {
  constructor() {
    super(...arguments);
    /**
     * Format the date in the ISO8601 format by default.
     */
    __publicField(this, "timestampFormatFunction", (date) => formatISO(date));
  }
  /**
   * Format the log message for the browser.
   */
  formatBrowser(mods, timestamp, args) {
    return this.formatMessage(mods, timestamp, args);
  }
  /**
   * Format the log message for the server.
   */
  formatServer(mods, timestamp, args) {
    return this.formatMessage(mods, timestamp, args);
  }
  /**
   * Format the log message for NDJSON lines.
   */
  formatMessage(mods, timestamp, _args) {
    const global = setup();
    const args = [..._args];
    const msg = args.shift();
    if (hasRequiredFields(this.cfg.meta)) {
      const { src, err, req_id, req, res, latency, hostname, name, ...meta } = this.cfg.meta;
      const { namespace, label } = mods;
      const json = {
        v: 1,
        level: this.level.level,
        levelName: this.level.levelName,
        name,
        hostname,
        msg,
        args,
        pid: global.pid,
        time: timestamp,
        meta: Object.keys(meta).length > 0 ? meta : void 0,
        namespace,
        label: label == null ? void 0 : label.name,
        src,
        err,
        req_id,
        req,
        res,
        latency
      };
      return [JSON.stringify(json)];
    }
    console.warn(new Error("Adze: Required fields are missing from the log meta for generating a JSON log."));
    return [...args];
  }
};

// node_modules/adze/dist/formatters/json/functions.js
async function serializeRequest(request, includeUsername = false) {
  const url = new URL(request.url);
  const json = await request.json();
  return {
    headers: getHeaders(request.headers),
    method: request.method,
    url: request.url,
    body: json ? JSON.stringify(json) : void 0,
    remoteAddress: url.host.split(":")[0],
    remotePort: getPortFromUrl(url),
    username: includeUsername ? getUsername(request.headers) : void 0
  };
}
function getPortFromUrl(url) {
  return url.port ? parseInt(url.port) : void 0;
}
function getHeaders(headers) {
  const headerObj = {};
  headers.forEach((v, k) => headerObj[k] = v);
  const { Authorization, authorization, ...rest } = headerObj;
  return rest;
}
function getUsername(headers) {
  const authorization = headers.get("Authorization");
  if (authorization) {
    const [type, encodedValue] = authorization.split(" ");
    if (type === "Basic") {
      const decoded = atob(encodedValue);
      return decoded.split(":")[0];
    }
  }
}
function serializeResponse(response) {
  const url = new URL(response.url);
  const headerString = Object.keys(getHeaders(response.headers)).reduce((s, k, v) => `${s}${k}: ${v}\r
`, "");
  const header = `${url.protocol.split(":")[0].toUpperCase()} ${response.status} ${response.statusText}\r
${headerString}\r
`;
  return {
    statusCode: response.status,
    header
  };
}
function serializeError(error) {
  return {
    message: error.message,
    name: error.name,
    stack: error.stack
  };
}

// node_modules/adze/dist/formatters/json/index.js
var json_default = JsonFormatter;

// node_modules/adze/dist/formatters/pretty/pretty.js
var PrettyFormatter = class extends Formatter {
  /**
   * Format the log message for the browser.
   */
  formatBrowser(mods, timestamp, args) {
    const leader = this.formatLeader();
    const meta = this.formatMeta(mods, timestamp);
    if (this.cfg.withEmoji) {
      return [leader, "font-size: 12px;", this.level.style, meta, ...args];
    }
    return [leader, this.level.style, meta, ...args];
  }
  /**
   * Format the log message for the server environment.
   */
  formatServer(mods, timestamp, args) {
    const message2 = [];
    const leaderRaw = addPadding(this.formatLeader(false), this.cfg.withEmoji, this.level.emoji);
    const leader = `${leaderRaw} `;
    const meta = this.formatMeta(mods, timestamp);
    const styledLeader = applyStyles(leader, this.level.terminalStyle);
    message2.push(styledLeader);
    meta !== "" ? message2.push(meta) : null;
    return [styledLeader, meta, ...args];
  }
  /**
   * Returns a formatted leader string.
   */
  formatLeader(isBrowser2 = true) {
    const tag = isBrowser2 ? "%c" : "";
    const name = " " + initialCaps(this.level.levelName);
    if (this.cfg.withEmoji) {
      return `${tag}${this.formatEmoji(isBrowser2)}${tag}${name}`;
    }
    return `${tag}${name}`;
  }
  /**
   * Formats the emoji if it is enabled.
   */
  formatEmoji(isBrowser2) {
    const space = isBrowser2 ? " " : "";
    return this.level.emoji ? `${this.level.emoji}${space}` : "";
  }
  /**
   * Returns a formatted log meta data string. This is not data defined by the meta modifier.
   */
  formatMeta(mods, timestamp) {
    var _a;
    const ts = this.cfg.showTimestamp ? `${timestamp} ` : "";
    const ns = formatNamespace(mods.namespace);
    const lbl = formatLabel(mods.label);
    const time = this.formatTime(mods);
    const cnt = formatCount((_a = mods.label) == null ? void 0 : _a.count);
    const asrt = formatAssert(mods.assertion, this.cfg.withEmoji);
    const _if = formatIf(mods.if, this.cfg.withEmoji);
    const tst = asrt !== "" ? asrt : _if !== "" ? _if : "";
    return ts + ns + lbl + time + cnt + tst;
  }
  /**
   * Formats the time elapsed string.
   */
  formatTime(mods) {
    var _a;
    const timeLeader = this.cfg.withEmoji ? "⏱ " : "Time elapsed: ";
    if (mods.timeNow) {
      return `(${timeLeader}${mods.timeNow})`;
    }
    return ((_a = mods.label) == null ? void 0 : _a.timeElapsed) ? `(${timeLeader}${mods.label.timeElapsed})` : "";
  }
};

// node_modules/adze/dist/formatters/pretty/index.js
var pretty_default = PrettyFormatter;

// node_modules/adze/dist/formatters/standard/standard.js
var StandardFormatter = class extends Formatter {
  constructor() {
    super(...arguments);
    /**
     * Format the date in the ISO8601 format by default.
     */
    __publicField(this, "timestampFormatFunction", (date) => formatISO(date));
  }
  /**
   * Format the log message for the browser.
   */
  formatBrowser(mods, timestamp, args) {
    return this.formatMessage(timestamp, mods, args);
  }
  /**
   * Format the log message for the server.
   */
  formatServer(mods, timestamp, args) {
    return this.formatMessage(timestamp, mods, args);
  }
  /**
   * Format the log message for stdout lines.
   */
  formatMessage(timestamp, mods, args) {
    let leader = "";
    const { appname, hostname, port } = this.cfg.meta;
    const _port = isNumber(port) ? `/${port}` : "";
    const appPort = isString(appname) ? `${appname}${_port}` : "";
    const _host = isString(hostname) ? ` on ${hostname}: ` : "";
    const namespace = this.formatNamespace(mods.namespace);
    const label = mods.label ? `[${mods.label.name}] ` : "";
    leader = `${appPort}${_host}${namespace}${label}`;
    return [
      `[${timestamp}] ${this.level.levelName.toUpperCase()}: ${leader}${args[0]} `,
      args.map((arg) => isObject(arg) ? JSON.stringify(arg) : arg).slice(1).join(" ")
    ];
  }
  /**
   * Formats the namespaces for the log message.
   */
  formatNamespace(namespace) {
    if (namespace && namespace.length > 0) {
      const str = namespace.reduce((acc, mod, index) => {
        return index === namespace.length - 1 ? `${acc}${mod}` : `${acc}${mod}/`;
      }, "");
      return `${str} `;
    }
    return "";
  }
};

// node_modules/adze/dist/constants.js
var terminators = [
  "alert",
  "error",
  "warn",
  "info",
  "fail",
  "success",
  "log",
  "debug",
  "verbose",
  "custom",
  "clear",
  "clr",
  "close",
  "thread"
];
var levels = [
  "alert",
  "error",
  "warn",
  "info",
  "fail",
  "success",
  "log",
  "debug",
  "verbose"
];
var specialMethodsWithArgsAndLeader = ["group", "groupCollapsed"];
var specialMethodsWithArgs = [
  "dir",
  "dirxml",
  "table",
  ...specialMethodsWithArgsAndLeader
];
var methodsWithArgs = [
  "error",
  "warn",
  "info",
  "log",
  "debug",
  ...specialMethodsWithArgs
];
var specialMethodsWithoutArgs = ["clear", "groupEnd"];
var specialMethods = [...specialMethodsWithArgs, ...specialMethodsWithoutArgs];
var methods = [...methodsWithArgs, ...specialMethodsWithoutArgs];
var modifiers = [
  "assert",
  "count",
  "countClear",
  "countReset",
  "closeThread",
  "dir",
  "dirxml",
  "dump",
  "format",
  "group",
  "groupCollapsed",
  "groupEnd",
  "if",
  "label",
  "meta",
  "namespace",
  "silent",
  "table",
  "time",
  "timeEnd",
  "timeNow",
  "timestamp",
  "trace",
  "withEmoji"
];
var formats = ["pretty", "prettyEmoji", "json", "standard", "common", "default"];
var defaultConfiguration = {
  activeLevel: "log",
  cache: false,
  cacheSize: 300,
  dump: false,
  format: "pretty",
  meta: {},
  middleware: [],
  showTimestamp: false,
  silent: false,
  withEmoji: false,
  levels: {
    alert: getAlertConfig(),
    error: getErrorConfig(),
    warn: getWarnConfig(),
    info: getInfoConfig(),
    fail: getFailConfig(),
    success: getSuccessConfig(),
    log: getLogConfig(),
    debug: getDebugConfig(),
    verbose: getVerboseConfig()
  },
  formatters: {
    default: pretty_default,
    pretty: pretty_default,
    standard: StandardFormatter,
    common: common_default,
    json: json_default
  }
};
function getAlertConfig(overrides = {}) {
  return {
    levelName: "alert",
    level: 0,
    style: `padding-right: 24px; font-size: 12px; border-radius: 4px; background: linear-gradient(to right, #fc8585, #fc2323); color: #fff; border-color: #b70101;`,
    terminalStyle: ["white", "bold", "bgRed"],
    method: "error",
    emoji: "🚨",
    ...overrides
  };
}
function getErrorConfig(overrides = {}) {
  return {
    levelName: "error",
    level: 1,
    style: `padding-right: 24px; font-size: 12px; border-radius: 4px; background: linear-gradient(to right, #fff, #ffd1d1); color: #a4000f; border-color: #e3bbbb;`,
    terminalStyle: ["white", "bgRed"],
    method: "error",
    emoji: "🔥",
    ...overrides
  };
}
function getWarnConfig(overrides = {}) {
  return {
    levelName: "warn",
    level: 2,
    style: `font-size: 12px; border-radius: 4px;  background: linear-gradient(to right, #fff, #fff0a8); color: #715100; border-color: #e3d696; padding-right: ${isFirefox() ? "44px" : "30px"};`,
    terminalStyle: ["white", "bgYellow"],
    method: "warn",
    emoji: "🔔",
    ...overrides
  };
}
function getInfoConfig(overrides = {}) {
  return {
    levelName: "info",
    level: 3,
    style: `padding-right: 44px; font-size: 12px; border-radius: 4px; background: linear-gradient(to right, #d8ebff, #b2d7ff); color: #465464; border-color: #96b5d7;`,
    terminalStyle: ["white", "bgBlue"],
    method: "info",
    emoji: "ℹ️",
    ...overrides
  };
}
function getFailConfig(overrides = {}) {
  return {
    levelName: "fail",
    level: 4,
    style: `padding-right: 44px; font-size: 12px; border-radius: 4px; background: linear-gradient(to right, #ffe8e8, #ffd1d1); color: #a4000f; border-color: #e3bbbb;`,
    terminalStyle: ["white", "bgRed"],
    method: "info",
    emoji: "❌",
    ...overrides
  };
}
function getSuccessConfig(overrides = {}) {
  return {
    levelName: "success",
    level: 5,
    style: "font-size: 12px; border-radius: 4px; padding-right: 22px; background: linear-gradient(to right, #e6f6e4, #ceedc9); color: #4e594d; border-color: #b7d1b3;",
    terminalStyle: ["white", "bgGreen"],
    method: "info",
    emoji: "🎉",
    ...overrides
  };
}
function getLogConfig(overrides = {}) {
  return {
    levelName: "log",
    level: 6,
    style: "font-size: 12px; border-radius: 4px; padding-right: 51px; background: linear-gradient(to right, #ecedef, #d9dce0); color: #333435; border-color: #bfc1c5;",
    terminalStyle: ["white", "bgBlackBright"],
    method: "log",
    emoji: "🪵",
    ...overrides
  };
}
function getDebugConfig(overrides = {}) {
  return {
    levelName: "debug",
    level: 7,
    style: "font-size: 12px; padding-right: 36px; border-right: 1px solid #d9dce0; color: #465464; border-color: #999999;",
    terminalStyle: ["white", "bgBlack"],
    method: "debug",
    emoji: "🐞",
    ...overrides
  };
}
function getVerboseConfig(overrides = {}) {
  return {
    levelName: "verbose",
    level: 8,
    style: "font-size: 12px; padding-right: 22px; color: #999999;",
    terminalStyle: ["black", "italic"],
    method: "debug",
    emoji: "💬",
    ...overrides
  };
}

// node_modules/adze/dist/configuration.js
var Configuration = class {
  constructor(logCfg) {
    /**
     * The log defined configuration.
     */
    __publicField(this, "logCfg");
    /**
     * Reference to the global store configuration overrides.
     */
    __publicField(this, "glblCfg");
    var _a;
    this.logCfg = logCfg ?? {};
    this.glblCfg = (_a = globalThis.$adzeGlobal) == null ? void 0 : _a.configuration;
  }
  updateConfiguration(cfg) {
    this.logCfg = cfg;
  }
  get activeLevel() {
    var _a;
    return ((_a = this.glblCfg) == null ? void 0 : _a.activeLevel) ?? this.logCfg.activeLevel ?? defaultConfiguration.activeLevel;
  }
  set activeLevel(level) {
    this.logCfg.activeLevel = level;
  }
  get cache() {
    var _a;
    return ((_a = this.glblCfg) == null ? void 0 : _a.cache) ?? this.logCfg.cache ?? defaultConfiguration.cache;
  }
  set cache(value) {
    this.logCfg.cache = value;
  }
  get cacheSize() {
    var _a;
    return ((_a = this.glblCfg) == null ? void 0 : _a.cacheSize) ?? this.logCfg.cacheSize ?? defaultConfiguration.cacheSize;
  }
  set cacheSize(size) {
    this.logCfg.cacheSize = size;
  }
  get dump() {
    var _a;
    return ((_a = this.glblCfg) == null ? void 0 : _a.dump) ?? this.logCfg.dump ?? defaultConfiguration.dump;
  }
  set dump(value) {
    this.logCfg.dump = value;
  }
  get meta() {
    var _a;
    return { ...this.logCfg.meta, ...(_a = this.glblCfg) == null ? void 0 : _a.meta };
  }
  set meta(value) {
    this.logCfg.meta = value;
  }
  get silent() {
    var _a;
    return ((_a = this.glblCfg) == null ? void 0 : _a.silent) ?? this.logCfg.silent ?? defaultConfiguration.silent;
  }
  set silent(value) {
    this.logCfg.silent = value;
  }
  get showTimestamp() {
    var _a;
    return ((_a = this.glblCfg) == null ? void 0 : _a.showTimestamp) ?? this.logCfg.showTimestamp ?? defaultConfiguration.showTimestamp;
  }
  set showTimestamp(value) {
    this.logCfg.showTimestamp = value;
  }
  get withEmoji() {
    var _a;
    return ((_a = this.glblCfg) == null ? void 0 : _a.withEmoji) ?? this.logCfg.withEmoji ?? defaultConfiguration.withEmoji;
  }
  set withEmoji(value) {
    this.logCfg.withEmoji = value;
  }
  get format() {
    var _a;
    return ((_a = this.glblCfg) == null ? void 0 : _a.format) ?? this.logCfg.format ?? defaultConfiguration.format;
  }
  set format(value) {
    this.logCfg.format = value;
  }
  get levels() {
    var _a;
    return { ...defaultConfiguration.levels, ...this.logCfg.levels ?? {}, ...((_a = this.glblCfg) == null ? void 0 : _a.levels) ?? {} };
  }
  set levels(value) {
    this.logCfg.levels = value;
  }
  get middleware() {
    var _a;
    return [...((_a = this.glblCfg) == null ? void 0 : _a.middleware) ?? [], ...this.logCfg.middleware ?? []];
  }
  set middleware(value) {
    this.logCfg.middleware = value;
  }
  get filters() {
    var _a;
    return ((_a = this.glblCfg) == null ? void 0 : _a.filters) ?? this.logCfg.filters;
  }
  set filters(value) {
    this.logCfg.filters = value;
  }
  get timestampFormatter() {
    var _a;
    return ((_a = this.glblCfg) == null ? void 0 : _a.timestampFormatter) ?? this.logCfg.timestampFormatter;
  }
  set timestampFormatter(value) {
    this.logCfg.timestampFormatter = value;
  }
  get formatters() {
    var _a;
    return {
      ...defaultConfiguration.formatters,
      ...this.logCfg.formatters ?? {},
      ...((_a = this.glblCfg) == null ? void 0 : _a.formatters) ?? {}
    };
  }
  set formatters(value) {
    this.logCfg.formatters = value;
  }
  exportValues() {
    return {
      activeLevel: this.logCfg.activeLevel,
      cache: this.logCfg.cache,
      cacheSize: this.logCfg.cacheSize,
      dump: this.logCfg.dump,
      meta: this.logCfg.meta,
      silent: this.logCfg.silent,
      showTimestamp: this.logCfg.showTimestamp,
      withEmoji: this.logCfg.withEmoji,
      format: this.logCfg.format,
      levels: this.logCfg.levels,
      middleware: this.logCfg.middleware,
      filters: this.logCfg.filters,
      timestampFormatter: this.logCfg.timestampFormatter,
      formatters: this.logCfg.formatters
    };
  }
};

// node_modules/adze/dist/log.js
function isCallback(maybeFunction) {
  return typeof maybeFunction === "function";
}
var Log = class _Log {
  constructor(cfg = {}, modifierData) {
    /**
     * The global context object.
     */
    __publicField(this, "globalStore");
    /**
     * The configuration for the adze log.
     */
    __publicField(this, "_cfg");
    /**
     * Incomplete log data.
     */
    __publicField(this, "_modifierData");
    /**
     * The log data object.
     */
    __publicField(this, "_data");
    /**
     * Queue up modifiers to ensure they are in the correct order when executed.
     */
    __publicField(this, "modifierQueue", []);
    this.globalStore = setup(cfg);
    this._modifierData = modifierData ?? {};
    this._cfg = new Configuration(cfg);
    this.doHook((m) => {
      if (m.constructed)
        m.constructed(this);
    });
  }
  ////////////////////////////////////////////////////////
  // Getters and Setters
  ////////////////////////////////////////////////////////
  get data() {
    return this._data;
  }
  get modifierData() {
    return this._modifierData;
  }
  get configuration() {
    return this._cfg;
  }
  alert(...args) {
    this.terminate("alert", args);
  }
  /**
   * Terminates the log at the *alert* level.
   *
   * **Default Level = "alert" or 0**
   *
   * This level is useful for calling alert to
   * important information and lives at the lowest level.
   *
   * You should use this sparingly since it's level is lower
   * than error.
   *
   * This is a non-standard API.
   */
  static alert(...args) {
    new this().alert(...args);
  }
  error(...args) {
    this.terminate("error", args);
  }
  /**
   * Terminates the log at the *error* level.
   *
   * **Default Level = "error" or 1**
   *
   * Use this for logging fatal errors or errors that
   * impact functionality of your application.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/error)
   */
  static error(...args) {
    new this().error(...args);
  }
  warn(...args) {
    this.terminate("warn", args);
  }
  /**
   * Terminates the log at the *warning* level.
   *
   * **Default Level = "warn" or 2**
   *
   * Use this for logging issues that may impact
   * app performance in a less impactful way than
   * an error.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/warn)
   */
  static warn(...args) {
    new this().warn(...args);
  }
  info(...args) {
    this.terminate("info", args);
  }
  /**
   * Terminates the log at the *info* level.
   *
   * **Default Level = "info" or 3**
   *
   * Use this for logging general insights into your
   * application. This level does not indicate any
   * problems.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/info)
   */
  static info(...args) {
    new this().info(...args);
  }
  fail(...args) {
    this.terminate("fail", args);
  }
  /**
   * Terminates the log at the *fail* level.
   *
   * **Default Level = "fail" or 4**
   *
   * Use this for logging network communication errors
   * that do not break your application.
   *
   * This is a non-standard API.
   */
  static fail(...args) {
    new this().fail(...args);
  }
  success(...args) {
    this.terminate("success", args);
  }
  /**
   * Terminates the log at the *success* level.
   *
   * **Default Level = "success" or 5**
   *
   * Use this for logging successful network communication.
   *
   * This is a non-standard API.
   */
  static success(...args) {
    new this().success(...args);
  }
  log(...args) {
    this.terminate("log", args);
  }
  /**
   * Terminates the log at the *log* level.
   *
   * **Default Level = "log" or 6**
   *
   * Use this for general logging that doesn't apply
   * to any of the lower levels.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/log)
   */
  static log(args_0, ...args) {
    new this().log(...[args_0, ...args]);
  }
  debug(...args) {
    this.terminate("debug", args);
  }
  /**
   * Terminates the log at the *log* level.
   *
   * **Default Level = "debug" or 7**
   *
   * Use this for general logging that doesn't apply
   * to any of the lower levels.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/log)
   */
  static debug(...args) {
    new this().debug(...args);
  }
  verbose(...args) {
    this.terminate("verbose", args);
  }
  /**
   * Terminates the log at the *verbose* level.
   *
   * **Default Level = "verbose" or 8**
   *
   * Use this for logging extremely detailed debugging
   * information. Use this level when the values you are
   * logging are granular enough that they are no longer
   * easily human readable.
   *
   * This is a non-standard API.
   */
  static verbose(...args) {
    new this().verbose(...args);
  }
  /**
   * Clears the console.
   *
   * This terminator simply exists as an alias for `console.clear()`.
   */
  clear() {
    console.clear();
  }
  /**
   * Clears the console.
   *
   * This terminator simply exists as an alias for `console.clear()`.
   */
  static clear() {
    console.clear();
  }
  /**
   * Alias for `clear()`. Clears the console.
   *
   * This terminator simply exists as an alias for `console.clear()`.
   */
  clr() {
    console.clear();
  }
  /**
   * Alias for `clear()`. Clears the console.
   *
   * This terminator simply exists as an alias for `console.clear()`.
   */
  static clr() {
    console.clear();
  }
  /**
   * Terminates the log at the provided custom log level. Custom log levels are defined within the
   * Adze configuration object under the levels property.
   */
  custom(levelName, ...args) {
    if (!this._cfg.levels[levelName]) {
      console.warn(new Error("Custom log level not found in configuration."));
      return this;
    }
    this.terminate(levelName, args);
    return this;
  }
  /**
   * Terminates the log at the provided custom log level. Custom log levels are defined within the
   * Adze configuration object under the levels property.
   */
  static custom(levelName, ...args) {
    return new this().custom(levelName, ...args);
  }
  /**
   * Seals the configuration of a log and returns a function that
   * constructs a new log with the same configuration.
   *
   * **Example:**
   * ```javascript
   * const sealed = adze.withEmoji.ns('sealed').label('sealed-label').seal();
   * sealed.success('Success!'); // -> prints "#sealed [sealed-label] Success!"
   * sealed.log('Another log.'); // -> prints "#sealed [sealed-label] Another log."
   * ```
   */
  seal(_cfg) {
    if (_cfg)
      this._cfg.updateConfiguration(_cfg);
    return SealedLog(_Log, this._cfg, this.modifierData, this.modifierQueue);
  }
  /**
   * Seals the configuration of a log and returns a function that
   * constructs a new log with the same configuration.
   *
   * **Example:**
   * ```javascript
   * const sealed = adze.withEmoji.ns('sealed').label('sealed-label').seal();
   * sealed.success('Success!'); // -> prints "#sealed [sealed-label] Success!"
   * sealed.log('Another log.'); // -> prints "#sealed [sealed-label] Another log."
   * ```
   */
  static seal(cfg) {
    return new this().seal(cfg);
  }
  /**
   * Seals the configuration of a log and returns a template string tag function.
   *
   * Example:
   *
   * ```typescript
   * const ERR = adze.ns('foo').sealTag('error');
   * ERR`This is an error message.`; // => prints "Error #foo This is an error message."
   * ```
   */
  sealTag(method, cfg) {
    this._cfg = new Configuration({ ...this._cfg.exportValues(), ...cfg });
    return (strings, ...values) => {
      const message2 = String.raw({ raw: strings }, ...values);
      const sealed = SealedLog(_Log, this._cfg, this.modifierData, this.modifierQueue);
      const _method = method;
      if (isCallback(sealed[_method])) {
        sealed[_method](message2);
      }
    };
  }
  /**
   * Seals the configuration of a log and returns a template string tag function.
   *
   * Example:
   *
   * ```typescript
   * const ERR = adze.ns('foo').sealTag('error');
   * ERR`This is an error message.`; // => prints "Error #foo This is an error message."
   * ```
   */
  static sealTag(method, cfg) {
    return new this().sealTag(method, cfg);
  }
  /**
   * Following the MDC (Mapped Diagnostic Context) pattern, this method enables you to create a
   * thread for adding context from different scopes before finally terminating the log.
   *
   * In order to create a thread, this log must specify a label. The label identifies the shared
   * context that other logs in your thread can contribute to.
   *
   * Example:
   *
   * ```typescript
   * function add(a: number, b: number) {
   *   const answer = a + b;
   *   adze.label('maths').thread('added', { a, b, answer });
   *   return answer;
   * }
   *
   * function subtract(x: number, y: number) {
   *   const answer = x - y;
   *   adze.label('maths').thread('subtracted', { x, y, answer });
   *   return answer;
   * }
   *
   * add(1, 2);
   * subtract(4, 3);
   *
   * adze.label('maths').dump.info('Results from our thread');
   * // => prints the log with the context values from both thread logs applied.
   * ```
   */
  thread(key, value) {
    this.runModifierQueue();
    if (this._modifierData.label) {
      if (!this._modifierData.label.context)
        this._modifierData.label.context = {};
      this._modifierData.label.context = { ...this._modifierData.label.context, [key]: value };
    }
  }
  /**
   * Following the MDC (Mapped Diagnostic Context) pattern, this method enables you to create a
   * thread for adding context from different scopes before finally terminating the log.
   *
   * In order to create a thread, this log must specify a label. The label identifies the shared
   * context that other logs in your thread can contribute to.
   *
   * Example:
   *
   * ```typescript
   * function add(a, b) {
   *   const answer = a + b;
   *   adze.label('foo').thread('added', { a, b, answer });
   *   return answer;
   * }
   *
   * function subtract(x, y) {
   *   const answer = x - y;
   *   adze.label('foo').thread('subtracted', { x, y, answer });
   *   return answer;
   * }
   *
   * add(1, 2);
   * subtract(4, 3);
   *
   * adze.label('foo').dump.info('Results from our thread');
   * // => prints the log with the context values from both thread logs applied.
   * ```
   */
  static thread(key, value) {
    new this().thread(key, value);
  }
  ////////////////////////////////////////////////////////
  // Modifiers
  ////////////////////////////////////////////////////////
  /**
   * Generates a log message if the provided expression is falsey.
   */
  assert(expression) {
    this.modifierQueue.push([
      "assert",
      (data) => {
        data.assertion = expression;
        return data;
      }
    ]);
    return this;
  }
  /**
   * Generates a log message if the provided expression is falsey.
   */
  static assert(expression) {
    return new this().assert(expression);
  }
  /**
   * Closes a thread by resetting its context.
   */
  get closeThread() {
    this.modifierQueue.push([
      "closeThread",
      (data) => {
        var _a;
        if ((_a = data.label) == null ? void 0 : _a.context) {
          data.label.context = void 0;
        }
        return data;
      }
    ]);
    return this;
  }
  /**
   * Closes a thread by resetting its context.
   */
  static get closeThread() {
    return new this().closeThread;
  }
  /**
   * Adds to the log count for log instances that share this log's label.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/count)
   */
  get count() {
    this.modifierQueue.push([
      "count",
      (data) => {
        if (data.label) {
          data.label.count = data.label.count !== void 0 ? data.label.count + 1 : 1;
        }
        return data;
      }
    ]);
    return this;
  }
  /**
   * Adds to the log count for log instances that share this log's label.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/count)
   */
  static get count() {
    return new this().count;
  }
  /**
   * Unsets the count for the log instances that share this log's label.
   *
   * This is a non-standard method.
   */
  get countClear() {
    this.modifierQueue.push([
      "countClear",
      (data) => {
        if (data.label) {
          delete data.label.count;
        }
        return data;
      }
    ]);
    return this;
  }
  /**
   * Unsets the count for the log instances that share this log's label.
   *
   * This is a non-standard method.
   */
  static get countClear() {
    return new this().countClear;
  }
  /**
   * Resets the count for the log instances that share this log's label back to 0.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/countReset)
   */
  get countReset() {
    this.modifierQueue.push([
      "countReset",
      (data) => {
        if (data.label) {
          data.label.count = 0;
        }
        return data;
      }
    ]);
    return this;
  }
  /**
   * Resets the count for the log instances that share this log's label.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/countReset)
   */
  static get countReset() {
    return new this().countReset;
  }
  /**
   * Instructs this log to print in the dir format. Typically this is useful
   * for rendering deeply nested objects in the console.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/dir)
   */
  get dir() {
    this.modifierQueue.push([
      "dir",
      (data) => {
        data.method = "dir";
        return data;
      }
    ]);
    return this;
  }
  /**
   * Instructs this log to print in the dir format. Typically this is useful
   * for rendering deeply nested objects in the console.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/dir)
   */
  static get dir() {
    return new this().dir;
  }
  /**
   * Instructs this log to print in the dirxml format. Typically this is useful
   * for rendering HTML/DOM or XML Elements in the console.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/dirxml)
   */
  get dirxml() {
    this.modifierQueue.push([
      "dirxml",
      (data) => {
        data.method = "dirxml";
        return data;
      }
    ]);
    return this;
  }
  /**
   * Instructs this log to print in the dirxml format. Typically this is useful
   * for rendering HTML/DOM or XML Elements in the console.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/dirxml)
   */
  static get dirxml() {
    return new this().dirxml;
  }
  /**
   * Instructs the log terminator to add the key/value pairs from the
   * thread context to the console output.
   *
   * This is a non-standard API.
   */
  get dump() {
    this.modifierQueue.push([
      "dump",
      (data, ctxt) => {
        ctxt._cfg.dump = true;
        return data;
      }
    ]);
    return this;
  }
  /**
   * Instructs the log terminator to add the key/value pairs from the
   * thread context to the console output.
   *
   * This is a non-standard API.
   */
  static get dump() {
    return new this().dump;
  }
  /**
   * Instructs the logger to print according to the provided format.
   *
   * This is a non-standard API.
   */
  format(format2) {
    this.modifierQueue.push([
      "format",
      (data, ctxt) => {
        if (Object.keys(ctxt._cfg.formatters).includes(format2)) {
          ctxt._cfg.format = format2;
          return data;
        }
        console.warn(new Error(`Adze: Formatter "${format2}" not found in configuration.`));
        return data;
      }
    ]);
    return this;
  }
  /**
   * Instructs the logger to print according to the provided format.
   *
   * This is a non-standard API.
   */
  static format(format2) {
    return new this().format(format2);
  }
  /**
   * Starts a log group.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/group)
   */
  get group() {
    this.modifierQueue.push([
      "group",
      (data) => {
        data.method = "group";
        return data;
      }
    ]);
    return this;
  }
  /**
   * Starts a log group.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/group)
   */
  static get group() {
    return new this().group;
  }
  /**
   * Starts a log group that is collapsed by default.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/groupCollapsed)
   */
  get groupCollapsed() {
    this.modifierQueue.push([
      "groupCollapsed",
      (data) => {
        data.method = "groupCollapsed";
        return data;
      }
    ]);
    return this;
  }
  /**
   * Starts a log group that is collapsed by default.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/groupCollapsed)
   */
  static get groupCollapsed() {
    return new this().groupCollapsed;
  }
  /**
   * Ends the most recently opened log group.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/groupEnd)
   */
  get groupEnd() {
    this.modifierQueue.push([
      "groupEnd",
      (data) => {
        data.method = "groupEnd";
        return data;
      }
    ]);
    return this;
  }
  /**
   * Ends the most recently opened log group.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/groupEnd)
   */
  static get groupEnd() {
    return new this().groupEnd;
  }
  /**
   * Generates a log message if the provided expression is truthy.
   *
   * This is a non-standard API.
   */
  if(expression) {
    this.modifierQueue.push([
      "if",
      (data) => {
        data.if = expression;
        return data;
      }
    ]);
    return this;
  }
  /**
   * Generates a log message if the provided expression is truthy.
   *
   * This is a non-standard API.
   */
  static if(expression) {
    return new this().if(expression);
  }
  /**
   * DEPRECATED: Use the equivalent `if` method instead.
   *
   * @deprecated
   */
  test(expression) {
    return this.if(expression);
  }
  /**
   * DEPRECATED: Use the equivalent `if` method instead.
   *
   * @deprecated
   */
  static test(expression) {
    return new this().if(expression);
  }
  /**
   * Adds a label to the log. Label's can be used for log identification
   * and grouping. Label's also link log instances together.
   *
   * This is a non-standard API, but it replaces the need to provide
   * a label to methods that require a global identifier for tracking purposes.
   */
  label(name) {
    this.modifierQueue.unshift([
      "label",
      (data) => {
        const label = this.globalStore.getLabel(name) ?? { name };
        data.label = label;
        this.globalStore.setLabel(name, label);
        return data;
      }
    ]);
    return this;
  }
  /**
   * Adds a label to the log. Label's can be used for log identification
   * and grouping. Label's also link log instances together.
   *
   * This is a non-standard API, but it replaces the need to provide
   * a label to methods that require a global identifier for tracking purposes.
   */
  static label(name) {
    return new this().label(name);
  }
  /**
   * Assign meta data to this log instance that is meant to be
   * retrievable in a log listener or from a `log.data()` dump.
   *
   * This is a non-standard API.
   */
  meta(meta) {
    this.modifierQueue.push([
      "meta",
      (data, ctxt) => {
        ctxt._cfg.meta = { ...ctxt._cfg.meta, ...meta };
        return data;
      }
    ]);
    return this;
  }
  /**
   * Assign meta data to this log instance that is meant to be
   * retrievable in a log listener or from a `log.data()` dump.
   *
   * This is a non-standard API.
   */
  static meta(meta) {
    return new this().meta(meta);
  }
  /**
   * Adds a namespace to the log. Namespace's are primarily useful
   * for grouping logs together. Multiple calls to namespace are
   * additive in nature.
   *
   * This is a non-standard API.
   */
  namespace(...namespace) {
    this.modifierQueue.push([
      "namespace",
      (data) => {
        const arr = data.namespace ?? [];
        data.namespace = arr.length > 0 ? [...arr, ...namespace] : namespace;
        return data;
      }
    ]);
    return this;
  }
  /**
   * Adds a namespace to the log. Namespace's are primarily useful
   * for grouping logs together. Multiple calls to namespace are
   * additive in nature.
   *
   * This is a non-standard API.
   */
  static namespace(...namespace) {
    return new this().namespace(...namespace);
  }
  /**
   * Alias for the `namespace` modifier.
   *
   * Adds a namespace to the log. Namespace's are primarily useful
   * for grouping logs together. Multiple calls to namespace are
   * additive in nature.
   *
   * This is a non-standard API.
   */
  ns(...namespace) {
    return this.namespace(...namespace);
  }
  /**
   * Alias for the `namespace` modifier.
   *
   * Adds a namespace to the log. Namespace's are primarily useful
   * for grouping logs together. Multiple calls to namespace are
   * additive in nature.
   *
   * This is a non-standard API.
   */
  static ns(...namespace) {
    return new this().namespace(...namespace);
  }
  /**
   * This modifier prevents the log from printing. It can still be picked up by middleware or
   * listeners.
   */
  get silent() {
    this.modifierQueue.push([
      "silent",
      (data, ctxt) => {
        ctxt._cfg.silent = true;
        return data;
      }
    ]);
    return this;
  }
  /**
   * This modifier prevents the log from printing. It can still be picked up by middleware or
   * listeners.
   */
  static get silent() {
    return new this().silent;
  }
  /**
   * Instructs this log to print its argument in a table format.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/table)
   */
  get table() {
    this.modifierQueue.push([
      "table",
      (data) => {
        data.method = "table";
        return data;
      }
    ]);
    return this;
  }
  /**
   * Instructs this log to print its argument in a table format.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/table)
   */
  static get table() {
    return new this().table;
  }
  /**
   * Starts a timer associated with this log's *label*. This will do nothing if
   * this log has no label.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/time).
   */
  get time() {
    this.modifierQueue.push([
      "time",
      (data) => {
        const timeStart = hrtime();
        if (data.label) {
          data.label.timeStart = timeStart;
        }
        return data;
      }
    ]);
    return this;
  }
  /**
   * Starts a timer associated with this log's *label*. This will do nothing if
   * this log has no label.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/time).
   */
  static get time() {
    return new this().time;
  }
  /**
   * Stops a timer that was previously started by calling time() on a *labeled* log. Calculates the
   * difference between the start time and when this method was called. This then
   * modifies the log render to show the time difference. This will do nothing if the *label* does
   * not exist.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/timeEnd).
   */
  get timeEnd() {
    this.modifierQueue.push([
      "timeEnd",
      (data) => {
        var _a;
        if ((_a = data.label) == null ? void 0 : _a.timeStart) {
          data.label.timeElapsed = formatTime(hrtime(data.label.timeStart));
        }
        return data;
      }
    ]);
    return this;
  }
  /**
   * Stops a timer that was previously started by calling time() on a *labeled* log. Calculates the
   * difference between the start time and when this method was called. This then
   * modifies the log render to show the time difference. This will do nothing if the *label* does
   * not exist.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/timeEnd).
   */
  static get timeEnd() {
    return new this().timeEnd;
  }
  /**
   * Modifies the log render to show the current high-resolution real time.
   *
   * This is a non-standard method.
   */
  get timeNow() {
    this.modifierQueue.push([
      "timeNow",
      (data) => {
        data.timeNow = captureTimeNow();
        return data;
      }
    ]);
    return this;
  }
  /**
   * Modifies the log render to show the current high-resolution real time.
   *
   * This is a non-standard method.
   */
  static get timeNow() {
    return new this().timeNow;
  }
  /**
   * This modifier method tells the log to render a timestamp.
   *
   * This is a non-standard API.
   */
  get timestamp() {
    this.modifierQueue.push([
      "timestamp",
      (data, ctxt) => {
        ctxt._cfg.showTimestamp = true;
        return data;
      }
    ]);
    return this;
  }
  /**
   * This modifier method tells the log to render a timestamp.
   *
   * This is a non-standard API.
   */
  static get timestamp() {
    return new this().timestamp;
  }
  /**
   * Prints a stacktrace along with the log. This does not use the standard "trace" method but
   * derives the stacktrace from the current call stack and appends it to your log.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/trace)
   */
  get trace() {
    this.modifierQueue.push([
      "trace",
      (data) => {
        data.stacktrace = stacktrace();
        return data;
      }
    ]);
    return this;
  }
  /**
   * Prints a stacktrace along with the log. This does not use the standard "trace" method but
   * derives the stacktrace from the current call stack and appends it to your log.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/trace)
   */
  static get trace() {
    return new this().trace;
  }
  /**
   * Allows emoji's to be printed in pretty logs.
   */
  get withEmoji() {
    this.modifierQueue.push([
      "withEmoji",
      (data, ctxt) => {
        ctxt._cfg.withEmoji = true;
        return data;
      }
    ]);
    return this;
  }
  /**
   * Allows emoji's to be printed in pretty logs.
   */
  static get withEmoji() {
    return new this().withEmoji;
  }
  ////////////////////////////////////////////////////////
  // Public Utility Methods
  ////////////////////////////////////////////////////////
  /**
   * Prints the log to the console.
   */
  print(data) {
    if (isTestEnvironment())
      return;
    if (data.silent)
      return;
    if (data.message.length < 1)
      return;
    if (isMethodWithArgs(data.method)) {
      console[data.method](...data.message);
    } else {
      console[data.method]();
    }
  }
  ////////////////////////////////////////////////////////
  // Private Methods
  ////////////////////////////////////////////////////////
  terminate(terminator, args) {
    var _a;
    this.doHook((m) => {
      if (m.beforeTerminated)
        m.beforeTerminated(this, terminator, args);
    });
    this.runModifierQueue();
    const level = this.getLevelConfig(terminator);
    const formatterConstructor = this.selectFormatter(this._cfg.format);
    const formatter = new formatterConstructor(this._cfg, level);
    const timestamp = formatter.timestampFormatter(/* @__PURE__ */ new Date());
    let message2 = cleanMessage(formatter.print(this.modifierData, timestamp, args));
    if (this._cfg.dump && ((_a = this.modifierData.label) == null ? void 0 : _a.context)) {
      message2.push(this.modifierData.label.context);
    }
    this.doHook((m) => {
      if (m.beforeFormatApplied) {
        message2 = m.beforeFormatApplied(this, this._cfg.format, message2);
      }
    });
    const { activeLevel, cache, cacheSize, dump, format: format2, meta, showTimestamp, silent, withEmoji } = this._cfg;
    const data = {
      activeLevel,
      cache,
      cacheSize,
      dump,
      format: format2,
      meta,
      showTimestamp,
      silent,
      withEmoji,
      ...level,
      ...this._modifierData,
      terminator,
      args,
      timestamp,
      message: message2
    };
    this.doHook((m) => {
      if (m.afterFormatApplied)
        m.afterFormatApplied(this, this._cfg.format, message2);
    });
    this._data = data;
    if (this._cfg.cache) {
      this.globalStore.addLogToCache(this);
    }
    this.doHook((m) => {
      if (m.beforePrint)
        m.beforePrint(this);
    });
    this.print(this._data);
    this.doHook((m) => {
      if (m.afterTerminated)
        m.afterTerminated(this, terminator, args);
    });
    this.globalStore.getListeners(level.level).forEach((listener) => {
      listener(this);
    });
  }
  /**
   * Returns a formatter constructor based on the provided format.
   */
  selectFormatter(format2) {
    return this._cfg.formatters[format2];
  }
  /**
   * Returns the level configuration object based on the provided level name.
   */
  getLevelConfig(levelName) {
    return this._cfg.levels[levelName];
  }
  /**
   * Runs the modifier queue against this instance.
   */
  runModifierQueue() {
    this.modifierQueue.forEach(([modName, modFunc]) => {
      const result = modFunc(this.modifierData, this);
      this.doHook((m) => {
        if (m.beforeModifierApplied)
          m.beforeModifierApplied(this, modName, result);
      });
      this._modifierData = result;
      this.doHook((m) => {
        if (m.afterModifierApplied)
          m.afterModifierApplied(this, modName, result);
      });
    });
  }
  /**
   * Execute a middleware hook.
   */
  doHook(cb) {
    var _a;
    (_a = this._cfg.middleware) == null ? void 0 : _a.forEach((middleware) => {
      cb(middleware);
    });
  }
};

// node_modules/adze/dist/middleware.js
var Middleware = class {
  constructor(targetEnvironment) {
    /**
     * The target environment for this middleware.
     *
     * This instructs the middleware to only load dependencies for the specified environment.
     */
    __publicField(this, "targetEnvironment");
    /**
     * The environment that the middleware is running in.
     */
    __publicField(this, "environment", isBrowser() ? "browser" : "server");
    /**
     * Array of asynchronous dependency loaders.
     */
    __publicField(this, "dependencyLoaders", []);
    this.targetEnvironment = targetEnvironment ?? "both";
    if (!isBrowser() && (this.targetEnvironment === "server" || this.targetEnvironment === "both")) {
      this.dependencyLoaders.push(this.loadServerDependencies());
    }
    if (isBrowser() && (this.targetEnvironment === "browser" || this.targetEnvironment === "both")) {
      this.dependencyLoaders.push(this.loadBrowserDependencies());
    }
  }
  /**
   * Load the dependencies for this middleware.
   */
  async load() {
    await Promise.all(this.dependencyLoaders);
  }
  /**
   * Load dependencies for the server environment.
   */
  async loadServerDependencies() {
  }
  /**
   * Load dependencies for the browser environment.
   */
  async loadBrowserDependencies() {
  }
};

// node_modules/adze/dist/_types/styles.js
var styles_raw = [
  "black",
  "red",
  "green",
  "yellow",
  "blue",
  "magenta",
  "cyan",
  "white",
  "gray",
  "blackBright",
  "redBright",
  "greenBright",
  "yellowBright",
  "blueBright",
  "magentaBright",
  "cyanBright",
  "whiteBright",
  "bgBlack",
  "bgRed",
  "bgGreen",
  "bgYellow",
  "bgBlue",
  "bgMagenta",
  "bgCyan",
  "bgWhite",
  "bgBlackBright",
  "bgRedBright",
  "bgGreenBright",
  "bgYellowBright",
  "bgBlueBright",
  "bgMagentaBright",
  "bgCyanBright",
  "bgWhiteBright",
  "reset",
  "bold",
  "dim",
  "italic",
  "underline",
  "inverse",
  "hidden",
  "strikethrough"
];
var console_styles = Object.freeze(styles_raw);

// node_modules/adze/dist/index.js
var dist_default = Log;
export {
  CommonFormatter,
  Configuration,
  Formatter,
  JsonFormatter,
  Middleware,
  StandardFormatter,
  addPadding,
  applyStyles,
  console_styles,
  dist_default as default,
  defaultConfiguration,
  formatAssert,
  formatCount,
  formatIf,
  formatLabel,
  formatNamespace,
  formats,
  getAlertConfig,
  getDebugConfig,
  getErrorConfig,
  getFailConfig,
  getInfoConfig,
  getLogConfig,
  getSuccessConfig,
  getVerboseConfig,
  getWarnConfig,
  initialCaps,
  isBrowser,
  levels,
  methods,
  methodsWithArgs,
  modifiers,
  serializeError,
  serializeRequest,
  serializeResponse,
  setup,
  specialMethods,
  specialMethodsWithArgs,
  specialMethodsWithArgsAndLeader,
  specialMethodsWithoutArgs,
  teardown,
  terminators
};
//# sourceMappingURL=adze.js.map
