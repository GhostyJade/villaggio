import React, { useEffect } from 'react';
import AppLoading from 'expo-app-loading'
import { Body, Button, Col, Container, Grid, Icon, Left, Title, Header, Fab } from 'native-base';
import { Text } from 'react-native';
import * as Font from 'expo-font';

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

  const createNewActivity = () => { }

  if (!ready || !user)
    return <AppLoading />
  if (user)
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Villaggio</Title>
          </Body>
        </Header>
        <Grid>
          {
            user.admin && (
              <Fab position="bottomRight" onPress={() => createNewActivity()}>
                <Icon name="add" />
              </Fab>
            )
          }
        </Grid>
      </Container>
    );
}
