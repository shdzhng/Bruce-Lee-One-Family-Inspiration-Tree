import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from 'react';
import axios from 'axios';
import { ForceGraph2D, onRenderFramePre } from 'react-force-graph';
import { nodeData, linkData } from '../data';
import {
  Box,
  Typography,
  CircularProgress,
  Backdrop,
  Fade,
  Modal,
  keyframes,
  AppBar,
  Button,
  Item,
} from '@mui/material';
import styled from '@mui/material/styles/styled';
import { useWindowSize } from '@react-hook/window-size';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

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

export function Graph() {
  const [width, height] = useWindowSize();
  const fgRef = useRef();
  const [graphData, setGraphData] = useState({
    nodes: nodeData,
    links: linkData,
  });
  const [description, setDescription] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [name, setName] = useState(null);
  const [summary, setSummary] = useState(null);
  const [openDescriptionModal, setOpenDescriptionModal] = React.useState(false);
  const [openLandingModal, setOpenLandingModal] = React.useState(true);
  const [bionicMode, setBionicMode] = React.useState(false);

  const handleClose = () => {
    setDescription(null);
    setOpenDescriptionModal(false);
  };

  const fetchData = useCallback(
    (name) => {
      const formattedName = name.split(' ').join('_');
      axios({
        method: 'get',
        url: `https://en.wikipedia.org/api/rest_v1/page/summary/${formattedName}`,
      }).then(({ data }) => {
        setSummary(data.description);
        setThumbnail(data.thumbnail);
        if (bionicMode === true) {
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
      });
    },
    [bionicMode]
  );

  const handleClick = async (e) => {
    setName(e.id);
    await fetchData(e.id);
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
                  setOpenLandingModal(true);
                }}
                sx={{
                  fontFamily: 'serif',
                  fontWeight: 700,
                  color: 'Black',
                }}
              >
                ABOUT ME
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setBionicMode((bionicMode) => !bionicMode);
                }}
              >
                {bionicMode ? (
                  <VisibilityIcon style={{ fill: 'Black' }} />
                ) : (
                  <VisibilityOffIcon style={{ fill: 'Black' }} />
                )}
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

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
        <Box sx={gridModalStyle}>
          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            <Title id="modal-modal-title" variant="h5" component="h1">
              {name ? name : 'WIP'}
            </Title>

            <Typography sx={{ mt: 0, fontStyle: 'italic', fontSize: 13 }}>
              {summary}
            </Typography>
            {bionicMode ? (
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
        <Box sx={welcomeModalStyle}>
          <Typography>
            Hello and welcome to this digital exhibition of ideas that shaped
            Bruce Lee's attitude and outlook on life, success, martial arts and
            how he went on to inspire generations to come.
          </Typography>

          <Typography sx={{ mt: 2 }}>
            This digital exhibition encourages you to explore the rich diversity
            of perspectives that Bruce Lee sought to understand across racial,
            ethic, sexual,religious, national, and political differences.
          </Typography>

          <Typography sx={{ mt: 2 }}>
            This exhibition has bionic reading enabled, click on
            <VisibilityIcon style={{ fill: 'Black', fontSize: 'inherit' }} />
            <VisibilityOffIcon
              style={{ fill: 'Black', fontSize: 'inherit' }}
            />{' '}
            at the top right to toggle.
          </Typography>

          <br />
          <Typography sx={{ mt: 2, fontStyle: 'italic', fontSize: 10 }}>
            "I, Bruce Lee, am a man who never follows these formulas of the fear
            mongers. So, no matter if your color is black or white,red or blue,
            I can still make friends with you without any barriers" - Bruce Lee
          </Typography>
        </Box>
      </StyledModal>

      <ForceGraph2D
        graphData={graphData}
        minZoom={2}
        maxZoom={10}
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
        linkLabel={(link) => `${link.source.id} -> ${link.target.id}`}
        linkColor={({ source, target }) => {
          if (source.id === 'Bruce Lee' || target.id === 'Bruce Lee')
            return '#FED206';
          return 'gray';
        }}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.id;
          const fontSize =
            label === 'Bruce Lee' ? 12 / globalScale : 11 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          const textWidth = ctx.measureText(label).width;
          const bckgDimensions = [textWidth, fontSize].map(
            (n) => n + fontSize * 0.2
          );

          ctx.fillStyle = label === 'Bruce Lee' ? '#FED206' : 'gray';

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
    </Box>
  );
}
