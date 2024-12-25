import Navbar from "./components/layout/Navbar";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BusinessesPage from "./pages/BusinessesPage";
import { Toaster } from "./components/ui/toaster";
import LoginPage from "./pages/LoginPage";
import BusinessDetailsPage from "./pages/BusinessDetailsPage";
import CreateBusinessPage from "./pages/CreateBusinessPage";

const App = () => {
  return (
    <div>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/businesses" element={<BusinessesPage />} />
        <Route path="/create-business" element={<CreateBusinessPage />} />
        <Route path="/businesses/:id" element={<BusinessDetailsPage />} />
      </Routes>
    </div>
  );
};

export default App;
