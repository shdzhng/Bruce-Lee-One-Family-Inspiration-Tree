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
import {
  Box,
  Typography,
  CircularProgress,
  Backdrop,
  Fade,
  Modal,
  keyframes,
} from '@mui/material';
import styled from '@mui/material/styles/styled';
import { useWindowSize } from '@react-hook/window-size';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#FED206',
  boxShadow: 24,
  p: 4,
};

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Title = styled(Typography)(() => ({
  color: 'black',
  textDecoration: 'underline',
}));

const Summary = styled(Typography)(() => ({
  color: 'black',
}));

const StyledModal = styled(Modal)(() => ({
  overlay: {
    backgroundColor: '#ffffff',
  },
  animation: `${fadeIn} 0.75s ease-in-out both`,
}));

export function Graph() {
  const [width, height] = useWindowSize();
  const fgRef = useRef();
  const [graphData, setGraphData] = useState({
    nodes: nodeData,
    links: linkData,
  });
  const [description, setDescription] = useState(null);
  const [name, setName] = useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setDescription(null);
    setOpen(false);
  };

  const fetchData = useCallback((name) => {
    const formattedName = name.split(' ').join('_');
    axios({
      method: 'get',
      url: `https://en.wikipedia.org/api/rest_v1/page/summary/${formattedName}`,
    }).then(({ data }) => {
      setDescription(data.extract);
    });
  }, []);

  const handleClick = async (e) => {
    setName(e.id);
    setOpen(true);
    await fetchData(e.id);
  };

  const renderModal = () => {
    if (description) {
      return (
        <Box>
          <Title id="modal-modal-title" variant="h4" component="h1">
            {name ? name : 'WIP'}
          </Title>
          <Summary id="modal-modal-description" sx={{ mt: 2 }}>
            {description ? description : 'WIP'}
          </Summary>
        </Box>
      );
    }

    return (
      <Box
        style={{ display: 'flex', color: 'grey.500', justifyContent: 'center' }}
      >
        <CircularProgress color="inherit" />
      </Box>
    );
  };

  return (
    <>
      <StyledModal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        disableAutoFocus={true}
      >
        <Box sx={style}>{renderModal()}</Box>
      </StyledModal>

      <ForceGraph2D
        graphData={graphData}
        minZoom={2}
        maxZoom={10}
        ref={fgRef}
        width={width}
        height={height}
        backgroundColor="black"
        onNodeDragEnd={(node) => {
          node.fx = node.x;
          node.fy = node.y;
          node.fz = node.z;
        }}
        nodeColor={(node) => {
          if (node.id === 'Bruce Lee') return '#FED206';
          return 'gray';
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
            label === 'Bruce Lee' ? 20 / globalScale : 12 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          const textWidth = ctx.measureText(label).width;
          const bckgDimensions = [textWidth, fontSize].map(
            (n) => n + fontSize * 0.2
          );

          ctx.fillStyle = label === 'Bruce Lee' ? '#FED206' : 'gray';
          ctx.fillRect(
            node.x - bckgDimensions[0] / 2,
            node.y - bckgDimensions[1] / 2,
            ...bckgDimensions
          );

          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = label === 'Bruce Lee' ? 'black' : 'black';
          ctx.fillText(label, node.x, node.y);

          node.__bckgDimensions = bckgDimensions;
        }}
      ></ForceGraph2D>
    </>
  );
}
