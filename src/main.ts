import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { withJsxEngine } from "./jsx.engine";
import { NestExpressApplication } from "@nestjs/platform-express";
import DefaultLayout from "./views/layout";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  withJsxEngine(app, DefaultLayout);
  app.useStaticAssets(join(__dirname, "..", "public"));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
