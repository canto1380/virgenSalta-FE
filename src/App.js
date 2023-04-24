import "./App.css";
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
      <AppRouter />

    </div>
  );
}

export default App;
