import { NextUIProvider } from "@nextui-org/react";
import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  const navigate = useNavigate();
  return (
    <NextUIProvider navigate={navigate}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<p>Login</p>} />
        <Route path="signup" element={<p>Signup</p>} />{" "}
        <Route path="reset" element={<p>Reset</p>} />
        <Route path="app" element={<p>App</p>}>
          <Route index element={<Navigate to={"travels"} replace />} />
          <Route path="form" element={<p>Form</p>} />
          <Route path="travels" element={<p>Travels</p>} />
        </Route>
        <Route path="*" element={<p>404, No page found</p>} />
      </Routes>
    </NextUIProvider>
  );
}

export default App;
