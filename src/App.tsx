import {BrowserRouter as Router,Routes, Route} from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About us";
import { Header } from "./components/Header";



function App() {
  return (
     <div className="App">
      <Header/>
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path="/about" element={<About/>}/>

        </Routes>
    </div>
  );
}

export default App;
