import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { PUBLIC_KEY } from '../../../src/constants/key-decorator';
import { UsersService } from '../../../src/users/services/users.service';
import { IuseToken } from '../interfaces/auth.interface';
import { useToken } from '../utils/use.tokens';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UsersService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler()
    )
    if (isPublic) {
      return true
    }
    const req = context.switchToHttp().getRequest<Request>()
    const token=  req.headers['token']
    if (!token || Array.isArray(token)) {
      throw new UnauthorizedException('invalid token')
    }
    const manageToken : IuseToken | string = useToken(token)
    if (typeof manageToken === 'string') {
      throw new UnauthorizedException(manageToken)
    }
    if (manageToken.isExpired) {
      throw new UnauthorizedException('token is expired')
    }
    const {sub}= manageToken
    const user =  await this.userService.findUserById(sub)
    if (!user) {
      throw new  UnauthorizedException('Invalid user')
    }
    req.idUser= user.id
    req.roleUser = user.role
    return true;
  }
}
