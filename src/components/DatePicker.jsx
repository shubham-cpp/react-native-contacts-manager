import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import PropTypes from "prop-types";
import { useState } from "react";
import { Text, View } from "react-native";

const DatePicker = (props) => {
  const { value, set, isEditing, label } = props;
  const [date, setDate] = useState(new Date(value));
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    set(currentDate);
  };

  const showMode = () => {
    if (isEditing)
      DateTimePickerAndroid.open({
        value: date,
        onChange,
        mode: "date",
        is24Hour: true,
      });
  };

  const displayDate = (d) => {
    return new Date(d).toLocaleString().split(",")[0];
  };

  return (
    <View className="flex-row items-center gap-x-2 flex-wrap">
      <Text className="flex-1">{label}</Text>
      <Text
        className={`p-1 my-2 rounded flex-[3] ${
          isEditing ? "bg-gray-100" : ""
        } `}
        onPress={showMode}
      >
        {displayDate(date)}
      </Text>
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
