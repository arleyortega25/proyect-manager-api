import { Request } from 'express';

declare module 'express' {
  export interface Request {
    idUser?: string;
    roleUser?: string;
  }
}
