import logger from "@lib/utils/logger";

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

console.log("Starting app with config", appConfig);

export default appConfig;