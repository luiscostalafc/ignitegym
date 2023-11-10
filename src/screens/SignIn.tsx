import { VStack, Image, Center, Text, Heading } from "native-base";

import backgroundImg from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";

export function SignIn() {
  return (
    <VStack flex="1" bg="gray.700">
      <Image
        source={backgroundImg}
        alt="Pessoas treinando"
        resizeMode="contain"
        position="absolute"
      />
      <Center my={24}>
        <LogoSvg />

        <Text color="gray.100" fontSize="sm">
          Treine o seu corpo e a sua mente
        </Text>
      </Center>

      <Center>
        <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
          Acesse sua conta
        </Heading>
      </Center>
    </VStack>
  );
}
