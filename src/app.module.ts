import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { ToastsModule } from "./toasts/toasts.module";
import { SocketModule } from "./socket/socket.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as process from "node:process";
import { appConfig, databaseConfig } from "./config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { GiftsModule } from "./gifts/gifts.module";
import { FileModule } from "./file/file.module";
import jwtConfig from "./auth/config/jwt.config";
import validationSchema from "./config/environment.validation";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.env.HOME}/gifts_app/env/.env`,
      load: [appConfig, databaseConfig],
      validationSchema,
    }),
    ConfigModule.forFeature(jwtConfig),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: "postgres",
        synchronize: configService.get("database.synchronize"),
        autoLoadEntities: configService.get("database.autoLoadEntities"),
        port: configService.get("database.port"),
        username: configService.get("database.username"),
        password: configService.get("database.password"),
        database: configService.get("database.database"),
        host: configService.get("database.host"),
      }),
    }),
    AuthModule,
    GiftsModule,
    ToastsModule,
    SocketModule,
    FileModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
