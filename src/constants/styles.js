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
  width: '35vw',
  backgroundColor: '#FED206',
  padding: '2em',
  fontSize: 16,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  ['@media (max-width:1400px)']: {
    width: '40vw',
    fontSize: 15,
  },

  ['@media (max-width:900px)']: {
    width: '60vw',
    fontSize: 13,
  },

  ['@media (max-width:300px)']: {
    width: '80vw',
    fontSize: 9,
  },
}));

const WelcomePageContainer = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50vw',
  fontSize: 16,
  backgroundColor: '#FED206',
  boxShadow: 24,
  padding: '2em',

  ['@media (max-Width:1000px)']: {
    width: '60vw',
    fontSize: 12,
  },
  ['@media (max-Width:400px)']: {
    width: '80vw',
    fontSize: 10,
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

const WikiPageContainer = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40vw',
  backgroundColor: '#FED206',
  boxShadow: 24,
  padding: '2em',
  rowGap: 1,

  fontSize: 14,

  ['@media (max-width:900px)']: {
    width: '60vw',
    justifyContent: 'center',
    fontSize: 12,
  },
  ['@media (max-width:600px)']: {
    width: '70vw',
    justifyContent: 'center',
    fontSize: 10,
  },
}));

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
  fontSize: 14,

  ['@media (max-width:900px)']: {
    width: '60vw',
    justifyContent: 'center',
    fontSize: 12,
  },
  ['@media (max-width:600px)']: {
    width: '70vw',
    justifyContent: 'center',
    fontSize: 10,
    gridTemplateColumns: `repeat(1, 1fr)`,
  },
};

const Title = styled(Typography)(() => ({
  color: 'black',
  fontSize: '1.5em',
}));

const Summary = styled(Typography)(() => ({
  color: 'black',
  marginTop: '1em',
  fontSize: '1em',
}));

const StyledModal = styled(Modal)((props) => ({
  overlay: {
    backgroundColor: '#ffffff',
  },
}));

export {
  GlobalStyle,
  gridModalStyle,
  AboutPageContainer,
  Title,
  Summary,
  StyledModal,
  BlackButton,
  WelcomePageContainer,
  FloatButton,
  WikiPageContainer,
};
