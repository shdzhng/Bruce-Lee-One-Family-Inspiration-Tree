import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { ForceGraph2D } from 'react-force-graph';

const colorEnum = {
  1: 'yellow',
  2: 'green',
  3: 'red',
};

export function Graph() {
  const graphData = {
    nodes: [
      { id: 'Myriel', group: 1, color: 'yellow' },
      { id: 'Napoleon', group: 1, color: 'yellow' },
      { id: 'Mlle.Baptistine', group: 1, color: 'yellow' },
      { id: 'Mme.Magloire', group: 1, color: 'yellow' },
      { id: 'CountessdeLo', group: 1, color: 'yellow' },
      { id: 'Geborand', group: 1, color: 'yellow' },
      { id: 'Champtercier', group: 1, color: 'yellow' },
      { id: 'Cravatte', group: 1, color: 'yellow' },
      { id: 'Count', group: 1, color: 'yellow' },
      { id: 'OldMan', group: 1, color: 'yellow' },
      { id: 'Labarre', group: 2, color: 'yellow' },
      { id: 'Valjean', group: 2, color: 'yellow' },
      { id: 'Marguerite', group: 3, color: 'yellow' },
      { id: 'Mme.deR', group: 2, color: 'yellow' },
      { id: 'Isabeau', group: 2, color: 'yellow' },
      { id: 'Gervais', group: 2, color: 'yellow' },
    ],
    links: [
      { source: 'Napoleon', target: 'Myriel', value: 1 },
      { source: 'Mlle.Baptistine', target: 'Myriel', value: 1 },
      { source: 'Mme.Magloire', target: 'Myriel', value: 1 },
      { source: 'Mme.Magloire', target: 'Mlle.Baptistine', value: 1 },
      { source: 'CountessdeLo', target: 'Myriel', value: 1 },
      { source: 'Geborand', target: 'Myriel', value: 1 },
      { source: 'Champtercier', target: 'Myriel', value: 1 },
      { source: 'Cravatte', target: 'Myriel', value: 1 },
      { source: 'Count', target: 'Myriel', value: 1 },
      { source: 'OldMan', target: 'Myriel', value: 1 },
      { source: 'Valjean', target: 'Labarre', value: 1 },
      { source: 'Valjean', target: 'Mme.Magloire', value: 1 },
      { source: 'Valjean', target: 'Mlle.Baptistine', value: 1 },
      { source: 'Valjean', target: 'Myriel', value: 1 },
      { source: 'Marguerite', target: 'Valjean', value: 1 },
      { source: 'Mme.deR', target: 'Valjean', value: 1 },
      { source: 'Isabeau', target: 'Valjean', value: 1 },
      { source: 'Gervais', target: 'Valjean', value: 1 },
    ],
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
        linkDirectionalParticles="value"
        linkDirectionalParticleSpeed={(d) => 0.01}
        linkLabel={(link) => `${link.source.id} -> ${link.target.id}`}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.id;

          ctx.beginPath();
          ctx.arc(node.x, node.y, 10, 0, 2 * Math.PI, false);
          ctx.fill();

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
