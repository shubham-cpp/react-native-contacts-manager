import { SafeAreaView } from "react-native";
import { BottomSheet, Button, ListItem } from "@rneui/base";
import { useState } from "react";
import { StyleSheet } from "react-native";
import PropTypes from "prop-types";

const SelectView = ({ list, value }) => {
  const [isVisible, setIsVisible] = useState(false);
  const updatedList = [
    {
      title: "Cancel",
      value: "cancel",
      containerStyle: { backgroundColor: "red" },
      titleStyle: { color: "white" },
      onPress: () => setIsVisible(false),
    },
  ];
  const title = [...list, ...updatedList].find(
    (item) => item.value === value
  ).title;
  return (
    <SafeAreaView>
      <Button
        title={title}
        buttonStyle={styles.btn}
        onPress={() => setIsVisible(true)}
        icon={{
          name: "chevron-down",
          type: "font-awesome",
          size: 15,
          color: "white",
        }}
        iconRight
      />
      <BottomSheet modalProps={{}} isVisible={isVisible}>
        {[...list, ...updatedList].map((l, i) => (
          <ListItem
            key={i}
            onPress={() => {
              if (typeof l.onPress === "function") l.onPress();
              setIsVisible(false);
            }}
            containerStyle={l.containerStyle}
          >
            <ListItem.Content>
              <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: 150,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 10,
    margin: 10,
  },
});

SelectView.propTypes = {
  //   list: PropTypes.array.isRequired,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      containerStyle: PropTypes.any,
      titleStyle: PropTypes.any,
      onPress: PropTypes.func,
    })
  ),
  value: PropTypes.string.isRequired,
};

export default SelectView;
