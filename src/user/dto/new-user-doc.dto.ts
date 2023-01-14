import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Source } from 'src/source/schema/source.schema';

export class NewUserDocSwagger {
  @ApiProperty({
    type: String,
    example: 'google-2938559200001',
  })
  sub: string;

  @ApiProperty({
    type: String,
    example: 'happy_user101@gmail.com',
  })
  email: string;

  @ApiProperty({
    type: [Source],
    description:
      'An empty array where the Source docs will be pushed when created',
    example: [],
  })
  resources: Types.DocumentArray<Source>;

  @ApiProperty({
    type: Date,
    description: 'Date of creation',
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
    description: 'Date of last update.',
  })
  updatedAt: Date;

  @ApiProperty({
    type: Types.ObjectId,
    description: 'The _id automaticly created by Mongo',
    example: '63bf7f2fa3be4d3322b4205a',
  })
  _id: Types.ObjectId;
}
