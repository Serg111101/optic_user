import {BrowserRouter as Router,Routes, Route} from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About us";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import OrderingInformation from "./pages/OrderingInformation";
import { Themes } from "./pages/Themes";
import { Contact } from "./components/Contact";



function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Orderinginformation" element={<OrderingInformation />} />
        <Route path="/terms-and-conditions" element={<Themes />} />
        <Route path="contact" element={<Contact/>}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
