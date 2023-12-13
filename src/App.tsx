import { useNavigate, Routes, Route, Navigate } from "react-router-dom";

import Reset from "./pages/Reset";
import Home from "./pages/Home";
import Update from "./pages/Update";
import Verify from "./pages/Verify";
import LoggedInProtection from "./ui/LoggedInProtection";
import NotLoggedInProtection from "./ui/NotLoggedInProtection";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextUIProvider } from "@nextui-org/react";

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
          <Route path="verify" element={<Verify />} />
          <Route path="/profile/update" element={<Update />} />
          <Route path="/" element={<LoggedInProtection />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="reset" element={<Reset />} />
          </Route>
          <Route
            path="app"
            element={
              <NotLoggedInProtection>
                <p>Chattt</p>
              </NotLoggedInProtection>
            }
          >
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
