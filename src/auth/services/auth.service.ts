import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { UserEntity } from '../../../src/users/entities/user.entity';
import { PayloadToken } from '../interfaces/auth.interface';
dotenv.config({
  path: `${process.env.NODE_ENV || 'develop'}.env`,
});

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}
  public async validateUser(username: string, password: string) {
    const userByUsername = await this.userService.findBy({
      key: 'username',
      value: username,
    });
    const userByEmail = await this.userService.findBy({
      key: 'email',
      value: username,
    });
    if (userByUsername) {
      const match = await bcrypt.compare(password, userByUsername.password);
      if (match) return userByUsername;
    }
    if (userByEmail) {
      const match = await bcrypt.compare(password, userByEmail.password);
      if (match) return userByEmail;
    }
    return null;
  }
  public signJwt({
    payload,
    secret,
    expires,
  }: {
    payload: jwt.JwtPayload;
    secret: string;
    expires: number | string;
  }): string {
    const options: jwt.SignOptions = {
      expiresIn: expires as jwt.SignOptions['expiresIn'],
    };
    return jwt.sign(payload, secret, options);
  }
  public async generateJWT(user: UserEntity): Promise<any> {
    const getUser = await this.userService.findUserById(user.id);
    const payload: PayloadToken = {
      role: getUser.role,
      sub: getUser.id,
    };
    return {
      accessToken: this.signJwt({
        payload,
        secret: process.env.JWT_SECRET as string,
        expires: '1h',
      }),
      user,
    };
  }
}
