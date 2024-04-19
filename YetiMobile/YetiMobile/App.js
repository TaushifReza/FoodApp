import { StripeProvider } from "@stripe/stripe-react-native";
import AppNavigation from "./navigation/AppNavigation";
import { AuthProvider } from "./src/context/AuthContext";
import { View, Text } from "react-native";

const STRIPE_PUBLISHABLE_KEY =
  "pk_test_51P3tEXH1b8ToLqsiWdwhbagbHR3Y1GZvDBaM50QxlFS5O49EmWaHO7oqzBO3O9rpJr8NS4pwsXaXfgP1uNe6dQCm00SCRF2B3W";

export default function App() {
  return (
    <AuthProvider>
      <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
        <AppNavigation />
      </StripeProvider>
    </AuthProvider>
  );
}
