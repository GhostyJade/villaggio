import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

export default (props) => {
  const { state, ...rest } = props;
  const newState = { ...state };
  newState.routes = newState.routes.filter(
    (item) => item.name !== "ActivityCreator" && item.name !== "ActivityDetails"
  );

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList state={newState} {...rest} />
    </DrawerContentScrollView>
  );
};
