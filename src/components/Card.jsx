import { BottomSheet, Button, ListItem } from "@rneui/base";
import { Link } from "expo-router";
import PropTypes from "prop-types";
import { useState } from "react";
import { Linking, Platform, Text, View } from "react-native";
import { useLeverage } from "../store/useLeverage";

const ContactPoints = ({ data }) => {
  const [isPhoneBottomSheetVisible, setIsPhoneBottomSheetVisible] =
    useState(false);
  const [isEmailBottomSheetVisible, setIsEmailBottomSheetVisible] =
    useState(false);

  const handleEmail = (email = data.contactPointsEmail[0].email) => {
    Linking.openURL(`mailto:${email}`);
    setIsEmailBottomSheetVisible(false);
  };
  const handlePhone = (phone = data.contactPointsPhone[0].telephone) => {
    const uri = `${Platform.OS === "ios" ? "telprompt" : "tel"}:${phone}`;
    Linking.openURL(uri);
    setIsPhoneBottomSheetVisible(false);
  };

  const phoneList = data.contactPointsPhone.map((p) => ({
    title: p.telephone,
    containerStyle: {},
    onPress: () => handlePhone(p.telephone),
  }));
  const emailList = data.contactPointsEmail.map((e) => ({
    title: e.email,
    containerStyle: {},
    onPress: () => handleEmail(e.email),
  }));
  return (
    <View className="flex-row">
      {/* Phone */}
      <Button
        accessibilityLabel="Click to call the contact"
        className={`${phoneList.length == 0 ? "hidden" : ""}`}
        icon={{
          name: "phone",
          type: "font-awesome",
          size: 15,
          color: "white",
        }}
        buttonStyle={{
          borderRadius: 50,
          marginHorizontal: 2,
        }}
        onPress={() =>
          phoneList.length >= 2
            ? setIsPhoneBottomSheetVisible(true)
            : handlePhone()
        }
      />
      <BottomSheet
        modalProps={{}}
        isVisible={isPhoneBottomSheetVisible}
        onBackdropPress={() => setIsPhoneBottomSheetVisible(false)}
      >
        {phoneList.map((p) => (
          <ListItem
            key={p.title}
            containerStyle={p.containerStyle}
            onPress={p.onPress}
          >
            <ListItem.Content>
              <ListItem.Title style={p.titleStyle}>{p.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
      {/* Email */}
      <Button
        accessibilityLabel="Click to open email"
        className={`${emailList.length == 0 ? "hidden" : ""}`}
        icon={{
          name: "inbox",
          type: "font-awesome",
          size: 15,
          color: "white",
        }}
        buttonStyle={{
          borderRadius: 50,
          marginHorizontal: 2,
        }}
        onPress={() =>
          emailList.length >= 2
            ? setIsEmailBottomSheetVisible(true)
            : handleEmail()
        }
      />
      <BottomSheet
        modalProps={{}}
        isVisible={isEmailBottomSheetVisible}
        onBackdropPress={() => setIsEmailBottomSheetVisible(false)}
      >
        {emailList.map((p) => (
          <ListItem
            key={p.title}
            containerStyle={p.containerStyle}
            onPress={p.onPress}
          >
            <ListItem.Content>
              <ListItem.Title style={p.titleStyle}>{p.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    </View>
  );
};

const Card = (props) => {
  // const leverage = props.leverage;
  /** @type {Contact} */
  const leverage = useLeverage((state) => state.getLeverage(props.leverage.id));
  // Should show different color for isAnonymized: true
  return (
    <View
      accessibilityLabel="Color green indicates its active, color gray indicates contact is Anonymized"
      className="rounded-lg p-2 m-2 relative bg-white shadow-lg shadow-gray-400"
    >
      <Link
        href={`/leverages/${leverage.id}`}
        accessibilityLabelled={`Open Contact with legal name: ${leverage.title}`}
        className="text-sm font-light"
      >
        {leverage?.organization?.legalName}
      </Link>

      <View className="flex-row justify-between">
        {/* Contact title, */}
        <View className="flex-[3]">
          <Link
            href={`/leverages/${leverage.id}`}
            className="text-md text-blue-400"
            accessibilityLabelled={`Open Contact with legal name: ${leverage.jobTitle}`}
          >
            {`${leverage?.person?.givenName} ${leverage?.person?.familyName}`}
          </Link>
        </View>
        {/* Currency amount and closeDate */}
        <View className="flex-1">
          <ContactPoints data={leverage.contactPoints} />
        </View>
      </View>
      {/* Engagement type and current status */}
      <View className="flex-row gap-x-2">
        <Text className={"text-sm border px-2 rounded border-gray-300 "}>
          {leverage.organization.organizationType}
        </Text>
        <Text className={"text-sm border px-2 rounded border-gray-300 "}>
          {leverage.status}
        </Text>
        <Text>
          {new Date(leverage.startDate).toLocaleString("en-IN").split(",")[0]}
        </Text>
      </View>
    </View>
  );
};

Card.propTypes = {
  leverage: PropTypes.shape({
    id: PropTypes.string.isRequired,
    contactPoints: PropTypes.shape({
      contactPointsEmail: PropTypes.arrayOf(
        PropTypes.shape({
          contactType: PropTypes.string,
          email: PropTypes.string,
        })
      ).isRequired,
      contactPointsPhone: PropTypes.arrayOf(
        PropTypes.shape({
          contactType: PropTypes.string,
          telephone: PropTypes.string,
        })
      ).isRequired,
    }).isRequired,
    endDate: PropTypes.string.isRequired,
    jobTitle: PropTypes.string.isRequired,
    influenceLevel: PropTypes.string.isRequired,
    interactionLevel: PropTypes.string.isRequired,
    isAnonymized: PropTypes.bool.isRequired,
    organization: PropTypes.shape({
      individualType: PropTypes.string,
      legalName: PropTypes.string,
      legalEntity: PropTypes.shape({
        id: PropTypes.string,
        registeredName: PropTypes.string,
      }),
    }),
    person: PropTypes.shape({
      id: PropTypes.string,
      familyName: PropTypes.string,
      givenName: PropTypes.string,
      lastActivityDate: PropTypes.string,
      localFamilyName: PropTypes.array,
      localGivenName: PropTypes.array,
      title: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

ContactPoints.propTypes = {
  data: PropTypes.shape({
    contactPointsEmail: PropTypes.arrayOf(
      PropTypes.shape({
        contactType: PropTypes.string,
        email: PropTypes.string,
      })
    ).isRequired,
    contactPointsPhone: PropTypes.arrayOf(
      PropTypes.shape({
        contactType: PropTypes.string,
        telephone: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
};

export default Card;
