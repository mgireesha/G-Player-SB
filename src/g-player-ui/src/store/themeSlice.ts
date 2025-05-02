// src/store/themeSlice.ts
import { createSlice } from '@reduxjs/toolkit';

type ThemeMode = 'light' | 'dark';

const getInitialTheme = (): ThemeMode => {
  const saved = localStorage.getItem('theme-mode');
  return (saved === 'dark' || saved === 'light') ? saved : 'dark';
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: getInitialTheme(),
  },
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme-mode', state.mode);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
