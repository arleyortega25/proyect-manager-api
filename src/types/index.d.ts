import 'express'
declare module 'express-serve-static-core' {
  interface Request {
    idUser: string;
    roleUser: string;
  }
}
