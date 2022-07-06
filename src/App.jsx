import React, { useState, useEffect } from 'react';
import { Graph } from './features/graph';
import { GlobalStyle } from './constants/styles';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  setDoc,
} from 'firebase/firestore';
import config from './firebase/firebase.config';
// import { nodeData, linkData } from './features/data';

function App() {
  const [nodeData, setNodeData] = useState(null);
  const [linkData, setLinkData] = useState(null);
  const app = initializeApp(config);
  const db = getFirestore(app);
  const nodeDataRef = collection(db, 'nodeData');
  const linkDataRef = collection(db, 'linkData');

  // useEffect(() => {
  //   getDocs(nodeDataRef)
  //     .then((snapshot) => {
  //       const returnedArray = [];
  //       snapshot.docs.forEach((snapshot) => {
  //         returnedArray.push(snapshot.data());
  //       });
  //       setNodeData(returnedArray);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });

  //   getDocs(linkDataRef)
  //     .then((snapshot) => {
  //       const returnedArray = [];
  //       snapshot.docs.forEach((snapshot) => {
  //         returnedArray.push(snapshot.data());
  //       });
  //       setLinkData(returnedArray);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // }, []);

  // useEffect(() => {
  //   console.log(nodeData);
  //   console.log(linkData);
  // }, [nodeData, linkData]);

  return (
    <>
      <GlobalStyle />
      <Graph />
    </>
  );
}

export default App;
