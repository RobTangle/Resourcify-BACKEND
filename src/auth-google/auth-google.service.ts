import { Global, Injectable } from '@nestjs/common/decorators';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDetailsDto } from '../user/dto/user-details.dto';
import { User, UserDocument } from '../user/schema/user.schema';

@Injectable()
export class AuthGoogleService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  validateUser(details: UserDetailsDto) {
    console.log('AuthService');
    console.log('details = ', details);
    this.userModel.find();
  }
}
