import { Avatar, Input, ListItem } from "@rneui/base";
import * as Contacts from "expo-contacts";
import { useEffect, useMemo, useState } from "react";
import { Alert, FlatList, SafeAreaView, Text } from "react-native";
import PropTypes from "prop-types";
import { View } from "react-native";

const DisplayContact = ({ contact, setContact }) => {
  let title = contact.name;
  let avatarTitle = contact.name
    .split(" ")
    .map((n) => n[0])
    .join("");
  if (contact.firstName && contact.lastName) {
    avatarTitle = contact.firstName[0] + contact.lastName[0];
    title = contact.firstName + " " + contact.lastName;
  }

  const subtitle =
    Array.isArray(contact.phoneNumbers) && contact.phoneNumbers.length
      ? contact.phoneNumbers[0].number
      : "EMPTY";

  return (
    <ListItem bottomDivider onPress={() => setContact(contact)}>
      {/* {contactList[0].imageAvailable ? ( */}
      {/*   <Avatar rounded source={{ uri: "" }} /> */}
      {/* ) : ( */}
      <Avatar
        rounded
        title={avatarTitle}
        containerStyle={{ backgroundColor: "#c2c2c2" }}
      />
      {/* )} */}
      <ListItem.Content>
        <ListItem.Title>{title}</ListItem.Title>
        <ListItem.Subtitle>{subtitle}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

const Con = () => {
  const [contactList, setContactList] = useState([]);
  const [selectedContact, setSelectedContact] = useState({});
  const [search, setSearch] = useState("");
  const condition = (c) => {
    return (
      c.name?.includes(search) ??
      `${c.firstName} ${c.lastName}`.includes(search)
    );
  };
  const filteredList = useMemo(
    () => (search.trim().length ? contactList.filter(condition) : contactList),
    [search, contactList]
  );
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [
            Contacts.Fields.PhoneNumbers,
            Contacts.Fields.FirstName,
            Contacts.Fields.LastName,
          ],
        });

        if (data.length > 0) {
          setContactList(data);
        }
      }
    })();
  }, []);
  const handleContactSelect = (contact) => {
    Alert.alert(
      "You have selected",
      `${contact.name}\n${contact.phoneNumbers[0].number}`,
      [
        {
          text: "Ok",
        },
      ]
    );
    setSelectedContact(contact);
  };
  if (contactList.length < 1)
    return (
      <SafeAreaView>
        <Text>No contacts to display</Text>
      </SafeAreaView>
    );
  return (
    <SafeAreaView className="">
      <Input
        placeholder="Search Contact"
        value={search}
        onChangeText={setSearch}
        leftIcon={{
          name: "search",
          size: 24,
        }}
      />

      {filteredList.length ? (
        <FlatList
          data={filteredList}
          keyExtractor={(item) => item.lookupKey}
          renderItem={({ item }) => (
            <DisplayContact contact={item} setContact={handleContactSelect} />
          )}
        />
      ) : (
        <Text>No matching contact found</Text>
      )}
    </SafeAreaView>
  );
};

DisplayContact.propTypes = {
  contact: PropTypes.shape({
    lookupKey: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phoneNumbers: PropTypes.arrayOf(
      PropTypes.shape({
        number: PropTypes.string.isRequired,
      })
    ).isRequired,
    imageAvailable: PropTypes.bool,
  }).isRequired,
  setContact: PropTypes.func.isRequired,
};

export default Con;
