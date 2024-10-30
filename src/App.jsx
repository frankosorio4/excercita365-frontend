import { Outlet } from "react-router-dom";

import ExerciseOpenAirHeader from "./components/organisms/ExerciseOpenAirHeader";
import ExerciseOpenAirFooter from "./components/organisms/ExerciseOpenAirFooter";

function App() {
 return (
  <>
   <ExerciseOpenAirHeader />
   <Outlet />
   <ExerciseOpenAirFooter />
  </>
 );
}

export default App;
