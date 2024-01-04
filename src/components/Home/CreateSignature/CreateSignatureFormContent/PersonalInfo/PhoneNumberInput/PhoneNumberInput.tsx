import { CountryCodeOption } from '@components/global/CountryCodeOption/CountryCodeOption';
import { TextField, InputAdornment, Select, MenuItem } from '@mui/material';
import Strings from '@utils/StringUtils';
import { formatIncompletePhoneNumber, getExampleNumber, getCountries, CountryCode } from 'libphonenumber-js';
import examples from 'libphonenumber-js/mobile/examples';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const phoneNumberControlName = `phone.phoneNumber`;
const countryCodeControlName = `phone.countryCode`;

export const PhoneNumberInput = () => {
  const { control, resetField, watch } = useFormContext();
  const currentCountryCode = watch(countryCodeControlName);

  useEffect(() => {
    resetField(phoneNumberControlName);
  }, [currentCountryCode]);

  return (
    <Controller
      name={phoneNumberControlName}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label="Phone number"
          type="tel"
          value={field.value ? formatIncompletePhoneNumber(field.value, currentCountryCode) : ''}
          fullWidth
          size="small"
          placeholder={getExampleNumber(currentCountryCode, examples)?.formatNational()}
          error={!!error}
          helperText={error?.message}
          onBlur={(event) => {
            Strings.isBlank(event.target.value) && resetField(phoneNumberControlName);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Controller
                  name={countryCodeControlName}
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      variant="standard"
                      label="Country Code"
                      size="small"
                      onChange={(event) => field.onChange(event.target.value)}
                      renderValue={() => <CountryCodeOption countryCode={currentCountryCode} />}
                    >
                      {getCountries().map((countryCode: CountryCode) => (
                        <MenuItem key={countryCode} value={countryCode}>
                          <CountryCodeOption countryCode={countryCode} countryNameSize="full" />
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </InputAdornment>
            )
          }}
        />
      )}
    />
  );
};
