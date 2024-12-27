import Navbar from "./components/layout/Navbar";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BusinessesPage from "./pages/BusinessesPage";
import { Toaster } from "./components/ui/toaster";
import LoginPage from "./pages/LoginPage";
import BusinessDetailsPage from "./pages/BusinessDetailsPage";
import CreateBusinessPage from "./pages/CreateBusinessPage";
import ProfilePage from "./pages/ProfilePage";
import { SocketProvider } from "./context/socketContext";

const App = () => {
  return (
    <div>
      <Toaster />
      <SocketProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/businesses" element={<BusinessesPage />} />
          <Route path="/create-business" element={<CreateBusinessPage />} />
          <Route path="/businesses/:id" element={<BusinessDetailsPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
        </Routes>
      </SocketProvider>
    </div>
  );
};

export default App;
