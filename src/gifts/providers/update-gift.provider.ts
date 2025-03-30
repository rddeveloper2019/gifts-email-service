import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/auth/entities/user.entity";
import { SessionType } from "src/guards/session.guard";
import { Repository } from "typeorm";
import { Gift } from "../entities/gift.entity";
import { AuthService } from "src/auth/auth.service";
import { ToastsService } from "src/toasts/toasts.service";
import { ToastTypes } from "src/toasts/enum/toasts.enum";
import { UpdateGiftFormDataDto } from "../dtos/update-gift.formdata.dto";

@Injectable()
export class UpdateGiftProvider {
  constructor(
    @InjectRepository(Gift)
    private readonly giftRepository: Repository<Gift>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly authService: AuthService,
    private readonly toastsService: ToastsService,
  ) {}
  public async updateGift(
    id: number,
    updateGiftFormDataDto: UpdateGiftFormDataDto,
    session: SessionType,
  ): Promise<void> {
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
      if (!found) {
        throw "Gift Not Found!";
      }

      await this.giftRepository.update(
        { id },
        { ...found, ...updateGiftFormDataDto },
      );

      this.toastsService.sendMessage(
        user.roomId,
        ToastTypes.WARNING,
        `Your new gift ${found.title} updated successfully`,
      );
      return;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public async findGift(id: number, session: SessionType): Promise<Gift> {
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

      return await this.giftRepository.findOne({ where: { id } });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
