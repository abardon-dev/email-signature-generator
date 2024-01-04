import { CreateSignature } from '@components/Home/CreateSignature/CreateSignature';
import { Stack, Typography } from '@mui/material';

export const CreateSignaturePage = () => {
  return (
    <Stack spacing={2}>
      <Typography variant="h3" component={'h1'}>
        Signature creation
      </Typography>
      <CreateSignature />
    </Stack>
  );
};
