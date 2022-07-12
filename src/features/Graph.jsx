import React, { useRef, useCallback } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import { graphData } from '../constants/data';
function Graph({ setOpenDescriptionModal, setName, width, height }) {
  const fgRef = useRef();

  const handleNodeClick = useCallback(async (e) => {
    setName(e.id);
    setOpenDescriptionModal(true);
  }, []);

  return (
    <ForceGraph2D
      graphData={graphData}
      minZoom={2}
      maxZoom={5}
      ref={fgRef}
      width={width}
      height={height * 0.93}
      backgroundColor="#000000"
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
      onNodeDragEnd={(node) => {
        node.fx = node.x;
        node.fy = node.y;
        node.fz = node.z;
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
  );
}

export default React.memo(Graph);
