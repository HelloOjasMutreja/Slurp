import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../utils/api';
import { useT, H, Inp, Btn, Alert, Card, Lbl } from '../design-system';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const tok = useT();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login(credentials);
      const { token, username, email, role, userId } = response.data;
      login({ username, email, role, userId }, token);
      navigate('/');
    } catch {
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 16px' }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <H l={1} s={{ textAlign: 'center', marginBottom: 8 }}>Sign in to Slurp</H>
        <p style={{ textAlign: 'center', color: tok.color.textSec, fontFamily: tok.font.body, fontSize: 14, marginBottom: 32 }}>
          Welcome back — your campus food awaits
        </p>
        <Card>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {error && <Alert v="err">{error}</Alert>}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <Lbl req>Username</Lbl>
              <Inp
                placeholder="Enter your username"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                required
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <Lbl req>Password</Lbl>
              <Inp
                type="password"
                placeholder="Enter your password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
              />
            </div>
            <Btn type="submit" loading={loading} full sz="lg">
              Sign in
            </Btn>
            <p style={{ textAlign: 'center', fontFamily: tok.font.body, fontSize: 13, color: tok.color.textSec, margin: 0 }}>
              Don't have an account?{' '}
              <Link to="/register" style={{ color: tok.color.pri, fontWeight: 600, textDecoration: 'none' }}>
                Register here
              </Link>
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
