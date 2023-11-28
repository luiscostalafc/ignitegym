import { useEffect, useState } from "react";
import { TouchableOpacity, ScrollView } from "react-native";
import {
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
  Image,
  Box,
  useToast,
} from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { AppRoutesNavigationProps } from "@routes/app.routes";
import { ExerciseRouteParamsProps } from "src/types/Home";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";

import { Button } from "@components/Button";

import BodySVG from "@assets/body.svg";
import SeriesSVG from "@assets/series.svg";
import RepetitionsSVG from "@assets/repetitions.svg";
import { Loading } from "@components/Loading";

export function Exercise() {
  const [isLoading, setIsLoading] = useState(true);
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO);

  const toast = useToast();
  const navigation = useNavigation<AppRoutesNavigationProps>();
  const route = useRoute();
  const { exerciseId } = route.params as ExerciseRouteParamsProps;

  const handleGoBack = () => {
    navigation.goBack();
  };

  const fetchExerciseById = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get(`/exercises/${exerciseId}`);

      setExercise(data);

      return data;
    } catch (error) {
      const isAppError = error instanceof AppError;

      toast.show({
        title: isAppError
          ? error.message
          : "Não foi possível carregar o exercício selecionado.",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!exerciseId) return;

    fetchExerciseById();
  }, [exerciseId]);

  return (
    <VStack flex={1}>
      <VStack px={8} bg="gray.600" pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
        </TouchableOpacity>
        <HStack
          alignItems="center"
          justifyContent="space-between"
          mt={4}
          mb={8}
        >
          <Heading
            flexShrink={1}
            color="gray.100"
            fontSize="lg"
            fontFamily="heading"
          >
            {exercise?.name || ""}
          </Heading>

          <HStack alignItems="center">
            <BodySVG />
            <Text color="gray.200" ml={1} textTransform="capitalize">
              {exercise?.group || ""}
            </Text>
          </HStack>
        </HStack>
      </VStack>
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView
          contentContainerStyle={{
            marginBottom: 36,
          }}
        >
          <VStack p={8}>
            <Box rounded="lg" mb={3} overflow="hidden">
              <Image
                w="full"
                h={80}
                source={{
                  uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
                }}
                alt={exercise?.name || "Nome"}
                mb={3}
                resizeMode="cover"
                rounded="lg"
              />
            </Box>

            <Box bg="gray.600" rounded="md" pb={4} px={4}>
              <HStack
                alignItems="center"
                justifyContent="space-around"
                mb={6}
                mt={5}
              >
                <HStack>
                  <SeriesSVG />
                  <Text color="gray.200" ml={2}>
                    {exercise?.series} Séries
                  </Text>
                </HStack>

                <HStack>
                  <RepetitionsSVG />
                  <Text color="gray.200" ml={1}>
                    {exercise?.repetitions} Repetições
                  </Text>
                </HStack>
              </HStack>

              <Button title="Marcar como realizado" />
            </Box>
          </VStack>
        </ScrollView>
      )}
    </VStack>
  );
}
