import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { parseResponseObj } from 'src/helpers/parse-response-obj.helper';
import { ReqAuthDto, CreateUserDto } from './dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // CREATE USER :
  async createUser(createUserDto: CreateUserDto) {
    const completedObj = {
      ...createUserDto,
    };
    const newUser = await this.userModel.create(completedObj);
    return newUser;
  }

  // GET USER FROM THE DB + GROUPEDDOCS :
  async getUserParsed(reqAuth: ReqAuthDto) {
    const user = await this.returnUserFromDBOrThrowError(reqAuth);
    return parseResponseObj(user);
  }

  // USER EXISTS :
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

  private async returnUserFromDBOrThrowError(reqAuth: ReqAuthDto) {
    const user = await this.userModel
      .findOne(
        { sub: reqAuth.sub, email: reqAuth.email },
        {},
        { sanitizeFilter: true },
      )
      .exec();
    if (!user) {
      throw new NotFoundException('User not found in the data base');
    } else {
      return user;
    }
  }

  // GET USER WITH SOURCES GROUPED BY CATEGORIES :
  // async getOrAndCreateUserWithGroupedDocs(reqAuth: ReqAuthDto) {
  //   const user = await this.findOrCreateUserAndReturnItLean(reqAuth);
  //   const documentsArray = user.resources;
  //   const groupedDocs = groupByCategory(documentsArray);
  //   return { ...user, groupedDocs };
  // }

  // FIND OR CREATE USER AND RETURN IT LEAN :
  // private async findOrCreateUserAndReturnItLean(reqAuth: ReqAuthDto) {
  //   const userInDB = await this.userModel
  //     .findOne({ email: reqAuth.email }, {}, { sanitizeFilter: true })
  //     .lean()
  //     .exec();
  //   if (userInDB) {
  //     console.log('El usuario existe. Retornandolo...');
  //     return userInDB;
  //   } else {
  //     console.log('Usuario no existe. Creando uno nuevo y retornandolo...');
  //     await this.userModel.create({ email: reqAuth.email, sub: reqAuth.sub });
  //     const newUserFetched = await this.userModel
  //       .findOne({ email: reqAuth.email, sub: reqAuth.email })
  //       .lean()
  //       .exec();
  //     return { ...newUserFetched, isNewUser: true };
  //   }
  // }

  // async findUserAndGroupDocs(sub: string, email: string) {
  //   const userFound = await this.userModel
  //     .findOne({ sub: sub }, {}, { sanitizeFilter: true })
  //     .lean()
  //     .exec();
  //   if (!userFound) return { msg: 'user not found' };

  //   // funci??n para crear objecto con documentos separados por categor??as:
  //   const documentsArray = userFound.resources;
  //   const groupByCategory = (documentsArray: LeanDocument<Source>[]) => {
  //     const categories = {};
  //     documentsArray.forEach((doc) => {
  //       const category = doc.category;
  //       if (!categories[category]) {
  //         categories[category] = [];
  //       }
  //       categories[category].push(doc);
  //     });
  //     return categories;
  //   };

  //   const groupedDocs = groupByCategory(documentsArray);
  //   console.log(groupedDocs);
  //   return { ...userFound, groupedDocs };
  // }

  // async findOrCreateUser(sub: string, email: string) {
  //   const userFound = await this.userModel
  //     .findOne({ email: email }, {}, { sanitizeFilter: true })
  //     .exec();
  //   if (userFound) {
  //     console.log('USUARIO ENCONTRADO = ', userFound);
  //     return { user: userFound, newUser: false };
  //   } else {
  //     const newUser = await this.userModel.create({
  //       sub,
  //       email,
  //     });
  //     console.log('NUEVO USUARIO CREADO! ', newUser);

  //     return { ...newUser, isNewUser: true };
  //   }
  // }

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
