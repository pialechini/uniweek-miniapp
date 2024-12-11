import { setInLocalStorage } from '@/helpers/localStorage';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function AssignPage() {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setInLocalStorage('token', token);
      navigate('/');
    }
  }, [token, navigate]);

  return null; // No UI
}

export default AssignPage;
