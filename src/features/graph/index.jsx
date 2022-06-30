import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { ForceGraph2D } from 'react-force-graph';
import { nodeData, linkData } from '../data';

const colorEnum = {
  1: 'yellow',
  2: 'green',
  3: 'red',
};

export function Graph() {
  const graphData = {
    nodes: nodeData,
    links: linkData,
  };

  useEffect(() => {
    fetchData('Jiddu Krishnamurti');
  }, []);

  const fetchData = useCallback((name) => {
    axios({
      method: 'get',
      url:
        'https://en.wikipedia.org/w/api.php?' +
        new URLSearchParams({
          origin: '*',
          action: 'parse',
          prop: 'wikitext',
          page: name,
          format: 'json',
        }),
    }).then(({ data }) => {
      // console.log(data.parse.wikitext['*']);
    });
  }, []);

  console.log(graphData);

  return (
    <>
      <ForceGraph2D
        graphData={graphData}
        backgroundColor="white"
        nodeOpacity="1"
        nodeAutoColorBy={(d) => colorEnum[d.group]}
        linkAutoColorBy={(d) => colorEnum[d.group]}
        onNodeDragEnd={(node) => {
          node.fx = node.x;
          node.fy = node.y;
          node.fz = node.z;
        }}
        linkLabel={(link) => `${link.source.id} -> ${link.target.id}`}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.id;

          // ctx.beginPath();
          // ctx.arc(node.x, node.y, 10, 0, 2 * Math.PI, false);
          // ctx.fill();

          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          const textWidth = ctx.measureText(label).width;
          const bckgDimensions = [textWidth, fontSize].map((n) => {
            return n + fontSize * 0.75;
          });

          ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
          ctx.fillRect(
            node.x - bckgDimensions[0] / 2,
            node.y - bckgDimensions[1] / 2,
            ...bckgDimensions
          );

          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = node.color;
          ctx.fillText(label, node.x, node.y);

          node.__bckgDimensions = bckgDimensions;
        }}
      />
    </>
  );
}
