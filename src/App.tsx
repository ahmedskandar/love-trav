import { NextUIProvider } from "@nextui-org/react";
import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./features/login/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Dashboard from "./features/dashboard/Dashboard";

function App() {
  const navigate = useNavigate();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <NextUIProvider navigate={navigate}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="admin/dashboard" element={<Dashboard />} />
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
    </QueryClientProvider>
  );
}

export default App;
