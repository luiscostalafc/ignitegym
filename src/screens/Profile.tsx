import { useState } from "react";
import { TouchableOpacity } from "react-native";
import {
  Center,
  ScrollView,
  VStack,
  Skeleton,
  Text,
  Heading,
  useToast,
} from "native-base";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAuth } from "@hooks/useAuth";
import { profileSchema } from "../validations/profileUpdateSchema";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";

import { ScreenHeader } from "@components/ScreenHeaer";
import { UserPhoto } from "@components/UserPhoto";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

import derfaultUserPhotoImg from "@assets/userPhotoDefault.png";

type FormDataProps = {
  name: string;
  email: string;
  old_password?: string;
  password?: string;
  confirm_password?: string;
};

export function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [photoIsLoading, setPhotoIsLoading] = useState(false);

  const PHOTO_SIZE = 33;
  const toast = useToast();
  const { user, updateUserProfile } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
    resolver: yupResolver(profileSchema as any),
  });

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true);
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        aspect: [4, 4],
      });

      if (photoSelected.canceled) {
        return;
      }

      if (photoSelected.assets[0].uri) {
        const photoInfo: any = await FileSystem.getInfoAsync(
          photoSelected.assets[0].uri,
          { size: true }
        );

        if (photoInfo.size && photoInfo.size > 5000000) {
          return toast.show({
            title: "A imagem deve ter no máximo 5MB",
            placement: "top",
            bgColor: "red.500",
          });
        }

        const fileExtension = photoSelected.assets[0].uri.split(".").pop();

        const photoFile = {
          name: `${user.name}.${fileExtension}`?.toLocaleLowerCase(),
          uri: photoSelected.assets[0].uri,
          type: `${photoSelected.assets[0].type}/${fileExtension}}`,
        } as any;

        const userPhotoUploadForm = new FormData();

        userPhotoUploadForm.append("avatar", photoFile);

        const avatarUpdatedResponse = await api.patch(
          "/users/avatar",
          userPhotoUploadForm,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const userUpdated = user;
        userUpdated.avatar = avatarUpdatedResponse.data.avatar;

        toast.show({
          title: "Foto atualizada com sucesso",
          placement: "top",
          bgColor: "green.700",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  }

  async function handleProfileUpdate(data: FormDataProps) {
    try {
      setIsLoading(true);

      const userUpdated = user;
      userUpdated.name = data.name;

      await api.put("/users", data);

      await updateUserProfile(userUpdated);

      toast.show({
        title: "Perfil atualizado com sucesso",
        placement: "top",
        bgColor: "green.700",
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Erro ao atualizar perfil";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView
        contentContainerStyle={{
          paddingBottom: 36,
        }}
      >
        <Center mt={6} px={10}>
          {photoIsLoading ? (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              borderRadius="full"
              startColor="gray.500"
              endColor="gray.400"
            />
          ) : (
            <UserPhoto
              source={
                user?.avatar
                  ? { uri: `${api.defaults.baseURL}/${user.avatar}` }
                  : derfaultUserPhotoImg
              }
              alt="Foto do usuário"
              size={PHOTO_SIZE}
            />
          )}
          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text
              color="green.500"
              fontWeight="bold"
              fontSize="md"
              mt={2}
              mb={8}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Nome"
                bg="gray.600"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
            name="name"
          />

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="E-mail"
                bg="gray.600"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                isDisabled
              />
            )}
            name="email"
          />

          <Heading
            alignSelf="flex-start"
            color="gray.200"
            fontSize="md"
            fontFamily="heading"
            mb={2}
            mt={12}
          >
            Alterar senha
          </Heading>

          <Input bg="gray.600" placeholder="Senha antiga" secureTextEntry />

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Senha antiga"
                bg="gray.600"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="old_password"
          />

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Nova senha"
                bg="gray.600"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
            name="password"
          />

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Confirme a nova senha"
                bg="gray.600"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                errorMessage={errors.confirm_password?.message}
              />
            )}
            name="confirm_password"
          />

          <Button
            isLoading={isLoading}
            title="Atualizar"
            mt={4}
            onPress={handleSubmit(handleProfileUpdate)}
          />
        </Center>
      </ScrollView>
    </VStack>
  );
}
