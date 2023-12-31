import { createBrowserRouter, Navigate } from 'react-router-dom';
import { GitApp } from '../GitApp';
import { IssueView, ListViewInfinite, ListViewPage } from '../issues/views';


export const router = createBrowserRouter([
  {
    path: '/issues',
    element: <GitApp />,
    children: [
        { path: 'list', element: <ListViewPage />,  },
        { path: 'list/infinite', element: <ListViewInfinite /> },
        { path: 'issue/:id', element: <IssueView /> },
        { path: '*', element: <Navigate to="list" /> },
    ]
  },
  {
    path: '/',
    element: <Navigate to="issues/list" />
  },
  {
    path: '*',
    element: <h1>Not found</h1>,
  },
]);

