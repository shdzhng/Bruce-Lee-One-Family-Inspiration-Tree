import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from 'react';
import axios from 'axios';
import { ForceGraph2D } from 'react-force-graph';
import { nodeData, linkData } from '../data';
import { US, TW, ES, IT, DE, FR } from 'country-flag-icons/react/3x2';
import {
  Box,
  Typography,
  CircularProgress,
  Backdrop,
  AppBar,
  Zoom,
  Button,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  Container,
  FormControlLabel,
  FormControl,
  MenuItem,
  Select,
  Fade,
} from '@mui/material';
import { useWindowSize } from '@react-hook/window-size';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  welcomeModalStyle,
  gridModalStyle,
  InputContainer,
  StyledModal,
  Title,
  InputField,
  SubscriptionCheckBox,
  Summary,
  SubmitButton,
} from '../../constants/styles';
import message from '../../constants/message';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { FloatButton } from '../../constants/styles';

export function Graph() {
  const [width, height] = useWindowSize();
  const fgRef = useRef();
  const [graphData, setGraphData] = useState({
    nodes: nodeData,
    links: linkData,
  });
  const [description, setDescription] = useState(null);
  const [visitorData, setVisitorData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subscription: true,
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [name, setName] = useState(null);
  const [summary, setSummary] = useState(null);
  const [openDescriptionModal, setOpenDescriptionModal] = React.useState(false);
  const [openLandingModal, setOpenLandingModal] = React.useState(false);
  const [openAddModal, setAddModal] = React.useState(false);
  const [bionicMode, setBionicMode] = React.useState(false);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    setTimeout(() => {
      setOpenLandingModal(true);
    }, 300);
  }, []);

  const handleClose = () => {
    setOpenDescriptionModal(false);
    setOpenLandingModal(false);
    setAddModal(false);

    setTimeout(() => {
      setDescription(null);
      setName(null);
      setThumbnail(null);
      setSummary(null);
    }, 500);
  };

  const handleSubmit = () => {
    console.log(visitorData);
    setAddModal(false);
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    if (id === 'subscription') {
      setVisitorData({
        ...visitorData,
        subscription: !visitorData.subscription,
      });
      return;
    }
    setVisitorData({
      ...visitorData,
      [id]: value,
    });
  };

  const handleAdd = () => {
    setAddModal(true);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const fetchData = useCallback(
    (name, language) => {
      const formattedName = name.split(' ').join('_');

      axios({
        method: 'get',
        url: `https://${language}.wikipedia.org/api/rest_v1/page/summary/${formattedName}`,
      })
        .then(({ data }) => {
          if (bionicMode === true && language === 'en') {
            const formattedDescrip = data.extract
              .split(' ')
              .map((word) => {
                const halfLength = Math.ceil(word.length / 2);
                if (halfLength > 1) {
                  return `<strong>${word.slice(
                    0,
                    halfLength
                  )}</strong>${word.slice(halfLength, word.length)}`;
                }
                return word;
              })
              .join(' ');

            setDescription({ __html: formattedDescrip });
          } else {
            setDescription(data.extract);
          }
          setSummary(data.description);
          setThumbnail(data.thumbnail);
        })
        .catch((err) => {
          fetchData(name, 'en');
        });
    },
    [bionicMode]
  );

  const handleClick = async (e) => {
    setName(e.id);
    await fetchData(e.id, language);
    setOpenDescriptionModal(true);
  };

  return (
    <Box>
      <AppBar position="static" style={{ background: '#FED206' }}>
        <Container maxWidth="xl" sx={{ height: height * 0.07 }}>
          <Toolbar
            disableGutters
            sx={{
              display: { xs: 'flex', md: 'flex' },
              mr: 1,
              justifyContent: 'space-between',
            }}
          >
            <SportsMartialArtsIcon style={{ fill: 'Black' }} />

            <Box sx={{ display: 'flex' }}>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setBionicMode((bionicMode) => !bionicMode);
                }}
              >
                {language !== 'en' ? null : bionicMode ? (
                  <VisibilityIcon style={{ fill: 'Black' }} />
                ) : (
                  <VisibilityOffIcon style={{ fill: 'Black' }} />
                )}
              </Button>
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
                INFO
              </Button>

              <FormControl>
                <Select
                  variant="standard"
                  labelId="language-select-label"
                  id="language-select"
                  value={language}
                  label="Language"
                  onChange={handleLanguageChange}
                  disableUnderline
                >
                  <MenuItem value={'en'}>
                    <US title="English" />
                  </MenuItem>
                  <MenuItem value={'zh'}>
                    <TW title="繁体中文" />
                  </MenuItem>
                  <MenuItem value={'es'}>
                    <ES title="Español" />
                  </MenuItem>
                  <MenuItem value={'it'}>
                    <IT title="Italiano" />
                  </MenuItem>
                  <MenuItem value={'fr'}>
                    <FR title="Français" />
                  </MenuItem>
                  <MenuItem value={'de'}>
                    <DE title="Deutsch" />
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <StyledModal
        open={openAddModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        disableAutoFocus={true}
      >
        <Fade in={openAddModal} timeout={300}>
          <InputContainer>
            <FormControl>
              <InputField
                id="firstName"
                placeholder="First Name"
                value={visitorData.firstName}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              ></InputField>
              <InputField
                id="lastName"
                placeholder="Last Name"
                value={visitorData.lastName}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              ></InputField>
              <InputField
                id="email"
                placeholder="Email"
                value={visitorData.email}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              ></InputField>
              <FormControlLabel
                control={
                  <SubscriptionCheckBox
                    style={{
                      color: 'black',
                    }}
                    checked={visitorData.subscription}
                    id="subscription"
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                  />
                }
                label="Subscribe to CHSA Newsletter"
              />
              <SubmitButton
                onClick={() => {
                  handleSubmit();
                }}
              >
                Submit
              </SubmitButton>
            </FormControl>
          </InputContainer>
        </Fade>
      </StyledModal>

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
          <Box sx={gridModalStyle}>
            <Box id="modal-modal-description" sx={{ mt: 2 }}>
              <Title id="modal-modal-title" variant="h5" component="h1">
                {name ? name : 'WIP'}
              </Title>

              <Typography sx={{ mt: 0, fontStyle: 'italic', fontSize: 13 }}>
                {summary === 'Topics referred to by the same term'
                  ? null
                  : summary}
              </Typography>
              {bionicMode && language === 'en' ? (
                <Summary dangerouslySetInnerHTML={description} />
              ) : (
                <Summary> {description} </Summary>
              )}
            </Box>

            <Box alignContent="center" alignItems="center">
              {thumbnail ? (
                <img
                  src={thumbnail.source}
                  width={200}
                  alt={`${name}'s portrait`}
                />
              ) : (
                <img
                  src={
                    'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
                  }
                  width={200}
                  alt={`${name}'s portrait`}
                />
              )}
            </Box>
          </Box>
        </Fade>
      </StyledModal>

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
          <Box sx={welcomeModalStyle}>
            <Typography>{message.p1[language]}</Typography>
            <Typography
              sx={{
                mt: 2,
                p: 1,
                backgroundColor: 'black',
                fontSize: 12,
                color: '#FED206',
                fontStyle: 'italic',
              }}
            >
              {message.p2[language]}
            </Typography>

            <Typography sx={{ mt: 2 }}>{message.p3[language]}</Typography>

            <List
              sx={{
                mt: 2,
                fontSize: 12,
                color: '#FED206',
                backgroundColor: 'black',
              }}
              dense={true}
              disablePadding={true}
            >
              <ListItem>
                <ListItemText>
                  <Typography sx={{ fontSize: 'inherit', color: 'inherit' }}>
                    {message.list.p1[language]}
                  </Typography>
                </ListItemText>
              </ListItem>

              <ListItem>
                <ListItemText>
                  <Typography sx={{ fontSize: 'inherit' }}>
                    {message.list.p2[language]}
                  </Typography>
                </ListItemText>
              </ListItem>

              <ListItem>
                <ListItemText>
                  <Typography sx={{ fontSize: 'inherit' }}>
                    {message.list.p3[language]}
                  </Typography>
                </ListItemText>
              </ListItem>
            </List>

            <Typography sx={{ mt: 2, fontStyle: 'italic', fontSize: 10 }}>
              {message.p4[language]}
            </Typography>
          </Box>
        </Fade>
      </StyledModal>

      <ForceGraph2D
        graphData={graphData}
        minZoom={2}
        maxZoom={5}
        ref={fgRef}
        width={width}
        height={height * 0.93}
        backgroundColor="black"
        onNodeDragEnd={(node) => {
          node.fx = node.x;
          node.fy = node.y;
          node.fz = node.z;
        }}
        nodePointerAreaPaint={(node, color, ctx) => {
          ctx.fillStyle = color;
          const bckgDimensions = node.__bckgDimensions;
          bckgDimensions && ctx.beginPath();
          ctx.arc(node.x, node.y, 15, 0, 2 * Math.PI, false);
          ctx.fill();
        }}
        onNodeClick={(e) => {
          handleClick(e);
        }}
        linkLabel={(link) => `${link.source.id} & ${link.target.id}`}
        linkColor={({ source, target }) => {
          if (source.id === 'Bruce Lee' || target.id === 'Bruce Lee')
            return '#FED206';
          return 'gray';
        }}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node[language];
          const color = node.color;
          const fontSize =
            label === 'Bruce Lee' ? 12 / globalScale : 11 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          const textWidth = ctx.measureText(label).width;
          const bckgDimensions = [textWidth, fontSize].map(
            (n) => n + fontSize * 0.2
          );

          ctx.fillStyle = color;

          ctx.beginPath();
          ctx.arc(
            node.x,
            node.y,
            node.id === 'Bruce Lee' ? 15 : 5,
            0,
            2 * Math.PI,
            false
          );
          ctx.fill();

          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = label === 'Bruce Lee' ? 'black' : 'white';
          ctx.fillText(label, node.x, node.y);

          node.__bckgDimensions = bckgDimensions;
        }}
      ></ForceGraph2D>

      <FloatButton
        variant="extended"
        onClick={() => {
          handleAdd();
        }}
      >
        <PersonAddIcon />
        <Typography sx={{ ml: 2 }}>Add Me</Typography>
      </FloatButton>
    </Box>
  );
}
