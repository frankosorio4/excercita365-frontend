import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import LayoutComum from "../../components/molecules/LayoutComumLocais/LayoutComumLocais";
import PublicFooter from "../../components/organisms/PublicFooter";

function DashboardPage() {

        const [isLoading, setIsLoading] = useState(true);
    
        useEffect(() => {
            // Simulate a delay for loading data (e.g., 1 second)
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 1000);
    
            // Cleanup the timer when the component unmounts
            return () => clearTimeout(timer);
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
            <LayoutComum titulo="Locais incríveis - Página Publica" showAuthButtons={true} visivel={false} />
            <PublicFooter />
        </>
    );
}

export default DashboardPage;