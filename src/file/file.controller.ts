import { Controller, Get, Param, Res } from "@nestjs/common";
import { createReadStream, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { Response } from "express";

const uploadPath = join(process.cwd(), "uploaded-files");

@Controller("file")
export class FileController {
  @Get(":id")
  getFile(@Res() res: Response, @Param("id") id: string) {
    const file = createReadStream(join(uploadPath, id));
    file.pipe(res);
  }
}
