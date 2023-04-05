import {BrowserRouter as Router,Routes, Route} from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About us";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";



function App() {
  return (
     <div className="App">
      <Header/>
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path="/about" element={<About/>}/>

      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
