import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request as JwtRequest } from 'express-jwt';
import { Model } from 'mongoose';
import { ReqAuthDto } from 'src/user/dto';
import { User, UserDocument } from '../user/schema/user.schema';
import { CreateSourceDto } from './dto/create-source.dto';
import { UpdateSourceDto } from './dto/update-source.dto';
import { Source, SourceDocument } from './schema/source.schema';

@Injectable()
export class SourceService {
  constructor(
    @InjectModel(Source.name) private sourceModel: Model<SourceDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  //* CREAR UN NUEVO RECURSO:
  async create(createSourceDto: CreateSourceDto, reqAuth: ReqAuthDto) {
    //find user in DB:
    const userInDB = await this.userModel
      .findOne({ email: reqAuth.email }, {}, { sanitizeFilter: true })
      .exec();

    if (!userInDB) {
      return { error: "User doesn't exists in the database" };
    }
    // crear recurso, y pushearlo adentro del userInDB
    const completedObj = {
      ...createSourceDto,
      user_sub: userInDB.sub,
    };
    const newSource = await this.sourceModel.create(completedObj);
    userInDB.resources.push(newSource);
    await userInDB.save();
    return newSource;
  }

  //* FIND ONE SOURCE BY ID
  async findOneById(source_id: string, reqAuth: ReqAuthDto) {
    const sourceFound = await this.sourceModel.findOne({
      _id: source_id,
      user_sub: reqAuth.sub,
    });
    if (sourceFound) {
      return sourceFound;
    } else {
      return null;
    }
  }

  findAll() {
    return this.sourceModel.find({}).exec();
    // return `This action returns all source`;
  }

  update(id: string, updateSourceDto: UpdateSourceDto) {
    return `This action updates a #${id} source`;
  }

  remove(id: number) {
    return `This action removes a #${id} source`;
  }
}
