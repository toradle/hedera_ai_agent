export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'silent';
export interface LoggerOptions {
    level?: LogLevel;
    module?: string;
    prettyPrint?: boolean;
    silent?: boolean;
}
export declare class Logger {
    private static instances;
    private logger;
    private moduleContext;
    constructor(options?: LoggerOptions);
    static getInstance(options?: LoggerOptions): Logger;
    setLogLevel(level: LogLevel): void;
    getLevel(): LogLevel;
    setSilent(silent: boolean): void;
    setModule(module: string): void;
    debug(...args: any[]): void;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
    trace(...args: any[]): void;
}
