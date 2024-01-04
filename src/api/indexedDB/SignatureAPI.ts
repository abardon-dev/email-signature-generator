import { TCreateSignatureFormData } from '@appTypes/form/CreateSignatureForm/CreateSignatureFormSchema';
import { SignatureResponseSchema, TSignatureResponse } from '@appTypes/response/SignatureResponse';
import { DBSchema, IDBPDatabase, openDB } from 'idb';
import toast from 'react-hot-toast';
import { z } from 'zod';

interface StorageDB extends DBSchema {
  signatures: {
    value: TCreateSignatureFormData;
    key: number;
  };
}

const dbName = 'StorageDB';
const signatureStore = 'signatures';

const openStorageDB = (): Promise<IDBPDatabase<StorageDB>> => {
  return openDB<StorageDB>(dbName, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(signatureStore)) {
        db.createObjectStore(signatureStore, { keyPath: 'id', autoIncrement: true });
      }
    }
  }).catch((error) => {
    console.debug('Error opening database:', error);
    toast.error('Communication error with the database has occurred. Please try again');
    throw error;
  });
};

/**
 * Store a new signature in the database
 *
 * @param signature the new signature to store
 * @returns a {@link Promise} with the id of the stored signature
 */
export const storeSignature = async (signature: TCreateSignatureFormData): Promise<number> => {
  const db = await openStorageDB();

  const tx = db.transaction(signatureStore, 'readwrite');
  const objectStore = tx.objectStore(signatureStore);

  return objectStore
    .add(signature)
    .then((id: number) => {
      toast.success('Signature saved');
      return id;
    })
    .catch((error) => {
      console.debug(`Error storing signature : ${signature}`, error);
      toast.error('Something went wrong while storing the signature.');
      throw error;
    });
};

/**
 * Retrieve all the stored signatures from the database
 *
 * @returns a {@link Promise} with an array of {@link TSignatureResponse}
 */
export const getAllSignatures = async (): Promise<Readonly<TSignatureResponse[]>> => {
  const db = await openStorageDB();

  const tx = db.transaction(signatureStore, 'readonly');
  const objectStore = tx.objectStore(signatureStore);

  return objectStore
    .getAll()
    .then(z.array(SignatureResponseSchema).parse)
    .catch((error) => {
      console.debug('Error retrieving signatures:', error);
      toast.error('Something went wrong while retrieving the signatures.');
      throw error;
    });
};

/**
 * Delete a signature using its id
 *
 * @param id id of the signature
 * @returns a {@link Promise} of void
 */
export const deleteSignatureById = async (id: number): Promise<void> => {
  const db = await openStorageDB();

  const tx = db.transaction(signatureStore, 'readwrite');
  const objectStore = tx.objectStore(signatureStore);

  return objectStore
    .delete(id)
    .then(() => {
      toast.success('Signature deleted');
    })
    .catch((error) => {
      console.debug(`Error deleting signature with this id : ${id}`, error);
      toast.error('Something went wrong while deleting the signature.');
      throw error;
    });
};

/**
 * Delete all signatures
 *
 * @returns a {@link Promise} of void
 */
export const deleteAllSignatures = async (): Promise<void> => {
  const db = await openStorageDB();

  const tx = db.transaction(signatureStore, 'readwrite');
  const objectStore = tx.objectStore(signatureStore);

  return objectStore
    .clear()
    .then(() => {
      toast.success('All signatures has been deleted');
    })
    .catch((error) => {
      console.debug('Error deleting all signatures', error);
      toast.error('Something went wrong while deleting all the signatures.');
      throw error;
    });
};
