import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

import Button from '@mui/material/Button';

function RegisterPage() {
  const history = useHistory();

  return (
    <div>
      <RegisterForm />

      <center>
      <Button
          type="button"
          color="secondary"
          onClick={() => {
            history.push('/login');
          }}
          variant="outlined">
            Login</Button>
      </center>
    </div>
  );
}

export default RegisterPage;
