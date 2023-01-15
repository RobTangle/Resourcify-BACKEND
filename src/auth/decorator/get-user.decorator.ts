import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Request as RequestJWT } from 'express-jwt';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();
    if (data) {
      return request.user[data];
    }
    return request.user;
  },
);

export const GetAuthInfo = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: RequestJWT = ctx.switchToHttp().getRequest();
    if (!request.auth) {
      throw new BadRequestException('Missing auth property in Request object');
    }
    if (data) {
      console.log('DATA EXISTE = ', data);
      console.log('REQUEST.auth[data] = ', request.auth[data]);
      return request.auth[data];
    }
    // console.log('REQUEST.auth = ', request.auth);
    return request.auth;
  },
);
