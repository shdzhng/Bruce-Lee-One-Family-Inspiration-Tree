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
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { CircularProgress } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';

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

const modalStyles = {
  overlay: {
    backgroundColor: '#ffffff',
  },
};

export function Graph() {
  const fgRef = useRef();
  const [graphData, setGraphData] = useState({
    nodes: nodeData,
    links: linkData,
  });
  const [description, setDescription] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleClose = () => {
    setDescription(null);
    setOpen(false);
  };

  useEffect(() => {
    console.log(description?.parse?.title);
  }, [description]);

  const fetchData = useCallback((name) => {
    axios({
      method: 'get',
      url:
        'https://en.wikipedia.org/w/api.php?' +
        new URLSearchParams({
          origin: '*',
          action: 'parse',
          prop: 'text',
          page: name,
          format: 'json',
        }),
    }).then(({ data }) => {
      console.log(data);
      setDescription(data);
    });
  }, []);

  const handleClick = async (e) => {
    setLoading(true);
    setOpen(true);
    await fetchData(e.id);
  };

  const renderModal = () => {
    if (description) {
      return (
        <>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {/* {description.parse.title ? description.parse.title : 'WIP'} */}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Work in Progress
          </Typography>
        </>
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
      <Modal
        closeTimeoutMS={500}
        open={open}
        onClose={handleClose}
        style={modalStyles}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>{renderModal()}</Box>
        </Fade>
      </Modal>

      <ForceGraph2D
        graphData={graphData}
        minZoom={2}
        maxZoom={10}
        ///
        ref={fgRef}
        cooldownTime={Infinity}
        d3AlphaDecay={0}
        ///
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
      />
    </>
  );
}
