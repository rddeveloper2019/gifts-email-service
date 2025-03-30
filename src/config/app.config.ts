import { registerAs } from "@nestjs/config";

export default registerAs("appConfig", () => ({
  environment: process.env.NODE_ENV || "production",
  apiVersion: process.env.API_VERSION,
  profileApiKey: process.env.PROFILE_API_KEY,
  filesDir: process.env.FILES_DIR,
}));
