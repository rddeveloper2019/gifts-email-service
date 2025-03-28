import { createEngine } from "./express-jsx-engine";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { AllExceptionsFilter } from "./filters/all-exceptions.filter";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, "..", "public"));
  app.setBaseViewsDir(join("src", "views"));
  app.engine(
    "jsx",
    createEngine({
      beautify: true,
      babel: {
        presets: [
          "@babel/preset-react",
          ["@babel/preset-env", { targets: { node: "current" } }],
        ],
      },
    }),
  );
  app.setViewEngine("jsx");

  // app.useStaticAssets(join(__dirname, '..', 'public'));
  // app.setBaseViewsDir(join('src', 'views'));
  app.setViewEngine("jsx");
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
