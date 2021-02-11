import React, { useEffect } from "react";
import { Grid, Row, View } from "native-base";
import ActivityImage from "./ActivityImage";
import { RefreshControl, SafeAreaView, ScrollView } from "react-native";

export default function ActivitiesContainer(props) {
  const { refresh, navigation, user, updateRefresh } = props;
  const [data, setData] = React.useState([]);
  const [likedList, setLikedList] = React.useState([]);

  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    setData([]);
    setLikedList([]);
    fetch("https://villaggio.ghostyjade.workers.dev/activities", {
      headers: {
        "x-access-token": user.token,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setData(result.list);
      });
    fetch("https://villaggio.ghostyjade.workers.dev/user/likes", {
      headers: {
        "x-access-token": user.token,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ userId: user.id }),
    })
      .then((e) => e.json())
      .then((result) => {
        setLikedList(result.list);
      });
  }, [refresh]);

  const refreshView = React.useCallback(() => {
    setRefreshing(true);
    updateRefresh();
    setRefreshing(false);
  });

  if (!data) return <></>;

  function chunk(arr, chunkSize) {
    if (chunkSize <= 0) throw "Invalid chunk size";
    var R = [];
    for (var i = 0, len = arr.length; i < len; i += chunkSize)
      R.push(arr.slice(i, i + chunkSize));
    return R;
  }

  const parts = chunk(data, 2);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshView} />
        }
      >
        <View>
          <Grid style={{ padding: 4, marginBottom: 16 }}>
            {parts.map((v, i) => {
              return (
                <Row
                  key={i}
                  style={{
                    height: 216,
                    justifyContent: "space-between",
                  }}
                >
                  {v[0] && (
                    <ActivityImage
                      data={v[0]}
                      user={user}
                      navigation={navigation}
                      likedList={likedList}
                    />
                  )}
                  {v[1] && (
                    <ActivityImage
                      data={v[1]}
                      user={user}
                      navigation={navigation}
                      likedList={likedList}
                    />
                  )}
                </Row>
              );
            })}
          </Grid>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
