import * as React from 'react';
import { Routes, Route } from "react-router-dom";

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from "@mui/material/styles";

import { Theme } from './helpers';

import { Home, User } from './views';

const App: React.FC<{}> = () => {
  return (
    <React.Fragment>
      <ThemeProvider theme={Theme()}>
        <CssBaseline />
        <Box style={{ maxWidth: '1360px', margin: 'auto', padding: '0 1rem'}}>
          <Routes>
            <Route
              path={'/'}
              element={<Home/>}
            />
            <Route
              path={'/user/:userId'}
              element={<User/>}
            />
          </Routes>
        </Box>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
