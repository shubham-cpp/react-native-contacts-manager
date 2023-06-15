import DateTimePicker from "@react-native-community/datetimepicker";
import PropTypes from "prop-types";
import { useState } from "react";
import { Text, View } from "react-native";

const DatePicker = (props) => {
  const { value, set } = props;
  const [show, setShow] = useState(false);
  const onChange = (_, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    set(currentDate);
  };
  return (
    <View className="flex-row items-center gap-x-2 flex-wrap">
      <Text className="flex-1">{props.label}</Text>
      {props.isEditing && show ? (
        <DateTimePicker
          value={value}
          onChangeText={onChange}
          className="p-1 my-2 rounded bg-gray-100 flex-[3]"
        />
      ) : (
        <Text
          className={
            "my-2 rounded flex-[3] " + props.isEditing ? "bg-gray-100" : ""
          }
          onPress={() => {
            if (props.isEditing) setShow(true);
          }}
        >
          {value ?? "N/A"}
        </Text>
      )}
    </View>
  );
};

DatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  set: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
};

export default DatePicker;
