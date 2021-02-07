import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as Font from 'expo-font';
import Home from './pages/home';
import ActivityCreator from './components/ActivityCreator';

const Drawer = createDrawerNavigator();

export default function App() {

  const [ready, setReady] = React.useState(false)
  const [user, setUser] = React.useState(null)

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
      })
      setReady(true)
      await fetch('https://villaggio.ghostyjade.workers.dev/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: 'test', password: 'test' })
      }).then(result => result.json())
        .then(response => {
          setUser(response)
        })
    }
    loadFont()
  }, [])


  if (!ready || !user)
    return <AppLoading />
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        {
          user != null ? (
            <>
              <Drawer.Screen name="Home">
                {(props) => <Home {...props} user={user} />}
              </Drawer.Screen>
              <Drawer.Screen name="ActivityCreator">
                {(props) => <ActivityCreator {...props} user={user} />}
              </Drawer.Screen>
            </>
          ) : (
              <></>
            )
        }
      </Drawer.Navigator>
    </NavigationContainer>
  )
}
