import { Outlet } from "react-router-dom";

import PrivateFooter from "./components/organisms/PrivateFooter";
import PrivateHeader from "./components/organisms/PrivateHeader";

function App() {
    return (
        <>
            <PrivateHeader/>
            <Outlet />
            <PrivateFooter />
        </>
    );
}

export default App;
