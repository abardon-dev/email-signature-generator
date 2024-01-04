import { TSignatureResponse } from '@appTypes/response/SignatureResponse';
import { Grid, IconButton, Stack, Typography } from '@mui/material';
import styles from './EmailSignature.module.scss';
import { useEffect } from 'react';
import { Business, GitHub, LinkedIn, Smartphone } from '@mui/icons-material';
import { isPossiblePhoneNumber, parsePhoneNumber } from 'libphonenumber-js';
import { TCreateSignatureFormData } from '@appTypes/form/CreateSignatureForm/CreateSignatureFormSchema';

type EmailSignatureProps = {
  signature: Partial<TSignatureResponse | TCreateSignatureFormData>;
  state: 'read' | 'build';
};

export const EmailSignature = ({ signature, state }: EmailSignatureProps) => {
  const isBuilding = state === 'build';

  const profilePictureBlob = signature.profilePicture ? URL.createObjectURL(signature.profilePicture) : null;
  const companyLogoBlob = signature.companyLogo ? URL.createObjectURL(signature.companyLogo) : null;

  useEffect(
    () => () => {
      profilePictureBlob && URL.revokeObjectURL(profilePictureBlob);
      companyLogoBlob && URL.revokeObjectURL(companyLogoBlob);
    },
    []
  );

  return (
    <Grid container className={styles.emailSignatureContainer}>
      <Grid item xs={4} className={styles.logoContainer}>
        {profilePictureBlob && (
          <img src={profilePictureBlob} alt={`profile-picture-${signature.lastName}-${signature.firstName}`} />
        )}
        {companyLogoBlob && (
          <img
            src={companyLogoBlob}
            alt={signature.companyName ? `company-logo-${signature.companyName}` : 'company-logo'}
          />
        )}
      </Grid>
      <Grid item container xs={8} className={styles.infoContainer}>
        <Grid item container xs={6}>
          <Stack spacing={1} className={styles.firstInfoContainer}>
            <Typography variant="h6">{`${signature.firstName} ${signature.lastName}`}</Typography>
            <Typography variant="body2">{signature.jobTitle}</Typography>
            <Stack direction={'row'} alignItems={'center'} spacing={1.5}>
              {signature.linkedInLink && (
                <IconButton size="small" href={signature.linkedInLink} target="_blank" disabled={isBuilding}>
                  <LinkedIn fontSize="small" />
                </IconButton>
              )}
              {signature.githubLink && (
                <IconButton size="small" href={signature.githubLink} target="_blank" disabled={isBuilding}>
                  <GitHub fontSize="small" />
                </IconButton>
              )}
            </Stack>
          </Stack>
        </Grid>
        <Grid item container xs={6}>
          <Stack spacing={1} className={styles.secondInfoContainer}>
            {signature.phone && isPossiblePhoneNumber(signature.phone?.phoneNumber, signature.phone.countryCode) && (
              <div className={styles.detail}>
                <Smartphone fontSize="small" />
                <Typography variant="body2">
                  {parsePhoneNumber(signature.phone.phoneNumber, signature.phone.countryCode).formatInternational()}
                </Typography>
              </div>
            )}
            {signature.companyName && (
              <div className={styles.detail}>
                <Business fontSize="small" />
                <Typography variant="body2">{signature.companyName}</Typography>
              </div>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
};
