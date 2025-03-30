import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { basename, resolve } from "path";
import { User } from "src/auth/entities/user.entity";
import { SessionType } from "src/guards/session.guard";
import { Repository } from "typeorm";
import { CreateGiftFormDataDto } from "../dtos/create-gift.formdata.dto";
import { Gift } from "../entities/gift.entity";
import { AuthService } from "src/auth/auth.service";
import { ToastsService } from "src/toasts/toasts.service";
import { ToastTypes } from "src/toasts/enum/toasts.enum";

@Injectable()
export class CreateGiftProvider {
  constructor(
    @InjectRepository(Gift)
    private readonly giftRepository: Repository<Gift>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly authService: AuthService,
    private readonly toastsService: ToastsService,
  ) {}
  public async createGift(
    createGiftFormDataDto: CreateGiftFormDataDto,
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

      const newGift = this.giftRepository.create({
        logo: createGiftFormDataDto.logo,
        title: createGiftFormDataDto.title,
        name: basename(createGiftFormDataDto.file.path),
        description: createGiftFormDataDto.description,
      });
      newGift.user = Promise.resolve(user);

      const createdGift = await this.giftRepository.save(newGift);

      this.toastsService.sendMessage(
        user.roomId,
        ToastTypes.SUCCESS,
        `Your new gift ${createdGift.title} added successfully`,
      );
      return;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
