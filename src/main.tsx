import 'react-toastify/dist/ReactToastify.css';

import { App } from "./App";
import { createRoot } from 'react-dom/client'
import { AuthContextProvider } from './contexts/auth-context'
import { ToastContainer } from "react-toastify";
import { APIContextProvider } from './contexts/api-context';

createRoot(document.getElementById('root')!).render(
  <APIContextProvider>
    <AuthContextProvider>
      <ToastContainer
        closeOnClick
        theme="dark"
        autoClose={6000}
        newestOnTop={true}
        closeButton={false}
        position='top-right'
        hideProgressBar={false}
      />

      <App />
    </AuthContextProvider>
  </APIContextProvider>
);
