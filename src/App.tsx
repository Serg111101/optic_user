import {Routes, Route} from "react-router-dom";
import { Home } from "./pages/Home";
import Pay from "./pages/payment/Pay";
import Completion from "./components/cart/Completion";



function App() {

  return (
     <div className="App">

      <Routes>
        <Route path="/" element={<Home/>} />
      <Route path="/pay" element={<Pay/>} />
      <Route path="/Completion" element={<Completion/>} />

        </Routes>
    </div>
  );
}

export default App;
