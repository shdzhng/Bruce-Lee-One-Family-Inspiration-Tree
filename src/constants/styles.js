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

const InputField = styled(TextField)(() => ({
  margin: 2,

  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: 'black',
    },
  },
}));

const InputContainer = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '25vw',
  backgroundColor: '#FED206',
  padding: 20,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  ['@media (max-width:800px)']: {
    bgcolor: 'red',
  },
}));

const SubscriptionCheckBox = styled(Checkbox)(() => ({
  margin: 1,

  '.MuiCheckbox-colorPrimary.Mui-checked': { color: 'red !important' },

  '&.Mui-checked': {},
}));

const FloatButton = styled(Fab)(() => ({
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 20,
  left: 'auto',
  position: 'fixed',
  backgroundColor: '#FED206',
}));

const SubmitButton = styled(Button)(() => ({
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

////
const GridModalContainer = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50vw',
  backgroundColor: '#FED206',
  boxShadow: 24,
  p: 4,
  display: 'grid',
  columnGap: 3,
  rowGap: 1,
  gridTemplateColumns: '2fr 1fr',

  ['@media (max-width:800px)']: {
    backgroundColor: 'red',
    width: '75vw',
    gridTemplateColumns: `repeat(1, 1fr)`,
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

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const StyledModal = styled(Modal)((props) => ({
  overlay: {
    backgroundColor: '#ffffff',
  },
}));

export {
  GlobalStyle,
  welcomeModalStyle,
  gridModalStyle,
  InputContainer,
  Title,
  Summary,
  StyledModal,
  SubmitButton,
  fadeIn,
  GridModalContainer,
  FloatButton,
  InputField,
  SubscriptionCheckBox,
};
