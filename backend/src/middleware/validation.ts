import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../utils/errors';

export const validateUser = (req: Request, _res: Response, next: NextFunction) => {
  const { name, email } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return next(new ValidationError('Name is required and must be a non-empty string'));
  }

  if (!email || typeof email !== 'string' || !isValidEmail(email)) {
    return next(new ValidationError('Valid email is required'));
  }

  next();
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
