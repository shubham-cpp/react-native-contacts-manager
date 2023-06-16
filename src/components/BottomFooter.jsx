import { useState } from "react";
import { useNavigation } from "expo-router";

import { SpeedDial } from "@rneui/base";

export default function BottomFooter() {
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();
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
        onPress={() => navigation.navigate("qr-scanner")}
      />
    </SpeedDial>
  );
}
