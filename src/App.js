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

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
