import { Button } from "@rneui/base";
import { useRef } from "react";
import { Alert, View } from "react-native";
import { shallow } from "zustand/shallow";
import { useLeverage } from "../store";

const OfflineInfoAlert = () => {
  const offlineLeverages = useLeverage((state) => state.offlineLeverages);
  return Alert.alert(
    "You're Offline",
    `${offlineLeverages.length} are Offline.\nDont worry, we've stored theses contacts.\nOnce you're online these will be automatically synced`,
    [
      {
        text: "Ok",
        onPress: () => console.log("Cancel Pressed"),
      },
    ]
  );
};

const ListHeader = () => {
  const offlineLeverages = useLeverage(
    (state) => state.offlineLeverages,
    shallow
  );
  const interval = useRef();

  return (
    <View className="mr-2">
      <Button
        radius={"md"}
        type="solid"
        color="warning"
        title={`${offlineLeverages.length} are Offline`}
        icon={{
          name: "info-circle",
          type: "font-awesome",
          size: 18,
          color: "white",
        }}
        iconContainerStyle={{ marginRight: 10 }}
        containerStyle={{
          display: offlineLeverages.length == 0 ? "none" : "flex",
        }}
        onPress={() =>
          Alert.alert(
            "You're Offline",
            `${offlineLeverages.length} contacts are stored Offline.\nDont worry, we've stored theses contacts.\nOnce you're online these will be automatically synced`,
            [
              {
                text: "Ok",
                onPress: () => console.log("Cancel Pressed"),
              },
            ]
          )
        }
      />
    </View>
  );
};

export default ListHeader;
