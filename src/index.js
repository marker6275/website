import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css';
import Home from './pages/Home';
import Music from './pages/Music';
import Contact from './pages/Contact';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/music',
    element: <Music/>
  },
  {
    path: '/contact',
    element: <Contact/>
  }
])
const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);