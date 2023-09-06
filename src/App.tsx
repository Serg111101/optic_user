import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About us";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Themes } from "./pages/Themes";
import { Contact } from "./components/Contact";
// import { Login } from "./pages/login";
import { ClipandLendStyles } from "./pages/ClipandLendStyles";
import Pay from "./pages/payment/Pay";
import Completion from "./components/cart/Stripe/Completion";
import StripeChechkout from "./components/cart/Stripe/StripeChechkout";
import OrderingInformation from "./pages/OrderingInformation";
import { useEffect, useState } from "react";
import { Commit } from "./components/commit";
import {CommentOutlined } from "@ant-design/icons"
import { NotFound } from "./components/notFound";
import Rate from "./pages/Shipent/Rate";
import { HeaderTask } from "./components/headerTask";
import { Employees } from "./pages/Employees";
import { Tasks } from "./pages/Tasks";
import { EmployeesProfil } from "./pages/EmployeesProfil";
import { LoginTask } from "./pages/LoginTask";
import { HomeTask } from "./pages/HomeTask";

function App() {
  const otherpro: any = localStorage.getItem("path");
  const [commit, setCommit] = useState(false);
  const [active, setActive] = useState( otherpro === "true" || false);
  const url = window.location.pathname;
  const urll = window.location.href;
  useEffect(() => {
    if (!window.location.pathname.includes("ttaasskkss")  && otherpro) {
      localStorage.setItem("path", "false");
    } else  {
      localStorage.setItem("path","true");
    }

    if (localStorage.getItem("path")) {
      setActive(JSON.parse(otherpro));
    }
    
  }, [url,urll]);


  return (
    <div className="App">
      {
        <>
          {!active && (
            <>
              {
                <div
                  className={commit ? "aaa" : "a"}
                  onClick={() => {
                    setCommit(false);
                  }}
                >
                  {commit && <Commit setCommit={setCommit} />}
                </div>
              }
              <Header />
              <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path="/" element={<Home />} />
                <Route path="/pay" element={<Pay />} />
                <Route path="/about" element={<About />} />
                {/* <Route path="/login" element={<Login />} /> */}
                <Route path="/contact" element={<Contact />} />
                <Route path="/Completion" element={<Completion />} />
                <Route path="/Stripe" element={<StripeChechkout />} />

                <Route path="/terms-and-conditions" element={<Themes />} />
                <Route
                  path="/Orderinginformation"
                  element={<OrderingInformation />}
                />
                <Route
                  path="/ClipandLendStyles"
                  element={<ClipandLendStyles />}
                />
                <Route path="/Rate" element={<Rate />} />
              </Routes>
              <Footer />

              <div
                className="commit"
                onClick={() => {
                  setCommit(true);
                }}
              >
                <CommentOutlined /> <p>Leave a review</p>
              </div>
            </>
          )}
          {/* /////////////////////////Tasks///////// */}

          {active && (
            <>
              <HeaderTask />
              <Routes>
                <Route path="/ttaasskkss" element={<HomeTask />} />
                <Route path="employees/ttaasskkss" element={<Employees />} />
                <Route path="tasks/ttaasskkss" element={<Tasks />} />
                <Route
                  path="/employeesProfil/ttaasskkss/:id"
                  element={<EmployeesProfil />}
                />
                <Route path="LoginTask/ttaasskkss" element={<LoginTask />} />
              </Routes>
            </>
          )}
        </>
      }
    </div>
  );
}

export default App;
