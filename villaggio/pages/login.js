import {
  Body,
  Button,
  Container,
  Content,
  Form,
  Grid,
  Header,
  Input,
  Item,
  Label,
  Left,
  Right,
  Text,
  Title,
  View,
} from "native-base";
import React from "react";

// import { Dimensions } from "react-native";
// Dimensions.get('window').width;
export default function Login(props) {
  const { navigation, setUser, setLoggedIn } = props;

  const [loginData, setLoginData] = React.useState({
    username: "",
    password: "",
  });

  const login = async () => {
    await fetch("https://villaggio.ghostyjade.workers.dev/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...loginData }),
    })
      .then((result) => result.json())
      .then((response) => {
        setLoggedIn(true);
        setUser(response);
      });
  };

  return (
    <Container>
      <Header>
        <Left />
        <Body>
          <Title>Accedi</Title>
        </Body>
        <Right />
      </Header>

      <Content padder>
        <View>
          <Item floatingLabel>
            <Label>Username</Label>
            <Input
              onChangeText={(text) => {
                setLoginData({ ...loginData, username: text });
              }}
            />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              onChangeText={(text) => {
                setLoginData({ ...loginData, password: text });
              }}
            />
          </Item>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              margin: 16,
            }}
          >
            <Button onPress={() => navigation.navigate("Register")}>
              <Text>Registrati</Text>
            </Button>
            <Button onPress={login}>
              <Text>Accedi</Text>
            </Button>
          </View>
        </View>
      </Content>
    </Container>
  );
}
