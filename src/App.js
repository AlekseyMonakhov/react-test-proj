import "./App.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProjectInfo from "./pages/ProjectInfo";

function App() {
  return (
    <Router basename='/'>
      <Routes>
        {["/", "/news", "/show", "/jobs"].map((route) => (
          <Route
            key={route}
            path={route}
            element={<Home />}
          />
        ))}
        <Route
          path='/comment/:id'
          element={<ProjectInfo />}
        />
      </Routes>
    </Router>
  );
}

export default App;
