import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About us";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import OrderingInformation from "./pages/OrderingInformation";
import { Themes } from "./pages/Themes";
import { Contact } from "./components/Contact";
>>>>>>>>> Temporary merge branch 2



function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
<<<<<<<<< Temporary merge branch 1
        <Route path="/" element={<Home/>} />
      <Route path="/pay" element={<Pay/>} />
      <Route path="/Completion" element={<Completion/>} />

        </Routes>
=========
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Orderinginformation" element={<OrderingInformation />} />
        <Route path="/terms-and-conditions" element={<Themes />} />
        <Route path="contact" element={<Contact/>}/>
      </Routes>
      <Footer />
>>>>>>>>> Temporary merge branch 2
    </div>
  );
}

export default App;
