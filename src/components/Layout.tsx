import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className="flex flex-col w-full min-h-screen items-center bg-[#cdcfd1]">
            <main className="flex-1 w-full h-screen px-40 py-10">
                <Outlet />
            </main>
        </div>
    );
}