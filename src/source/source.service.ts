import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { parseResponseObj } from 'src/helpers/parse-response-obj.helper';
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
      return { error: "User doesn't exist in the database" };
    }
    // crear recurso, y pushearlo adentro del userInDB
    const completedObj = {
      ...createSourceDto,
      user_sub: userInDB.sub,
    };
    const newSource = await this.sourceModel.create(completedObj);
    userInDB.resources.push(newSource);
    const updatedUser = await userInDB.save();
    // const groupedDocs = groupByCategory(updatedUser.resources);
    return parseResponseObj(updatedUser);
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
      return { error: 'Resource not found' };
    }
  }

  findAll() {
    return this.sourceModel.find({}).exec();
  }

  // UPDATE SOURCE :
  async update(
    reqAuth: ReqAuthDto,
    source_id: string,
    updateSourceDto: UpdateSourceDto,
  ) {
    //! esto parece funcionar bien. Nada raro.... :
    // edit in the Source Collection
    const sourceDoc = await this.sourceModel
      .findByIdAndUpdate(source_id, updateSourceDto, {
        sanitizeFilter: true,
        runValidators: true,
        new: true,
      })
      .exec();
    if (!sourceDoc) {
      return { error: `Document with id ${source_id}not found.` };
    }

    // update the Source document and the User.resources doc:
    const userOwner = await this.userModel
      .findOne(
        { email: reqAuth.email, sub: reqAuth.sub },
        {},
        { sanitizeFilter: true },
      )
      .exec();
    if (!userOwner) {
      return { error: 'User not found' };
    }
    //edit the subdoc in the User parent Document:
    const subDoc = userOwner.resources.id(source_id);
    if (!subDoc) {
      return { error: 'subDoc es falso. No encontrado!' };
    }

    //!Ver de usar otro método, por más de que este funcione bien. Seguir probando de hacer funcionar un método update()... Este de abajo funciona muy bien igualmente.
    const propsToUpdate = Object.keys(updateSourceDto);
    if (!propsToUpdate.length) {
      throw new Error('No keys passed to update.');
    }
    for (let i = 0; i < propsToUpdate.length; i++) {
      const element = propsToUpdate[i];
      subDoc[element] = updateSourceDto[element];
    }
    const userOwnerUpdated = await userOwner.save();
    return parseResponseObj(userOwnerUpdated);
  }

  // REMOVES SOURCE FROM SOURCE COLLECTION AND USER RESOURCES subdocs :
  async remove(id: string, reqAuth: ReqAuthDto) {
    // find and delete document in the Source collection:
    const deletedDoc = await this.sourceModel.findOneAndDelete({
      _id: id,
      user_sub: reqAuth.sub,
    });
    if (!deletedDoc) {
      // return { error: 'Resource not found in the Source Collection' };
      console.log('No encontrado en source collection');
    }
    // find and delete subdocument of the User.resources array:
    const userOwner = await this.userModel.findOne({ sub: reqAuth.sub });
    userOwner.resources.id(id).remove();
    const userOwnerUpdated = await userOwner.save();
    return parseResponseObj(userOwnerUpdated);
  }
}
