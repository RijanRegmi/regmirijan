import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from './SignUp.jsx';
import Login from './Login.jsx';
import Home from './Home.jsx';
import Lens from './Lens.jsx';

function App() {
  return(
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Home" element={<Home/>} />
          <Route path="/Lens" element={<Lens />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
