import React, { useEffect } from "react";
import {
  Body,
  Button,
  Container,
  Content,
  Fab,
  Header,
  Icon,
  Input,
  Item,
  Label,
  Left,
  Text,
  Title,
  Toast,
  Right,
} from "native-base";
import * as ImagePicker from "expo-image-picker";
import { Platform, View } from "react-native";
import * as FileSystem from "expo-file-system";

export default function ActivityCreator(props) {
  const { navigation, user, updateRefresh } = props;

  const [data, setData] = React.useState({});
  const [saveEnabled, setSaveEnabled] = React.useState(true);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      }
    })();
    setData({});
    setSaveEnabled(true);
  }, []);

  const save = () => {
    fetch("https://villaggio.ghostyjade.workers.dev/activities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          Toast.show({
            text: "Attività creata",
            buttonText: "Ok",
            type: "success",
          });
          updateRefresh();
          navigation.goBack();
        }
      })
      .catch((e) => console.log(e));
  };

  const updateData = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const loadImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!result.cancelled) {
      setSaveEnabled(false);
      let mime = "";
      const fileExtension = result.uri.split(".").reverse()[0];
      if (fileExtension === "jpg" || fileExtension === "jpeg")
        mime = "data:image/jpeg;base64,";
      else if (fileExtension === "png") mime = "data:image/png;base64,";
      else if (fileExtension === "gif") mime = "data:image/gif;base64,";
      const base64 = await FileSystem.readAsStringAsync(result.uri, {
        encoding: "base64",
      });
      setData({ ...data, image: mime.concat(base64) });
      setSaveEnabled(true);
    }
  };

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Nuova Attività</Title>
        </Body>
        <Right />
      </Header>
      <Content padder>
        <View style={{ flexDirection: "column", flex: 1 }}>
          <Item floatingLabel>
            <Label>Nome</Label>
            <Input
              onChangeText={(text) => {
                updateData("name", text);
              }}
            />
          </Item>
          <Item floatingLabel style={{ marginTop: 16 }}>
            <Label>Descrizione</Label>
            <Input
              onChangeText={(text) => {
                updateData("description", text);
              }}
            />
          </Item>
          <Button
            style={{ alignSelf: "center", marginTop: 48 }}
            onPress={loadImage}
          >
            <Icon name="cloud-upload-outline" />
            <Text>Carica immagine</Text>
          </Button>
        </View>
      </Content>
      <Fab active={saveEnabled} position="bottomRight" onPress={() => save()}>
        <Icon name="save" />
      </Fab>
    </Container>
  );
}
