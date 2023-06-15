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
    >
      <SpeedDial.Action
        icon={{ name: "add", color: "#fff" }}
        title="Create Lead"
        onPress={() => console.log("Created Lead")}
      />
      <SpeedDial.Action
        icon={{ name: "add", color: "#fff" }}
        title="Create Oppy"
        onPress={() => console.log("Created Oppy")}
      />
      <SpeedDial.Action
        icon={{ name: "camera", color: "#fff" }}
        title="QR Scanner"
        onPress={() => navigation.navigate("qr-scanner")}
      />
    </SpeedDial>
  );
}
