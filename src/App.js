import { useEffect, useState } from "react";
import "./App.css";
import { getToken } from "./helpers/helpers";
import AppRouter from "./routes/AppRouter";
// import { IntlProvider, FormattedMessage } from "react-intl";
// import MensajeUS from "./utils/lang/en-us.json";

function App() {
  const [tokenAuth, setTokenAuth] = useState([]);
const [bandera, setBandera] = useState(false)

  useEffect(() => {
    const tokenData = getToken()
    setTokenAuth(tokenData);
  }, [bandera]);

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
      <AppRouter bandera={bandera} setBandera={setBandera} token={tokenAuth}/>

    </div>
  );
}

export default App;
