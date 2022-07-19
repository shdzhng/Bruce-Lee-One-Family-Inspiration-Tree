import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { GlobalStyle } from './constants/styles';
import Graph from '../src/features/Graph';
import NavBar from './features/NavBar';
import WelcomeModal from './features/WelcomeModal';
import AboutModal from './features/AboutModal';
import WikiInfoModal from './features/WikiInfoModal';
import axios from 'axios';
import { nodeData } from './constants/data';
import { useWindowSize } from '@react-hook/window-size';

function App() {
  const [name, setName] = useState(null);
  const [openDescriptionModal, setOpenDescriptionModal] = React.useState(false);
  const [openLandingModal, setOpenLandingModal] = React.useState(false);
  const [openAboutModal, setAboutModal] = React.useState(false);
  const [mute, setMute] = useState(false);
  const [width, height] = useWindowSize();
  const [modalData, setModalData] = useState({
    name: null,
    description: null,
    summary: null,
  });

  useEffect(() => {
    setTimeout(() => {
      setOpenLandingModal(true);
    }, 300);
  }, []);

  const toggleMute = () => {
    setMute(!mute);
  };

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

  const setCurrentData = useCallback(
    (name) => {
      const dataPackage = {
        description: data[name].extract,
        summary: data[name].description,
      };
      setModalData(dataPackage);
    },
    [name]
  );

  useEffect(() => {
    if (!name) return;
    setCurrentData(name);
  }, [name]);

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

  return (
    <>
      <GlobalStyle />
      <WikiInfoModal
        handleClose={handleClose}
        modalData={modalData}
        name={name}
        data={data}
        openDescriptionModal={openDescriptionModal}
      />
      <AboutModal handleClose={handleClose} openAboutModal={openAboutModal} />
      <WelcomeModal
        openLandingModal={openLandingModal}
        setOpenLandingModal={setOpenLandingModal}
      />
      <NavBar
        height={height}
        toggleMute={toggleMute}
        mute={mute}
        setOpenLandingModal={setOpenLandingModal}
      />
      <Graph
        setOpenDescriptionModal={setOpenDescriptionModal}
        setName={setName}
        width={width}
        height={height}
      />
    </>
  );
}

export default App;
