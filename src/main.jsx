
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import AuthProvider from "./provider/AuthProvider";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


const queryClient  = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
 <BrowserRouter>
<DndProvider backend={HTML5Backend}><QueryClientProvider client={queryClient}> <AuthProvider>
 <App />
  <ToastContainer/>

  </AuthProvider></QueryClientProvider></DndProvider>
 </BrowserRouter>
);
