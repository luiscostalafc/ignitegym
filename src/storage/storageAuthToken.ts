import AsyncStorage from "@react-native-async-storage/async-storage";

import { AUTH_TOKEN_STORAGE } from "./storageConfig";

export async function storageAuthTokenSave(token: string): Promise<void> {
  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, token);
}

export async function storageAuthTokenGet(): Promise<string | null> {
  const token = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);

  if (!token) {
    return null;
  }

  return token;
}

export async function storageAuthTokenRemove(): Promise<void> {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE);
}
