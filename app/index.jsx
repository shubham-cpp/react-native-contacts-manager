import { Logs } from "expo";
import { useNavigation } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, View } from "react-native";
import { shallow } from "zustand/shallow";
// import jsonData from "../data.json";
import crsData from "../crsData.json";
import BottomFooter from "../src/components/BottomFooter";
import Card from "../src/components/Card";
import SelectView from "../src/components/SelectView";
import { useLeverage } from "../src/store/useLeverage";

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
  const [selected, setSelected] = useState("All");
  const [data, setData] = useLeverage(
    (state) => [state.leverage, state.setLeverages],
    shallow
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Contacts React Native",
    });
  }, [navigation]);
  useEffect(() => {
    fetchData(setData);
  }, []);

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
          <SelectView list={list} value={selected} />
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
