import React from 'react';
import {
  Container,
  Box,
  Typography,
  Avatar,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

function UserProfile() {
  // Демонстрационные данные пользователя
  const user = {
    fullName: "Alexander Trubov",
    email: "test5@test.com",
    role: "restaurantAdmin",
    avatarUrl: "https://i.pinimg.com/564x/84/7f/e9/847fe98af13d049a78bf28738ea6e166.jpg",
  };

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4} md={3} lg={2}>
            <Avatar
              alt={user.fullName}
              src={user.avatarUrl}
              sx={{ width: 150, height: 150 }}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={9} lg={10}>
            <Typography variant="h5">{user.fullName}</Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {user.email}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Роль: {user.role}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Дополнительная информация о пользователе */}
        <List>
          <ListItem>
            <ListItemText primary="Дата создания аккаунта" secondary="18 декабря 2023" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Последнее обновление" secondary="18 декабря 2023" />
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
}

export default UserProfile;