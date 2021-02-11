import React from "react";
import { Dimensions, Image, Pressable } from "react-native";
import { Icon, Text, View } from "native-base";
import BrokenImg from "./BrokenImg";

const size = (Dimensions.get("window").width - 4 * 6 * 2) / 2;

export default function ActivityImage(props) {
  const { image, id, name, description } = props.data;
  const [liked, setLiked] = React.useState(
    props.likedList.find((e) => e.postId === id) ? true : false
  );

  const openDetails = () => {
    props.navigation.navigate("ActivityDetails", {
      image,
      id,
      name,
      description,
      user: props.user,
      liked,
    });
  };
  // w:192,h:210
  return (
    <View key={id} style={{ width: size, height: size + 16, margin: 8 }}>
      <Pressable onPress={openDetails}>
        {image ? (
          <Image
            style={{ width: size, height: size, borderRadius: 25 }}
            source={{ uri: image }}
          />
        ) : (
          <Image
            style={{ width: size, height: size }}
            source={{ uri: BrokenImg }}
          />
        )}
        <Text style={{ width: size, height: 18 }}>{name}</Text>
        {liked && (
          <View
            style={{
              position: "absolute",
              zIndex: 100,
              bottom: 34,
              right: 16,
            }}
          >
            <Icon name="heart" />
          </View>
        )}
      </Pressable>
    </View>
  );
}
