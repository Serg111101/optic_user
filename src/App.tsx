import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About us";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Themes } from "./pages/Themes";
import { Contact } from "./components/Contact";
import { Login } from "./pages/login";
import {ClipandLendStyles} from './pages/ClipandLendStyles'
import Pay from "./pages/payment/Pay";
import Completion from "./components/cart/Completion";
import OrderingInformation from "./pages/OrderingInformation";
import { Commit } from "./components/commit";
import { useState } from "react";
import { CommentOutlined } from "@ant-design/icons";



import {Aaa} from './components/aaa'

function App() {

  const [commit,setCommit]=useState(false)  
  
  
  return (
    <div className="App">
      {<div className={commit?"aaa":"a"} onClick={()=>setCommit(false)}>{commit && <Commit setCommit={setCommit} />}</div>}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Completion" element={<Completion />} />
        <Route path="/terms-and-conditions" element={<Themes />} />
        <Route path="/Orderinginformation" element={<OrderingInformation />} />
        <Route path="/ClipandLendStyles" element={<ClipandLendStyles/>}/>
        <Route path="/aaa" element={<Aaa/>}/>
      </Routes>
      <div className="commit" onClick={()=>setCommit(true)}> <CommentOutlined /> <p>Leave a review</p></div>
      <Footer />
    </div>
  );
}

export default App;