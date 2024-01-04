import { FileType } from '@appTypes/enum/global/FileType';
import { Files } from '@utils/FileUtils';
import Strings from '@utils/StringUtils';
import CustomFormMessage from '@utils/constants/form/CustomFormMessage';
import { CountryCode, isSupportedCountry, isValidNumber, parsePhoneNumber } from 'libphonenumber-js';
import { z } from 'zod';

//Constants
export const gitHubUrl = 'https://github.com/';
export const linkedInProfileUrl = 'https://www.linkedin.com/in/';

//Validation
const shouldStartWithLinkedInRegex: RegExp = /^https:\/\/www\.linkedin\.com\/in\//;
const shouldStartWithGithubRegex: RegExp = /^https:\/\/github\.com\//;

export const CreateSignatureFormSchema = z.object({
  /** Personal info */
  profilePicture: z
    .custom<File>((file) => {
      return file instanceof File;
    })
    .nullable()
    .refine((file: File | null) => (file ? !Files.isFileExtensionError(file, [FileType.PNG, FileType.JPEG]) : true), {
      message: CustomFormMessage.invalidFileType([FileType.PNG, FileType.JPEG])
    }),
  firstName: z.string().max(50).refine(Strings.isNotBlank, { message: CustomFormMessage.requiredField }),
  lastName: z.string().max(50).refine(Strings.isNotBlank, { message: CustomFormMessage.requiredField }),
  phone: z
    .object({
      countryCode: z.custom<CountryCode>(
        (countryCode) => {
          return typeof countryCode === 'string' && isSupportedCountry(countryCode);
        },
        { message: CustomFormMessage.invalidCountryCode }
      ),
      phoneNumber: z.string()
    })
    .refine(
      ({ countryCode, phoneNumber }) => {
        return Strings.isNotBlank(phoneNumber) ? isValidNumber(phoneNumber, countryCode) : true;
      },
      ({ countryCode }) => ({ message: CustomFormMessage.invalidPhoneNumber(countryCode), path: ['phoneNumber'] })
    )
    .transform((phone) =>
      Strings.isNotBlank(phone.phoneNumber)
        ? { ...phone, phoneNumber: parsePhoneNumber(phone.phoneNumber, phone.countryCode).formatNational() }
        : null
    ),

  /** Company info */
  jobTitle: z.string().max(255).refine(Strings.isNotBlank, { message: CustomFormMessage.requiredField }),
  companyName: z.string().max(50).nullable(),
  companyLogo: z
    .custom<File>()
    .nullable()
    .refine(
      (file: File | null) => {
        return !!file;
      },
      { message: CustomFormMessage.requiredField }
    )
    .refine((file: File | null) => file && !Files.isFileExtensionError(file, [FileType.PNG, FileType.JPEG]), {
      message: CustomFormMessage.invalidFileType([FileType.PNG, FileType.JPEG])
    }),

  /** Social networks */
  linkedInLink: z.string().regex(shouldStartWithLinkedInRegex, `Shoud start with ${linkedInProfileUrl}`).nullable(),
  githubLink: z.string().regex(shouldStartWithGithubRegex, `Should start with ${gitHubUrl}`).url().nullable()
});

export type TCreateSignatureFormData = z.infer<typeof CreateSignatureFormSchema>;

export const createSignatureFormDefaultValues: TCreateSignatureFormData = {
  profilePicture: null,
  firstName: '',
  lastName: '',
  phone: {
    countryCode: 'FR',
    phoneNumber: ''
  },
  jobTitle: '',
  companyName: null,
  companyLogo: null,
  linkedInLink: null,
  githubLink: null
};
