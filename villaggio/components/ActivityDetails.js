import React, { useEffect } from "react";
import {
  Body,
  Button,
  Container,
  Content,
  Fab,
  Grid,
  H3,
  Header,
  Icon,
  Left,
  Right,
  Row,
  Text,
  Title,
  Toast,
  View,
} from "native-base";
import { Image, ScrollView } from "react-native";

export default function ActivityDetails(props) {
  const { navigation, refresh, updateRefresh } = props;
  const { id, image, name, description, user, liked } = props.route.params;

  const [items, setItems] = React.useState([]);
  const [userList, setUserList] = React.useState([]);

  useEffect(() => {
    if (user.admin) {
      fetch("https://villaggio.ghostyjade.workers.dev/activities/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": user.token,
        },
        body: JSON.stringify({ postId: id }),
      })
        .then((e) => e.json())
        .then((result) => {
          if (result.success) {
            setUserList(result.users);
            setItems(result.likes);
          }
        });
    }
  }, [id, refresh]);

  const [itemLiked, setItemLiked] = React.useState(liked);

  useEffect(() => {
    setItemLiked(liked);
  }, [liked]);

  const deleteActivity = async () => {
    await fetch("https://villaggio.ghostyjade.workers.dev/activities", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: JSON.stringify({ id }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          Toast.show({ text: "Attività eliminata" });
          navigation.goBack();
        }
      });
  };

  const toggleLiked = async () => {
    const url = "https://villaggio.ghostyjade.workers.dev/like";
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: JSON.stringify({ postId: id, userId: user.id }),
    })
      .then((e) => e.json())
      .then((result) => {
        if (result.success) {
          setItemLiked(!liked);
          updateRefresh();
        }
      });
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
          <Title>Attività</Title>
        </Body>
        <Right>
          <Button transparent onPress={deleteActivity}>
            <Icon name="trash" style={{ color: "#F05365" }} />
          </Button>
        </Right>
      </Header>
      <Content>
        <Grid>
          <Row>
            <Image
              style={{ width: 150, height: 150 }}
              source={{ uri: image }}
            />
            <H3 style={{ fontWeight: "bold", margin: 16, alignSelf: "center" }}>
              {name && name.toUpperCase()}
            </H3>
          </Row>
          <Row style={{ padding: 24 }}>
            <Text>{description || "Nessuna descrizione"}</Text>
          </Row>
          {user.admin && (
            <>
              <Text>Persone iscritte</Text>
              <ScrollView style={{ flex: 1 }}>
                <Grid>
                  {items &&
                    items.map((item, i) => {
                      return (
                        <View key={i} style={{ padding: 8 }}>
                          <Text style={{ fontWeight: "bold" }}>
                            {userList
                              .find((e) => e.id === item.userId)
                              .username.toUpperCase()}
                          </Text>
                        </View>
                      );
                    })}
                </Grid>
              </ScrollView>
            </>
          )}
        </Grid>
      </Content>
      <Fab
        position="bottomRight"
        style={{ backgroundColor: "#75DDDD" }}
        onPress={() => toggleLiked()}
      >
        <Icon name={!itemLiked ? "heart-outline" : "heart"} />
      </Fab>
    </Container>
  );
}
