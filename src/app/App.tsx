import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SearchScr from "../screens/search";
import BookDetailScr from "../screens/book_details";

//stack navigator to manage screen transitions, nav container
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Search"
          component={SearchScr}
          options={{ title: "Book Explorer" }}
        />
        <Stack.Screen
          name="Details"
          component={BookDetailScr}
          options={{ title: "Book Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
