import { StatusBar } from "react-native";
import { GluestackUIProvider, Text, Box } from "@gluestack-ui/themed";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { Loading } from "@components/Loading";
import { config } from "@config/gluestack-ui.config";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <GluestackUIProvider config={config}>
      <Box
        flex={1}
        alignItems="center"
        justifyContent="center"
        backgroundColor="$backgroundDark900"
      >
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        {fontsLoaded ? <Text color="$white">Hello World!</Text> : <Loading />}
      </Box>
    </GluestackUIProvider>
  );
}
