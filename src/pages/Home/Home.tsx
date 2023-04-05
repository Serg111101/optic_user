import { Header } from "../../components/Header";
import "./Home.scss";
import { useCallback, useEffect, useRef, useState } from 'react';
import { Galery } from "../../components/Galery";

export  function Home() {


  return (
    <div className="home" >
      <h1 className="hello" >WELCOME TO BEST OPTIC LAB, INC</h1>
      <Galery />





      </div>
  )
}
