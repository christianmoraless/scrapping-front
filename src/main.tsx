import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from './shared-theme/AppTheme';
import { Router } from './routes';

createRoot(document.getElementById('root')!).render(
  <AppTheme >
    <CssBaseline enableColorScheme />
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </AppTheme>
)
