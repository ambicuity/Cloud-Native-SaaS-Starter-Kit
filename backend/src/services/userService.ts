import { User, CreateUserDto, UpdateUserDto } from '../models/User';
import { NotFoundError, ValidationError } from '../utils/errors';
import { v4 as uuidv4 } from 'uuid';

// In-memory database simulation
let users: User[] = [];

export class UserService {
  async getAllUsers(): Promise<User[]> {
    return users;
  }

  async getUserById(id: string): Promise<User> {
    const user = users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundError(`User with id ${id} not found`);
    }
    return user;
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const existingUser = users.find((u) => u.email === data.email);
    if (existingUser) {
      throw new ValidationError('User with this email already exists');
    }

    const newUser: User = {
      id: uuidv4(),
      name: data.name,
      email: data.email,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    users.push(newUser);
    return newUser;
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<User> {
    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundError(`User with id ${id} not found`);
    }

    if (data.email) {
      const existingUser = users.find((u) => u.email === data.email && u.id !== id);
      if (existingUser) {
        throw new ValidationError('User with this email already exists');
      }
    }

    const updatedUser: User = {
      ...users[userIndex],
      ...data,
      updatedAt: new Date(),
    };

    users[userIndex] = updatedUser;
    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundError(`User with id ${id} not found`);
    }

    users.splice(userIndex, 1);
  }

  // Utility method for testing
  async clearAllUsers(): Promise<void> {
    users = [];
  }
}

export const userService = new UserService();
