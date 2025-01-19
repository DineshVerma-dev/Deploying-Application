

// import Home from "./pages/home";

// function App() {
//   return (
//     <div>
//       <Home />
//     </div>
//   );
// }

// export default App;



import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Intro from './Intro';
import Home from './pages/home';  

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Intro />} /> {/* Landing Page */}
                <Route path="/home" element={<Home />} /> {/* Upload Page */}
            </Routes>
        </Router>
    );
}

export default App;

