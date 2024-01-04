import { FileSizeUnit } from '@appTypes/enum/global/FileSizeUnit';
import { FileType } from '@appTypes/enum/global/FileType';
import { FileUploader } from '@components/global/FileUploader/FileUploader';
import { Grid, Typography, TextField, FormLabel, Stack } from '@mui/material';
import Strings from '@utils/StringUtils';
import { Controller, useFormContext } from 'react-hook-form';

const jobTitleControlName = 'jobTitle';
const companyNameControlName = 'companyName';
const companyLogoControlName = 'companyLogo';

export const CompanyInfo = () => {
  const { control, resetField } = useFormContext();

  return (
    <Grid item container direction={'column'} spacing={1}>
      <Grid item>
        <Typography variant="h6">Company data</Typography>
      </Grid>
      <Grid item>
        <Controller
          name={jobTitleControlName}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Job title"
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
          name={companyNameControlName}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Company name"
              value={field.value ?? ''}
              fullWidth
              size="small"
              error={!!error}
              helperText={error?.message}
              onBlur={(event) => {
                Strings.isBlank(event.target.value) && resetField(companyNameControlName);
              }}
            />
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          name={companyLogoControlName}
          control={control}
          render={({ field: { ref, ...field }, fieldState: { error } }) => (
            <>
              <Stack direction={'row'} gap={1}>
                <FormLabel required error={!!error}>
                  Company logo
                </FormLabel>
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
    </Grid>
  );
};
