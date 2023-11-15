import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";

import { Home } from "@screens/Home";
import { History } from "@screens/History";
import { Profile } from "@screens/Profile";
import { Exercise } from "@screens/Exercise";

const { Navigator, Screen } = createBottomTabNavigator();

type AppRoutesProps = {
  home: undefined;
  profile: undefined;
  history: undefined;
  exercice: undefined;
};

export type AppRoutesNavigationProps = BottomTabNavigationProp<AppRoutesProps>;

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="history" component={History} />
      <Screen name="profile" component={Profile} />
      <Screen name="exercice" component={Exercise} />
    </Navigator>
  );
}
