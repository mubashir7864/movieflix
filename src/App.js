import React, { useState } from 'react';
import './App.css';
import Banner from './Components/banner/Banner';
import Navbar from './Components/Navbar/NavBar';
import Poster from './Components/Rowposter/Poster';
import { Uaction, Ucomedy, Uhorror, Uoriginals, Uromance } from './Components/constants/urls'
import {scrolle} from './Scrolle'

function App() {
  const [name , setName]=useState(()=>JSON.parse(localStorage.getItem("str")) || [])
  const [list , setMylist]=useState(false)
  const displayList = () => {
    setMylist(!list);
    console.log(" h "+list)
  }
  return (
    <div className="App">
      <Navbar />
      <Banner  name={name} setName={setName} Mylist={list} display={displayList} />
      <Poster  name={name} setName={setName} title="Netflix Originals" URL={Uoriginals}  id='Originals'/>
      <Poster  name={name} setName={setName} title="Action Movies" isSmall={true} URL={Uaction} id='Action'/>
      <Poster  name={name} setName={setName} title="Comedy Movies" isSmall={true} URL={Ucomedy} id='Comedy'/>
      <Poster  name={name} setName={setName} title="Horror Movies" isSmall={true} URL={Uhorror} id='Horror' />
      <Poster  name={name} setName={setName} title="Romance Movies" isSmall={true} URL={Uromance} id="Romance" />


    </div>
  );
}

export default App;
