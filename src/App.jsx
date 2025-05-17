import { Outlet, useLocation } from "react-router-dom";
import { CircularProgress } from "@mui/material";

import PrivateFooter from "./components/organisms/PrivateFooter";
import PrivateHeader from "./components/organisms/PrivateHeader";
import { useEffect, useState } from "react";

function App() {

    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        // Apply loading logic only for specific routes
        if (location.pathname === "/" || location.pathname === "/home" || location.pathname === "/public") {
            setIsLoading(true);
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 1000);

            // Cleanup the timer when the component unmounts or location changes
            return () => clearTimeout(timer);
        } else {
            setIsLoading(false); // No loading for other routes
        }
    }, []);

    if (isLoading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress />
            </div>
        );
    }
    
    return (
        <>
            <PrivateHeader />
            <Outlet />
            <PrivateFooter />
        </>
    );
}

export default App;