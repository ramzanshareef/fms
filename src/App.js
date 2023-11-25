import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserState from "./context/UserState";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
    return (
        <>
            <UserState>
                <Router>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={ <Home /> } />
                        <Route path="/about" element={ <About /> } />
                        <Route path="/dashboard" element={ <Dashboard /> } />
                        <Route path="/login" element={ <Login /> } />
                        <Route path="/signup" element={ <Signup /> } />
                    </Routes>
                </Router>
            </UserState>
        </>
    );
}

export default App;