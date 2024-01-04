import { Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <Stack spacing={1}>
      <Typography variant="h5" component={'h3'}>
        Email signatures
      </Typography>
      <Stack direction={'row'} gap={1} flexWrap={'wrap'}>
        <Link to={'/create'}>
          <Button size="small" variant="contained">
            Generate new one
          </Button>
        </Link>
        <Link to={'/list'}>
          <Button size="small" variant="contained">
            Consult existing ones
          </Button>
        </Link>
      </Stack>
    </Stack>
  );
};
