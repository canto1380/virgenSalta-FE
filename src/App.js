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
// import { IntlProvider, FormattedMessage } from "react-intl";
// import MensajeUS from "./utils/lang/en-us.json";

function App() {
  return (
    <div className="App">
      {/* <IntlProvider locale="en-US" messages={MensajeUS}> */}
      {/* <p>
        <FormattedMessage id="app.welcome" defaultMessage="Santuario" />
      </p> */}
        <Router>
          <div>
            <Nav />
          </div>
          <Routes>
            <Route exact path="/home" element={<Home />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
          <div>
            <Footer />
          </div>
        </Router>
      {/* </IntlProvider> */}
    </div>
  );
}

export default App;
