import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/HomeScreen";
import DrawingScreen from "./src/screens/DrawingScreen";
import { store } from "./src/store/configureStore";
import ComicScreen from "./src/screens/ComicScreen";
import PreviewScreen from "./src/screens/PreviewScreen";
import { RootStackParamList } from "./src/types/screensType";

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Comic"
              component={ComicScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Drawing"
              component={DrawingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Preview"
              component={PreviewScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
