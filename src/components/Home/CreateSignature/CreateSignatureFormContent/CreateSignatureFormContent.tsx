import { Grid } from '@mui/material';
import { SocialNetworks } from './SocialNetworks/SocialNetworks';
import { CompanyInfo } from './CompanyInfo/CompanyInfo';
import { PersonalInfo } from './PersonalInfo/PersonalInfo';

export const CreateSignatureFormContent = () => {
  return (
    <Grid container spacing={2}>
      <PersonalInfo />
      <CompanyInfo />
      <SocialNetworks />
    </Grid>
  );
};
