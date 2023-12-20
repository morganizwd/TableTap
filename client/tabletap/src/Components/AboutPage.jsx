import React from 'react';
import { Container, Typography, Box, Paper, Grid, Link } from '@mui/material';

function AboutPage() {
  return (
    <Container>
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h4" gutterBottom>
          О нас
        </Typography>
        <Typography variant="body1" paragraph>
          TableTap - это инновационная платформа для бронирования столиков в ваших любимых ресторанах.
          Наша цель - упростить процесс бронирования, сделав его более удобным и доступным для каждого.
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box component="img" src="/images/about-1.jpg" alt="О нас изображение" sx={{ width: '100%', height: 'auto' }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" paragraph>
              Мы стремимся предоставить пользователям возможность выбора лучших ресторанов со всего мира.
              Наша платформа позволяет пользователям легко находить рестораны по различным критериям,
              читать отзывы других гостей и делать свои бронирования за несколько кликов.
            </Typography>
            <Typography variant="body1" paragraph>
              Если у вас есть вопросы или предложения, пожалуйста, свяжитесь с нами:
              <Link href="mailto:info@tabletap.com" sx={{ ml: 1 }}>info@tabletap.com</Link>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default AboutPage;