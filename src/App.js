import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import Home from "./components";
import Footer from "./components/Footer";
import Nav from "./components/Navbar";
import AppRouter from "./routes/AppRouter";
// import { IntlProvider, FormattedMessage } from "react-intl";
// import MensajeUS from "./utils/lang/en-us.json";

function App() {
  return (
    // <div className="App">
    //     <Router>
    //       <div>
    //         <Nav />
    //       </div>
    //       <Routes>
    //         <Route exact path="/home" element={<Home />} />
    //         <Route path="*" element={<Navigate to="/home" replace />} />
    //       </Routes>
    //       <div>
    //         <Footer />
    //       </div>
    //     </Router>
    // </div>
    <div className="App">
      <div>
        <Nav />
      </div>
      <AppRouter />
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
