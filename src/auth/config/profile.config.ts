import { registerAs } from "@nestjs/config";
import * as process from "node:process";

export const profileConfig = registerAs("profileConfig", () => ({
  apiKey: process.env.PROFILE_API_KEY,
}));
