import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Source } from 'src/source/schema/source.schema';

export class UserParsedSwagger {
  @ApiProperty()
  sub: string;

  @ApiProperty()
  email: string;

  @ApiProperty({
    type: [Source],
    description:
      'An array with all the Source documents that belong to the user',
    example: [{}, {}, {}, {}, {}],
  })
  resources: Types.DocumentArray<Source>;

  @ApiProperty({
    description:
      'Object with keys. Each key is the name of a unique category. Each key contrains an array of Source documents grouped by its category.',
    // type: {},
    example: {
      ['back-end']: [{}, {}, {}],
      ['front-end']: [{}],
      ['ia']: [{}],
    },
  })
  groupedDocs: any;
}
