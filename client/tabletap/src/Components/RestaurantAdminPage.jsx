import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservationsByRestaurant } from '../redux/slices/reservations';

function RestaurantAdminPage() {
  const dispatch = useDispatch();
  const { items: reservations, status } = useSelector(state => state.reservations.reservations);
  const { restaurantId } = useParams();
  const user = useSelector((state) => state.auth.data);

  useEffect(() => {
    if (restaurantId) {
      dispatch(fetchReservationsByRestaurant(restaurantId));
    }
  }, [dispatch, restaurantId]);

  const handleAddReservation = () => {
    console.log("Добавление бронирования");
  };

  const handleDeleteReservation = (reservationId) => {
    console.log("Удаление бронирования:", reservationId);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (user.role !== 'restaurantAdmin' || (user.restaurantId && user.restaurantId.toString() !== restaurantId)) {
    return <Navigate to="/" />;
  }

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Управление бронированиями
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutlineIcon />}
          onClick={handleAddReservation}
          sx={{ mb: 2 }}
        >
          Добавить бронирование
        </Button>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Дата и время</TableCell>
                <TableCell>Количество гостей</TableCell>
                <TableCell>Статус</TableCell>
                <TableCell>Номер стола</TableCell>
                <TableCell>Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservations.map((reservation) => (
                <TableRow key={reservation._id}>
                  <TableCell>{new Date(reservation.date).toLocaleString()}</TableCell>
                  <TableCell>{reservation.guestsAmount}</TableCell>
                  <TableCell>{reservation.status}</TableCell>
                  <TableCell>{reservation.tableNumber}</TableCell>
                  <TableCell>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDeleteReservation(reservation._id)}
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

export default RestaurantAdminPage;
