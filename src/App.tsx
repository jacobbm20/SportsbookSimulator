import { Suspense } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { useAuth } from "./contexts/AuthContext";
import routes from "tempo-routes";
import Navbar from "./components/Navbar";
import LiveOddsBoard from "./components/LiveOddsBoard";
import BetSlip from "./components/BetSlip";

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <p className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
        Loading...
      </p>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Layout component with Navbar
const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {user && <Navbar />}
      <main className="container mx-auto p-4">{children}</main>
      {user && (
        <div className="fixed bottom-4 right-4 z-50">
          <BetSlip />
        </div>
      )}
    </div>
  );
};

function App() {
  const { user, loading } = useAuth();

  return (
    <Suspense
      fallback={
        <p className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
          Loading...
        </p>
      }
    >
      <Layout>
        <Routes>
          {/* Public routes */}
          <Route
            path="/login"
            element={user ? <Navigate to="/" replace /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/" replace /> : <Register />}
          />

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/odds"
            element={
              <ProtectedRoute>
                <LiveOddsBoard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <div>Account Settings Page (Coming Soon)</div>
              </ProtectedRoute>
            }
          />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </Layout>
    </Suspense>
  );
}

export default App;
