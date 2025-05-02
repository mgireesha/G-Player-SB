import {
    Box,
    Typography,
    IconButton,
    Slider,
    useTheme,
  } from '@mui/material';
  import {
    PlayArrow,
    Pause,
    SkipNext,
    SkipPrevious,
    MusicNote,
  } from '@mui/icons-material';
  import { useState } from 'react';
  
  const NowPlayingBar = () => {
    const theme = useTheme();
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(30); // fake progress
  
    const togglePlay = () => setPlaying((prev) => !prev);
  
    return (
      <Box
        id="giri"
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          backgroundColor: theme.palette.background.player,
          borderTop: `1px solid ${theme.palette.divider}`,
          px: 2,
          py: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 1200,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <MusicNote sx={{ mr: 1 }} />
          <Box>
            <Typography variant="subtitle2">Adisi Nodu Beelisi Nodu</Typography>
            <Typography variant="caption" color="text.secondary">
              Dr. Rajkumar
            </Typography>
          </Box>
        </Box>
  
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton><SkipPrevious /></IconButton>
          <IconButton onClick={togglePlay}>
            {playing ? <Pause /> : <PlayArrow />}
          </IconButton>
          <IconButton><SkipNext /></IconButton>
        </Box>
  
        <Box sx={{ width: 200, mx: 2 }}>
          <Slider
            size="small"
            value={progress}
            onChange={(_, value) => setProgress(value as number)}
          />
        </Box>
      </Box>
    );
  };
  
  export default NowPlayingBar;
  