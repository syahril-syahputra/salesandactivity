import { AppSidebar } from "./components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Report from "./pages/report";
import Sale from "./pages/sale";
import Activity from "./pages/activity";

export default function App() {
    return (
        <Router>
            <SidebarProvider>
                <AppSidebar />
                <main className="px-4 w-full">
                    <SidebarTrigger />
                    <Routes>
                        <Route path="/" element={<Report />} />
                        <Route path="/sales" element={<Sale />} />
                        <Route path="/activity" element={<Activity />} />
                    </Routes>
                </main>
            </SidebarProvider>
        </Router>
    );
}
