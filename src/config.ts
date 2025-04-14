
type AppConfig = {
    version: string;
    logLevel: "verbose" | "alert" | "error" | "warn" | "info" | "fail" | "success" | "log" | "debug";
};

const appConfig: AppConfig = {
    version: "1.0.0-alpha",
    logLevel: "info"
};

export default appConfig;