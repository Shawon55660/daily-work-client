import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

import Private from "./routes/Private";



function App() {
  return (
    <div className="min-h-screen p-4">
    
      
      <Routes>
        <Route path="/" element={<Private><Home></Home></Private>} />
        <Route path="/login" element={<Login></Login>}></Route>
      </Routes>
    </div>
  );
}

export default App;
