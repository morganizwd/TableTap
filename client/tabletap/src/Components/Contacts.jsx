import React from 'react';
import { Container, Typography, Paper, Box, Link, Grid } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

function ContactPage() {
  return (
    <Container>
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h4" gutterBottom>
          Контакты для владельцев ресторанов
        </Typography>
        <Typography variant="body1" paragraph>
          Если вы являетесь владельцем ресторана и хотите связаться с администрацией сервиса TableTap,
          используйте следующие контактные данные.
        </Typography>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center" mb={2}>
              <PhoneIcon sx={{ mr: 1 }} />
              <Typography variant="body1">
                Телефон: <Link href="tel:+1234567890">+1 234 567 890</Link>
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <EmailIcon sx={{ mr: 1 }} />
              <Typography variant="body1">
                Email: <Link href="mailto:contact@tabletap.com">contact@tabletap.com</Link>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            {/* Здесь можно добавить дополнительную информацию или изображение, если необходимо */}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default ContactPage;