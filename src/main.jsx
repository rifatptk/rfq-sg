import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-tailwind/react';
import { MaterialTailwindControllerProvider } from '@/context';
import './tailwind.css';
import AuthProvider from './context/authContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <BrowserRouter>
    <ThemeProvider>
      <MaterialTailwindControllerProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <App />
            <ToastContainer position="top-center" draggable />
            <ReactQueryDevtools initialIsOpen={false} />
          </AuthProvider>
        </QueryClientProvider>
      </MaterialTailwindControllerProvider>
    </ThemeProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
