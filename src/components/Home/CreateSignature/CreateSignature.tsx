import { FieldErrors, FormProvider, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateSignatureFormContent } from './CreateSignatureFormContent/CreateSignatureFormContent';
import {
  TCreateSignatureFormData,
  createSignatureFormDefaultValues,
  CreateSignatureFormSchema
} from '@appTypes/form/CreateSignatureForm/CreateSignatureFormSchema';
import { Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { storeSignature } from '@api/indexedDB/SignatureAPI';
import { EmailSignature } from '@components/global/EmailSignature/EmailSignature';

export const CreateSignature = () => {
  const navigate = useNavigate();

  const formMethods = useForm<TCreateSignatureFormData>({
    defaultValues: createSignatureFormDefaultValues,
    mode: 'onChange',
    resolver: zodResolver(CreateSignatureFormSchema)
  });

  const currentSignatureData: TCreateSignatureFormData = formMethods.watch();

  const goToHomepage = () => {
    navigate('/');
  };

  const goToSignatureList = () => {
    navigate('/list');
  };

  const handleFormSubmit: SubmitHandler<TCreateSignatureFormData> = (newSignatureData: TCreateSignatureFormData) => {
    storeSignature(newSignatureData).then(() => {
      goToSignatureList();
    });
  };

  const handleInvalidFormSubmit: SubmitErrorHandler<TCreateSignatureFormData> = (
    errors: FieldErrors<TCreateSignatureFormData>
  ) => {
    console.debug('Invalid form submission', errors);
    toast.error('The form could not be submitted due to missing mandatory fields or invalid data');
  };

  return (
    <FormProvider {...formMethods}>
      <form
        id="create-signature-form"
        noValidate
        onSubmit={formMethods.handleSubmit(handleFormSubmit, handleInvalidFormSubmit)}
      >
        <Stack gap={2} alignItems={'center'}>
          <CreateSignatureFormContent />
          <EmailSignature signature={currentSignatureData} state="build" />
          <Stack direction={'row'} gap={2}>
            <Button variant="outlined" onClick={goToHomepage}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Generate
            </Button>
          </Stack>
        </Stack>
      </form>
    </FormProvider>
  );
};
