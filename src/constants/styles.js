import { createGlobalStyle } from 'styled-components';
import styled from '@mui/material/styles/styled';
import { Typography, Modal, keyframes } from '@mui/material';

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    padding: 0px;
    margin: 0px;
    width: 100vw;
    height: 100vh;
    position:relative;
    background-color: whitesmoke;
    min-width: 415px;
    min-height: 790px;
}`;

const welcomeModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#FED206',
  boxShadow: 24,
  p: 4,
  ['@media (max-width:500px)']: {
    bgcolor: 'orange',
    width: '75vw',
    gridTemplateColumns: `repeat(1, 1fr)`,
  },
};

const gridModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50vw',
  bgcolor: '#FED206',
  boxShadow: 24,
  p: 4,
  display: 'grid',
  columnGap: 3,
  rowGap: 1,
  gridTemplateColumns: '2fr 1fr',

  ['@media (max-width:800px)']: {
    bgcolor: 'red',
    width: '75vw',
    gridTemplateColumns: `repeat(1, 1fr)`,
  },
};

const Title = styled(Typography)(() => ({
  color: 'black',
  textDecoration: 'underline',

  ['@media (max-width:900px)']: {
    fontSize: '20px',
  },
}));

const Summary = styled(Typography)(() => ({
  color: 'black',
  marginTop: '1em',
  ['@media (max-width:900px)']: {
    fontSize: '14px',
  },
}));

const StyledModal = styled(Modal)(() => ({
  overlay: {
    backgroundColor: '#ffffff',
  },
  animation: `${fadeIn} 0.75s ease-in-out both`,
}));

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export {
  GlobalStyle,
  welcomeModalStyle,
  gridModalStyle,
  Title,
  Summary,
  StyledModal,
  fadeIn,
};
