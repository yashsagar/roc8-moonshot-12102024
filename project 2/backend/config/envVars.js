import dotenvFlow from "dotenv-flow";

dotenvFlow.config();

export const ENV_VARS = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV,
};
