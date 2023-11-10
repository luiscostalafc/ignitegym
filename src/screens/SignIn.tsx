import { VStack, Image } from "native-base";

import backgroundImg from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";

export function SignIn() {
  return (
    <VStack flex={1} bg="gray.700">
      <Image
        source={backgroundImg}
        alt="Background"
        resizeMode="cover"
        position="absolute"
        size="full"
      />

      <LogoSvg />
    </VStack>
  );
}
