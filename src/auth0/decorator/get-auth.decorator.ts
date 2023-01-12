import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request as RequestJWT } from 'express-jwt';

export const GetAuthInfo = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: RequestJWT = ctx.switchToHttp().getRequest();
    if (!request.auth) {
      return null;
    }
    if (data) {
      console.log('DATA EXISTE = ', data);
      console.log('REQUEST.auth[data] = ', request.auth[data]);
      return request.auth[data];
    }
    console.log('REQUEST.auth = ', request.auth);
    return request.auth;
  },
);
