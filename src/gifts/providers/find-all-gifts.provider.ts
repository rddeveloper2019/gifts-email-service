import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/auth/entities/user.entity";
import { SessionType } from "src/guards/session.guard";
import { Repository } from "typeorm";
import { Gift } from "../entities/gift.entity";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class FindAllGiftsProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly authService: AuthService,
  ) {}
  public async findAll(session: SessionType): Promise<Gift[]> {
    try {
      const decoded = this.authService.decodeToken(session) as {
        sub: number;
      };

      const user = await this.usersRepository.findOne({
        where: {
          id: decoded.sub,
        },
        relations: {
          gifts: true,
        },
      });

      if (!user) {
        throw "User Not Found!";
      }

      return user.gifts;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
