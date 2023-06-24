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
import { useLeverage, useContact } from "../../src/store";
import { useRef } from "react";
import NetInfo from "@react-native-community/netinfo";

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

  const setContactGrid = useLeverage((state) => state.updateLeverage);
  const [contact, setContact, resetContact] = useContact(
    (state) => [state.contact, state.updateContact],
    shallow
  );

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const originalContact = useRef(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Contact Info`,
    });
  }, [params, navigation]);
  useEffect(() => {
    fetchData(params.id, setContact)
      .then((cont) => {
        navigation.setOptions({
          title: `${cont.jobTitle} - ${cont.organization.legalName}`,
        });
        originalContact.current = cont;
      })
      .catch((err) => {
        ToastAndroid.show(err, ToastAndroid.SHORT);
        console.log(err);
      })
      .finally(() => setLoading(false));
    return resetContact;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const handleSave = () => {
    setEditing(false);

    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 1200);
      }
      setContact(contact);
      originalContact.current = contact;
      setContactGrid(contact, !state.isConnected);
    });
  };

  if (loading)
    return (
      <View className="flex-1 justify-center">
        <ActivityIndicator size="large" />
        <Text className="mt-2 text-lg text-center font-semibold">
          Updating Contact, hold tight
        </Text>
      </View>
    );
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
                {["COMPANY", "EDUCATION", "GOVERNMENTAL", "INDIVIDUAL"].map(
                  (e) => (
                    <CheckBox
                      containerStyle={{ margin: 0, padding: 0 }}
                      textStyle={{ margin: 0, padding: 0 }}
                      wrapperStyle={{ margin: 0, padding: 0 }}
                      checked={e === contact.organization.organizationType}
                      title={e.charAt(0) + e.slice(1).toLowerCase()}
                      onPress={() =>
                        setContact({
                          ...contact,
                          organization: {
                            ...contact.organization,
                            organizationType: e,
                          },
                        })
                      }
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
            editing ? handleSave() : setEditing((p) => !p);
            setOpen(false);
          }}
        />
        <SpeedDial.Action
          icon={{ name: "close", color: "#fff" }}
          title="Cancel"
          onPress={() => {
            setEditing(false);
            setOpen(false);
            setContact(originalContact.current);
          }}
        />
      </SpeedDial>
    </SafeAreaView>
  );
}
