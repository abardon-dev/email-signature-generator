import { FileType } from '@appTypes/enum/global/FileType';
import { CountryCode, getExampleNumber } from 'libphonenumber-js';
import examples from 'libphonenumber-js/mobile/examples';

const CustomFormMessage = {
  requiredField: 'This field is required',
  invalidFileType: (allowedFileType: FileType[]) => `Invalid file type provided. Allowed : ${allowedFileType}`,
  invalidPhoneNumber: (countryCode: CountryCode) =>
    `Invalid phone number provided. Expected format : ${getExampleNumber(
      countryCode,
      examples
    )?.formatNational()} or ${getExampleNumber(countryCode, examples)?.formatInternational()}`,
  invalidCountryCode: 'Invalid country code provided'
} as const;

export default CustomFormMessage;
