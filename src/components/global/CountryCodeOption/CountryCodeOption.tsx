import { Stack } from '@mui/material';
import { getCountryName } from '@utils/constants/CountryNameByCode';
import { CountryCode, getPhoneCode } from 'libphonenumber-js';
import ReactCountryFlag from 'react-country-flag';

type CountryCodeOptionProps = {
  countryCode: CountryCode;
  countryNameSize?: 'short' | 'full';
};

export const CountryCodeOption = ({ countryCode, countryNameSize = 'short' }: CountryCodeOptionProps) => {
  return (
    <Stack direction={'row'} gap={1} alignItems={'center'}>
      {`+${getPhoneCode(countryCode)}`}
      <ReactCountryFlag countryCode={countryCode} svg aria-label={`${countryCode} flag`} />
      {countryNameSize === 'short' ? countryCode : getCountryName(countryCode) ?? countryCode}
    </Stack>
  );
};
