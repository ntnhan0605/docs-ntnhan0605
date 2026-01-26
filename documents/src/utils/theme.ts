import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  defaultColorScheme: 'dark',
  spacing: 4,
  shape: { borderRadius: 8 },
  palette: {
    mode: 'dark',
    primary: { main: '#0a0908', contrastText: '#ffffff' },
    secondary: { main: '#e17100' },
    background: {
      default: '#0a0908',
      paper: '#1a1a1a',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
  },
  typography: {
    htmlFontSize: 16,
    fontFamily: '"Inter", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  components: {},
})
