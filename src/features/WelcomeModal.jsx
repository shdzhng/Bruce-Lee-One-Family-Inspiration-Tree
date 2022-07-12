import React from 'react';
import { Box, Typography, Backdrop, Fade } from '@mui/material';
import { StyledModal, WelcomePageContainer } from '../constants/styles';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

function WelcomeModal({ openLandingModal, setOpenLandingModal }) {
  return (
    <StyledModal
      open={openLandingModal}
      onClose={() => {
        setOpenLandingModal(false);
      }}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      disableAutoFocus={true}
    >
      <Fade in={openLandingModal} timeout={400}>
        <WelcomePageContainer>
          <Typography sx={{ fontSize: 'inherit' }}>
            Hello and Welcome to this digital exhibition of ideas that shaped
            Bruce Lee's attitude and outlook on life, success, martial arts and
            how he went on to inspire generations to come.
          </Typography>

          <Typography
            sx={{
              my: 2,
              p: 2,
              fontSize: '0.8em',
              color: '#FED206',
              backgroundColor: 'black',
            }}
          >
            "I, Bruce Lee, am a man who never follows these formulas of the fear
            mongers. So, no matter if your color is black or white, red or blue,
            I can still make friends with you without any barriers" - Bruce Lee
            <br />
            <br />
            “Under the sky, under the heavens there is but one family.” - Bruce
            Lee
          </Typography>

          <Typography sx={{ fontSize: 'inherit' }}>
            This digital exhibition encourages you to keep in mind the theme of
            “under the heavens there is but one family” as you explore the rich
            diversity of perspectives that Bruce Lee sought to understand across
            racial, ethnic, sexuality, religious, citizenship, and political
            differences. This exhibit also further traces the influence/legacy
            network of those who influenced him.
            <br />
            <br />
            There will be names that you do not expect to see. This exhibit
            encourages you to embrace the discomfort and ponder the theme "one
            family".
          </Typography>

          <Box
            sx={{
              my: 2,
              p: 2,
              fontSize: '0.8em',
              color: '#FED206',
              backgroundColor: 'black',
            }}
          >
            <Typography sx={{ fontSize: 'inherit' }}>
              - LINES: Yellow lines connect to Bruce Lee directly, whereas white
              lines have no direct association.
            </Typography>
            <Typography sx={{ mt: 2, fontSize: 'inherit' }}>
              - All name bubbles are interactive (click for pop-up & drag to
              move).
            </Typography>
            <Typography sx={{ mt: 2, fontSize: 'inherit' }}>
              - Click <VolumeOffIcon sx={{ fontSize: '1.5em' }} /> to toggle
              sound
            </Typography>
          </Box>

          <Typography sx={{ mt: 2, fontStyle: 'italic', fontSize: '0.7em' }}>
            The intention of this online exhibition is not to completely
            represent any person's life experiences but rather to serve as a
            proof of concept. <br />
            If you wish to contribute to this project, email
            shoud.zhang@gmail.com
          </Typography>
        </WelcomePageContainer>
      </Fade>
    </StyledModal>
  );
}

export default WelcomeModal;
