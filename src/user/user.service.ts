import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { PrismaService } from '../prisma/prisma.service';
// import { EditUserDto } from './dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const completedObj = {
      ...createUserDto,
    };
    const newUser = await this.userModel.create(completedObj);
    return newUser;
  }

  async findOrCreateUser(sub: string, email: string) {
    const userFound = await this.userModel
      .findOne({ sub: sub }, {}, { sanitizeFilter: true })
      .exec();
    if (userFound) {
      console.log('USUARIO ENCONTRADO = ', userFound);
      return { user: userFound, newUser: false };
    } else {
      const newUser = await this.userModel.create({
        sub,
        email,
      });
      console.log('NUEVO USUARIO CREADO! ', newUser);

      return { ...newUser, isNewUser: true };
    }
  }

  async userExists(sub: string, email: string) {
    const userInDB = await this.userModel.exists({ email: email });
    if (userInDB) {
      console.log('EL USUARIO EXISTE');
      return { msg: true };
    } else {
      console.log('EL USUARIO NO EXISTE');
      return { msg: false };
    }
  }

  // async editUser(userId: string, dto: EditUserDto) {
  //   const user = await this.prisma.user.update({
  //     where: {
  //       id: userId,
  //     },
  //     data: {
  //       ...dto,
  //     },
  //   });
  //   delete user.hash;
  //   return user;
  // }
}
