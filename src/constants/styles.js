import { createGlobalStyle } from 'styled-components';
import styled from '@mui/material/styles/styled';
import {
  Typography,
  Modal,
  keyframes,
  TextField,
  Fab,
  Box,
  Button,
  Checkbox,
} from '@mui/material';

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

const AboutPageContainer = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30vw',
  backgroundColor: '#FED206',
  padding: 20,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  ['@media (max-width:1400px)']: {
    width: '40vw',
  },

  ['@media (max-width:900px)']: {
    width: '60vw',
  },

  ['@media (max-width:900px)']: {
    width: '80vw',
  },
}));

const FloatButton = styled(Fab)(() => ({
  margin: 0,
  backgroundColor: '#FED206',
}));

const BlackButton = styled(Button)(() => ({
  backgroundColor: 'black',
  color: 'white',
  fontWeight: 700,

  '&:hover': {
    backgroundColor: 'black',
    color: '#FED206',
  },
}));

const welcomeModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40vw',
  fontSize: 13,
  bgcolor: '#FED206',
  boxShadow: 24,
  p: 3,
  pt: 6,
  pb: 6,
  ['@media (max-Width:1000px)']: {
    width: '60vw',
  },
  ['@media (max-Width:400px)']: {
    width: '80vw',
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

  ['@media (max-width:700px)']: {
    width: '70vw',
    justifyContent: 'center',
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

const StyledModal = styled(Modal)((props) => ({
  overlay: {
    backgroundColor: '#ffffff',
  },
}));

export {
  GlobalStyle,
  welcomeModalStyle,
  gridModalStyle,
  AboutPageContainer,
  Title,
  Summary,
  StyledModal,
  BlackButton,
  FloatButton,
};
