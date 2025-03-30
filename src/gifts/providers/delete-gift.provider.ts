import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/auth/entities/user.entity";
import { SessionType } from "src/guards/session.guard";
import { Repository } from "typeorm";
import { Gift } from "../entities/gift.entity";
import { AuthService } from "src/auth/auth.service";
import { ToastsService } from "src/toasts/toasts.service";
import { ToastTypes } from "src/toasts/enum/toasts.enum";
import { join } from "path";
import { stat, unlink } from "fs";

const uploadPath = join(process.cwd(), "uploaded-files");

@Injectable()
export class DeleteGiftProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly authService: AuthService,
    @InjectRepository(Gift)
    private readonly giftRepository: Repository<Gift>,
    private readonly toastsService: ToastsService,
  ) {}
  public async deleteGift(id: number, session: SessionType): Promise<void> {
    try {
      const decoded = this.authService.decodeToken(session) as {
        sub: number;
      };

      const user = await this.usersRepository.findOne({
        where: {
          id: decoded.sub,
        },
      });

      if (!user) {
        throw "User Not Found!";
      }

      const found = await this.giftRepository.findOne({ where: { id } });
      const filePath = join(uploadPath, found.name);

      stat(filePath, (err) => {
        if (err) {
          throw err;
        }

        unlink(filePath, async (err) => {
          if (err) throw err;
          await this.giftRepository.delete(found.id);

          this.toastsService.sendMessage(
            session.roomId,
            ToastTypes.WARNING,
            `Gift ${found.name} deleted`,
          );
        });
      });

      return;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
