import { createTheme } from "@mui/material";

export const muiGlobalTheme = createTheme({
    palette: {
      primary: {
        main: '#410606',
      },
      secondary: {
        main: '#7b1818',
      },
    },
    typography: {
        fontFamily: [
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ].join(','),
      },
  });