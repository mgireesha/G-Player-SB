import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';

export const CustomThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const mode = useSelector((state: RootState) => state.theme.mode);

  const theme = createTheme({
    palette: {
      mode,
      background: {
        default: mode === 'dark' ? '#121212' : '#fafafa',
        paper: mode === 'dark' ? '#1e1e1e' : '#fff',
        player: '#0f2862'
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
