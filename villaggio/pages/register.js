import {
  Body,
  Button,
  Container,
  Content,
  Form,
  Header,
  Icon,
  Input,
  Item,
  Label,
  Left,
  Right,
  Text,
  Title,
  Toast,
} from "native-base";
import React from "react";

export default function Register(props) {
  const { navigation } = props;

  const register = async () => {
    if (data.username === "" || data.password === "") {
      Toast.show({ text: "Nome utente o password non validi", type: "danger" });
      return;
    }
    if (data.password !== data.confirmPassword) {
      Toast.show({ text: "Le password non corrispondono", type: "danger" });
      return;
    }
    await fetch("https://villaggio.ghostyjade.workers.dev/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          Toast.show({
            text: "Utente registrato. Ora puoi accedere",
            type: "success",
          });
          navigation.navigate("Login");
        }
      });
  };

  const [data, setData] = React.useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Registrati</Title>
        </Body>
        <Right />
      </Header>
      <Content style={{ flex: 1 }} padder>
        <Form>
          <Item floatingLabel>
            <Label>Username</Label>
            <Input
              onChangeText={(text) => setData({ ...data, username: text })}
            />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              onChangeText={(text) => setData({ ...data, password: text })}
            />
          </Item>
          <Item floatingLabel error={data.confirmPassword !== data.password}>
            <Label>Conferma password</Label>
            <Input
              secureTextEntry={true}
              onChangeText={(text) =>
                setData({ ...data, confirmPassword: text })
              }
            />
          </Item>
        </Form>
        <Button
          style={{ alignSelf: "center", marginTop: 48 }}
          onPress={register}
        >
          <Text>Registrati</Text>
        </Button>
      </Content>
    </Container>
  );
}
