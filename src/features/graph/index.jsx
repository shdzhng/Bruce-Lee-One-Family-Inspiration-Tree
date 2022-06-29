import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const myData = {
  nodes: [
    { package: 'react-force-graph', user: 'vasturiano' },
    { package: 'force-graph', user: 'vasturiano' },
    { package: '3d-force-graph', user: 'vasturiano' },
    { package: 'three-render-objects', user: 'vasturiano' },
    { package: '3d-force-graph-vr', user: 'vasturiano' },
    { package: '3d-force-graph-ar', user: 'vasturiano' },
    { package: 'aframe-forcegraph-component', user: 'vasturiano' },
    { package: 'three-forcegraph', user: 'vasturiano' },
    { package: 'd3-force-3d', user: 'vasturiano' },
    { package: 'd3-force', user: 'd3' },
    { package: 'ngraph', user: 'anvaka' },
    { package: 'three.js', user: 'mrdoob' },
    { package: 'aframe', user: 'aframevr' },
    { package: 'AR.js', user: 'jeromeetienne' },
  ],
  links: [
    { target: 'force-graph', source: 'react-force-graph' },
    { target: '3d-force-graph', source: 'react-force-graph' },
    { target: '3d-force-graph-vr', source: 'react-force-graph' },
    { target: '3d-force-graph-ar', source: 'react-force-graph' },
    { target: 'aframe-forcegraph-component', source: '3d-force-graph-vr' },
    { target: 'aframe-forcegraph-component', source: '3d-force-graph-ar' },
    { target: 'three-forcegraph', source: '3d-force-graph' },
    { target: 'three-render-objects', source: '3d-force-graph' },
    { target: 'three-forcegraph', source: 'aframe-forcegraph-component' },
    { target: 'd3-force-3d', source: 'three-forcegraph' },
    { target: 'ngraph', source: 'three-forcegraph' },
    { target: 'd3-force', source: 'force-graph' },
    { target: 'aframe', source: '3d-force-graph-vr' },
    { target: 'three.js', source: 'aframe' },
    { target: 'three.js', source: '3d-force-graph' },
    { target: 'AR.js', source: '3d-force-graph-ar' },
    { target: 'aframe', source: 'AR.js' },
  ],
};

export function Graph() {
  const [nameArr, setNameArr] = useState(['Bruce Lee']);

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

  return (
    <>
      <p>Place Holder</p>
    </>
  );
}
