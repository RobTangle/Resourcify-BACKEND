import { Injectable } from '@nestjs/common/decorators';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDetailsDto } from '../user/dto/user-details.dto';
import { User, UserDocument } from '../user/schema/user.schema';

//! ESTO ESTÁ AL PEDO POR AHORA. COPIÉ Y PEGUÉ EL SERVICE DE AUTH GOOGLE, pero no lo estoy aplicando a ningún lado. Lo dejo por si sirve para algo en algún momento.
@Injectable()
export class AuthGoogleService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async validateUser(details: UserDetailsDto) {
    console.log('AuthService');
    console.log('details = ', details);

    const user = await this.userModel
      .findOne(
        { email: details.email },
        {},
        { runValidators: true, sanitizeFilter: true },
      )
      .exec();

    if (!user) {
      //crear nuevo usuario:
      console.log('!user. Creating new user...');
      const newUser = await this.userModel.create({
        sub: details.sub,
        email: details.email,
      });
      console.log('New user created! =', newUser);

      return newUser;
    } else {
      console.log(
        'Usuario encontrado. Retornando user en auth0.service validateUser()',
      );
      console.log('user = ', user);

      return user;
    }
  }
}
