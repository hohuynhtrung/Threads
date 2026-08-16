import AuthProvider from "@/components/AuthProvider";
import AppRoutes from "./components/AppRoutes";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
