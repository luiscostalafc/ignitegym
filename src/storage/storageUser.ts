import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserDTO } from "@dtos/UserDTO";
import { USER_STORAGE } from "./storageConfig";

export async function storageUserSave(user: UserDTO): Promise<void> {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
}

export async function storageUserGet(): Promise<UserDTO | null> {
  const user = await AsyncStorage.getItem(USER_STORAGE);

  if (!user) {
    return null;
  }

  return JSON.parse(user);
}

export async function storageUserRemove(): Promise<void> {
  await AsyncStorage.removeItem(USER_STORAGE);
}
