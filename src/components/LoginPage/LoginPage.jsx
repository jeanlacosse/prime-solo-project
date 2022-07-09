import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';

function LoginPage() {
  const history = useHistory();

  return (
    <div>
      <LoginForm />

      <center>
        <Button
          type="button"
          color="secondary"
          onClick={() => {
            history.push('/registration');
          }}
          variant="outlined">
            Register</Button>
        
      </center>
    </div>
  );
}

export default LoginPage;
