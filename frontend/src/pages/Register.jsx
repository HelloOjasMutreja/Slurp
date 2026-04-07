import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../utils/api';
import { useT, H, Inp, Btn, Alert, Card, Lbl } from '../design-system';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
    phone: '',
    address: '',
    role: 'CUSTOMER',
  });
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
      const response = await authAPI.register(formData);
      const { token, username, email, role, userId } = response.data;
      login({ username, email, role, userId }, token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { key: 'username', label: 'Username', type: 'text', placeholder: 'Choose a username' },
    { key: 'email', label: 'Email', type: 'email', placeholder: 'Your email address' },
    { key: 'password', label: 'Password', type: 'password', placeholder: 'Create a password' },
    { key: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Your full name' },
    { key: 'phone', label: 'Phone', type: 'tel', placeholder: 'Phone number' },
    { key: 'address', label: 'Address', type: 'text', placeholder: 'Hostel / campus address' },
  ];

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 16px' }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        <H l={1} s={{ textAlign: 'center', marginBottom: 8, color: tok.color.pri }}>Create your account</H>
        <p style={{ textAlign: 'center', color: tok.color.textSec, fontFamily: tok.font.body, fontSize: 14, marginBottom: 32 }}>
          Join Slurp — SRM's campus food delivery
        </p>
        <Card>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {error && <Alert v="err">{error}</Alert>}
            {fields.map(({ key, label, type, placeholder }) => (
              <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <Lbl req>{label}</Lbl>
                <Inp
                  type={type}
                  placeholder={placeholder}
                  value={formData[key]}
                  onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                  required
                />
              </div>
            ))}
            <Btn type="submit" loading={loading} full sz="lg">
              Create Account
            </Btn>
            <p style={{ textAlign: 'center', fontFamily: tok.font.body, fontSize: 13, color: tok.color.textSec, margin: 0 }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: tok.color.pri, fontWeight: 600, textDecoration: 'none' }}>
                Login here
              </Link>
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Register;
