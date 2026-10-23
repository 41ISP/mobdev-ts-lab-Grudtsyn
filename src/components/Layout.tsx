import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className="page">
            <h1 className="brand">
                <span>СРОК</span>
            </h1>
            <nav className="tabs" aria-label="Разделы">
                <NavLink to="/" end className="tab">
                    Платежи
                </NavLink>
                <NavLink to="/categories" className="tab">
                    По категориям
                </NavLink>
            </nav>
            <Outlet />
        </div>
    );
}
