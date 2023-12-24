import React from 'react';
import { Button, TextField, Paper, Typography, Container } from '@mui/material';
import { fetchAuth, fetchRegister, selectIsAuth } from '../redux/slices/auth';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const RegistrationPage = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch();
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isValid } 
  } = useForm({
    defaultValues: {
      fullname: '',
      email: '',
      password: ''
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const dataToSend = { ...values, role: 'user' };
    const data = await dispatch(fetchRegister(values))
    
    if (!data.payload) {
      return alert('Не удалось зарегестрироваться');
    }

    if ('token' in data.payload){
      window.localStorage.setItem('token', data.payload.token)
    } 
  };

  console.log('isAuth', isAuth);

  if (isAuth) {
    return <Navigate to='/'/>;
  }

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: '30px' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography component="h1" variant="h5">
          Регистрация
        </Typography>
        <form onSubmit={ handleSubmit(onSubmit) }> 
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Имя пользователя"
            name="username"
            autoComplete="new-username" // Используйте нестандартное значение
            autoFocus
            error={Boolean(errors.fullName?.message)}
            helperText={errors.fullName?.message}
            {...register('fullName', {required: 'Укажите имя'})}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type='email'
            id="email"
            label="Электронная почта"
            name="email"
            autoComplete="email"
            autoFocus
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            {... register('email', { required: 'Укажите почту' })}
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
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            {... register('password', { required: 'Укажите пароль' })}
          />
          <input type="hidden" value="user" {...register('role')} />
          <Button
            disabled={!isValid}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: '10px' }}
          >
            Зарегистрироваться
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default RegistrationPage;