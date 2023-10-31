import { BrowserRouter, Route, Routes } from "react-router-dom";
import TextChecking from "./pages/text-checking";
import ProfileDetection from "./pages/profile-detection";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={TextChecking} />
        <Route path="/profile-detection" Component={ProfileDetection} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
