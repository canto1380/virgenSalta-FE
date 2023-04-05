import "./App.css";
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
      <div className="navbar-container">
        <Nav />
      </div>
      <AppRouter />
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
