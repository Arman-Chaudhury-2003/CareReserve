// src/middleware/authMock.ts
import { Request, Response, NextFunction } from 'express';

export interface AuthUser {
  id: string;
  role: 'ADMIN' | 'PATIENT';
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export function authMock(req: Request, _res: Response, next: NextFunction) {
  // For now, just mock a patient user.
  // You can change this with a header (e.g. x-role) if needed.
  const roleHeader = req.header('x-role');

  req.user = {
    id: '00000000-0000-0000-0000-000000000001',
    role: roleHeader === 'ADMIN' ? 'ADMIN' : 'PATIENT'
  };

  next();
}
