import React from 'react';
import {
  StyledModal,
  BlackButton,
  AboutPageContainer,
} from '../constants/styles';
import {
  Box,
  Typography,
  CircularProgress,
  Backdrop,
  Fade,
} from '@mui/material';

function AboutModal({ openAboutModal, handleClose }) {
  return (
    <StyledModal
      open={openAboutModal}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      disableAutoFocus={true}
    >
      <Fade in={openAboutModal} timeout={300}>
        <AboutPageContainer>
          <Typography sx={{ fontWeight: 900, fontSize: '2em' }}>
            Mission
          </Typography>
          <Typography sx={{ my: 'inherit', fontSize: 'inherit' }}>
            The Chinese Historical Society of America collects, preserves, and
            illuminates the history of Chinese in America by serving as a center
            for research, scholarship and learning to inspire a greater
            appreciation for, and knowledge of, their collective experience
            through exhibitions, public programs, and any other means for
            reaching the widest audience.
          </Typography>
          <Typography sx={{ mt: 1, fontSize: 'inherit' }}>
            When founded in 1963, there were fewer than 250,000 people of
            Chinese descent living in the US and CHSA was a lone voice for the
            study and dissemination of the history of this segment of the US
            population. Today, as the number of Chinese in the US has risen to
            nearly 5 million, CHSA strives to be a responsible steward of the
            remarkable narrative of this rapidly growing and increasingly
            visible community.
          </Typography>
          <BlackButton
            target="_blank"
            href="https://chsa.org/"
            sx={{
              bgcolor: 'black',
              color: 'white',
              fontWeight: 700,
              mt: '2em',
              px: '2em',
            }}
          >
            Visit Website
          </BlackButton>
        </AboutPageContainer>
      </Fade>
    </StyledModal>
  );
}

export default AboutModal;
