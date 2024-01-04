import { deleteAllSignatures, deleteSignatureById, getAllSignatures } from '@api/indexedDB/SignatureAPI';
import { TSignatureResponse } from '@appTypes/response/SignatureResponse';
import { SignatureList } from '@components/SignatureList/SignatureList';
import { Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export const SignatureListPage = () => {
  const [signatures, setSignatures] = useState<Readonly<TSignatureResponse[]>>([]);

  useEffect(() => {
    const fetchSignatures = async () => {
      setSignatures(await getAllSignatures());
    };

    fetchSignatures();
  }, []);

  return (
    <Stack spacing={2}>
      <Typography variant="h3" component={'h1'}>
        List of your signatures
      </Typography>
      <SignatureList
        signatures={signatures}
        onDelete={(id: number) => {
          deleteSignatureById(id).then(() => setSignatures(signatures.filter((signature) => signature.id !== id)));
        }}
        onDeleteAll={() => deleteAllSignatures().then(() => setSignatures([]))}
      />
    </Stack>
  );
};
