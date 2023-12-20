import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Здесь можно добавить логику отправки данных на сервер
  };

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Typography component="h1" variant="h5">
          Вход
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email адрес"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
            value={formData.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
            value={formData.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ margin: '24px 0px 16px' }}
          >
            Войти
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default LoginPage;