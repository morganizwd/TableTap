import React from 'react';
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

function RestaurantAdminPage() {
  // Демонстрационные данные бронирований
  const reservations = [
    {
      _id: "6581ef72bff93fc517178218",
      user: "6580c0932c38caf892d4e6de",
      restaurant: "6581e8579e318f53f911d61f",
      guestsAmount: 4,
      date: "2023-07-20T19:00:00.000Z",
      status: "pending",
      timeSlots: ["12:00"],
      tableNumber: 1,
    },
    // ... Дополнительные бронирования
  ];

  // Функции для действий (пока что пустые)
  const handleAddReservation = () => {
    console.log("Добавление бронирования");
  };

  const handleDeleteReservation = (reservationId) => {
    console.log("Удаление бронирования:", reservationId);
  };

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
                  <TableCell>{reservation.date}</TableCell>
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