import { SpeedDial } from "@rneui/base";
import { useNavigation, useSearchParams } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import { shallow } from "zustand/shallow";
import jsonData from "../../data.json";
import TextInputOrDisplay from "../../src/components/TextInputOrDisplay";
import { useLeverage } from "../../src/store/useLeverage";

const fetchData = async (id, setData) => {
  return new Promise((resolve, reject) => {
    const found = jsonData.leverages.data.find((l) => l.id === id);
    if (!found) return reject("Unabled to find leverage with id " + id);
    setData(found);
    return resolve(found);
  });
};

export default function Leverage() {
  const params = useSearchParams();
  const navigation = useNavigation();
  const [leverage, setLeverage] = useLeverage(
    (state) => [state.getLeverage(params.id), state.updateLeverage],
    shallow
  );
  const [open, setOpen] = useState(false);
  // const leverage = useLeverage((state) => state.getLeverage(params.id));
  // const setLeverage = useLeverage((state) => state.updateLeverage);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Leverage ${params.id}`,
    });
  }, [params, navigation]);
  useEffect(() => {
    fetchData(params.id, setLeverage)
      .then((lev) => {
        navigation.setOptions({
          title: `${lev.type} ${lev.title}`,
        });
      })
      .catch((err) => {
        ToastAndroid.show(err, ToastAndroid.SHORT);
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) return <ActivityIndicator size="large" />;
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="border-2">
        <View className="bg-white p-4 m-2">
          <Text className="font-semibold text-lg mb-2 border-b">
            {leverage.type} Information
          </Text>
          <TextInputOrDisplay
            label="Name:"
            value={leverage.title}
            set={(text) => setLeverage({ ...leverage, title: text })}
            isEditing={editing}
    on
          />

          <TextInputOrDisplay
            label="Close Date:"
            value={leverage.closeDate}
            set={(text) => setLeverage({ ...leverage, closeDate: text })}
            isEditing={editing}
          />

          <TextInputOrDisplay
            label="Currency:"
            value={leverage.currency}
            set={(text) => setLeverage({ ...leverage, currency: text })}
            isEditing={editing}
          />
          <TextInputOrDisplay
            label="Engagement Type:"
            value={leverage.engagementType}
            set={(text) => setLeverage({ ...leverage, engagementType: text })}
            isEditing={editing}
          />
        </View>
        <View className="bg-white p-4 m-2">
          <Text className="font-semibold text-lg mb-2 border-b">
            Custom Information
          </Text>
          <TextInputOrDisplay
            label="Text 1:"
            value={leverage.custom.text1}
            set={(text) =>
              setLeverage({
                ...leverage,
                custom: { ...leverage.custom, text1: text },
              })
            }
            isEditing={editing}
          />

          <TextInputOrDisplay
            label="Text 2:"
            value={leverage.custom.text2}
            set={(text) =>
              setLeverage({
                ...leverage,
                custom: { ...leverage.custom, text2: text },
              })
            }
            isEditing={editing}
          />
          <TextInputOrDisplay
            label="Date:"
            value={leverage.custom.date}
            set={(text) =>
              setLeverage({
                ...leverage,
                custom: { ...leverage.custom, date: text },
              })
            }
            isEditing={editing}
          />
        </View>
        <SpeedDial
          isOpen={open}
          icon={{ name: "edit", color: "#fff" }}
          openIcon={{ name: "close", color: "#fff" }}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
        >
          <SpeedDial.Action
            icon={{ name: "edit", color: "#fff" }}
            title="Edit"
            onPress={() => {
              setEditing(true);
              setOpen(false);
            }}
          />
          <SpeedDial.Action
            icon={{ name: "close", color: "#fff" }}
            title="Cancel"
            onPress={() => {
              setEditing(false);
              setOpen(false);
            }}
          />
        </SpeedDial>
      </ScrollView>
    </SafeAreaView>
  );
}
