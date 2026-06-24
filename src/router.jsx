import { createBrowserRouter } from 'react-router-dom';

import RootLayout           from './layouts/RootLayout';
import ErrorPage            from './components/ErrorPage';

import ApplicationList      from './pages/ApplicationList';
import NewApplication       from './pages/NewApplication';
import ApplicationDetail    from './pages/ApplicationDetail';
import MemoPage             from './pages/MemoPage';

import { rootLoader }                from './loaders/rootLoader';
import { applicationDetailLoader }   from './loaders/applicationDetailLoader';
import { memoLoader }                from './loaders/memoLoader';

import { newApplicationAction }      from './actions/newApplicationAction';
import { editApplicationAction }     from './actions/editApplicationAction';
import { memoAction }                from './actions/memoAction';

const router = createBrowserRouter([
  {
    id:           'root',
    path:         '/',
    element:      <RootLayout />,
    loader:       rootLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        index:        true,
        element:      <ApplicationList />,
        errorElement: <ErrorPage />,
      },
      {
        path:         'new',
        element:      <NewApplication />,
        action:       newApplicationAction,
        errorElement: <ErrorPage />,
      },
      {
        path:         'applications/:id',
        element:      <ApplicationDetail />,
        loader:       applicationDetailLoader,
        action:       editApplicationAction,
        errorElement: <ErrorPage />,
      },
      {
        path:         'memo',
        element:      <MemoPage />,
        loader:       memoLoader,
        action:       memoAction,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

export default router;
