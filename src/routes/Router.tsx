import { CreateSignaturePage } from '@pages/CreateSignature/CreateSignaturePage';
import { HomePage } from '@pages/Home/HomePage';
import { Layout } from '@pages/Layout';
import { SignatureListPage } from '@pages/SignatureList/SignatureListPage';
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

export const router = () => {
  return createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateSignaturePage />} />
        <Route path="/list" element={<SignatureListPage />} />
      </Route>
    )
  );
};
