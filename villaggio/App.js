import "react-native-gesture-handler";
import React, { useEffect } from "react";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import * as Font from "expo-font";
import Home from "./pages/home";
import ActivityCreator from "./components/ActivityCreator";
import Login from "./pages/login";
import Register from "./pages/register";
import { Root } from "native-base";
import ActivityDetails from "./components/ActivityDetails";
import { Linking } from "react-native";
import CustomSidebar from "./components/CustomSidebar";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [ready, setReady] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState(null);

  const [refresh, setRefresh] = React.useState(false);

  const updateRefresh = () => {
    setRefresh(!refresh);
  };

  const login = async () => {
    await fetch("https://villaggio.ghostyjade.workers.dev/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: "test", password: "test" }),
    })
      .then((result) => result.json())
      .then((response) => {
        setLoggedIn(true);
        setUser(response);
      });
  };

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      });
      setReady(true);
    };
    loadFont();
    // login();
  }, []);

  if (!ready || (loggedIn && user === null)) return <AppLoading />;
  return (
    <Root>
      <NavigationContainer>
        {loggedIn ? (
          <Drawer.Navigator
            initialRouteName={"Home"}
            drawerContent={(props) => <CustomSidebar {...props} />}
          >
            <Drawer.Screen name="Home">
              {(props) => (
                <Home
                  {...props}
                  updateRefresh={updateRefresh}
                  refresh={refresh}
                  user={user}
                />
              )}
            </Drawer.Screen>
            <Drawer.Screen name="ActivityCreator">
              {(props) => (
                <ActivityCreator
                  {...props}
                  user={user}
                  updateRefresh={updateRefresh}
                />
              )}
            </Drawer.Screen>
            <Drawer.Screen name="ActivityDetails">
              {(props) => <ActivityDetails {...props} updateRefresh={updateRefresh} refresh={refresh} />}
            </Drawer.Screen>

            <Drawer.Screen name="Instagram">
              {() =>
                Linking.openURL(
                  "https://instagram.com/villaggio_etaoro?igshid=1cn5p3szf9ws6"
                )
              }
            </Drawer.Screen>
            <Drawer.Screen name="Sito web">
              {() => Linking.openURL("http://etaoro.flazio.com")}
            </Drawer.Screen>

            <Drawer.Screen name="Made by GhostyJade">
              {() => Linking.openURL("https://ghostyjade.com")}
            </Drawer.Screen>
          </Drawer.Navigator>
        ) : (
          <Stack.Navigator headerMode="none" initialRouteName="Login">
            <Stack.Screen name="Login">
              {(props) => (
                <Login setLoggedIn={setLoggedIn} setUser={setUser} {...props} />
              )}
            </Stack.Screen>
            <Stack.Screen name="Register">
              {(props) => <Register {...props} />}
            </Stack.Screen>
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </Root>
  );
}
