import { Controller, Get, NotFoundException, Param, Res } from "@nestjs/common";
import { createReadStream, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { Response } from "express";
import { FILES_PATH } from "../config/";

if (!existsSync(FILES_PATH)) {
  mkdirSync(FILES_PATH, { recursive: true });
}

@Controller("files")
export class FileController {
  @Get(":id")
  getFile(@Res() res: Response, @Param("id") id: string) {
    const path = join(FILES_PATH, id);
    if (!existsSync(path)) {
      throw new NotFoundException("File not found");
    }
    const file = createReadStream(path);
    file.pipe(res);
  }
}
