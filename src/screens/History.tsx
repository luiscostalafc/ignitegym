import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Heading, VStack, SectionList, Text, useToast } from "native-base";

import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { HistoryByDayDTO } from "@dtos/HistoryByDayDTO";

import { ScreenHeader } from "@components/ScreenHeaer";
import { HistoryCard } from "@components/HistoryCard";
import { Loading } from "@components/Loading";

export function History() {
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState<HistoryByDayDTO[]>([]);

  const toast = useToast();

  async function fetchHistory() {
    try {
      setIsLoading(true);

      const { data } = await api.get(`/history`);
      setHistory(data);
    } catch (error) {
      const isAppError = error instanceof AppError;

      toast.show({
        title: isAppError
          ? error.message
          : "Não foi possível carregar o histórico.",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [])
  );

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      {isLoading ? (
        <Loading />
      ) : (
        <SectionList
          sections={history}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HistoryCard data={item} />}
          renderSectionHeader={({ section }) => (
            <Heading
              color="gray.200"
              fontSize="md"
              fontFamily="heading"
              mt={10}
              mb={3}
            >
              {section.title}
            </Heading>
          )}
          px={8}
          contentContainerStyle={
            history.length === 0 && {
              flex: 1,
              justifyContent: "center",
            }
          }
          ListEmptyComponent={() => (
            <Text color="gray.100" textAlign="center">
              Não há exercícios registrados ainda. {"\n"} Vamos fazer exercícios
              hoje?
            </Text>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </VStack>
  );
}
