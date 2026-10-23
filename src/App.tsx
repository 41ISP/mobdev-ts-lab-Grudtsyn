import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import PaymentsPage from "./pages/PaymentsPage"
import CategoriesPage from "./pages/CategoriesPage"

export default function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<PaymentsPage />} />
                <Route path="categories" element={<CategoriesPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    )
}
