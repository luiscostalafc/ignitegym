import { StatusBar } from "react-native";
import { GluestackUIProvider, Text, Box } from "@gluestack-ui/themed";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { config } from "@gluestack-ui/config";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <GluestackUIProvider config={config}>
      <Box
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#202024",
        }}
      >
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        {fontsLoaded ? (
          <Text style={{ color: "white" }}>Hello World!</Text>
        ) : (
          <Text>Loading...</Text>
        )}
      </Box>
    </GluestackUIProvider>
  );
}
