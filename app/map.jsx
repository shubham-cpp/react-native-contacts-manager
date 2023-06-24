import { useEffect, useState } from "react";
import { SafeAreaView, Text } from "react-native";
import ExpoMapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
const MapView = () => {
  const [location, setLocation] = useState({
    latitude: 18.52043,
    longitude: 73.85674,
  });
  // const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      console.log({ location });
    })();
  }, []);

  if (errorMsg.length || location === null)
    return (
      <SafeAreaView>
        <Text>{errorMsg ?? "Requesting permission for location"}</Text>
      </SafeAreaView>
    );
  return (
    <SafeAreaView className="flex-1">
      <ExpoMapView
        className="w-full h-full"
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0022,
          longitudeDelta: 0.0021,
        }}
      >
        <Marker coordinate={location} />
      </ExpoMapView>
    </SafeAreaView>
  );
};

export default MapView;
