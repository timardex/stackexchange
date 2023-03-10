import { createTheme } from "@mui/material/styles";

export default function Theme() {
  return createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#00A1CE',
      },
      background: {
        default: '#323232',
        paper: '#212121',
      },
    },
  });
};