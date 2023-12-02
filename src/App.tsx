import { NextUIProvider } from "@nextui-org/react";
import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./features/login/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Signup from "./features/signup/Signup";
import ProtectedRoute from "./ui/ProtectedRoute";
import Chat from "./ui/Chat";
import Reset from "./pages/Reset";
import Update from "./pages/Update";
import Travels from "./ui/Travels";
import ProtectedRoute2 from "./ui/ProtectedRoute2";
import Verify from "./ui/Verify";

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
          {/* Implement redirect route for those who have logged in */}
          <Route path="verify" element={<Verify />} />
          <Route path="update" element={<Update />} />
          <Route path="/" element={<ProtectedRoute2 />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="reset" element={<Reset />} />
          </Route>
          {/* <Route path="redirect" element={<Redirect />} /> */}

          <Route
            path="app"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to={"travels"} replace />} />
            <Route path="form" element={<p>Form</p>} />
            <Route path="travels" element={<Travels />} />
          </Route>
          <Route path="*" element={<p>404, No page found</p>} />
        </Routes>
      </NextUIProvider>
    </QueryClientProvider>
  );
}

export default App;
