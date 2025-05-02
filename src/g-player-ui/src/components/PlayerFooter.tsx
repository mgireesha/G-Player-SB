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
    VolumeUp,
  } from '@mui/icons-material';
  import { useState } from 'react';

  
  const PlayerFooter = () => {
    //useNowPlayingStatus(); // start polling
    //useNowPlaying();

    // const {
    //     currentTime,
    //     currentVolume,
    //     isPlaying,
    //     trackLength
    //   } = usePlayerStore();

    //  console.log("trackLength : ",trackLength)

    const theme = useTheme();
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(40); // %
    const [volume, setVolume] = useState(70);
  
    const togglePlay = () => setPlaying((prev:boolean) => !prev);
    console.log("theme",theme)
    
  
    return (
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 80,
          backgroundColor: theme.palette.background.player,
          borderTop: `1px solid ${theme.palette.divider}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          zIndex: 2000,
        }}
      >
        {/* LEFT: Song Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', width: '25%' }}>
          <img
            src="/placeholder-cover.jpg"
            alt="Album Art"
            style={{ width: 56, height: 56, borderRadius: 4, marginRight: 12 }}
          />
          <Box>
            <Typography variant="subtitle2" noWrap>
              Adisi Nodu Beelisi Nodu
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              Dr. Rajkumar
            </Typography>
          </Box>
        </Box>
  
        {/* CENTER: Controls + Progress */}
        <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton><SkipPrevious /></IconButton>
            <IconButton onClick={togglePlay} sx={{ border: '1px solid', borderRadius: '50%' }}>
              {playing ? <Pause /> : <PlayArrow />}
            </IconButton>
            <IconButton><SkipNext /></IconButton>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mt: 1 }}>
            <Typography variant="caption">1:32</Typography>
            <Slider
              
              value={progress}
              onChange={(_, val) => setProgress(val as number)}
              sx={{ mx: 2, flexGrow: 1 }}
            />
            <Typography variant="caption">3:54</Typography>
          </Box>
        </Box>
  
        {/* RIGHT: Volume */}
        <Box sx={{ width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
          <VolumeUp />
          <Slider
            size="small"
            value={volume}
            onChange={(_, val) => setVolume(val as number)}
            sx={{ width: 100 }}
          />
        </Box>
      </Box>
    );
  };
  
  export default PlayerFooter;
  