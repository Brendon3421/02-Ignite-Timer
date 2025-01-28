import { Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home"
import { History } from "./pages/History"
import { DefaultLayout } from "./layouts/DefaultLayout/index"

export function Router() {
    return (
        <Routes>
            <Route path="/02-Ignite-Timer" element={<DefaultLayout />}>
                <Route path="/02-Ignite-Timer" element={<Home />} />
                <Route path="/02-Ignite-Timer/History" element={<History />} />
            </Route>
        </Routes>
    );
}