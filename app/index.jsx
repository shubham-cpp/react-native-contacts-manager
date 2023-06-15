import { Logs } from "expo";
import { useNavigation } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, View } from "react-native";
import jsonData from "../data.json";
import BottomFooter from "../src/components/BottomFooter";
import Card from "../src/components/Card";
import { useLeverage } from "../src/store/useLeverage";
import { shallow } from "zustand/shallow";

Logs.enableExpoCliLogging();

const fetchData = async (setData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      setData(jsonData.leverages.data);
      resolve(jsonData.leverages.totalRecords);
    }, 1200);
  });
};

const LoadingCard = () => {
  return (
    <View className="bg-white h-[60px] rounded-lg p-2 m-2">
      <ActivityIndicator size="large" />
    </View>
  );
};

export default function App() {
  const navigation = useNavigation();
  const [data, setData] = useLeverage(
    (state) => [state.leverage, state.setLeverages],
    shallow
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Lead and Opportunity",
    });
  }, [navigation]);
  useEffect(() => {
    fetchData(setData);
  }, []);

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
          <FlatList
            data={data}
            renderItem={({ item }) => <Card leverage={item} />}
            keyExtractor={(item) => item.id}
          />
          <BottomFooter />
        </>
      )}
    </SafeAreaView>
  );
}
