import pino from "pino";
const _Logger = class _Logger {
  constructor(options = {}) {
    const globalDisable = process.env.DISABLE_LOGS === "true";
    const shouldSilence = options.silent || globalDisable;
    const level = shouldSilence ? "silent" : options.level || "info";
    this.moduleContext = options.module || "app";
    const shouldEnablePrettyPrint = !shouldSilence && options.prettyPrint !== false;
    const pinoOptions = {
      level,
      enabled: !shouldSilence,
      transport: shouldEnablePrettyPrint ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname"
        }
      } : void 0
    };
    this.logger = pino(pinoOptions);
  }
  static getInstance(options = {}) {
    const moduleKey = options.module || "default";
    const globalDisable = process.env.DISABLE_LOGS === "true";
    if (globalDisable && _Logger.instances.has(moduleKey)) {
      const existingLogger = _Logger.instances.get(moduleKey);
      if (existingLogger.getLevel() !== "silent") {
        _Logger.instances.delete(moduleKey);
      }
    }
    if (!_Logger.instances.has(moduleKey)) {
      _Logger.instances.set(moduleKey, new _Logger(options));
    }
    return _Logger.instances.get(moduleKey);
  }
  setLogLevel(level) {
    this.logger.level = level;
  }
  getLevel() {
    return this.logger.level;
  }
  setSilent(silent) {
    if (silent) {
      this.logger.level = "silent";
    }
  }
  setModule(module) {
    this.moduleContext = module;
  }
  debug(...args) {
    this.logger.debug({ module: this.moduleContext }, ...args);
  }
  info(...args) {
    this.logger.info({ module: this.moduleContext }, ...args);
  }
  warn(...args) {
    this.logger.warn({ module: this.moduleContext }, ...args);
  }
  error(...args) {
    this.logger.error({ module: this.moduleContext }, ...args);
  }
  trace(...args) {
    this.logger.trace({ module: this.moduleContext }, ...args);
  }
};
_Logger.instances = /* @__PURE__ */ new Map();
let Logger = _Logger;
export {
  Logger
};
//# sourceMappingURL=index77.js.map
