import { Route, Routes } from "react-router-dom";
import MainDashboard from "../pages/MainDashboard";
import Dashboard from "../pages/Dashboard";
import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import WrongPage from "../pages/WrongPage";

const CustomRoutes = () => {
    return (
        <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path="/login" element={<Login />} />

            <Route exact path="/private" element={<MainDashboard />}>
                <Route exact path="/private/dashboard" element={<Dashboard />} />
            </Route>
            <Route exact path="*" element={<WrongPage />} />
        </Routes>
    );
};

export default CustomRoutes;
