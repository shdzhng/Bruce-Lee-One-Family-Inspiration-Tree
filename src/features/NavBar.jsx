import React from 'react';
import InfoIcon from '@mui/icons-material/Info';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import { Box, AppBar, Button, Toolbar, Container } from '@mui/material';
import ReactHowler from 'react-howler';

function NavBar({ toggleMute, mute, setOpenLandingModal, height }) {
  return (
    <AppBar position="static" style={{ background: '#FED206' }}>
      <Container maxWidth="xl" sx={{ height: height * 0.07 }}>
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            mr: 1,
            justifyContent: 'flex-end',
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <Button
              onClick={(e) => {
                e.preventDefault();
                setOpenLandingModal(true);
              }}
              sx={{
                fontFamily: 'serif',
                fontWeight: 700,
                color: 'Black',
              }}
            >
              <InfoIcon sx={{ m: 0 }} />
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                toggleMute();
              }}
              sx={{
                fontWeight: 700,
                color: 'Black',
              }}
            >
              {mute ? <VolumeOffIcon /> : <VolumeMuteIcon />}
            </Button>
          </Box>
        </Toolbar>
      </Container>
      <ReactHowler
        src="https://www.mboxdrive.com/bruceleeremix.mp3"
        playing={mute}
        loop={true}
        volume={0.5}
      />
    </AppBar>
  );
}

export default NavBar;
