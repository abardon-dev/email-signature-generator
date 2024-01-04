import { TSignatureResponse } from '@appTypes/response/SignatureResponse';
import { EmailSignature } from '@components/global/EmailSignature/EmailSignature';
import { DeleteForever, ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Stack,
  Typography
} from '@mui/material';
import { Arrays } from '@utils/ArrayUtils';
import { Link } from 'react-router-dom';
import styles from './SignatureList.module.scss';

type SignatureListProps = {
  signatures: Readonly<TSignatureResponse[]>;
  onDelete: (id: number) => void;
  onDeleteAll: () => void;
};

export const SignatureList = ({ signatures, onDelete, onDeleteAll }: SignatureListProps) => {
  if (Arrays.isEmpty(signatures)) {
    return (
      <Typography variant="body1" color="text.secondary">
        No email signature was found, you can create one by clicking <Link to={'/create'}>here</Link>
      </Typography>
    );
  }

  return (
    <Grid container direction={'column'} alignItems={'flex-end'} gap={2}>
      <Stack direction={'row'} alignItems={'center'} spacing={1}>
        <Link to="/create">
          <Button variant="contained" color={'primary'}>
            Create new one
          </Button>
        </Link>
        <Button variant="outlined" color="error" startIcon={<DeleteForever />} onClick={onDeleteAll}>
          Delete all
        </Button>
      </Stack>
      <Grid item container direction={'column'}>
        {signatures.map((signature) => (
          <Accordion key={signature.id}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              id={`signature-${signature.id}-header`}
              aria-controls={`signature-${signature.id}-content`}
            >
              <Typography>{`${signature.lastName} ${signature.firstName} - ${signature.jobTitle}`}</Typography>
            </AccordionSummary>

            <AccordionDetails className={styles.accordionDetails}>
              <EmailSignature signature={signature} state="read" />
            </AccordionDetails>

            <AccordionActions>
              <Button color="error" startIcon={<DeleteForever />} onClick={() => onDelete(signature.id)}>
                Delete
              </Button>
            </AccordionActions>
          </Accordion>
        ))}
      </Grid>
    </Grid>
  );
};
