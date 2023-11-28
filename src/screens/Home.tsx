import { useEffect, useState, useCallback } from "react";
import { VStack, FlatList, HStack, Heading, Text, useToast } from "native-base";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { AppRoutesNavigationProps } from "@routes/app.routes";
import { AppError } from "@utils/AppError";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { api } from "@services/api";

import { HomeHeader } from "@components/HomeHeader";
import { Group } from "@components/Group";
import { ExerciseCard } from "@components/ExerciseCard";

export function Home() {
  const [groups, setGroups] = useState<string[]>([]);
  const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
  const [groupSelected, setGroupSelected] = useState("");

  const navigation = useNavigation<AppRoutesNavigationProps>();
  const toast = useToast();

  function handleOpenExerciseDetails(item: ExerciseDTO) {
    navigation.navigate("exercice", {
      exercise: item.name,
      group: groupSelected,
      series: item.series,
      repetitions: item.repetitions,
    });
  }

  async function fetchGroups() {
    try {
      const { data } = await api.get("/groups");

      setGroups(data);
    } catch (error) {
      const isAppError = error instanceof AppError;

      toast.show({
        title: isAppError
          ? error.message
          : "Não foi possível carregar os grupos",
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  async function fetchExercisesByGroup() {
    try {
      const { data } = await api.get(`/exercises/bygroup/${groupSelected}`);

      setExercises(data);
    } catch (error) {
      const isAppError = error instanceof AppError;

      toast.show({
        title: isAppError
          ? error.message
          : "Não foi possível carregar os exercícios",
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  useEffect(() => {
    fetchGroups();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchExercisesByGroup();
    }, [groupSelected])
  );

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={
              groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()
            }
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{
          px: 8,
        }}
        my={10}
        maxH={10}
        minH={10}
      />

      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md" fontFamily="heading">
            Exercícios
          </Heading>

          <Text color="gray.200" fontSize="sm">
            {exercises?.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ExerciseCard
              name={item.name}
              seriesValue={item.series}
              repetitionsValue={item.repetitions}
              onPress={() => handleOpenExerciseDetails(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{
            paddingBottom: 20,
          }}
        />
      </VStack>
    </VStack>
  );
}
