import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/dashboard/Dashboard";
import Donation from "./components/donations/Donation";
import NotFound from "./components/NotFound";
import PendingDonations from "./components/donations/PendingDonations";
import PreviousDoantions from "./components/donations/PreviousDonations";
import { UserState } from "./context/UserState";
import { DonorState } from "./context/DonorState";
import ShowAgents from "./components/agents/ShowAgents";
import { AdminState } from "./context/AdminState";
import AssignAgents from "./components/agents/AssignAgents";

function App() {
    return (
        <>
            <UserState>
                <AdminState>
                    <DonorState>
                        <Router>
                            <Navbar />
                            <Routes>
                                {/* Common Routes */}
                                <Route path="/" element={<Home />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/signup" element={<Signup />} />
                                <Route path="*" element={<NotFound />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/dashboard" element={<Dashboard />} />

                                {/* Donor Routes */}
                                <Route path="/donate" element={<Donation />} />
                                <Route path="/donations/pending" element={<PendingDonations />} />
                                <Route path="/donations/previous" element={<PreviousDoantions />} />

                                {/* Admin Routes */}
                                <Route path="/agents" element={<ShowAgents />} />
                                <Route path="/donations" element={<AssignAgents />} />

                            </Routes>
                        </Router>
                    </DonorState>
                </AdminState>
            </UserState>
        </>
    );
}

export default App;