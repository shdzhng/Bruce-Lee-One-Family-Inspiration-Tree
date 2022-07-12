import React from 'react';
import {
  Box,
  Typography,
  Backdrop,
  CircularProgress,
  Fade,
} from '@mui/material';
import {
  StyledModal,
  Title,
  Summary,
  WikiPageContainer,
} from '../constants/styles';

function WikiInfoModal({ openDescriptionModal, handleClose, modalData, name }) {
  return (
    <StyledModal
      open={openDescriptionModal}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      disableAutoFocus={true}
    >
      <Fade timeout={500} in={openDescriptionModal}>
        <WikiPageContainer>
          <Box sx={{ mt: 2 }}>
            <Title>{name ? name : <CircularProgress />}</Title>
            <Summary sx={{ mt: 0, fontStyle: 'italic', fontSize: '0.85em' }}>
              {modalData.summary ? modalData.summary : null}
            </Summary>
            <Summary>
              {modalData.description ? (
                modalData.description
              ) : (
                <CircularProgress />
              )}
            </Summary>
          </Box>
        </WikiPageContainer>
      </Fade>
    </StyledModal>
  );
}

export default WikiInfoModal;
