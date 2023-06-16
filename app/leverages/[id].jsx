import { CheckBox, SpeedDial } from "@rneui/base";
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
import crsData from "../../crsData.json";
import TextInputOrDisplay from "../../src/components/TextInputOrDisplay";
import { useLeverage } from "../../src/store/useLeverage";

const fetchData = async (id, setData) => {
  return new Promise((resolve, reject) => {
    const found = crsData.find((l) => l.id === id);
    if (!found) return reject("Unabled to find leverage with id " + id);
    setData(found);
    return resolve(found);
  });
};

export default function Leverage() {
  const params = useSearchParams();
  const navigation = useNavigation();
  const [selected, setSelected] = useState("");
  const [contact, setContact] = useLeverage(
    (state) => [state.getLeverage(params.id), state.updateLeverage],
    shallow
  );

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Contact Info`,
    });
  }, [params, navigation]);
  useEffect(() => {
    fetchData(params.id, setContact)
      .then((lev) => {
        navigation.setOptions({
          title: `${lev.jobTitle} - ${lev.organization.legalName}`,
        });
      })
      .catch((err) => {
        ToastAndroid.show(err, ToastAndroid.SHORT);
        console.log(err);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  if (loading) return <ActivityIndicator size="large" />;
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="border-2">
        <View className="bg-white p-4 m-2 rounded-lg">
          <Text className="font-semibold text-lg mb-2 border-b">
            Basic Details
          </Text>
          <View className="">
            <TextInputOrDisplay
              value={contact.person.givenName}
              label="First Name:"
              isEditing={editing}
              set={(text) => {
                setContact({
                  ...contact,
                  person: {
                    ...contact.person,
                    givenName: text,
                  },
                });
              }}
            />
            <TextInputOrDisplay
              value={contact.person.familyName}
              label="Last Name:"
              isEditing={editing}
              set={(text) => {
                setContact({
                  ...contact,
                  person: {
                    ...contact.person,
                    familyName: text,
                  },
                });
              }}
            />
            <TextInputOrDisplay
              value={contact.person.localGivenName}
              label="Local First Name:"
              isEditing={editing}
              set={(text) => {
                setContact({
                  ...contact,
                  person: {
                    ...contact.person,
                    localGivenName: text,
                  },
                });
              }}
            />
            <TextInputOrDisplay
              value={contact.person.localFamilyName}
              label="Local Last Name:"
              isEditing={editing}
              set={(text) => {
                setContact({
                  ...contact,
                  person: {
                    ...contact.person,
                    localFamilyName: text,
                  },
                });
              }}
            />
            <TextInputOrDisplay
              value={contact.person.title}
              label="Title:"
              isEditing={editing}
              set={(text) => {
                setContact({
                  ...contact,
                  person: {
                    ...contact.person,
                    title: text,
                  },
                });
              }}
            />
          </View>
        </View>

        <View className="bg-white p-4 m-2 rounded-lg">
          <Text className="font-semibold text-lg mb-2 border-b">
            Contact Details
          </Text>
          <View className="">
            <Text>{contact.organization.legalName}</Text>
          </View>
        </View>

        <View className="bg-white p-4 m-2 rounded-lg">
          <Text className="font-semibold text-lg mb-2 border-b">
            Organization Details
          </Text>
          <View className="flex-row">
            <Text className="flex-1">Type:</Text>
            {!editing ? (
              <Text className="flex-[3]">
                {contact.organization.organizationType}
              </Text>
            ) : (
              <View className="flex-[3] flex-row flex-wrap">
                {["company", "education", "governmental", "individual"].map(
                  (e) => (
                    <CheckBox
                      containerStyle={{ margin: 0, padding: 0 }}
                      textStyle={{ margin: 0, padding: 0 }}
                      wrapperStyle={{ margin: 0, padding: 0 }}
                      checked={selected === e}
                      title={e.charAt(0).toUpperCase() + e.slice(1)}
                      onPress={() => setSelected(e)}
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="circle-o"
                      key={e}
                    />
                  )
                )}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <SpeedDial
        isOpen={open}
        icon={{ name: "edit", color: "#fff" }}
        openIcon={{ name: "close", color: "#fff" }}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      >
        <SpeedDial.Action
          icon={{ name: editing ? "save" : "edit", color: "#fff" }}
          title={editing ? "Save" : "Edit"}
          onPress={() => {
            setEditing((p) => !p);
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
    </SafeAreaView>
  );
}
