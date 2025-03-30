import { registerAs } from "@nestjs/config";

export default registerAs("database", () => ({
  synchronize: process.env.DATABASE_SYNC === "true" || false,
  autoLoadEntities: process.env.DATABASE_AUTOLOAD === "true" || false,
  port: parseInt(process.env.DATABASE_PORT || "") || 5432,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
}));
