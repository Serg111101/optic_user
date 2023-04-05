import "./Home.scss";
import { useCallback, useEffect, useRef, useState } from 'react';
import { Galery } from "../../components/Galery";

export  function Home() {


  return (
      <div className="home" >
        <Galery/>
      </div>
  )
}
