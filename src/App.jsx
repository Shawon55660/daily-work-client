import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";

import Private from "./routes/Private";
import Test from "./pages/Test";



function App() {
  return (
    <div className="min-h-screen">
    
      
      <Routes>
        
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/task-dashboard" element={<Private><Test></Test></Private>}></Route>
      </Routes>
    </div>
  );
}

export default App;
