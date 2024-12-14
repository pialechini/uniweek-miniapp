import { useAuthContext } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function AssignPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { setToken } = useAuthContext();

  useEffect(() => {
    if (token) {
      setToken(token);
      navigate('/home');
    }
  }, [token, navigate]);

  return null; // No UI
}

export default AssignPage;
