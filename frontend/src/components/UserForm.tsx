import { useState } from 'react';
import { CreateUserDto } from '../types';

interface UserFormProps {
  onSubmit: (data: CreateUserDto) => void;
  loading?: boolean;
}

export const UserForm = ({ onSubmit, loading }: UserFormProps) => {
  const [formData, setFormData] = useState<CreateUserDto>({
    name: '',
    email: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', email: '' });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.formGroup}>
        <label htmlFor="name" style={styles.label}>
          Name
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          style={styles.input}
          placeholder="Enter name"
        />
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="email" style={styles.label}>
          Email
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          style={styles.input}
          placeholder="Enter email"
        />
      </div>
      <button type="submit" disabled={loading} style={styles.button}>
        {loading ? 'Creating...' : 'Create User'}
      </button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  label: {
    fontWeight: 500,
    fontSize: '14px',
    color: '#495057',
  },
  input: {
    padding: '10px 12px',
    border: '1px solid #ced4da',
    borderRadius: '4px',
    fontSize: '14px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 500,
  },
};
