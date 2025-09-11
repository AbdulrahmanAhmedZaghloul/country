import { useState } from "react";
import InfoCountry from "./components/InfoCountry";
import Navbar from "./components/Navbar";
import DetailsCountry from "./components/DetailsCountry";
import Map from "./components/Map";
import Contact from "./components/Contact";
import Home from "./pages/Home";
import CityNews from "./components/CityNews";

function App() {
  const [selectedCountry , setSelectedCountry] = useState("");

  return (
    <div>
      <Navbar />
      <Home setSelectedCountry={setSelectedCountry} />
      {selectedCountry && <InfoCountry country={selectedCountry} />}
      {selectedCountry && <DetailsCountry country={selectedCountry} />}
      {selectedCountry && <Map country={selectedCountry} />}
      {selectedCountry && <CityNews country={selectedCountry} />}
      {/* < /> */}
      {selectedCountry && <Contact country={selectedCountry} />}

    </div>
  );
}

export default App;

