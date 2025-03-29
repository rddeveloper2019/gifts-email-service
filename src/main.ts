import { createEngine } from "./express-jsx-engine";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { AllExceptionsFilter } from "./filters/all-exceptions.filter";
import { ValidationPipe } from "@nestjs/common";
import session from "express-session";
import { ConfigService } from "@nestjs/config";
import cookieParser from "cookie-parser";
import { SessionAdapter } from "./socket/session-adapter";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //пропустит только объявленные поля в dto
      forbidNonWhitelisted: true, //ошибка, если есть лишние поля не объявленные поля в dto
      transform: true, // получаемый объект становится instance Dto класса
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
  app.useGlobalFilters(new AllExceptionsFilter());

  app.enableCors();

  const configService = app.get(ConfigService);

  app.use(
    session({
      secret: configService.get("appConfig.profileApiKey") as string, // Замените на свой секретный ключ
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 1 день
      },
    }),
  );

  app.use(cookieParser());
  app.useWebSocketAdapter(
    new SessionAdapter(
      app,
      configService.get("appConfig.profileApiKey") as string,
    ),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
