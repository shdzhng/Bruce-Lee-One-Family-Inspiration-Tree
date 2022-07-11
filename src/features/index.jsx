import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from 'react';
import axios from 'axios';
import { ForceGraph2D } from 'react-force-graph';
import { nodeData, linkData } from '../constants/data';
import InfoIcon from '@mui/icons-material/Info';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import { useWindowSize } from '@react-hook/window-size';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import {
  Box,
  Typography,
  CircularProgress,
  Backdrop,
  AppBar,
  Button,
  Toolbar,
  Container,
  Fade,
} from '@mui/material';
import ReactHowler from 'react-howler';
import {
  AboutPageContainer,
  StyledModal,
  WelcomePageContainer,
  Title,
  Summary,
  WikiPageContainer,
  BlackButton,
  FloatButton,
} from '../constants/styles';

const defaultGraphData = {
  nodes: nodeData,
  links: linkData,
};

function Graph() {
  const [name, setName] = useState(null);
  const [graphData, setGraphData] = useState(defaultGraphData);
  const [modalData, setModalData] = useState({
    thumbnail: null,
    description: null,
    summary: null,
  });
  const [openDescriptionModal, setOpenDescriptionModal] = React.useState(false);
  const [openLandingModal, setOpenLandingModal] = React.useState(false);
  const [openAboutModal, setAboutModal] = React.useState(false);

  const [mute, setMute] = useState(false);
  const fgRef = useRef();
  const [width, height] = useWindowSize();

  useEffect(() => {
    setTimeout(() => {
      setOpenLandingModal(true);
    }, 300);
  }, []);

  const toggleMute = useCallback(() => {
    setMute(!mute);
  }, []);

  const handleClose = useCallback(() => {
    setOpenDescriptionModal(false);
    setOpenLandingModal(false);
    setAboutModal(false);

    setTimeout(() => {
      setModalData({
        thumbnail: null,
        description: null,
        summary: null,
      });
    }, 500);
  }, []);

  const data = useMemo(() => {
    const returnedData = {};

    nodeData.map(async (node) => {
      const unformattedName = node.id;
      const formattedName = unformattedName.split(' ').join('_');
      axios({
        method: 'get',
        url: `https://en.wikipedia.org/api/rest_v1/page/summary/${formattedName}`,
      })
        .then(({ data }) => {
          returnedData[unformattedName] = data;
        })
        .catch((err) => {
          console.log(err);
        });
    });

    return returnedData;
  }, []);

  const setCurrentData = useCallback((name) => {
    const dataPackage = {
      thumbnail: data[name].thumbnail.source,
      description: data[name].extract,
      summary: data[name].description,
    };
    setModalData(dataPackage);
  }, []);

  const handleNodeClick = useCallback(async (e) => {
    setName(e.id);
    setCurrentData(e.id);
    setOpenDescriptionModal(true);
  }, []);

  return (
    <Box>
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
      </AppBar>

      {/* about modal */}
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
              illuminates the history of Chinese in America by serving as a
              center for research, scholarship and learning to inspire a greater
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

      {/* wiki info modal */}
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

      {/* welcome modal */}
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
              Bruce Lee's attitude and outlook on life, success, martial arts
              and how he went on to inspire generations to come.
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
              "I, Bruce Lee, am a man who never follows these formulas of the
              fear mongers. So, no matter if your color is black or white, red
              or blue, I can still make friends with you without any barriers" -
              Bruce Lee
              <br />
              <br />
              “Under the sky, under the heavens there is but one family.” -
              Bruce Lee
            </Typography>

            <Typography sx={{ fontSize: 'inherit' }}>
              This digital exhibition encourages you to keep in mind the theme
              of “under the heavens there is but one family” as you explore the
              rich diversity of perspectives that Bruce Lee sought to understand
              across racial, ethnic, sexuality, religious, citizenship, and
              political differences. This exhibit also further traces the
              influence/legacy network of those who influenced him.
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
                - LINES: Yellow lines connect to Bruce Lee directly, whereas
                white lines have no direct association.
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

      <ForceGraph2D
        /// basic settings ///
        graphData={graphData}
        minZoom={2}
        maxZoom={5}
        ref={fgRef}
        width={width}
        height={height * 0.93}
        backgroundColor="#000000"
        /// Link Settings///
        linkLabel={(link) => `${link.source.id} - ${link.target.id}`}
        linkColor={({ source, target }) => {
          if (source.id === 'Bruce Lee' || target.id === 'Bruce Lee')
            return '#FED206';
          return 'gray';
        }}
        linkWidth={1}
        linkLineDash={({ source, target }) => {
          if (source.id === 'Bruce Lee' || target.id === 'Bruce Lee') return [];
          return [2, 2];
        }}
        linkDirectionalParticles={({ source, target }) => {
          if (source.id === 'Bruce Lee' || target.id === 'Bruce Lee') return 10;
        }}
        linkDirectionalParticleSpeed={0.002}
        linkDirectionalParticleWidth={2.5}
        linkDirectionalParticleResolution={40}
        nodePointerAreaPaint={(node, color, ctx) => {
          ctx.fillStyle = color;
          const bckgDimensions = node.__bckgDimensions;
          bckgDimensions && ctx.beginPath();
          ctx.arc(node.x, node.y, 15, 0, 2 * Math.PI, false);
          ctx.fill();
        }}
        onNodeClick={(e) => {
          handleNodeClick(e);
        }}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.id;
          const color = `${node.id === 'Bruce Lee' ? '#FED206' : '	#5e4d08'}`;
          const fontSize =
            label === 'Bruce Lee' ? 16 / globalScale : 12 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          const textWidth = ctx.measureText(label).width;
          const bckgDimensions = [textWidth, fontSize].map(
            (n) => n + fontSize * 0.4
          );
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(
            node.x,
            node.y,
            node.id === 'Bruce Lee' ? 20 : 5,
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
      />

      <FloatButton
        sx={{
          right: 20,
          bottom: 20,
          left: 'auto',
          position: 'fixed',
          top: 'auto',
        }}
        variant="extended"
        onClick={() => {
          setAboutModal(true);
        }}
      >
        <AccountBalanceRoundedIcon />
        <Typography sx={{ ml: 1 }}>About CHSA</Typography>
      </FloatButton>
      <ReactHowler
        src="https://www.mboxdrive.com/bruceleeremix.mp3"
        playing={mute}
        loop={true}
        volume={0.5}
      />
    </Box>
  );
}

export default Graph;
