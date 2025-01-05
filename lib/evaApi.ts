export const evaBaseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8010/proxy"
    : "https://api.evaengine.ai";