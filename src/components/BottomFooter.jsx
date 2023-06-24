import { useState } from "react";
import { useNavigation } from "expo-router";

import { SpeedDial } from "@rneui/base";
import * as Contacts from "expo-contacts";

export default function BottomFooter() {
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();
  const openContactPicker = async () => {
    try {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status !== "granted")
        throw Error("Please grant permission for Contacts");
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Name],
      });
      console.log(data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SpeedDial
      isOpen={open}
      icon={{ name: "edit", color: "#fff" }}
      openIcon={{ name: "close", color: "#fff" }}
      onOpen={() => setOpen(!open)}
      onClose={() => setOpen(!open)}
      style={{
        position: "absolute",
        bottom: 50,
        right: 0,
      }}
    >
      <SpeedDial.Action
        icon={{ name: "add", color: "#fff" }}
        title="Create Contact"
        onPress={() => console.log("Created Lead")}
      />
      <SpeedDial.Action
        icon={{ name: "camera", color: "#fff" }}
        title="QR Scanner"
        onPress={() => {
          navigation.navigate("qr-scanner");
          setOpen(false);
        }}
      />
      <SpeedDial.Action
        icon={{ name: "contacts", color: "#fff" }}
        title="Select Contact"
        onPress={() => {
          navigation.navigate("contacts");
          setOpen(false);
        }}
      />
      <SpeedDial.Action
        icon={{ name: "map", color: "#fff" }}
        title="Open Map"
        onPress={() => {
          navigation.navigate("map");
          setOpen(false);
        }}
      />
    </SpeedDial>
  );
}
