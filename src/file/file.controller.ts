import { Controller, Get, NotFoundException, Param, Res } from "@nestjs/common";
import { createReadStream, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { Response } from "express";

const uploadPath = join(process.cwd(), "uploaded-files");

if (!existsSync(uploadPath)) {
  mkdirSync(uploadPath, { recursive: true });
}

@Controller("files")
export class FileController {
  @Get(":id")
  getFile(@Res() res: Response, @Param("id") id: string) {
    const path = join(uploadPath, id);
    if (!existsSync(path)) {
      throw new NotFoundException("File not found");
    }
    const file = createReadStream(path);
    file.pipe(res);
  }
}
