import React, { useState } from 'react';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  IconButton,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function SuperAdminPage() {
  const [userId, setUserId] = useState('');
  const [restaurantId, setRestaurantId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Демонстрационные данные админов ресторанов
  const admins = [
    {
      _id: "6581f71f0b159df3fd33a58a",
      user: "6580c0932c38caf892d4e6de",
      restaurant: "6581e8579e318f53f911d61f",
    },
    // ... Дополнительные админы
  ];

  // Функции для действий (пока что пустые)
  const handleCreateAdmin = () => {
    console.log("Создание админа ресторана", { userId, restaurantId });
  };

  const handleDeleteAdmin = (adminId) => {
    console.log("Удаление админа ресторана:", adminId);
  };

  const handleSearch = () => {
    console.log("Поиск админа ресторана по ID ресторана:", searchTerm);
  };

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Управление админами ресторанов
        </Typography>
        <TextField
          label="ID пользователя"
          variant="outlined"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          sx={{ mr: 1 }}
        />
        <TextField
          label="ID ресторана"
          variant="outlined"
          value={restaurantId}
          onChange={(e) => setRestaurantId(e.target.value)}
          sx={{ mr: 1 }}
        />
        <Button variant="contained" color="primary" onClick={handleCreateAdmin}>
          Создать админа
        </Button>

        <TextField
          label="Поиск по ID ресторана"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mt: 3, mr: 1 }}
        />
        <Button variant="contained" onClick={handleSearch}>
          Поиск
        </Button>

        <TableContainer sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID Админа</TableCell>
                <TableCell>ID Пользователя</TableCell>
                <TableCell>ID Ресторана</TableCell>
                <TableCell>Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {admins.map((admin) => (
                <TableRow key={admin._id}>
                  <TableCell>{admin._id}</TableCell>
                  <TableCell>{admin.user}</TableCell>
                  <TableCell>{admin.restaurant}</TableCell>
                  <TableCell>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDeleteAdmin(admin._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}

export default SuperAdminPage;