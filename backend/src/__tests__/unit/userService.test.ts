import { userService } from '../../services/userService';
import { NotFoundError, ValidationError } from '../../utils/errors';

describe('UserService', () => {
  beforeEach(async () => {
    await userService.clearAllUsers();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
      };

      const user = await userService.createUser(userData);

      expect(user).toHaveProperty('id');
      expect(user.name).toBe(userData.name);
      expect(user.email).toBe(userData.email);
      expect(user).toHaveProperty('createdAt');
      expect(user).toHaveProperty('updatedAt');
    });

    it('should throw error for duplicate email', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
      };

      await userService.createUser(userData);

      await expect(userService.createUser(userData)).rejects.toThrow(ValidationError);
    });
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      await userService.createUser({ name: 'User 1', email: 'user1@example.com' });
      await userService.createUser({ name: 'User 2', email: 'user2@example.com' });

      const users = await userService.getAllUsers();

      expect(users).toHaveLength(2);
    });

    it('should return empty array when no users exist', async () => {
      const users = await userService.getAllUsers();
      expect(users).toHaveLength(0);
    });
  });

  describe('getUserById', () => {
    it('should return user by id', async () => {
      const newUser = await userService.createUser({
        name: 'John Doe',
        email: 'john@example.com',
      });

      const user = await userService.getUserById(newUser.id);

      expect(user.id).toBe(newUser.id);
      expect(user.name).toBe(newUser.name);
    });

    it('should throw error for non-existent user', async () => {
      await expect(userService.getUserById('non-existent-id')).rejects.toThrow(NotFoundError);
    });
  });

  describe('updateUser', () => {
    it('should update user successfully', async () => {
      const newUser = await userService.createUser({
        name: 'John Doe',
        email: 'john@example.com',
      });

      const updatedUser = await userService.updateUser(newUser.id, {
        name: 'Jane Doe',
      });

      expect(updatedUser.id).toBe(newUser.id);
      expect(updatedUser.name).toBe('Jane Doe');
      expect(updatedUser.email).toBe(newUser.email);
    });

    it('should throw error for non-existent user', async () => {
      await expect(userService.updateUser('non-existent-id', { name: 'Test' })).rejects.toThrow(
        NotFoundError
      );
    });

    it('should throw error when updating to duplicate email', async () => {
      const user1 = await userService.createUser({
        name: 'User 1',
        email: 'user1@example.com',
      });
      await userService.createUser({ name: 'User 2', email: 'user2@example.com' });

      await expect(
        userService.updateUser(user1.id, { email: 'user2@example.com' })
      ).rejects.toThrow(ValidationError);
    });
  });

  describe('deleteUser', () => {
    it('should delete user successfully', async () => {
      const newUser = await userService.createUser({
        name: 'John Doe',
        email: 'john@example.com',
      });

      await userService.deleteUser(newUser.id);

      await expect(userService.getUserById(newUser.id)).rejects.toThrow(NotFoundError);
    });

    it('should throw error for non-existent user', async () => {
      await expect(userService.deleteUser('non-existent-id')).rejects.toThrow(NotFoundError);
    });
  });
});
