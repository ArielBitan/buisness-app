import Navbar from "./components/layout/Navbar";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BusinessesPage from "./pages/BusinessesPage";
import { Toaster } from "./components/ui/toaster";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <div>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/businesses" element={<BusinessesPage />} />
      </Routes>
    </div>
  );
};

export default App;
