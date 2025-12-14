import { useState } from 'react';
import { UserList } from '../components/UserList';
import { UserForm } from '../components/UserForm';
import { useUsers } from '../hooks/useUsers';
import { userService } from '../services/userService';
import { CreateUserDto } from '../types';

export const Home = () => {
  const { users, loading, error, refetch } = useUsers();
  const [creating, setCreating] = useState(false);

  const handleCreateUser = async (data: CreateUserDto) => {
    setCreating(true);
    try {
      await userService.create(data);
      refetch();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to create user');
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      await userService.delete(id);
      refetch();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete user');
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Cloud-Native SaaS Starter Kit</h1>
        <p style={styles.subtitle}>User Management System</p>
      </header>

      <main style={styles.main}>
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Create New User</h2>
          <UserForm onSubmit={handleCreateUser} loading={creating} />
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Users List</h2>
          {loading && <p style={styles.loading}>Loading...</p>}
          {error && <p style={styles.error}>Error: {error}</p>}
          {!loading && !error && <UserList users={users} onDelete={handleDeleteUser} />}
        </section>
      </main>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    padding: '32px 20px',
    borderBottom: '1px solid #dee2e6',
    textAlign: 'center' as const,
  },
  title: {
    margin: 0,
    fontSize: '32px',
    color: '#212529',
  },
  subtitle: {
    margin: '8px 0 0 0',
    fontSize: '18px',
    color: '#6c757d',
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '40px',
  },
  section: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: 600,
    color: '#212529',
    margin: 0,
  },
  loading: {
    textAlign: 'center' as const,
    padding: '40px',
    color: '#6c757d',
  },
  error: {
    textAlign: 'center' as const,
    padding: '40px',
    color: '#dc3545',
  },
};
