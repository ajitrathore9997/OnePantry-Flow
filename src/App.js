import { RouterProvider } from "react-router-dom";
import { routers } from "./components/router";


global.HOST = "http://localhost:3000/";
// global.API_HOST = "http://localhost:3282/";
global.API_HOST = "http://54.201.160.69:3282/";
global.PROJECT_NAME = "OnePantry";



function App() {
  return (
    <div class="wrapper">
      <RouterProvider router={routers} />
    </div>
  );
}

export default App;
