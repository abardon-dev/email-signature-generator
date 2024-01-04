import { FileSizeUnit } from '@appTypes/enum/global/FileSizeUnit';
import { FileType } from '@appTypes/enum/global/FileType';
import { FileUploader } from '@components/global/FileUploader/FileUploader';
import { Grid, Typography, TextField, FormLabel, Stack } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { PhoneNumberInput } from './PhoneNumberInput/PhoneNumberInput';

const profilePictureControlName = 'profilePicture';
const firstNameControlName = 'firstName';
const lastNameControlName = 'lastName';

export const PersonalInfo = () => {
  const { control } = useFormContext();

  return (
    <Grid item container direction={'column'} spacing={1}>
      <Grid item>
        <Typography variant="h6">Personal data</Typography>
      </Grid>
      <Grid item>
        <Controller
          name={profilePictureControlName}
          control={control}
          render={({ field: { ref, ...field }, fieldState: { error } }) => (
            <>
              <Stack direction={'row'} gap={1}>
                <FormLabel error={!!error}>Profile picture</FormLabel>
                {error && <FormLabel error={true}>( {error.message} )</FormLabel>}
              </Stack>
              <FileUploader
                {...field}
                allowedFileTypes={[FileType.JPEG, FileType.PNG]}
                sizeLimit={{ size: 5, unit: FileSizeUnit.MEGABYTE }}
              />
            </>
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name={firstNameControlName}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="First Name"
              value={field.value ?? ''}
              fullWidth
              size="small"
              required
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name={lastNameControlName}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Last Name"
              value={field.value ?? ''}
              fullWidth
              size="small"
              required
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
      </Grid>
      <Grid item>
        <PhoneNumberInput />
      </Grid>
    </Grid>
  );
};
