import { Logs } from "expo";
import { useNavigation } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, View } from "react-native";
import { shallow } from "zustand/shallow";
// import jsonData from "../data.json";
import { useNetInfo } from "@react-native-community/netinfo";
import crsData from "../crsData.json";
import BottomFooter from "../src/components/BottomFooter";
import Card from "../src/components/Card";
import ListHeader from "../src/components/ListHeader";
import SelectView from "../src/components/SelectView";
import { useLeverage } from "../src/store/useLeverage";
import { isEmpty } from "../src/utils";
Logs.enableExpoCliLogging();

const fetchData = async (setData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      setData(crsData);
      resolve(crsData);
    }, 1500);
  });
};

const LoadingCard = () => {
  return (
    <View className="bg-white h-[80px] rounded-lg p-2 m-2">
      <ActivityIndicator size="large" />
    </View>
  );
};

export default function App() {
  const navigation = useNavigation();
  const netInfo = useNetInfo();
  const [data, setData, offlineData, resetOfflineData] = useLeverage(
    (state) => [
      state.leverage,
      state.setLeverages,
      state.offlineLeverages,
      state.resetOfflineLeverages,
    ],
    shallow
  );
  const [selected, setSelected] = useState("All");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Contacts React Native",
    });
  }, [navigation]);
  useEffect(() => {
    fetchData(setData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (netInfo.isConnected && !isEmpty(offlineData)) {
      resetOfflineData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [netInfo.isConnected, offlineData]);

  const list = [
    {
      title: "All Views",
      value: "All",
      onPress: () => setSelected("All"),
    },
    {
      title: "Another View",
      value: "Another",
      onPress: () => setSelected("Another"),
    },
    {
      title: "Test View",
      value: "Test",
      onPress: () => setSelected("Test"),
    },
  ];

  return (
    <SafeAreaView>
      {data.length <= 0 ? (
        <FlatList
          data={[1, 2, 3, 4, 5]}
          renderItem={() => <LoadingCard />}
          keyExtractor={(item) => item}
        />
      ) : (
        <>
          <View className="flex-row justify-between items-center">
            <SelectView list={list} value={selected} />
            <ListHeader />
          </View>
          <SafeAreaView>
            <FlatList
              data={data}
              renderItem={({ item }) => <Card leverage={item} />}
              keyExtractor={(item) => item.id}
            />
          </SafeAreaView>
          <BottomFooter />
        </>
      )}
    </SafeAreaView>
  );
}
