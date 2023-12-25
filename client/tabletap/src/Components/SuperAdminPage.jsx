import React, { useState, useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurantAdmins, createRestaurantAdmin, deleteRestaurantAdmin } from '../redux/slices/restaurantAdmins';

function SuperAdminPage() {

  const dispatch = useDispatch();
  const { items: admins, status } = useSelector(state => state.restaurantadmins.restaurantadmins);

  const [userId, setUserId] = useState('');
  const [restaurantId, setRestaurantId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchRestaurantAdmins());
  }, [dispatch]);

  const handleCreateAdmin = () => {
    if (userId && restaurantId) {
      dispatch(createRestaurantAdmin({ userId, restaurantId }));
    }
  };

  const handleDeleteAdmin = (adminId) => {
    dispatch(deleteRestaurantAdmin(adminId));
  };

  const handleSearch = () => {
    console.log("Поиск админа ресторана по ID ресторана:", searchTerm);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'error') {
    return <div>Error loading data.</div>;
  }

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
                <TableCell>Имя Ресторана</TableCell>
                <TableCell>Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {admins.map((admin) => (
                <TableRow key={admin._id}>
                  <TableCell>{admin._id}</TableCell>
                  <TableCell>{admin.user}</TableCell>
                  <TableCell>{admin.restaurant._id}</TableCell>
                  <TableCell>{admin.restaurant.name}</TableCell> {/* Убедитесь, что здесь используется .name */}
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