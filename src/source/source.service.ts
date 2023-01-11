import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSourceDto } from './dto/create-source.dto';
import { UpdateSourceDto } from './dto/update-source.dto';
import { Source, SourceDocument } from './schema/source.schema';

@Injectable()
export class SourceService {
  constructor(
    @InjectModel(Source.name) private sourceModel: Model<SourceDocument>,
  ) {}

  async create(createSourceDto: CreateSourceDto) {
    const completedObj = {
      ...createSourceDto,
      user_id: '00001111',
    };
    const newSource = await this.sourceModel.create(completedObj);
    return newSource;
    // return 'This action adds a new source';
  }

  findAll() {
    return this.sourceModel.find({});
    // return `This action returns all source`;
  }

  findOne(id: string) {
    this.sourceModel.findById(id);
    return `This action returns a #${id} source`;
  }

  update(id: number, updateSourceDto: UpdateSourceDto) {
    return `This action updates a #${id} source`;
  }

  remove(id: number) {
    return `This action removes a #${id} source`;
  }
}
