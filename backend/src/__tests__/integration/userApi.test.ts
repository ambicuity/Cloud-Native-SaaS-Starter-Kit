import request from 'supertest';
import app from '../../app';
import { userService } from '../../services/userService';

describe('User API Integration Tests', () => {
  beforeEach(async () => {
    await userService.clearAllUsers();
  });

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
      };

      const response = await request(app).post('/api/users').send(userData).expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data.name).toBe(userData.name);
      expect(response.body.data.email).toBe(userData.email);
    });

    it('should return 400 for invalid data', async () => {
      const invalidData = {
        name: '',
        email: 'invalid-email',
      };

      const response = await request(app).post('/api/users').send(invalidData).expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/users', () => {
    it('should return all users', async () => {
      await userService.createUser({ name: 'User 1', email: 'user1@example.com' });
      await userService.createUser({ name: 'User 2', email: 'user2@example.com' });

      const response = await request(app).get('/api/users').expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(2);
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return user by id', async () => {
      const user = await userService.createUser({
        name: 'John Doe',
        email: 'john@example.com',
      });

      const response = await request(app).get(`/api/users/${user.id}`).expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(user.id);
    });

    it('should return 404 for non-existent user', async () => {
      const response = await request(app).get('/api/users/non-existent-id').expect(404);

      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /api/users/:id', () => {
    it('should update user', async () => {
      const user = await userService.createUser({
        name: 'John Doe',
        email: 'john@example.com',
      });

      const updateData = {
        name: 'Jane Doe',
      };

      const response = await request(app)
        .put(`/api/users/${user.id}`)
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(updateData.name);
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('should delete user', async () => {
      const user = await userService.createUser({
        name: 'John Doe',
        email: 'john@example.com',
      });

      const response = await request(app).delete(`/api/users/${user.id}`).expect(200);

      expect(response.body.success).toBe(true);

      await request(app).get(`/api/users/${user.id}`).expect(404);
    });
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/health').expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Server is healthy');
    });
  });
});
