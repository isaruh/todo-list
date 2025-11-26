import { Route, Routes } from "react-router-dom";
import Todos from "../pages/Todos";
import Layout from "../components/Layout";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Todos />} />
            </Route>
        </Routes>
    );
}