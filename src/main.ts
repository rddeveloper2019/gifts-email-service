import { createEngine } from "./express-jsx-engine";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { AllExceptionsFilter } from "./filters/all-exceptions.filter";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import cookieParser from "cookie-parser";
import session from "express-session";
import { ToastsService } from "./toasts/toasts.service";
import methodOverride from "method-override";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

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
  app.setViewEngine("jsx");
  const toastsService = app.get(ToastsService);
  app.useGlobalFilters(new AllExceptionsFilter(toastsService));

  app.enableCors();

  const configService = app.get(ConfigService);

  app.use(
    session({
      secret: configService.get("appConfig.profileApiKey") as string, // Замените на свой секретный ключ
      cookie: {
        maxAge: 86400,
        httpOnly: false,
      },
      name: "gifts-email-service",
    }),
  );

  app.use(cookieParser());
  app.use(methodOverride("_method"));
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
