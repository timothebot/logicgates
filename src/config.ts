type AppConfig = {
    version: string;
    logLevel: "verbose" | "alert" | "error" | "warn" | "info" | "fail" | "success" | "log" | "debug";
};

const appConfig: AppConfig = {
    version: "1.0.0-alpha",
    logLevel: "info"
};

if (import.meta.env.DEV) {
    appConfig.logLevel = "verbose";
}

// Logger is not available yet
console.log("Starting app with config", appConfig);

export default appConfig;