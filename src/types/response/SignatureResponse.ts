import { CreateSignatureFormSchema } from '@appTypes/form/CreateSignatureForm/CreateSignatureFormSchema';
import CustomFormMessage from '@utils/constants/form/CustomFormMessage';
import { CountryCode, isSupportedCountry } from 'libphonenumber-js';
import { z } from 'zod';

export const SignatureResponseSchema = CreateSignatureFormSchema.extend({
  id: z.number(),
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
    .nullable()
});

export type TSignatureResponse = z.infer<typeof SignatureResponseSchema>;
