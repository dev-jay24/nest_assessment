import { HttpException, HttpStatus } from '@nestjs/common';

export const commonExceptions = {
  TokenExpired(): any {
    return new HttpException(
      {
        message: 'Token Expired use RefreshToken',
        error: 'TokenExpiredError',
        statusCode: HttpStatus.FORBIDDEN,
      },
      HttpStatus.BAD_REQUEST,
    );
  },
  InvalidObjectId(): any {
    return new HttpException(
      {
        message: 'Enter Valid Object Id',
        error: 'InvalidObjectId',
        statusCode: HttpStatus.BAD_REQUEST,
      },
      HttpStatus.BAD_REQUEST,
    );
  },
  DataNotFound(): any {
    return new HttpException(
      {
        message: 'No Data Found',
        error: 'DataNotFound',
        statusCode: HttpStatus.NOT_FOUND,
      },
      HttpStatus.NOT_FOUND,
    );
  },
  UserAlreadyExists(): any {
    return new HttpException(
      {
        message: 'User Already Exist.',
        error: 'UserAlreadyExists',
        statusCode: HttpStatus.BAD_REQUEST,
      },
      HttpStatus.BAD_REQUEST,
    );
  },
  UserDontExists(): any {
    return new HttpException(
      {
        message: 'No Such User Exist.',
        error: 'UserDontExists',
        statusCode: HttpStatus.BAD_REQUEST,
      },
      HttpStatus.BAD_REQUEST,
    );
  },
  InvalidPassAndEmail(): any {
    return new HttpException(
      {
        message: 'Invalid Email or Password',
        error: 'InvalidPassAndEmail',
        statusCode: HttpStatus.BAD_REQUEST,
      },
      HttpStatus.BAD_REQUEST,
    );
  },
  TenantDontExists(): any {
    return new HttpException(
      {
        message: 'No Such Tenant Exist.',
        error: 'TenantDontExists',
        statusCode: HttpStatus.NOT_FOUND,
      },
      HttpStatus.NOT_FOUND,
    );
  },
  ProductDontExists(): any {
    return new HttpException(
      {
        message: 'No Such Product Exist.',
        error: 'ProductDontExists',
        statusCode: HttpStatus.NOT_FOUND,
      },
      HttpStatus.NOT_FOUND,
    );
  },
};
