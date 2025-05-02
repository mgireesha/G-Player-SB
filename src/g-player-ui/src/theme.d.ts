// src/theme.d.ts
import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypeBackground {
    player?: string;
  }

  interface Palette {
    background: TypeBackground;
  }

  interface PaletteOptions {
    background?: Partial<TypeBackground>;
  }
}
