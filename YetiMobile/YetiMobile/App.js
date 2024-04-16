import AppNavigation from "./navigation/AppNavigation";
import { AuthProvider } from "./src/context/AuthContext";
import { View, Text } from "react-native";
export default function App() {
  return (
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>
  );
}
