import { Grid, Typography, Stack, TextField, InputAdornment } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GithubIcon from '@mui/icons-material/GitHub';
import { gitHubUrl, linkedInProfileUrl } from '@appTypes/form/CreateSignatureForm/CreateSignatureFormSchema';
import Strings from '@utils/StringUtils';

const linkedInLinkControlName = 'linkedInLink';
const githubLinkControlName = 'githubLink';

export const SocialNetworks = () => {
  const { control, resetField } = useFormContext();

  return (
    <Grid item container direction={'column'} spacing={1}>
      <Grid item>
        <Typography variant="h6">Social networks</Typography>
      </Grid>
      <Grid item>
        <Stack spacing={1}>
          <Controller
            name="linkedInLink"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Lien LinkedIn"
                value={field.value ?? ''}
                placeholder={linkedInProfileUrl}
                fullWidth
                size="small"
                error={!!error}
                helperText={error?.message}
                onBlur={(event) => {
                  Strings.isBlank(event.target.value) && resetField(linkedInLinkControlName);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LinkedInIcon color="primary" />
                    </InputAdornment>
                  )
                }}
              />
            )}
          />

          <Controller
            name="githubLink"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Lien Github"
                value={field.value ?? ''}
                placeholder={gitHubUrl}
                fullWidth
                size="small"
                error={!!error}
                helperText={error?.message}
                onBlur={(event) => {
                  Strings.isBlank(event.target.value) && resetField(githubLinkControlName);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <GithubIcon />
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};
