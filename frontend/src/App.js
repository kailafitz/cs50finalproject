
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

// Import pages
import { Test } from "./Pages/Test"
import { Home } from "./Pages/Home"
import { Verbs } from "./Pages/Verbs";

// Import components
import { Navigation } from "./Components/Navigation";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/test" element={<Test />}></Route>
          <Route path="/addverb" element={<Verbs />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;