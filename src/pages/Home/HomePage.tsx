import { Home } from '@components/Home/Home';
import { Stack, Typography } from '@mui/material';

export const HomePage = () => {
  return (
    <Stack spacing={2}>
      <Typography variant="h3" component={'h1'}>
        Homepage
      </Typography>
      <Home />
    </Stack>
  );
};
