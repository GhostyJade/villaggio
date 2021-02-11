import React from "react";
import {
  Body,
  Button,
  Container,
  Grid,
  Icon,
  Left,
  Title,
  Header,
  Fab,
  Right,
} from "native-base";
import ActivitiesContainer from "../components/ActivitiesContainer";

export default function Home(props) {
  const { user, navigation, refresh, updateRefresh } = props;

  const createNewActivity = () => {
    navigation.navigate("ActivityCreator");
  };

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.openDrawer()}>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>Villaggio</Title>
        </Body>
        <Right />
      </Header>
      <Grid>
        <ActivitiesContainer
          updateRefresh={updateRefresh}
          refresh={refresh}
          user={user}
          navigation={navigation}
        />
        {user.admin && (
          <Fab position="bottomRight" onPress={() => createNewActivity()}>
            <Icon name="add" />
          </Fab>
        )}
      </Grid>
    </Container>
  );
}
