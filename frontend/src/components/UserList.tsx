import { User } from '../types';
import { formatDateTime } from '../utils/format';

interface UserListProps {
  users: User[];
  onDelete: (id: string) => void;
}

export const UserList = ({ users, onDelete }: UserListProps) => {
  if (users.length === 0) {
    return (
      <div style={styles.emptyState}>
        <p>No users found. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Created At</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} style={styles.tr}>
              <td style={styles.td}>{user.name}</td>
              <td style={styles.td}>{user.email}</td>
              <td style={styles.td}>{formatDateTime(user.createdAt)}</td>
              <td style={styles.td}>
                <button
                  onClick={() => onDelete(user.id)}
                  style={styles.deleteButton}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    overflowX: 'auto' as const,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    backgroundColor: '#fff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  th: {
    padding: '12px',
    textAlign: 'left' as const,
    backgroundColor: '#f8f9fa',
    borderBottom: '2px solid #dee2e6',
    fontWeight: 600,
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #dee2e6',
  },
  tr: {
    ':hover': {
      backgroundColor: '#f8f9fa',
    },
  },
  deleteButton: {
    padding: '6px 12px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  emptyState: {
    textAlign: 'center' as const,
    padding: '40px',
    color: '#6c757d',
  },
};
